/**
 * App.jsx – root component.
 * Manages the top-level view state (form ↔ results).
 */

import React from 'react'
import { Globe, Shield, Star } from 'lucide-react'
import TravelForm        from './components/TravelForm'
import ItineraryDisplay  from './components/ItineraryDisplay'
import LoadingSpinner    from './components/LoadingSpinner'
import { useItinerary }  from './hooks/useItinerary'

export default function App() {
  const { itinerary, loading, error, generate, reset } = useItinerary()

  const showForm    = !itinerary && !loading
  const showResults = !!itinerary && !loading

  return (
    <div className="min-h-screen bg-cream">

      {/* ── Nav / Header ─────────────────────────────────────────────────── */}
      <header className="sticky top-0 z-50 bg-cream/90 backdrop-blur-sm border-b border-sand">
        <div className="max-w-3xl mx-auto px-4 h-14 flex items-center justify-between">
          <div className="flex items-center gap-2.5">
            <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-rose to-terracotta flex items-center justify-center shadow-sm">
              <Globe size={16} className="text-white" />
            </div>
            <span className="font-display font-bold text-charcoal text-lg tracking-tight">
              Saf<span className="text-terracotta">Her</span>
            </span>
          </div>

          <div className="flex items-center gap-1.5 text-xs text-gray-500 font-medium">
            <Shield size={13} className="text-sage" />
            Safety-first travel planning
          </div>
        </div>
      </header>

      {/* ── Main ─────────────────────────────────────────────────────────── */}
      <main className="max-w-3xl mx-auto px-4 py-10">

        {/* Hero – only on the form view */}
        {showForm && <Hero />}

        {/* Error banner */}
        {error && !loading && (
          <div className="mb-6 bg-red-50 border border-red-200 rounded-2xl p-4 flex gap-3 animate-fade-in">
            <span className="text-red-500 text-lg">⚠️</span>
            <div>
              <p className="font-semibold text-red-700 text-sm">Something went wrong</p>
              <p className="text-sm text-red-600 mt-0.5">{error}</p>
            </div>
          </div>
        )}

        {/* Loading */}
        {loading && <LoadingSpinner />}

        {/* Form */}
        {showForm && (
          <div className="card mt-6">
            <TravelForm onSubmit={generate} loading={loading} />
          </div>
        )}

        {/* Results */}
        {showResults && (
          <ItineraryDisplay itinerary={itinerary} onReset={reset} />
        )}
      </main>

      {/* ── Footer ───────────────────────────────────────────────────────── */}
      <footer className="border-t border-sand py-6 mt-10">
        <div className="max-w-3xl mx-auto px-4 text-center">
          <p className="text-xs text-gray-400">
            SafHer Travel · Built for solo female travelers everywhere ·{' '}
            <span className="text-rose">♥</span> Travel safe
          </p>
        </div>
      </footer>
    </div>
  )
}

/* ── Hero section ─────────────────────────────────────────────────────────── */

function Hero() {
  const pills = [
    { icon: <Shield size={13} />, label: 'Safety-first itineraries' },
    { icon: <Star size={13} />,   label: 'AI-powered planning'    },
    { icon: <Globe size={13} />,  label: 'Anywhere in the world'  },
  ]

  return (
    <div className="text-center mb-8 animate-fade-up">
      {/* Badge */}
      <span className="inline-block text-xs font-semibold tracking-widest text-rose uppercase mb-4 bg-rose/10 px-3 py-1.5 rounded-full border border-rose/20">
        For Solo Female Travelers
      </span>

      <h1 className="font-display text-4xl sm:text-5xl font-bold text-charcoal leading-tight mb-4">
        Your journey,<br />
        <span className="text-terracotta italic">on your terms</span>
      </h1>

      <p className="text-gray-500 max-w-md mx-auto text-base leading-relaxed mb-7">
        AI-generated travel itineraries crafted with safety, budget,
        and real-world practicality for women exploring solo.
      </p>

      {/* Feature pills */}
      <div className="flex flex-wrap justify-center gap-2">
        {pills.map((pill, i) => (
          <span
            key={i}
            className="flex items-center gap-1.5 text-xs text-gray-600 bg-white border border-sand-dark rounded-full px-3 py-1.5 shadow-sm"
          >
            <span className="text-sage">{pill.icon}</span>
            {pill.label}
          </span>
        ))}
      </div>
    </div>
  )
}
