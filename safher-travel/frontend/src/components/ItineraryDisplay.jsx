/**
 * ItineraryDisplay – renders the full AI-generated itinerary.
 * Composes all sub-components into a coherent layout.
 */

import React from 'react'
import {
  MapPin, ArrowLeft, Backpack, Train, ShieldCheck
} from 'lucide-react'

import SafetyBadge    from './SafetyBadge'
import BudgetSummary  from './BudgetSummary'
import DayCard        from './DayCard'
import StaySuggestions from './StaySuggestions'
import EmergencyInfo  from './EmergencyInfo'
import TipsList       from './TipsList'

export default function ItineraryDisplay({ itinerary, onReset }) {
  if (!itinerary) return null

  return (
    <div className="space-y-8 animate-fade-up">

      {/* ── Hero header ──────────────────────────────────────────────────── */}
      <div className="card bg-gradient-to-br from-rose-light/30 to-sand/50 border-rose/20">
        <div className="flex flex-wrap items-start justify-between gap-4">
          <div>
            <p className="text-xs font-semibold text-rose uppercase tracking-widest mb-1">
              Your Solo Journey
            </p>
            <h1 className="font-display text-3xl font-bold text-charcoal leading-tight">
              {itinerary.destination}
            </h1>
            <p className="flex items-center gap-1.5 text-sm text-gray-500 mt-2">
              <MapPin size={14} className="text-rose" />
              {itinerary.itinerary?.length} day{itinerary.itinerary?.length !== 1 ? 's' : ''} planned
            </p>
          </div>
          <SafetyBadge rating={itinerary.safety_rating} size="lg" />
        </div>

        {/* Safety notes */}
        {itinerary.safety_notes && (
          <div className="mt-4 flex gap-3 bg-white/70 rounded-xl p-3 border border-rose/20">
            <ShieldCheck size={16} className="text-rose flex-shrink-0 mt-0.5" />
            <p className="text-sm text-gray-600 leading-relaxed">{itinerary.safety_notes}</p>
          </div>
        )}
      </div>

      {/* ── Budget summary ────────────────────────────────────────────────── */}
      <BudgetSummary estimate={itinerary.total_budget_estimate} />

      {/* ── Day-by-day itinerary ──────────────────────────────────────────── */}
      {itinerary.itinerary?.length > 0 && (
        <section className="space-y-4">
          <SectionHeader icon={<MapPin size={20} className="text-rose" />} title="Day-by-Day Plan" />
          {itinerary.itinerary.map((dayPlan, i) => (
            <DayCard
              key={dayPlan.day}
              day={dayPlan.day}
              plan={dayPlan.plan}
              index={i}
            />
          ))}
        </section>
      )}

      {/* ── Stays ─────────────────────────────────────────────────────────── */}
      <StaySuggestions suggestions={itinerary.stay_suggestions} />

      {/* ── Tips grid ─────────────────────────────────────────────────────── */}
      <div className="grid gap-4 sm:grid-cols-2">
        <TipsList
          title="Packing Tips"
          icon={<Backpack size={20} />}
          tips={itinerary.packing_tips}
          accentColor="text-sage"
        />
        <TipsList
          title="Transport Tips"
          icon={<Train size={20} />}
          tips={itinerary.transport_tips}
          accentColor="text-rose"
        />
      </div>

      {/* ── Emergency info ────────────────────────────────────────────────── */}
      <EmergencyInfo info={itinerary.emergency_info} />

      {/* ── Reset button ──────────────────────────────────────────────────── */}
      <div className="flex justify-center pt-4">
        <button
          onClick={onReset}
          className="flex items-center gap-2 text-sm text-gray-500 hover:text-terracotta transition-colors duration-150 group"
        >
          <ArrowLeft size={16} className="group-hover:-translate-x-1 transition-transform duration-150" />
          Plan another trip
        </button>
      </div>
    </div>
  )
}

function SectionHeader({ icon, title }) {
  return (
    <div className="flex items-center gap-2">
      {icon}
      <h2 className="font-display text-xl font-semibold text-charcoal">{title}</h2>
    </div>
  )
}
