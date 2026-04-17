import { useRef, useState, useEffect } from 'react'
import { createPortal } from 'react-dom'
import type { TMDBSearchResult } from '../types/moviedle.types'
import { IMG_W92 } from '../constants/moviedle.constants'

interface MoviedleSearchProps {
  query:         string
  dropdownItems: TMDBSearchResult[]
  isSearching:   boolean
  isSubmitting:  boolean
  dropdownOpen:  boolean
  disabled:      boolean
  onQueryChange: (q: string) => void
  onOpenChange:  (open: boolean) => void
  onSelect:      (movie: TMDBSearchResult) => void
}

export function MoviedleSearch({
  query, dropdownItems, isSearching, isSubmitting,
  dropdownOpen, disabled,
  onQueryChange, onOpenChange, onSelect,
}: MoviedleSearchProps) {
  const [highlightIdx, setHighlightIdx] = useState(-1)
  const [dropdownPos,  setDropdownPos]  = useState({ top: 0, left: 0, width: 0 })
  const inputWrapRef = useRef<HTMLDivElement>(null)

  // Reset highlight when list changes
  useEffect(() => setHighlightIdx(-1), [dropdownItems])

  // Track input position so portal dropdown can follow it
  useEffect(() => {
    if (!dropdownOpen || !inputWrapRef.current) return
    function update() {
      const r = inputWrapRef.current!.getBoundingClientRect()
      setDropdownPos({ top: r.bottom, left: r.left, width: r.width })
    }
    update()
    window.addEventListener('resize', update)
    window.addEventListener('scroll', update, true)
    return () => {
      window.removeEventListener('resize', update)
      window.removeEventListener('scroll', update, true)
    }
  }, [dropdownOpen])

  function handleKey(e: React.KeyboardEvent) {
    if (!dropdownOpen) {
      if (e.key === 'ArrowDown') { onOpenChange(true); return }
      return
    }
    if (e.key === 'Escape')    { onOpenChange(false); return }
    if (e.key === 'ArrowDown') { e.preventDefault(); setHighlightIdx(i => Math.min(i + 1, dropdownItems.length - 1)); return }
    if (e.key === 'ArrowUp')   { e.preventDefault(); setHighlightIdx(i => Math.max(i - 1, 0)); return }
    if (e.key === 'Enter') {
      e.preventDefault()
      const item = dropdownItems[highlightIdx] ?? dropdownItems[0]
      if (item) { onSelect(item); onOpenChange(false) }
    }
  }

  const year = (d: string) => d ? new Date(d).getFullYear() : ''

  const borderRadius = dropdownOpen && dropdownItems.length > 0
    ? '10px 10px 0 0' : '10px'

  return (
    <>
      {/* Input wrapper — positioned normally in the page flow */}
      <div ref={inputWrapRef} style={{ position: 'relative', width: '100%', maxWidth: 520 }}>
        <div style={{
          display:      'flex',
          alignItems:   'center',
          gap:          10,
          padding:      '10px 16px',
          background:   'rgba(0,0,0,0.5)',
          border:       `1px solid ${dropdownOpen ? 'rgba(249,115,22,0.5)' : 'rgba(255,255,255,0.1)'}`,
          borderRadius,
          transition:   'border-color 0.15s ease, border-radius 0.15s ease',
          boxShadow:    dropdownOpen ? '0 0 0 1px rgba(249,115,22,0.15)' : 'none',
        }}>
          <span style={{ fontSize: '1rem', opacity: 0.5, flexShrink: 0 }}>🔍</span>
          <input
            value={query}
            onChange={e => { onQueryChange(e.target.value); onOpenChange(true) }}
            onFocus={() => onOpenChange(true)}
            onKeyDown={handleKey}
            disabled={disabled}
            placeholder={disabled ? 'Loading…' : 'Search for a movie…'}
            autoComplete="off"
            spellCheck={false}
            style={{
              flex:        1,
              background:  'transparent',
              border:      'none',
              outline:     'none',
              fontFamily:  'Rajdhani, sans-serif',
              fontSize:    '1rem',
              fontWeight:  500,
              color:       'var(--text-primary)',
              letterSpacing: '0.03em',
            }}
          />
          {isSearching && (
            <div style={{
              width: 16, height: 16, flexShrink: 0,
              border: '2px solid rgba(249,115,22,0.3)',
              borderTopColor: 'var(--accent)',
              borderRadius: '50%',
              animation: 'md-spin 0.7s linear infinite',
            }} />
          )}
          {isSubmitting && (
            <span style={{
              fontFamily: 'Orbitron, monospace',
              fontSize: '0.45rem',
              color: 'var(--accent)',
              letterSpacing: '0.1em',
              flexShrink: 0,
            }}>
              CHECKING…
            </span>
          )}
        </div>
      </div>

      {/* Dropdown + backdrop rendered via portal at body level — escapes all stacking contexts */}
      {dropdownOpen && createPortal(
        <>
          {/* Invisible backdrop to catch outside clicks */}
          <div
            style={{ position: 'fixed', inset: 0, zIndex: 9998 }}
            onMouseDown={() => onOpenChange(false)}
          />

          {/* Dropdown list */}
          {dropdownItems.length > 0 && (
            <ul
              style={{
                position:   'fixed',
                top:        dropdownPos.top,
                left:       dropdownPos.left,
                width:      dropdownPos.width,
                margin:     0,
                padding:    '4px 0',
                listStyle:  'none',
                background: '#0f0f0f',
                border:     '1px solid rgba(249,115,22,0.4)',
                borderTop:  'none',
                borderRadius: '0 0 10px 10px',
                zIndex:     9999,
                maxHeight:  360,
                overflowY:  'auto',
                boxShadow:  '0 16px 48px rgba(0,0,0,0.8)',
              }}
            >
              {dropdownItems.map((m, idx) => (
                <li
                  key={m.id}
                  onMouseDown={e => { e.preventDefault(); onSelect(m); onOpenChange(false) }}
                  onMouseEnter={() => setHighlightIdx(idx)}
                  style={{
                    display:    'flex',
                    alignItems: 'center',
                    gap:        12,
                    padding:    '8px 14px',
                    cursor:     'pointer',
                    background: idx === highlightIdx ? 'rgba(249,115,22,0.12)' : 'transparent',
                    borderLeft: idx === highlightIdx ? '2px solid var(--accent)' : '2px solid transparent',
                    transition: 'background 0.1s ease',
                  }}
                >
                  {/* Poster thumbnail */}
                  <div style={{
                    width: 36, height: 52, flexShrink: 0,
                    borderRadius: 4, overflow: 'hidden',
                    background: 'rgba(255,255,255,0.06)',
                    border: '1px solid rgba(255,255,255,0.08)',
                  }}>
                    {m.poster_path ? (
                      <img
                        src={`${IMG_W92}${m.poster_path}`}
                        alt=""
                        style={{ width: '100%', height: '100%', objectFit: 'cover' }}
                      />
                    ) : (
                      <div style={{
                        width: '100%', height: '100%',
                        display: 'flex', alignItems: 'center', justifyContent: 'center',
                        fontSize: '1.2rem', opacity: 0.3,
                      }}>🎬</div>
                    )}
                  </div>

                  {/* Title + original title */}
                  <div style={{ minWidth: 0, flex: 1 }}>
                    <div style={{
                      fontFamily:   'Rajdhani, sans-serif',
                      fontSize:     '0.95rem',
                      fontWeight:   600,
                      color:        idx === highlightIdx ? 'var(--text-primary)' : 'var(--text-secondary)',
                      whiteSpace:   'nowrap',
                      overflow:     'hidden',
                      textOverflow: 'ellipsis',
                    }}>
                      {m.title}
                    </div>
                    {m.original_title !== m.title && (
                      <div style={{
                        fontFamily:   'Rajdhani, sans-serif',
                        fontSize:     '0.74rem',
                        color:        'var(--text-muted)',
                        whiteSpace:   'nowrap',
                        overflow:     'hidden',
                        textOverflow: 'ellipsis',
                      }}>
                        {m.original_title}
                      </div>
                    )}
                  </div>

                  <div style={{
                    fontFamily:    'Orbitron, monospace',
                    fontSize:      '0.55rem',
                    color:         'var(--text-muted)',
                    letterSpacing: '0.08em',
                    flexShrink:    0,
                  }}>
                    {year(m.release_date)}
                  </div>
                </li>
              ))}
            </ul>
          )}
        </>,
        document.body
      )}
    </>
  )
}
