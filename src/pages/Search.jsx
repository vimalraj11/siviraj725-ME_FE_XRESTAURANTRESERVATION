import { useEffect, useState } from 'react'
import { useSearchParams } from 'react-router-dom'
import SearchBar from '../components/SearchBar.jsx'
import RestaurantCard from '../components/RestaurantCard.jsx'
import OffersCarousel from '../components/OffersCarousel.jsx'
import Loader from '../components/Loader.jsx'
import { fetchRestaurants } from '../utils/api.js'

export default function Search({ onBook }) {
  const [params] = useSearchParams()
  const state = params.get('state') || ''
  const city = params.get('city') || ''

  const [restaurants, setRestaurants] = useState([])
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')
  const [searched, setSearched] = useState(false)
  const [openIndex, setOpenIndex] = useState(null)
  const [attempt, setAttempt] = useState(0)

  useEffect(() => {
    setOpenIndex(null)
    setRestaurants([])
    setError('')
    setSearched(false)
    if (!state || !city) return

    let active = true
    setLoading(true)
    fetchRestaurants(state, city)
      .then((data) => {
        if (!active) return
        setRestaurants(Array.isArray(data) ? data : [])
        setSearched(true)
      })
      .catch(() => active && setError('Could not load restaurants. Please try again.'))
      .finally(() => active && setLoading(false))
    return () => {
      active = false
    }
  }, [state, city, attempt])

  return (
    <>
      <section className="search-top">
        <div className="container">
          <div className="search-card card compact">
            {/* key remounts the bar so it reflects the current URL */}
            <SearchBar key={`${state}|${city}`} initialState={state} initialCity={city} />
          </div>
        </div>
      </section>

      <section className="section results">
        <div className="container results-grid">
          <div className="results-list">
            {loading && (
              <Loader
                text="Finding restaurants..."
                subtext="This can take up to a minute while our servers wake up."
              />
            )}

            {error && (
              <div className="alert">
                {error}{' '}
                <button type="button" className="btn btn-outline" onClick={() => setAttempt((n) => n + 1)}>
                  Retry
                </button>
              </div>
            )}

            {!loading && !error && !state && (
              <div className="empty card">
                Choose a state and city above to see restaurants available for reservation.
              </div>
            )}

            {!loading && searched && (
              <>
                <h1 className="results-heading">
                  {`${restaurants.length} restaurants available in ${city}`}
                </h1>
                <span className="muted results-sub">
                  Book your table with no reservation fee. Reserve up to 7 days ahead.
                </span>
                {restaurants.map((r, i) => (
                  <RestaurantCard
                    key={`${r.restaurantName}-${i}`}
                    restaurant={r}
                    isOpen={openIndex === i}
                    onToggle={() => setOpenIndex(openIndex === i ? null : i)}
                    onBook={onBook}
                  />
                ))}
              </>
            )}
          </div>

          <aside className="results-aside">
            <div className="card promo">
              <span className="promo-title">This week&apos;s offers</span>
              <OffersCarousel />
            </div>
          </aside>
        </div>
      </section>
    </>
  )
}
