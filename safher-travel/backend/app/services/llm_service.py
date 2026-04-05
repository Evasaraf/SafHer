"""
LLM Service – communicates with the Grok API (xAI) and validates responses.
"""

import json
import re
import httpx
from typing import Dict, Any

from app.core.config import settings
from app.models.schemas import ItineraryRequest, ItineraryResponse


# ── Prompts ───────────────────────────────────────────────────────────────────

SYSTEM_PROMPT = """You are an AI travel planner specialized ONLY for solo female travelers.
Your goal is to create SAFE, PRACTICAL, and WELL-STRUCTURED travel plans.
You must prioritize:
1. Safety (very important)
2. Budget awareness
3. Comfort and accessibility
4. Realistic travel timing
5. Local cultural considerations for women

OUTPUT FORMAT (STRICT JSON ONLY):
{
  "destination": "",
  "total_budget_estimate": "",
  "safety_rating": "Low / Medium / High",
  "safety_notes": "",
  "packing_tips": [],
  "itinerary": [
    {
      "day": 1,
      "plan": [
        {
          "time": "Morning/Afternoon/Evening",
          "activity": "",
          "location": "",
          "safety_tip": "",
          "estimated_cost": ""
        }
      ]
    }
  ],
  "stay_suggestions": [
    {
      "name": "",
      "type": "hostel/hotel",
      "price_range": "",
      "safety_features": ""
    }
  ],
  "transport_tips": [],
  "emergency_info": {
    "local_police": "",
    "women_helpline": "",
    "notes": ""
  }
}

RULES:
- Avoid unsafe or isolated areas
- Prefer central, well-reviewed places
- Include women-specific safety advice
- Keep itinerary realistic (no overload, max 3 activities per day)
- Match user's budget
- Output ONLY JSON (no extra text, no markdown, no code blocks)

TONE: Helpful, protective, practical"""


def build_user_prompt(req: ItineraryRequest) -> str:
    """Construct the user-facing prompt from the request object."""
    return (
        f"Plan a trip with the following details:\n"
        f"Destination: {req.destination}\n"
        f"Duration: {req.days} days\n"
        f"Budget: {req.budget}\n"
        f"Preferences: {req.preferences or 'No specific preferences'}\n\n"
        f"Focus on safety for a solo female traveler."
    )


# ── JSON extraction helpers ───────────────────────────────────────────────────

def _extract_json_from_text(text: str) -> str:
    """
    Strip markdown fences / extra prose and return raw JSON string.
    Tries multiple strategies in order of confidence.
    """
    # 1. Strip ```json ... ``` or ``` ... ``` code fences
    fenced = re.search(r"```(?:json)?\s*([\s\S]+?)\s*```", text)
    if fenced:
        return fenced.group(1).strip()

    # 2. Find first { … last } (greedy outer object)
    start = text.find("{")
    end = text.rfind("}")
    if start != -1 and end != -1 and end > start:
        return text[start : end + 1]

    # 3. Return as-is and let json.loads raise a helpful error
    return text.strip()


def _validate_and_parse(raw: str) -> ItineraryResponse:
    """Parse raw JSON string and validate against ItineraryResponse schema."""
    json_str = _extract_json_from_text(raw)

    try:
        data: Dict[str, Any] = json.loads(json_str)
    except json.JSONDecodeError as exc:
        raise ValueError(
            f"AI returned malformed JSON. Parse error: {exc}\n"
            f"Raw snippet: {json_str[:300]}"
        )

    try:
        return ItineraryResponse(**data)
    except Exception as exc:
        raise ValueError(f"AI JSON does not match expected schema: {exc}")


# ── Main service function ─────────────────────────────────────────────────────

async def generate_itinerary(req: ItineraryRequest) -> ItineraryResponse:
    """
    Call the Grok API and return a validated ItineraryResponse.
    Raises ValueError on AI/validation errors, httpx.HTTPError on network errors.
    """
    if not settings.GROK_API_KEY:
        raise EnvironmentError(
            "GROK_API_KEY is not set. Please add it to your .env file."
        )

    payload = {
        "model": settings.GROK_MODEL,
        "max_tokens": settings.LLM_MAX_TOKENS,
        "temperature": settings.LLM_TEMPERATURE,
        "messages": [
            {"role": "system", "content": SYSTEM_PROMPT},
            {"role": "user", "content": build_user_prompt(req)},
        ],
    }

    headers = {
        "Authorization": f"Bearer {settings.GROK_API_KEY}",
        "Content-Type": "application/json",
    }

    async with httpx.AsyncClient(timeout=120.0) as client:
        response = await client.post(
            f"{settings.GROK_API_BASE_URL}/chat/completions",
            json=payload,
            headers=headers,
        )
        response.raise_for_status()

    result = response.json()

    # Extract assistant message content
    try:
        raw_content: str = result["choices"][0]["message"]["content"]
    except (KeyError, IndexError) as exc:
        raise ValueError(f"Unexpected API response structure: {exc}\n{result}")

    return _validate_and_parse(raw_content)
