/**
 * BudgetSummary – shows total budget estimate at a glance.
 */

import React from 'react'
import { Wallet, TrendingUp } from 'lucide-react'

export default function BudgetSummary({ estimate }) {
  if (!estimate) return null

  return (
    <div className="bg-gradient-to-r from-sage/20 to-sage/10 border border-sage/30 rounded-2xl p-5 flex items-center gap-4">
      <div className="w-12 h-12 rounded-xl bg-sage flex items-center justify-center shadow-sm flex-shrink-0">
        <Wallet size={22} className="text-white" />
      </div>
      <div>
        <p className="text-xs font-semibold text-sage-dark uppercase tracking-wide mb-0.5">
          Estimated Total Budget
        </p>
        <p className="font-display text-2xl font-bold text-charcoal">{estimate}</p>
      </div>
      <TrendingUp size={20} className="text-sage ml-auto flex-shrink-0 opacity-40" />
    </div>
  )
}
