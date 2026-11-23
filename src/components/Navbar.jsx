import { useState } from 'react'
import { Link, NavLink, useNavigate } from 'react-router-dom'

const LINKS = [
  { to: '/', label: 'Find Restaurants' },
  { to: '/search', label: 'Locations' },
  { to: '/my-bookings', label: 'Reservations' },
  { href: '/#offers', label: 'Offers' },
  { href: '/#faq', label: 'FAQs' },
]

export default function Navbar() {
  const [open, setOpen] = useState(false)
  const close = () => setOpen(false)
  const navigate = useNavigate()

  return (
    <header className="header">
      <div className="topbar">
        Reserve a table at top-rated restaurants across the USA. Reservations are always FREE.
      </div>
      <nav className="navbar container">
        <Link to="/" className="brand" onClick={close}>
          <span className="brand-icon" aria-hidden="true">
            <svg viewBox="0 0 24 24" width="20" height="20" fill="currentColor">
              <path d="M7 2v9a3 3 0 0 0 2 2.8V22h2v-8.2A3 3 0 0 0 13 11V2h-1.5v7h-1V2h-1v7h-1V2zM17 2c-1.7 0-3 2.7-3 7v5h2v8h2V2z" />
            </svg>
          </span>
          XRestaurant
        </Link>

        <button
          type="button"
          className="nav-toggle"
          aria-label="Toggle navigation"
          aria-expanded={open}
          onClick={() => setOpen((o) => !o)}
        >
          <span />
          <span />
          <span />
        </button>

        <div className={`nav-links ${open ? 'open' : ''}`}>
          {LINKS.map((l) =>
            l.href ? (
              <a key={l.label} href={l.href} className="nav-link" onClick={close}>
                {l.label}
              </a>
            ) : (
              <NavLink
                key={l.label}
                to={l.to}
                end
                className={({ isActive }) => `nav-link ${isActive ? 'active' : ''}`}
                onClick={close}
              >
                {l.label}
              </NavLink>
            ),
          )}
          <button
            type="button"
            className="btn btn-primary"
            onClick={() => {
              close()
              navigate('/my-bookings')
            }}
          >
            My Bookings
          </button>
        </div>
      </nav>
    </header>
  )
}
