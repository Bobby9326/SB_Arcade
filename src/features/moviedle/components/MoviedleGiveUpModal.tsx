import type { MovieDetails } from '../types/moviedle.types'
import { IMG_W342 } from '../constants/moviedle.constants'

interface MoviedleGiveUpModalProps {
  target:    MovieDetails
  onNewGame: () => void
}

function fmtYear(d: string): string { return d ? String(new Date(d).getFullYear()) : 'N/A' }
function fmtRuntime(m: number): string {
  if (!m) return 'N/A'
  const h = Math.floor(m / 60)
  const r = m % 60
  return h > 0 ? `${h}h ${r}m` : `${r}m`
}
function fmtRevenue(n: number): string {
  if (!n) return 'N/A'
  if (n >= 1e9) return `$${(n / 1e9).toFixed(1)}B`
  if (n >= 1e6) return `$${Math.round(n / 1e6)}M`
  return `$${Math.round(n / 1e3)}K`
}

export function MoviedleGiveUpModal({ target, onNewGame }: MoviedleGiveUpModalProps) {
  const imgSrc = target.backdrop_path
    ? `${IMG_W342}${target.backdrop_path}`
    : target.poster_path ? `${IMG_W342}${target.poster_path}` : null

  const countries = target.origin_country?.length
    ? target.origin_country
    : target.production_countries?.map(c => c.iso_3166_1) ?? []

  const facts = [
    { label: 'Genres',  value: target.genres.map(g => g.name).join(', ') || 'N/A' },
    { label: 'Country', value: countries.join(', ') || 'N/A' },
    { label: 'Year',    value: fmtYear(target.release_date) },
    { label: 'Runtime', value: fmtRuntime(target.runtime) },
    { label: 'Revenue', value: fmtRevenue(target.revenue) },
  ]

  return (
    <div
      style={{
        position:   'fixed',
        inset:      0,
        zIndex:     100,
        display:    'flex',
        alignItems: 'center',
        justifyContent: 'center',
        background: 'rgba(0,0,0,0.75)',
        backdropFilter: 'blur(6px)',
        animation:  'md-backdrop-in 0.25s ease both',
        padding:    '1rem',
      }}
      onClick={onNewGame}
    >
      <div
        onClick={e => e.stopPropagation()}
        style={{
          width:        '100%',
          maxWidth:     440,
          background:   'rgba(15,15,15,0.97)',
          border:       '1px solid rgba(249,115,22,0.3)',
          borderRadius: 16,
          overflow:     'hidden',
          boxShadow:    '0 0 60px rgba(249,115,22,0.08)',
          animation:    'md-modal-in 0.4s cubic-bezier(0.34,1.56,0.64,1) both',
        }}
      >
        {/* Backdrop */}
        {imgSrc && (
          <div style={{ position: 'relative', height: 180, overflow: 'hidden' }}>
            <img src={imgSrc} alt="" style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
            <div style={{
              position: 'absolute', inset: 0,
              background: 'linear-gradient(to bottom, transparent 30%, rgba(15,15,15,0.97) 100%)',
            }} />
            {/* ANSWER label overlay */}
            <div style={{
              position:      'absolute',
              top:           12,
              left:          12,
              fontFamily:    'Orbitron, monospace',
              fontSize:      '0.5rem',
              letterSpacing: '0.3em',
              color:         'var(--accent)',
              background:    'rgba(0,0,0,0.65)',
              padding:       '4px 10px',
              borderRadius:  6,
              border:        '1px solid rgba(249,115,22,0.3)',
            }}>
              ANSWER
            </div>
          </div>
        )}

        <div style={{ padding: '1.25rem 1.5rem 1.5rem' }}>
          <h2 style={{
            fontFamily:    'Orbitron, monospace',
            fontSize:      'clamp(0.9rem, 4vw, 1.3rem)',
            fontWeight:    900,
            color:         'var(--text-primary)',
            letterSpacing: '0.06em',
            margin:        '0 0 0.25rem',
            lineHeight:    1.2,
          }}>
            {target.title}
          </h2>

          {target.original_title !== target.title && (
            <div style={{
              fontFamily:   'Rajdhani, sans-serif',
              fontSize:     '0.8rem',
              color:        'var(--text-muted)',
              marginBottom: '0.85rem',
            }}>
              {target.original_title}
            </div>
          )}

          {/* Overview */}
          {target.overview && (
            <p style={{
              fontFamily:   'Rajdhani, sans-serif',
              fontSize:     '0.8rem',
              color:        'var(--text-secondary)',
              lineHeight:   1.6,
              margin:       '0 0 1rem',
              display:      '-webkit-box',
              WebkitLineClamp: 3,
              WebkitBoxOrient: 'vertical',
              overflow:     'hidden',
            }}>
              {target.overview}
            </p>
          )}

          {/* Key facts grid */}
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 6, marginBottom: '1.25rem' }}>
            {facts.map(f => (
              <div key={f.label} style={{
                padding:    '8px 10px',
                background: 'rgba(255,255,255,0.04)',
                border:     '1px solid rgba(255,255,255,0.07)',
                borderRadius: 8,
                textAlign:  'center',
              }}>
                <div style={{ fontFamily: 'Orbitron, monospace', fontSize: '0.42rem', letterSpacing: '0.12em', color: 'var(--text-muted)', marginBottom: 4 }}>
                  {f.label.toUpperCase()}
                </div>
                <div style={{ fontFamily: 'Rajdhani, sans-serif', fontSize: '0.78rem', fontWeight: 600, color: 'var(--text-primary)' }}>
                  {f.value}
                </div>
              </div>
            ))}
          </div>

          <button
            onClick={onNewGame}
            style={{
              width:         '100%',
              padding:       '12px',
              fontFamily:    'Orbitron, monospace',
              fontSize:      '0.58rem',
              fontWeight:    700,
              letterSpacing: '0.16em',
              border:        '1px solid var(--border-accent)',
              borderRadius:  10,
              background:    'var(--accent-dim)',
              color:         'var(--accent)',
              cursor:        'pointer',
              transition:    'all 0.15s ease',
            }}
          >
            ↺ &nbsp;TRY AGAIN
          </button>
        </div>
      </div>
    </div>
  )
}
