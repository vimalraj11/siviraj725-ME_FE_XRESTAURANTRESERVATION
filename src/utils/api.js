const BASE_URL = 'https://restaurantdata.onrender.com'

async function getJSON(url) {
  const res = await fetch(url)
  if (!res.ok) throw new Error(`Request failed (${res.status})`)
  return res.json()
}

export const fetchStates = () => getJSON(`${BASE_URL}/states`)

export const fetchCities = (state) =>
  getJSON(`${BASE_URL}/cities/${encodeURIComponent(state)}`)

export const fetchRestaurants = (state, city) =>
  getJSON(
    `${BASE_URL}/restaurants?state=${encodeURIComponent(state)}&city=${encodeURIComponent(city)}`,
  )
