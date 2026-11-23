export default function Loader({ text = 'Loading...', subtext }) {
  return (
    <div className="loader" role="status" aria-live="polite">
      <span className="spinner" aria-hidden="true" />
      <span className="loader-text">{text}</span>
      {subtext && <span className="loader-sub">{subtext}</span>}
    </div>
  )
}
