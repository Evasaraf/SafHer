# 🌍 SafHer Travel Planner

> AI-powered, safety-first travel itinerary generator for solo female travelers.

Built with **FastAPI** (Python) + **React** (Vite + Tailwind CSS), powered by the **Grok API (xAI)**.

---

## 📁 Project Structure

```
safher-travel/
├── backend/
│   ├── app/
│   │   ├── __init__.py
│   │   ├── main.py                  ← FastAPI app entry point
│   │   ├── core/
│   │   │   ├── __init__.py
│   │   │   └── config.py            ← Pydantic settings (reads .env)
│   │   ├── models/
│   │   │   ├── __init__.py
│   │   │   └── schemas.py           ← Pydantic request/response models
│   │   ├── routes/
│   │   │   ├── __init__.py
│   │   │   └── itinerary.py         ← POST /api/v1/generate-itinerary
│   │   └── services/
│   │       ├── __init__.py
│   │       └── llm_service.py       ← Grok API calls + JSON validation
│   ├── requirements.txt
│   └── .env.example
│
└── frontend/
    ├── index.html
    ├── vite.config.js
    ├── tailwind.config.js
    ├── postcss.config.js
    ├── package.json
    ├── .env.example
    └── src/
        ├── main.jsx
        ├── App.jsx                  ← Root component + hero section
        ├── index.css                ← Global styles + Tailwind directives
        ├── hooks/
        │   └── useItinerary.js      ← Custom hook (state + API call)
        ├── services/
        │   └── api.js               ← Axios instance + generateItinerary()
        └── components/
            ├── TravelForm.jsx       ← Input form with validation
            ├── ItineraryDisplay.jsx ← Results layout (composes sub-components)
            ├── DayCard.jsx          ← Single day accordion card
            ├── SafetyBadge.jsx      ← Low / Medium / High badge
            ├── BudgetSummary.jsx    ← Budget estimate banner
            ├── StaySuggestions.jsx  ← Accommodation cards
            ├── EmergencyInfo.jsx    ← Emergency contacts section
            ├── TipsList.jsx         ← Reusable tips list (packing / transport)
            └── LoadingSpinner.jsx   ← Animated loading state
```

---

## ⚙️ Prerequisites

