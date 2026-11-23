import { useState } from 'react'
import { Link } from 'react-router-dom'
import { Swiper, SwiperSlide } from 'swiper/react'
import { Navigation } from 'swiper/modules'
import 'swiper/css'
import {
  countSlots,
  formatDayLabel,
  formatLongDate,
  getBookableDates,
  getSlotsForDate,
  isBookableDate,
  toDateKey,
} from '../utils/bookings.js'

export default function BookingPanel({ restaurant, onBook }) {
  // Recomputed every render so the window stays correct if the page is left open past midnight.
  const dates = getBookableDates()
  const minKey = toDateKey(dates[0])
  const maxKey = toDateKey(dates[dates.length - 1])

  const [selectedDate, setSelectedDate] = useState(minKey)
  const [error, setError] = useState('')
  const [confirmed, setConfirmed] = useState(null)
  // Nav buttons live outside the Swiper so they never cover the date tabs.
  const [prevEl, setPrevEl] = useState(null)
  const [nextEl, setNextEl] = useState(null)

  const slots = getSlotsForDate(selectedDate)

  const pickDate = (key) => {
    if (!isBookableDate(key)) {
      setError('Please choose a date between today and 7 days from now.')
      return
    }
    setError('')
    setSelectedDate(key)
  }

  const book = (time) => {
    if (!isBookableDate(selectedDate)) {
      setError('Please choose a valid date.')
      return
    }
    if (!time) {
      setError('Please choose a time slot.')
      return
    }
    const booking = {
      id: `${Date.now()}-${Math.random().toString(36).slice(2, 8)}`,
      restaurantName: restaurant.restaurantName,
      address: restaurant.address,
      city: restaurant.city,
      state: restaurant.state,
      rating: restaurant.rating,
      bookingDate: selectedDate,
      bookingTime: time,
      createdAt: new Date().toISOString(),
    }
    const failure = onBook(booking)
    if (failure) {
      setError(failure)
      return
    }
    setError('')
    setConfirmed(booking)
  }

  return (
    <section className="booking-panel" aria-label={`Book a table at ${restaurant.restaurantName}`}>
      <div className="booking-head">
        <span className="booking-title">Select a date</span>
        <label className="date-input">
          <span className="sr-only">Pick a date</span>
          <input
            type="date"
            min={minKey}
            max={maxKey}
            value={selectedDate}
            onChange={(e) => pickDate(e.target.value)}
          />
        </label>
      </div>

      <div className="date-strip">
      <button type="button" ref={setPrevEl} className="date-nav" aria-label="Previous dates">
        ‹
      </button>
      <Swiper
        className="date-swiper"
        modules={[Navigation]}
        navigation={{ prevEl, nextEl, disabledClass: 'is-disabled' }}
        spaceBetween={8}
        slidesPerView={2.4}
        breakpoints={{
          480: { slidesPerView: 3 },
          768: { slidesPerView: 4 },
          1024: { slidesPerView: 5 },
        }}
      >
        {dates.map((date, i) => {
          const key = toDateKey(date)
          const active = key === selectedDate
          return (
            <SwiperSlide key={key}>
              <button
                type="button"
                className={`date-tab ${active ? 'active' : ''}`}
                onClick={() => pickDate(key)}
                aria-pressed={active}
              >
                <p>{formatDayLabel(date, i)}</p>
                <span className="slots-count">{countSlots(key)} Slots Available</span>
              </button>
            </SwiperSlide>
          )
        })}
      </Swiper>
      <button type="button" ref={setNextEl} className="date-nav" aria-label="Next dates">
        ›
      </button>
      </div>

      <div className="slot-groups">
        {Object.entries(slots).map(([period, times]) => (
          <div className="slot-group" key={period}>
            <p className="slot-period">{period}</p>
            <div className="slot-list">
              {times.map((time) => {
                const isBooked =
                  confirmed && confirmed.bookingDate === selectedDate && confirmed.bookingTime === time
                return (
                  <button
                    type="button"
                    key={time}
                    className={`slot ${isBooked ? 'booked' : ''}`}
                    onClick={() => book(time)}
                  >
                    {time}
                  </button>
                )
              })}
            </div>
          </div>
        ))}
      </div>

      {error && <span className="form-error">{error}</span>}

      {confirmed && (
        <div className="booking-success" role="status">
          Table booked at {confirmed.restaurantName} on {formatLongDate(confirmed.bookingDate)} at{' '}
          {confirmed.bookingTime}. See it under <Link to="/my-bookings">My Bookings</Link>.
        </div>
      )}
    </section>
  )
}
