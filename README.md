# XRestaurant Reservation

React + Vite app to search restaurants by US state/city and reserve a table (today up to 7 days ahead).

## Run

```bash
npm install
npm run dev      # http://localhost:5173
npm run build    # production build in dist/
```

## Routes

- `/` landing page with State (`div#state`) / City (`div#city`) dropdowns and `#searchBtn`
- `/search?state=..&city=..` results and booking
- `/my-bookings` saved reservations

Bookings are stored in `localStorage` under the key `bookings`.

## Deploy (Vercel)

`vercel.json` rewrites every path to `index.html` so `/my-bookings` and `/search` work on refresh.

```bash
npx vercel --prod
```
