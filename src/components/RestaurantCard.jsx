import BookingPanel from './BookingPanel.jsx'

export function Rating({ value }) {
  return (
    <span className="rating" title={`Rated ${value} out of 5`}>
      <svg viewBox="0 0 24 24" width="14" height="14" aria-hidden="true">
        <path fill="currentColor" d="M12 17.3 18.2 21l-1.6-7L22 9.2l-7.2-.6L12 2 9.2 8.6 2 9.2 7.4 14l-1.6 7z" />
      </svg>
      {value}
    </span>
  )
}

export default function RestaurantCard({ restaurant, isOpen, onToggle, onBook }) {
  const { restaurantName, address, city, state, rating } = restaurant

  return (
    <article className={`card restaurant-card ${isOpen ? 'expanded' : ''}`}>
      <div className="restaurant-main">
        <div className="restaurant-thumb" aria-hidden="true">
          <svg viewBox="0 0 24 24" width="44" height="44" fill="currentColor">
            <path d="M7 2v9a3 3 0 0 0 2 2.8V22h2v-8.2A3 3 0 0 0 13 11V2h-1.5v7h-1V2h-1v7h-1V2zM17 2c-1.7 0-3 2.7-3 7v5h2v8h2V2z" />
          </svg>
        </div>

        <div className="restaurant-info">
          <h3>{restaurantName}</h3>
          <span className="restaurant-loc">
            {city}, {state}
          </span>
          <span className="restaurant-address">{address}</span>
          <div className="restaurant-meta">
            <span className="free-tag">FREE</span>
            <span className="muted">Table reservation fee waived</span>
          </div>
          <Rating value={rating} />
        </div>

        <div className="restaurant-action">
          <span className="available">Available Today</span>
          <button type="button" className="btn btn-primary" onClick={onToggle}>
            Book FREE Reservation
          </button>
        </div>
      </div>

      {isOpen && <BookingPanel restaurant={restaurant} onBook={onBook} />}
    </article>
  )
}
