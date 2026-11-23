import { Swiper, SwiperSlide } from 'swiper/react'
import { Autoplay, Pagination } from 'swiper/modules'
import 'swiper/css'
import 'swiper/css/pagination'

const OFFERS = [
  { tag: 'Weekend Special', title: 'Flat 25% off', text: 'on dinner bookings every Friday to Sunday.', theme: 'blue', code: 'WEEKEND25' },
  { tag: 'Early Bird', title: 'Free dessert', text: 'when you reserve a table before 12 PM.', theme: 'orange', code: 'EARLYBIRD' },
  { tag: 'Family Feast', title: 'Kids eat free', text: 'at partner family restaurants on weekdays.', theme: 'green', code: 'FAMILY' },
  { tag: 'Date Night', title: 'Complimentary drinks', text: 'for evening reservations for two.', theme: 'purple', code: 'DATENIGHT' },
  { tag: 'First Booking', title: '$10 cashback', text: 'on your very first FREE reservation.', theme: 'teal', code: 'FIRST10' },
]

export default function OffersCarousel() {
  return (
    <Swiper
      className="offers-swiper"
      modules={[Pagination, Autoplay]}
      spaceBetween={24}
      slidesPerView={1}
      pagination={{ clickable: true }}
      autoplay={{ delay: 3500, disableOnInteraction: false }}
      loop
      breakpointsBase="container"
      breakpoints={{
        640: { slidesPerView: 2 },
        1024: { slidesPerView: 3 },
      }}
    >
      {OFFERS.map((o) => (
        <SwiperSlide key={o.title}>
          <div className={`offer-card offer-${o.theme}`}>
            <span className="offer-tag">{o.tag}</span>
            <span className="offer-title">{o.title}</span>
            <span className="offer-text">{o.text}</span>
            <span className="offer-code">Use code: {o.code}</span>
          </div>
        </SwiperSlide>
      ))}
    </Swiper>
  )
}
