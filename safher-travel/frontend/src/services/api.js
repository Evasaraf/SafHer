/**
 * API Service – all communication with the SafHer FastAPI backend.
 */

import axios from 'axios'

// ── Axios instance ────────────────────────────────────────────────────────────
const api = axios.create({
  baseURL: import.meta.env.VITE_API_BASE_URL || '/api/v1',
  headers: { 'Content-Type': 'application/json' },
  timeout: 120_000, // 2 minutes – AI can be slow
})

// ── Response interceptor – normalize errors ───────────────────────────────────
api.interceptors.response.use(
  (res) => res,
  (err) => {
    const message =
      err.response?.data?.detail ||
      err.response?.data?.error ||
      err.message ||
      'An unexpected error occurred'
    return Promise.reject(new Error(message))
  }
)

// ── API calls ─────────────────────────────────────────────────────────────────

/**
 * Generate a travel itinerary.
 * @param {Object} payload – { destination, days, budget, preferences }
 * @returns {Object} API success response with `data` field
 */
export async function generateItinerary(payload) {
  const { data } = await api.post('/generate-itinerary', payload)
  return data
}

export default api
