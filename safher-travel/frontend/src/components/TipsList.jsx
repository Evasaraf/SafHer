/**
 * TipsList – reusable component for packing tips and transport tips.
 */

import React from 'react'
import { CheckCircle } from 'lucide-react'

export default function TipsList({ title, icon, tips, accentColor = 'text-sage' }) {
  if (!tips?.length) return null

  return (
    <section className="card">
      <div className="flex items-center gap-2 mb-4">
        <span className={accentColor}>{icon}</span>
        <h2 className="font-display text-xl font-semibold text-charcoal">{title}</h2>
      </div>
      <ul className="space-y-3">
        {tips.map((tip, i) => (
          <li
            key={i}
            className="flex gap-3 animate-fade-up"
            style={{ animationDelay: `${i * 0.06}s`, opacity: 0 }}
          >
            <CheckCircle size={16} className={`flex-shrink-0 mt-0.5 ${accentColor}`} />
            <p className="text-sm text-gray-600 leading-relaxed">{tip}</p>
          </li>
        ))}
      </ul>
    </section>
  )
}
