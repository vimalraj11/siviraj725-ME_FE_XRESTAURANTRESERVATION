import { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import Dropdown from './Dropdown.jsx'
import { fetchCities, fetchStates } from '../utils/api.js'

export default function SearchBar({ initialState = '', initialCity = '' }) {
  const navigate = useNavigate()
  const [states, setStates] = useState([])
  const [cities, setCities] = useState([])
  const [selectedState, setSelectedState] = useState(initialState)
  const [selectedCity, setSelectedCity] = useState(initialCity)
  const [loadingStates, setLoadingStates] = useState(false)
  const [loadingCities, setLoadingCities] = useState(false)
  const [error, setError] = useState('')

  // Fetch all states once on load.
  useEffect(() => {
    let active = true
    setLoadingStates(true)
    fetchStates()
      .then((data) => active && setStates(Array.isArray(data) ? data : []))
      .catch(() => active && setError('Could not load states. Please try again.'))
      .finally(() => active && setLoadingStates(false))
    return () => {
      active = false
    }
  }, [])

  // Fetch cities whenever the selected state changes.
  useEffect(() => {
    setCities([])
    if (!selectedState) return
    let active = true
    setLoadingCities(true)
    fetchCities(selectedState)
      .then((data) => active && setCities(Array.isArray(data) ? data : []))
      .catch(() => active && setError('Could not load cities. Please try again.'))
      .finally(() => active && setLoadingCities(false))
    return () => {
      active = false
    }
  }, [selectedState])

  const onStateChange = (state) => {
    if (state !== selectedState) setSelectedCity('')
    setSelectedState(state)
    setError('')
  }

  const onSubmit = (e) => {
    e.preventDefault()
    if (!selectedState || !selectedCity) {
      setError('Please select both a state and a city.')
      return
    }
    setError('')
    navigate(
      `/search?state=${encodeURIComponent(selectedState)}&city=${encodeURIComponent(selectedCity)}`,
    )
  }

  return (
    <form className="search-bar" onSubmit={onSubmit}>
      <Dropdown
        id="state"
        placeholder="State"
        options={states}
        value={selectedState}
        onChange={onStateChange}
        loading={loadingStates}
      />
      <Dropdown
        id="city"
        placeholder="City"
        options={cities}
        value={selectedCity}
        onChange={(city) => {
          setSelectedCity(city)
          setError('')
        }}
        disabled={!selectedState}
        loading={loadingCities}
      />
      <button type="submit" id="searchBtn" className="btn btn-primary btn-search">
        <svg viewBox="0 0 24 24" width="18" height="18" aria-hidden="true">
          <path
            fill="currentColor"
            d="M15.5 14h-.8l-.3-.3A6.5 6.5 0 1 0 14 15.5l.3.3v.8l5 5 1.5-1.5-5-5zm-6 0a4.5 4.5 0 1 1 0-9 4.5 4.5 0 0 1 0 9z"
          />
        </svg>
        Search
      </button>
      {error && <span className="form-error">{error}</span>}
    </form>
  )
}
