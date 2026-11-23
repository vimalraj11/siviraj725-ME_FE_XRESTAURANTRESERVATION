import { useState } from 'react'
import { Link } from 'react-router-dom'
import SearchBar from '../components/SearchBar.jsx'
import OffersCarousel from '../components/OffersCarousel.jsx'

const CATEGORIES = ['Fine Dining', 'Cafes', 'Family Friendly', 'Rooftop', 'Fast Casual']

const STEPS = [
  { n: '01', title: 'Pick a location', text: 'Choose a state and city to see restaurants near you.' },
  { n: '02', title: 'Choose a restaurant', text: 'Compare ratings and addresses at a glance.' },
  { n: '03', title: 'Reserve a slot', text: 'Pick a date within the next week and a time that suits you.' },
]

const FAQS = [
  {
    q: 'Is booking a table really free?',
    a: 'Yes. Reservations through XRestaurant never carry a booking fee.',
  },
  {
    q: 'How far ahead can I book?',
    a: 'You can reserve a table for today or any day up to 7 days ahead.',
  },
  {
    q: 'Where can I see my reservations?',
    a: 'Open My Bookings from the navigation bar to see every table you have reserved.',
  },
  {
    q: 'Why does the search take a while sometimes?',
    a: 'Our restaurant data service may need up to a minute to wake up on the first request.',
  },
]

export default function Home() {
  const [openFaq, setOpenFaq] = useState(0)

  return (
    <>
      <section className="hero">
        <div className="container hero-inner">
          <div className="hero-copy">
            <span className="eyebrow">Skip the wait</span>
            <span className="hero-title">
              Find &amp; reserve a table at <span className="accent">great restaurants</span>
            </span>
            <span className="hero-text">
              Explore restaurants across the USA and book a FREE reservation in a few clicks.
            </span>
            <Link to="/my-bookings" className="btn btn-outline">
              View my reservations
            </Link>
          </div>
          <div className="hero-art" aria-hidden="true">
            <div className="plate">
              <div className="plate-inner" />
            </div>
            <div className="hero-badge badge-1">4.8 ★ average rating</div>
            <div className="hero-badge badge-2">$0 booking fee</div>
          </div>
        </div>

        <div className="container">
          <div className="search-card card">
            <SearchBar />
            <span className="search-hint">You may be looking for</span>
            <div className="chips">
              {CATEGORIES.map((c) => (
                <span key={c} className="chip">
                  {c}
                </span>
              ))}
            </div>
          </div>
        </div>
      </section>

      <section className="section" id="offers">
        <div className="container">
          <span className="section-title">Offers this week</span>
          <OffersCarousel />
        </div>
      </section>

      <section className="section section-alt">
        <div className="container">
          <span className="section-title">How it works</span>
          <div className="steps">
            {STEPS.map((s) => (
              <div className="card step" key={s.n}>
                <span className="step-n">{s.n}</span>
                <span className="step-title">{s.title}</span>
                <span className="muted">{s.text}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="section" id="faq">
        <div className="container faq">
          <span className="section-title">Frequently asked questions</span>
          {FAQS.map((f, i) => (
            <div className={`faq-item ${openFaq === i ? 'open' : ''}`} key={f.q}>
              <button
                type="button"
                className="faq-q"
                aria-expanded={openFaq === i}
                onClick={() => setOpenFaq(openFaq === i ? -1 : i)}
              >
                {f.q}
                <span aria-hidden="true">{openFaq === i ? '−' : '+'}</span>
              </button>
              {openFaq === i && <div className="faq-a">{f.a}</div>}
            </div>
          ))}
        </div>
      </section>
    </>
  )
}
