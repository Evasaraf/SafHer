/**
 * useItinerary – encapsulates all state for the itinerary generation flow.
 */

import { useState, useCallback } from 'react'
import { generateItinerary } from '../services/api'

export function useItinerary() {
  const [itinerary, setItinerary] = useState(null)
  const [loading, setLoading]     = useState(false)
  const [error, setError]         = useState(null)

  const generate = useCallback(async (formData) => {
    setLoading(true)
    setError(null)
    setItinerary(null)

    try {
      const response = await generateItinerary(formData)
      setItinerary(response.data)
    } catch (err) {
      setError(err.message || 'Failed to generate itinerary')
    } finally {
      setLoading(false)
    }
  }, [])

  const reset = useCallback(() => {
    setItinerary(null)
    setError(null)
    setLoading(false)
  }, [])

  return { itinerary, loading, error, generate, reset }
}
