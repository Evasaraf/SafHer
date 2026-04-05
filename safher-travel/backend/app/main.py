"""
SafHer Travel Planner – FastAPI Backend
Entry point for the application.
"""

from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from contextlib import asynccontextmanager

from app.routes import itinerary
from app.core.config import settings


@asynccontextmanager
async def lifespan(app: FastAPI):
    """Handle startup / shutdown events."""
    print(f"🌍 SafHer Travel API starting on {settings.APP_ENV} environment")
    yield
    print("✅ SafHer Travel API shut down cleanly")


app = FastAPI(
    title="SafHer Travel Planner API",
    description="AI-powered travel itinerary generator for solo female travelers",
    version="1.0.0",
    lifespan=lifespan,
)

# ── CORS ────────────────────────────────────────────────────────────────────
app.add_middleware(
    CORSMiddleware,
    allow_origins=settings.ALLOWED_ORIGINS,
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# ── Routers ─────────────────────────────────────────────────────────────────
app.include_router(
    itinerary.router,
    prefix="/api/v1",
    tags=["Itinerary"],
)


@app.get("/", tags=["Health"])
async def root():
    return {
        "service": "SafHer Travel Planner API",
        "status": "running",
        "version": "1.0.0",
    }


@app.get("/health", tags=["Health"])
async def health_check():
    return {"status": "healthy"}
