import { Link } from 'react-router-dom'

export default function Footer() {
  return (
    <footer className="footer">
      <div className="container footer-grid">
        <div>
          <div className="brand brand-light">XRestaurant</div>
          <p className="footer-text">
            Discover great places to eat and reserve your table in seconds, with no booking fees.
          </p>
        </div>
        <div className="footer-col">
          <span className="footer-title">Explore</span>
          <Link to="/">Find Restaurants</Link>
          <Link to="/search">Locations</Link>
          <Link to="/my-bookings">Reservations</Link>
        </div>
        <div className="footer-col">
          <span className="footer-title">Company</span>
          <a href="/#offers">Offers</a>
          <a href="/#faq">FAQs</a>
          <a href="/#about">About Us</a>
        </div>
        <div className="footer-col">
          <span className="footer-title">Legal</span>
          <a href="/#terms">Terms &amp; Conditions</a>
          <a href="/#privacy">Privacy Policy</a>
        </div>
      </div>
      <div className="container footer-bottom">
        Copyright © {new Date().getFullYear()} XRestaurant. All rights reserved.
      </div>
    </footer>
  )
}
