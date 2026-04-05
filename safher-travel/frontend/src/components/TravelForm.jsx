/**
 * TravelForm – collects destination, days, budget, and preferences.
 */

import React, { useState } from 'react'
import {
  MapPin, Calendar, Wallet, Heart, Sparkles, ChevronDown
} from 'lucide-react'

const BUDGET_OPTIONS = [
  { label: 'Budget  (<$50/day)', value: 'Budget (under $50 per day)' },
  { label: 'Mid-Range ($50–150/day)', value: 'Mid-range ($50–$150 per day)' },
  { label: 'Comfort ($150–300/day)', value: 'Comfort ($150–$300 per day)' },
  { label: 'Luxury (>$300/day)', value: 'Luxury (over $300 per day)' },
]

const PREFERENCE_TAGS = [
  'Museums & Art', 'Street Food', 'Nightlife', 'Nature Hikes',
  'Spa & Wellness', 'Shopping', 'Photography', 'Vegetarian',
  'LGBTQ+ Friendly', 'Accessibility Needs', 'Beach', 'Culture',
]

export default function TravelForm({ onSubmit, loading }) {
  const [form, setForm] = useState({
    destination: '',
    days: '',
    budget: '',
    preferences: '',
  })
  const [selectedTags, setSelectedTags] = useState([])
  const [errors, setErrors] = useState({})

  /* ── Handlers ──────────────────────────────────────────────────────────── */

  const handleChange = (e) => {
    const { name, value } = e.target
    setForm((prev) => ({ ...prev, [name]: value }))
    if (errors[name]) setErrors((prev) => ({ ...prev, [name]: '' }))
  }

  const toggleTag = (tag) => {
    setSelectedTags((prev) =>
      prev.includes(tag) ? prev.filter((t) => t !== tag) : [...prev, tag]
    )
  }

  const validate = () => {
    const errs = {}
    if (!form.destination.trim()) errs.destination = 'Please enter a destination'
    if (!form.days || form.days < 1 || form.days > 30)
      errs.days = 'Enter a number between 1 and 30'
    if (!form.budget) errs.budget = 'Please select a budget range'
    return errs
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    const errs = validate()
    if (Object.keys(errs).length) { setErrors(errs); return }

    const combinedPrefs = [
      ...selectedTags,
      form.preferences.trim(),
    ].filter(Boolean).join(', ')

    onSubmit({
      destination: form.destination.trim(),
      days: Number(form.days),
      budget: form.budget,
      preferences: combinedPrefs || 'No specific preferences',
    })
  }

  /* ── Render ────────────────────────────────────────────────────────────── */

  return (
    <form onSubmit={handleSubmit} className="space-y-7" noValidate>

      {/* Destination */}
      <Field
        label="Where are you going?"
        icon={<MapPin size={18} className="text-rose" />}
        error={errors.destination}
      >
        <input
          type="text"
          name="destination"
          value={form.destination}
          onChange={handleChange}
          placeholder="e.g. Kyoto, Japan"
          className={inputClass(errors.destination)}
          disabled={loading}
          autoComplete="off"
        />
      </Field>

      {/* Days */}
      <Field
        label="How many days?"
        icon={<Calendar size={18} className="text-rose" />}
        error={errors.days}
      >
        <input
          type="number"
          name="days"
          value={form.days}
          onChange={handleChange}
          placeholder="e.g. 7"
          min={1}
          max={30}
          className={inputClass(errors.days)}
          disabled={loading}
        />
      </Field>

      {/* Budget */}
      <Field
        label="What's your budget style?"
        icon={<Wallet size={18} className="text-rose" />}
        error={errors.budget}
      >
        <div className="relative">
          <select
            name="budget"
            value={form.budget}
            onChange={handleChange}
            className={`${inputClass(errors.budget)} appearance-none pr-10 cursor-pointer`}
            disabled={loading}
          >
            <option value="">Select a budget range…</option>
            {BUDGET_OPTIONS.map((opt) => (
              <option key={opt.value} value={opt.value}>{opt.label}</option>
            ))}
          </select>
          <ChevronDown
            size={16}
            className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 pointer-events-none"
          />
        </div>
      </Field>

      {/* Preference tags */}
      <div>
        <label className="block text-sm font-medium text-charcoal mb-2 flex items-center gap-2">
          <Heart size={18} className="text-rose" />
          What do you love? <span className="text-gray-400 font-normal">(optional)</span>
        </label>
        <div className="flex flex-wrap gap-2">
          {PREFERENCE_TAGS.map((tag) => (
            <button
              key={tag}
              type="button"
              onClick={() => toggleTag(tag)}
              disabled={loading}
              className={`
                text-xs px-3 py-1.5 rounded-full border transition-all duration-150 font-medium
                ${selectedTags.includes(tag)
                  ? 'bg-rose/20 border-rose text-rose-dark'
                  : 'bg-white border-sand-dark text-gray-500 hover:border-rose/50 hover:text-rose'}
              `}
            >
              {tag}
            </button>
          ))}
        </div>
      </div>

      {/* Free-text preferences */}
      <Field
        label="Anything else we should know?"
        icon={<Sparkles size={18} className="text-rose" />}
      >
        <textarea
          name="preferences"
          value={form.preferences}
          onChange={handleChange}
          placeholder="Dietary restrictions, mobility needs, must-see spots, travel style…"
          rows={3}
          className={`${inputClass()} resize-none`}
          disabled={loading}
        />
      </Field>

      {/* Submit */}
      <button
        type="submit"
        disabled={loading}
        className="w-full btn-primary flex items-center justify-center gap-2 text-base py-4"
      >
        {loading ? (
          <>
            <span className="w-5 h-5 border-2 border-white/40 border-t-white rounded-full animate-spin" />
            Crafting your safe itinerary…
          </>
        ) : (
          <>
            <Sparkles size={18} />
            Plan My Trip
          </>
        )}
      </button>
    </form>
  )
}

/* ── Sub-components ────────────────────────────────────────────────────────── */

function Field({ label, icon, error, children }) {
  return (
    <div>
      <label className="block text-sm font-medium text-charcoal mb-2 flex items-center gap-2">
        {icon}
        {label}
      </label>
      {children}
      {error && (
        <p className="mt-1.5 text-xs text-red-500 flex items-center gap-1">
          <span>⚠</span> {error}
        </p>
      )}
    </div>
  )
}

function inputClass(error) {
  return `
    w-full bg-sand-light border rounded-xl px-4 py-3 text-charcoal text-sm
    placeholder:text-gray-400 outline-none transition-all duration-150
    focus:bg-white focus:ring-2
    ${error
      ? 'border-red-300 focus:ring-red-200'
      : 'border-sand-dark focus:border-rose focus:ring-rose/20'}
  `
}