| Tool    | Version |
|---------|---------|
| Python  | 3.11+   |
| Node.js | 18+     |
| npm     | 9+      |
| Grok API key | from [console.x.ai](https://console.x.ai/) |

---

## 🚀 Setup Instructions

### 1. Clone / Download the project

```bash
cd safher-travel
```

---

### 2. Backend Setup

```bash
cd backend

# Create and activate virtual environment
python -m venv venv
source venv/bin/activate          # macOS / Linux
# venv\Scripts\activate.bat       # Windows CMD
# venv\Scripts\Activate.ps1       # Windows PowerShell

# Install dependencies
pip install -r requirements.txt

# Configure environment variables
cp .env.example .env
```

**Edit `.env`** and set your Grok API key:

```env
GROK_API_KEY=xai-your-key-here
```

**Start the backend server:**

```bash
uvicorn app.main:app --reload --port 8000
```

The API will be live at → `http://localhost:8000`  
Interactive docs → `http://localhost:8000/docs`

---

### 3. Frontend Setup

Open a **new terminal**:

```bash
cd frontend

# Install Node dependencies
npm install

# Configure environment
cp .env.example .env
# Leave VITE_API_BASE_URL empty to use the Vite dev proxy

# Start dev server
npm run dev
```

The app will be live at → `http://localhost:5173`

---

## 🔌 API Reference

### `POST /api/v1/generate-itinerary`

**Request body:**

```json
{
  "destination": "Kyoto, Japan",
  "days": 5,
  "budget": "Mid-range ($50–$150 per day)",
  "preferences": "Museums, vegetarian food, photography"
}
```

**Success response (200):**

```json
{
  "success": true,
  "data": {
    "destination": "Kyoto, Japan",
    "total_budget_estimate": "$600–$750 USD for 5 days",
    "safety_rating": "High",
    "safety_notes": "Kyoto is one of the safest cities for solo female travelers. Stay in central areas like Gion and Higashiyama. Use public transport; avoid walking alone late at night in less-lit areas.",
    "packing_tips": [
      "Pack a portable door alarm for extra room security",
      "Carry a translation app (Google Translate) – helpful in rural areas",
      "Bring a modest cover-up for temple visits",
      "Keep a copy of your passport and emergency contacts in your bag"
    ],
    "itinerary": [
      {
        "day": 1,
        "plan": [
          {
            "time": "Morning",
            "activity": "Arrive, check in, explore Fushimi Inari Shrine",
            "location": "Fushimi Inari Taisha, Fushimi Ward",
            "safety_tip": "Visit early morning (before 8 AM) – fewer crowds and better photos. Shrine is busy but very safe.",
            "estimated_cost": "$0 entry + $15 transport"
          },
          {
            "time": "Afternoon",
            "activity": "Lunch in Nishiki Market, stroll Gion district",
            "location": "Nishiki Market & Gion, Central Kyoto",
            "safety_tip": "Nishiki is crowded – watch your belongings. Gion is extremely safe and well-lit.",
            "estimated_cost": "$12–$18 for lunch"
          },
          {
            "time": "Evening",
            "activity": "Dinner at a women-friendly izakaya, early rest",
            "location": "Pontocho Alley, Central Kyoto",
            "safety_tip": "Pontocho is narrow but well-monitored. Choose seated restaurants over standing bars for comfort.",
            "estimated_cost": "$20–$30 for dinner"
          }
        ]
      }
    ],
    "stay_suggestions": [
      {
        "name": "Sakura Hostel Kyoto",
        "type": "hostel",
        "price_range": "$25–$40/night",
        "safety_features": "Female-only dorms available, 24-hour reception, locker storage, CCTV in common areas, keycard room access"
      },
      {
        "name": "Kyoto Hotel Okura",
        "type": "hotel",
        "price_range": "$120–$160/night",
        "safety_features": "Central location, 24-hour concierge, in-room safe, keycard floor access, well-lit corridors"
      }
    ],
    "transport_tips": [
      "Use the IC Card (Suica/ICOCA) for all buses and trains – no cash needed",
      "Taxis are metered and very safe – use apps like GO for reliability",
      "Avoid last trains late night; book transport before midnight",
      "Share your real-time location with a trusted contact when exploring alone"
    ],
    "emergency_info": {
      "local_police": "110 (Japan Police Hotline)",
      "women_helpline": "0120-279-889 (Women's Consultation Center, 24hr)",
      "notes": "Japan has a very low crime rate. Police boxes (Koban) are found on most major streets and officers are helpful to tourists. Keep the address of your accommodation written in Japanese."
    }
  }
}
```

**Error response (500 / 503):**

```json
{
  "detail": "AI response error: AI returned malformed JSON..."
}
```

---

## 🏗️ Production Deployment

### Backend (e.g. Railway, Render, Fly.io)

```bash
# Set environment variables in your hosting dashboard:
GROK_API_KEY=xai-your-key-here
APP_ENV=production
ALLOWED_ORIGINS=["https://your-frontend-domain.com"]

# Start command:
uvicorn app.main:app --host 0.0.0.0 --port $PORT
```

### Frontend (e.g. Vercel, Netlify)

```bash
# Build command:
npm run build

# Output directory:
dist

# Environment variable:
VITE_API_BASE_URL=https://your-backend-domain.com/api/v1
```

---

## 🧪 Manual API Test (curl)

```bash
curl -X POST http://localhost:8000/api/v1/generate-itinerary \
  -H "Content-Type: application/json" \
  -d '{
    "destination": "Barcelona, Spain",
    "days": 4,
    "budget": "Mid-range ($50\u2013$150 per day)",
    "preferences": "Beach, tapas, architecture, LGBTQ+ friendly"
  }'
```

---

## 🛡️ Safety Design Decisions

| Feature | Rationale |
|---------|-----------|
| System prompt always prioritizes safety | Prevents AI from suggesting risky areas |
| JSON schema validation (Pydantic) | Rejects malformed AI responses gracefully |
| Women's helpline in every response | Non-negotiable emergency field |
| Safety rating badge in UI | Immediate visual risk assessment |
| Safety tip on every activity | Contextual, not generic advice |
| Female-only stay options | Highlighted in accommodation suggestions |

---

## 📄 License

MIT – build on it, contribute to it, travel safely with it.
