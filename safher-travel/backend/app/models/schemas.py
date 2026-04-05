"""
Pydantic models for request validation and response serialization.
"""

from pydantic import BaseModel, Field, validator
from typing import List, Optional
from enum import Enum


# ── Enums ────────────────────────────────────────────────────────────────────

class SafetyRating(str, Enum):
    LOW = "Low"
    MEDIUM = "Medium"
    HIGH = "High"


class AccommodationType(str, Enum):
    HOSTEL = "hostel"
    HOTEL = "hotel"
    GUESTHOUSE = "guesthouse"
    AIRBNB = "airbnb"


# ── Request ──────────────────────────────────────────────────────────────────

class ItineraryRequest(BaseModel):
    destination: str = Field(
        ...,
        min_length=2,
        max_length=100,
        description="Travel destination (city or country)",
        examples=["Tokyo, Japan"],
    )
    days: int = Field(
        ...,
        ge=1,
        le=30,
        description="Number of travel days",
        examples=[7],
    )
    budget: str = Field(
        ...,
        min_length=2,
        max_length=50,
        description="Travel budget (e.g., '$500', 'budget', 'mid-range', 'luxury')",
        examples=["$1000 USD"],
    )
    preferences: Optional[str] = Field(
        default="",
        max_length=500,
        description="Personal preferences (food, activities, mobility needs, etc.)",
        examples=["I love museums, vegetarian food, and photography"],
    )

    @validator("destination")
    def destination_must_not_be_empty(cls, v):
        if not v.strip():
            raise ValueError("Destination cannot be empty or whitespace")
        return v.strip()

    @validator("preferences", pre=True, always=True)
    def normalize_preferences(cls, v):
        return (v or "").strip()


# ── Nested response models ────────────────────────────────────────────────────

class ActivityPlan(BaseModel):
    time: str = Field(description="Time of day: Morning / Afternoon / Evening")
    activity: str
    location: str
    safety_tip: str
    estimated_cost: str


class DayPlan(BaseModel):
    day: int
    plan: List[ActivityPlan]


class StaySuggestion(BaseModel):
    name: str
    type: str
    price_range: str
    safety_features: str


class EmergencyInfo(BaseModel):
    local_police: str
    women_helpline: str
    notes: str


# ── Top-level response ────────────────────────────────────────────────────────

class ItineraryResponse(BaseModel):
    destination: str
    total_budget_estimate: str
    safety_rating: str
    safety_notes: str
    packing_tips: List[str]
    itinerary: List[DayPlan]
    stay_suggestions: List[StaySuggestion]
    transport_tips: List[str]
    emergency_info: EmergencyInfo


# ── API wrapper ───────────────────────────────────────────────────────────────

class APISuccessResponse(BaseModel):
    success: bool = True
    data: ItineraryResponse


class APIErrorResponse(BaseModel):
    success: bool = False
    error: str
    detail: Optional[str] = None
