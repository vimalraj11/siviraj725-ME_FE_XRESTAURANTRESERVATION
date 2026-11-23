import { useEffect, useRef, useState } from 'react'

/**
 * Custom dropdown rendered inside <div id={id}>.
 * Click the box to open the list, then click an option (<li>) to select it.
 */
export default function Dropdown({ id, placeholder, options, value, onChange, disabled, loading }) {
  const [open, setOpen] = useState(false)
  const ref = useRef(null)

  useEffect(() => {
    const onDocClick = (e) => {
      if (ref.current && !ref.current.contains(e.target)) setOpen(false)
    }
    document.addEventListener('mousedown', onDocClick)
    return () => document.removeEventListener('mousedown', onDocClick)
  }, [])

  const isOpen = open && !disabled

  const toggle = () => {
    if (!disabled) setOpen((o) => !o)
  }

  const select = (e, option) => {
    e.stopPropagation()
    onChange(option)
    setOpen(false)
  }

  const onKeyDown = (e) => {
    if (e.key === 'Enter' || e.key === ' ') {
      e.preventDefault()
      toggle()
    } else if (e.key === 'Escape') {
      setOpen(false)
    }
  }

  return (
    <div
      id={id}
      ref={ref}
      className={`dropdown ${disabled ? 'disabled' : ''} ${isOpen ? 'open' : ''}`}
      onClick={toggle}
      onKeyDown={onKeyDown}
      role="combobox"
      tabIndex={disabled ? -1 : 0}
      aria-expanded={isOpen}
      aria-disabled={disabled ? 'true' : 'false'}
      aria-haspopup="listbox"
      aria-label={placeholder}
    >
      <svg className="dropdown-icon" viewBox="0 0 24 24" width="18" height="18" aria-hidden="true">
        <path
          fill="currentColor"
          d="M12 2a7 7 0 0 0-7 7c0 5.2 7 13 7 13s7-7.8 7-13a7 7 0 0 0-7-7zm0 9.5A2.5 2.5 0 1 1 12 6.5a2.5 2.5 0 0 1 0 5z"
        />
      </svg>
      <span className={`dropdown-value ${value ? '' : 'placeholder'}`}>
        {value || (loading ? 'Loading...' : placeholder)}
      </span>
      <svg className="dropdown-caret" viewBox="0 0 24 24" width="18" height="18" aria-hidden="true">
        <path fill="currentColor" d="M7 10l5 5 5-5z" />
      </svg>

      {isOpen && (
        <ul className="dropdown-menu" role="listbox">
          {options.length === 0 ? (
            <span className="dropdown-empty">{loading ? 'Loading...' : 'No options'}</span>
          ) : (
            options.map((option) => (
              <li
                key={option}
                role="option"
                aria-selected={option === value}
                className={option === value ? 'selected' : ''}
                onClick={(e) => select(e, option)}
              >
                {option}
              </li>
            ))
          )}
        </ul>
      )}
    </div>
  )
}
