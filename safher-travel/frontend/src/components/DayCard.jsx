/**
 * DayCard – displays a single day's activities with safety tips.
 */

import React, { useState } from 'react'
import { Sun, Sunset, Moon, ShieldCheck, DollarSign, MapPin, ChevronDown } from 'lucide-react'

const TIME_CONFIG = {
  Morning:   { icon: Sun,     color: 'text-amber-500',  bg: 'bg-amber-50',  border: 'border-amber-100' },
  Afternoon: { icon: Sunset,  color: 'text-orange-500', bg: 'bg-orange-50', border: 'border-orange-100' },
  Evening:   { icon: Moon,    color: 'text-indigo-500', bg: 'bg-indigo-50', border: 'border-indigo-100' },
}

export default function DayCard({ day, plan, index }) {
  const [expanded, setExpanded] = useState(true)

  return (
    <div
      className="card overflow-hidden animate-fade-up"
      style={{ animationDelay: `${index * 0.08}s`, opacity: 0 }}
    >
      {/* Header */}
      <button
        onClick={() => setExpanded((e) => !e)}
        className="w-full flex items-center justify-between group"
      >
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-rose-light to-terracotta flex items-center justify-center text-white font-display font-bold text-sm shadow-sm">
            {day}
          </div>
          <div className="text-left">
            <p className="font-display text-lg font-semibold text-charcoal">Day {day}</p>
            <p className="text-xs text-gray-400">{plan.length} activities planned</p>
          </div>
        </div>
        <ChevronDown
          size={18}
          className={`text-gray-400 transition-transform duration-300 ${expanded ? 'rotate-180' : ''}`}
        />
      </button>

      {/* Activities */}
      {expanded && (
        <div className="mt-5 space-y-4">
          {plan.map((activity, i) => (
            <ActivityItem key={i} activity={activity} isLast={i === plan.length - 1} />
          ))}
        </div>
      )}
    </div>
  )
}

function ActivityItem({ activity, isLast }) {
  const timeCfg = TIME_CONFIG[activity.time] ?? TIME_CONFIG['Morning']
  const Icon = timeCfg.icon

  return (
    <div className="relative flex gap-4">
      {/* Timeline line */}
      {!isLast && (
        <div className="absolute left-5 top-10 bottom-0 w-px bg-sand-dark" />
      )}

      {/* Time icon */}
      <div className={`
        flex-shrink-0 w-10 h-10 rounded-xl flex items-center justify-center
        ${timeCfg.bg} ${timeCfg.border} border shadow-sm z-10
      `}>
        <Icon size={16} className={timeCfg.color} />
      </div>

      {/* Content */}
      <div className="flex-1 pb-4 min-w-0">
        <div className="flex flex-wrap items-center gap-2 mb-1">
          <span className={`text-xs font-semibold uppercase tracking-wide ${timeCfg.color}`}>
            {activity.time}
          </span>
        </div>

        <h4 className="font-display text-base font-semibold text-charcoal leading-snug">
          {activity.activity}
        </h4>

        {/* Location */}
        <p className="text-xs text-gray-500 flex items-center gap-1 mt-1">
          <MapPin size={11} className="flex-shrink-0" />
          {activity.location}
        </p>

        {/* Cost & Safety tip */}
        <div className="mt-2 flex flex-wrap gap-2">
          {activity.estimated_cost && (
            <span className="inline-flex items-center gap-1 text-xs bg-green-50 text-green-700 border border-green-100 rounded-full px-2.5 py-1 font-medium">
              <DollarSign size={11} />
              {activity.estimated_cost}
            </span>
          )}
        </div>

        {activity.safety_tip && (
          <div className="mt-2 flex gap-2 bg-rose/8 border border-rose/20 rounded-xl p-3">
            <ShieldCheck size={14} className="text-rose flex-shrink-0 mt-0.5" />
            <p className="text-xs text-rose-dark leading-relaxed">{activity.safety_tip}</p>
          </div>
        )}
      </div>
    </div>
  )
}
