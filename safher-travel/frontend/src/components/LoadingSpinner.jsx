/**
 * LoadingSpinner – displayed while the AI generates the itinerary.
 */

import React, { useEffect, useState } from 'react'
import { Globe } from 'lucide-react'

const MESSAGES = [
  'Scanning the safest neighbourhoods…',
  'Curating women-friendly stays…',
  'Building a realistic schedule…',
  'Packing in local safety tips…',
  'Checking transport options…',
  'Almost there – nearly ready!',
]

export default function LoadingSpinner() {
  const [msgIdx, setMsgIdx] = useState(0)

  useEffect(() => {
    const id = setInterval(() => {
      setMsgIdx((i) => (i + 1) % MESSAGES.length)
    }, 2200)
    return () => clearInterval(id)
  }, [])

  return (
    <div className="flex flex-col items-center justify-center py-20 space-y-6 animate-fade-in">
      {/* Spinning globe */}
      <div className="relative">
        <div className="w-20 h-20 rounded-full bg-gradient-to-br from-rose-light to-terracotta flex items-center justify-center shadow-lg">
          <Globe size={36} className="text-white animate-spin-slow" />
        </div>
        {/* Orbit ring */}
        <div className="absolute inset-0 rounded-full border-2 border-rose/30 animate-ping" />
      </div>

      {/* Animated message */}
      <div className="text-center space-y-2">
        <p className="font-display text-xl text-charcoal">
          Planning your safe adventure
        </p>
        <p
          key={msgIdx}
          className="text-sm text-gray-500 animate-fade-up"
        >
          {MESSAGES[msgIdx]}
        </p>
      </div>

      {/* Progress dots */}
      <div className="flex gap-2">
        {[0, 1, 2].map((i) => (
          <span
            key={i}
            className="w-2 h-2 rounded-full bg-rose/60 animate-pulse-soft"
            style={{ animationDelay: `${i * 0.25}s` }}
          />
        ))}
      </div>
    </div>
  )
}
