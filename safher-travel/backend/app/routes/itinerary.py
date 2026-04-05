"""
Itinerary routes – POST /generate-itinerary
"""

import httpx
from fastapi import APIRouter, HTTPException, status

from app.models.schemas import (
    ItineraryRequest,
    APISuccessResponse,
    APIErrorResponse,
)
from app.services.llm_service import generate_itinerary

router = APIRouter()


@router.post(
    "/generate-itinerary",
    response_model=APISuccessResponse,
    summary="Generate a safe travel itinerary for solo female travelers",
    responses={
        200: {"model": APISuccessResponse, "description": "Itinerary generated"},
        422: {"description": "Validation error (bad request body)"},
        500: {"model": APIErrorResponse, "description": "AI or server error"},
        503: {"model": APIErrorResponse, "description": "Upstream API unavailable"},
    },
)
async def create_itinerary(req: ItineraryRequest):
    """
    Accepts destination, days, budget, and preferences.
    Returns a fully structured, safety-first travel itinerary.
    """
    try:
        itinerary = await generate_itinerary(req)
        return APISuccessResponse(data=itinerary)

    except EnvironmentError as exc:
        # Missing API key – configuration issue
        raise HTTPException(
            status_code=status.HTTP_500_INTERNAL_SERVER_ERROR,
            detail=str(exc),
        )

    except ValueError as exc:
        # AI returned bad / unparseable output
        raise HTTPException(
            status_code=status.HTTP_500_INTERNAL_SERVER_ERROR,
            detail=f"AI response error: {exc}",
        )

    except httpx.HTTPStatusError as exc:
        # Upstream API returned 4xx/5xx
        raise HTTPException(
            status_code=status.HTTP_503_SERVICE_UNAVAILABLE,
            detail=f"Upstream AI API error {exc.response.status_code}: {exc.response.text[:200]}",
        )

    except httpx.RequestError as exc:
        # Network-level failure (timeout, DNS, etc.)
        raise HTTPException(
            status_code=status.HTTP_503_SERVICE_UNAVAILABLE,
            detail=f"Could not reach AI API: {exc}",
        )

    except Exception as exc:
        # Catch-all – log in real app
        raise HTTPException(
            status_code=status.HTTP_500_INTERNAL_SERVER_ERROR,
            detail=f"Unexpected error: {exc}",
        )
