/**
 * StaySuggestions – renders accommodation cards with safety features.
 */

import React from 'react'
import { Home, Star, ShieldCheck, DollarSign } from 'lucide-react'

const TYPE_STYLES = {
  hostel:     { bg: 'bg-blue-50',   text: 'text-blue-700',   label: 'Hostel' },
  hotel:      { bg: 'bg-purple-50', text: 'text-purple-700', label: 'Hotel' },
  guesthouse: { bg: 'bg-amber-50',  text: 'text-amber-700',  label: 'Guesthouse' },
  airbnb:     { bg: 'bg-pink-50',   text: 'text-pink-700',   label: 'Airbnb' },
}

export default function StaySuggestions({ suggestions }) {
  if (!suggestions?.length) return null

  return (
    <section className="space-y-4">
      <SectionHeader icon={<Home size={20} className="text-rose" />} title="Where to Stay" />

      <div className="grid gap-4 sm:grid-cols-2">
        {suggestions.map((stay, i) => (
          <StayCard key={i} stay={stay} index={i} />
        ))}
      </div>
    </section>
  )
}

function StayCard({ stay, index }) {
  const type = stay.type?.toLowerCase() ?? 'hotel'
  const style = TYPE_STYLES[type] ?? TYPE_STYLES.hotel

  return (
    <div
      className="card hover:shadow-md transition-shadow duration-200 animate-fade-up"
      style={{ animationDelay: `${index * 0.1}s`, opacity: 0 }}
    >
      {/* Header row */}
      <div className="flex items-start justify-between gap-3 mb-3">
        <div className="flex-1 min-w-0">
          <p className="font-display font-semibold text-charcoal truncate">{stay.name}</p>
        </div>
        <span className={`flex-shrink-0 text-xs font-semibold px-2.5 py-1 rounded-full ${style.bg} ${style.text}`}>
          {style.label}
        </span>
      </div>

      {/* Price */}
      <div className="flex items-center gap-1.5 text-sm text-gray-600 mb-3">
        <DollarSign size={14} className="text-green-600" />
        <span>{stay.price_range}</span>
      </div>

      {/* Safety features */}
      <div className="bg-rose/8 border border-rose/20 rounded-xl p-3 flex gap-2">
        <ShieldCheck size={14} className="text-rose flex-shrink-0 mt-0.5" />
        <p className="text-xs text-rose-dark leading-relaxed">{stay.safety_features}</p>
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
