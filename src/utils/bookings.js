export const STORAGE_KEY = 'bookings'

export function loadBookings() {
  try {
    const data = JSON.parse(localStorage.getItem(STORAGE_KEY))
    if (!Array.isArray(data)) return []
    // Ignore malformed entries and make sure every booking has a stable id.
    return data
      .filter((b) => b && typeof b === 'object')
      .map((b, i) => (b.id ? b : { ...b, id: `legacy-${i}-${b.restaurantName ?? ''}` }))
  } catch {
    return []
  }
}

export function saveBookings(bookings) {
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(bookings))
    return true
  } catch {
    return false
  }
}

/** Local YYYY-MM-DD (avoids UTC shift from toISOString). */
export function toDateKey(date) {
  const y = date.getFullYear()
  const m = String(date.getMonth() + 1).padStart(2, '0')
  const d = String(date.getDate()).padStart(2, '0')
  return `${y}-${m}-${d}`
}

export function fromDateKey(key) {
  const [y, m, d] = key.split('-').map(Number)
  return new Date(y, m - 1, d)
}

export const MAX_DAYS_AHEAD = 7

/** Today through 7 days ahead, inclusive (8 dates). */
export function getBookableDates() {
  const today = new Date()
  today.setHours(0, 0, 0, 0)
  return Array.from({ length: MAX_DAYS_AHEAD + 1 }, (_, i) => {
    const d = new Date(today)
    d.setDate(today.getDate() + i)
    return d
  })
}

export function isBookableDate(key) {
  return getBookableDates().some((d) => toDateKey(d) === key)
}

export function formatDayLabel(date, index) {
  if (index === 0) return 'Today'
  if (index === 1) return 'Tomorrow'
  return date.toLocaleDateString('en-US', { weekday: 'short', day: 'numeric', month: 'short' })
}

export function formatLongDate(key) {
  if (typeof key !== 'string' || !key) return ''
  const date = /^\d{4}-\d{2}-\d{2}$/.test(key) ? fromDateKey(key) : new Date(key)
  if (Number.isNaN(date.getTime())) return key
  return date.toLocaleDateString('en-US', {
    weekday: 'short',
    day: 'numeric',
    month: 'short',
    year: 'numeric',
  })
}

export const TIME_SLOTS = {
  Morning: ['11:00 AM', '11:30 AM'],
  Afternoon: ['12:00 PM', '12:30 PM', '01:30 PM', '02:00 PM', '02:30 PM'],
  Evening: ['06:00 PM', '06:30 PM', '07:00 PM', '07:30 PM', '08:30 PM'],
}

/** Time slots available for a given date. */
export function getSlotsForDate() {
  const result = {}
  for (const [period, slots] of Object.entries(TIME_SLOTS)) result[period] = [...slots]
  return result
}

export function countSlots(key) {
  return Object.values(getSlotsForDate(key)).reduce((n, s) => n + s.length, 0)
}
