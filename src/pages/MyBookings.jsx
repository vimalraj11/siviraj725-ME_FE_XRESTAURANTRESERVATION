import { useState } from 'react'
import { Link, useLocation } from 'react-router-dom'
import { Rating } from '../components/RestaurantCard.jsx'
import OffersCarousel from '../components/OffersCarousel.jsx'
import { formatLongDate } from '../utils/bookings.js'

export default function MyBookings({ bookings, onCancel }) {
  const [query, setQuery] = useState('')
  const justBooked = useLocation().state?.justBooked

  const filtered = bookings.filter((b) =>
    `${b.restaurantName} ${b.city} ${b.state}`.toLowerCase().includes(query.trim().toLowerCase()),
  )

  return (
    <>
      <section className="page-banner">
        <div className="container banner-inner">
          <h1>My Bookings</h1>
          <label className="banner-search">
            <span className="sr-only">Search bookings</span>
            <input
              type="search"
              placeholder="Search by restaurant or city"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
            />
          </label>
        </div>
      </section>

      <section className="section results">
        <div className="container results-grid">
          <div className="results-list">
            {justBooked && (
              <div className="booking-success" role="status">
                Table booked at {justBooked.restaurantName} on {formatLongDate(justBooked.bookingDate)}{' '}
                at {justBooked.bookingTime}.
              </div>
            )}
            {bookings.length === 0 && (
              <div className="empty card">
                You have no reservations yet. <Link to="/">Find a restaurant</Link> to book a FREE
                table.
              </div>
            )}
            {bookings.length > 0 && filtered.length === 0 && (
              <div className="empty card">No bookings match your search.</div>
            )}

            {filtered.map((b) => (
              <article className="card restaurant-card" key={b.id}>
                <div className="restaurant-main">
                  <div className="restaurant-thumb" aria-hidden="true">
                    <svg viewBox="0 0 24 24" width="44" height="44" fill="currentColor">
                      <path d="M7 2v9a3 3 0 0 0 2 2.8V22h2v-8.2A3 3 0 0 0 13 11V2h-1.5v7h-1V2h-1v7h-1V2zM17 2c-1.7 0-3 2.7-3 7v5h2v8h2V2z" />
                    </svg>
                  </div>
                  <div className="restaurant-info">
                    <h3>{b.restaurantName}</h3>
                    <span className="restaurant-loc">
                      {b.city}, {b.state}
                    </span>
                    <span className="restaurant-address">{b.address}</span>
                    {b.rating != null &&<Rating value={b.rating} />}
                  </div>
                  <div className="restaurant-action booking-when">
                    <div className="when-badges">
                      <span className="badge badge-time">{b.bookingTime}</span>
                      <span className="badge badge-date">{formatLongDate(b.bookingDate)}</span>
                    </div>
                    <button type="button" className="btn btn-ghost" onClick={() => onCancel(b.id)}>
                      Cancel
                    </button>
                  </div>
                </div>
              </article>
            ))}
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
