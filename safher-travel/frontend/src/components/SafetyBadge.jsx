/**
 * SafetyBadge – visual indicator for destination safety rating.
 */

import React from 'react'
import { Shield, ShieldAlert, ShieldCheck } from 'lucide-react'

const CONFIG = {
  High:   { icon: ShieldCheck, cls: 'badge-safety-high',   label: 'High Safety' },
  Medium: { icon: Shield,      cls: 'badge-safety-medium', label: 'Moderate Safety' },
  Low:    { icon: ShieldAlert, cls: 'badge-safety-low',    label: 'Extra Caution' },
}

export default function SafetyBadge({ rating, size = 'md' }) {
  const cfg = CONFIG[rating] ?? CONFIG['Medium']
  const Icon = cfg.icon

  const sizeClasses = {
    sm: 'text-xs px-2.5 py-1 gap-1',
    md: 'text-sm px-3.5 py-1.5 gap-1.5',
    lg: 'text-base px-4 py-2 gap-2',
  }

  return (
    <span
      className={`
        inline-flex items-center font-semibold rounded-full border
        ${cfg.cls} ${sizeClasses[size]}
      `}
    >
      <Icon size={size === 'lg' ? 18 : 14} />
      {cfg.label}
    </span>
  )
}
