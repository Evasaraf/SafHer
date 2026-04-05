/**
 * EmergencyInfo – critical safety numbers and notes section.
 */

import React from 'react'
import { Phone, AlertTriangle, Users, Info } from 'lucide-react'

export default function EmergencyInfo({ info }) {
  if (!info) return null

  return (
    <section>
      <div className="flex items-center gap-2 mb-4">
        <AlertTriangle size={20} className="text-terracotta" />
        <h2 className="font-display text-xl font-semibold text-charcoal">Emergency Information</h2>
      </div>

      <div className="bg-gradient-to-br from-red-50 to-rose/10 border border-red-200 rounded-2xl p-5 space-y-4">

        {/* Contact cards */}
        <div className="grid gap-3 sm:grid-cols-2">
          <ContactCard
            icon={<Phone size={16} className="text-red-600" />}
            label="Local Police"
            value={info.local_police}
            bg="bg-red-50 border-red-100"
            textColor="text-red-700"
          />
          <ContactCard
            icon={<Users size={16} className="text-rose" />}
            label="Women's Helpline"
            value={info.women_helpline}
            bg="bg-rose/10 border-rose/20"
            textColor="text-rose-dark"
          />
        </div>

        {/* Notes */}
        {info.notes && (
          <div className="flex gap-3 bg-white/70 rounded-xl p-3 border border-red-100">
            <Info size={16} className="text-gray-500 flex-shrink-0 mt-0.5" />
            <p className="text-sm text-gray-600 leading-relaxed">{info.notes}</p>
          </div>
        )}
      </div>
    </section>
  )
}

function ContactCard({ icon, label, value, bg, textColor }) {
  return (
    <div className={`flex items-start gap-3 rounded-xl p-3 border ${bg}`}>
      <div className="flex-shrink-0 w-8 h-8 rounded-lg bg-white/80 flex items-center justify-center shadow-sm">
        {icon}
      </div>
      <div className="min-w-0">
        <p className="text-xs font-medium text-gray-500 uppercase tracking-wide">{label}</p>
        <p className={`text-sm font-semibold ${textColor} break-words`}>{value}</p>
      </div>
    </div>
  )
}
