import { useEffect, useState } from 'react'
import { Route, Routes } from 'react-router-dom'
import Navbar from './components/Navbar.jsx'
import Footer from './components/Footer.jsx'
import Home from './pages/Home.jsx'
import Search from './pages/Search.jsx'
import MyBookings from './pages/MyBookings.jsx'
import { loadBookings, saveBookings, STORAGE_KEY } from './utils/bookings.js'

export default function App() {
  const [bookings, setBookings] = useState([])

  // Load saved bookings on start, and stay in sync with other tabs.
  useEffect(() => {
    setBookings(loadBookings())
    const onStorage = (e) => {
      if (e.key === STORAGE_KEY) setBookings(loadBookings())
    }
    window.addEventListener('storage', onStorage)
    return () => window.removeEventListener('storage', onStorage)
  }, [])

  /** Returns an error message, or '' when the booking was saved. */
  const addBooking = (booking) => {
    const current = loadBookings()
    const duplicate = current.some(
      (b) =>
        b.restaurantName === booking.restaurantName &&
        b.city === booking.city &&
        b.bookingDate === booking.bookingDate &&
        b.bookingTime === booking.bookingTime,
    )
    if (duplicate) return 'You have already booked this time slot.'
    const next = [...current, booking]
    if (!saveBookings(next)) return 'Could not save your booking. Please try again.'
    setBookings(next)
    return ''
  }

  const cancelBooking = (id) => {
    const next = loadBookings().filter((b) => b.id !== id)
    saveBookings(next)
    setBookings(next)
  }

  return (
    <div className="app">
      <Navbar />
      <main className="main">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/search" element={<Search onBook={addBooking} />} />
          <Route
            path="/my-bookings"
            element={<MyBookings bookings={bookings} onCancel={cancelBooking} />}
          />
          <Route path="*" element={<Home />} />
        </Routes>
      </main>
      <Footer />
    </div>
  )
}
