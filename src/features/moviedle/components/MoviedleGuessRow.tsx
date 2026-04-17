import type { GuessComparison, MatchResult, DirectionResult } from '../types/moviedle.types'
import { CELL_GRID, IMG_W92 } from '../constants/moviedle.constants'

/* ── Cell colour helpers ── */
type AnyResult = MatchResult | DirectionResult
function cellBg(r: AnyResult): string {
  if (r === 'correct') return 'rgba(34,197,94,0.82)'
  if (r === 'partial') return 'rgba(234,179,8,0.80)'
  if (r === 'up' || r === 'down') return 'rgba(249,115,22,0.70)'
  return 'rgba(239,68,68,0.75)'
}
function cellBorder(r: AnyResult): string {
  if (r === 'correct') return 'rgba(34,197,94,0.5)'
  if (r === 'partial') return 'rgba(234,179,8,0.5)'
  if (r === 'up' || r === 'down') return 'rgba(249,115,22,0.45)'
  return 'rgba(239,68,68,0.4)'
}

const CELL_BASE: React.CSSProperties = {
  display:        'flex',
  alignItems:     'center',
  justifyContent: 'center',
  flexDirection:  'column',
  gap:            2,
  minHeight:      68,
  borderRadius:   8,
  padding:        '6px 8px',
  border:         '1px solid',
  overflow:       'hidden',
  textAlign:      'center',
}

function Arrow({ dir }: { dir: 'up' | 'down' }) {
  return (
    <span style={{ fontSize: '1rem', lineHeight: 1, display: 'block' }}>
      {dir === 'up' ? '↑' : '↓'}
    </span>
  )
}

function Val({ children }: { children: React.ReactNode }) {
  return (
    <span style={{
      fontFamily:    'Orbitron, monospace',
      fontSize:      '0.6rem',
      fontWeight:    700,
      letterSpacing: '0.05em',
      color:         '#fff',
    }}>
      {children}
    </span>
  )
}

/* ── Formatters ── */
function fmtRevenue(n: number): string {
  if (!n) return 'N/A'
  if (n >= 1e9) return `$${(n / 1e9).toFixed(1)}B`
  if (n >= 1e6) return `$${Math.round(n / 1e6)}M`
  return `$${Math.round(n / 1e3)}K`
}
function fmtRuntime(m: number): string {
  if (!m) return 'N/A'
  const h = Math.floor(m / 60)
  const r = m % 60
  return h > 0 ? `${h}h ${r}m` : `${r}m`
}
function fmtYear(d: string): string {
  return d ? String(new Date(d).getFullYear()) : 'N/A'
}

/* ── Row ── */
interface MoviedleGuessRowProps {
  comparison: GuessComparison
  index:      number
}

export function MoviedleGuessRow({ comparison, index }: MoviedleGuessRowProps) {
  const { movie, titleMatch, genresMatch, matchedGenreIds, countryMatch, yearHint, runtimeHint, revenueHint } = comparison

  const matchedSet = new Set(matchedGenreIds)
  const countries  = (movie.origin_country?.length ? movie.origin_country : movie.production_countries?.map(c => c.iso_3166_1) ?? [])

  return (
    <div
      style={{
        display:     'grid',
        gridTemplateColumns: CELL_GRID,
        gap:         6,
        animation:   `md-row-in 0.35s ${index * 0.05}s ease both`,
      }}
    >
      {/* ── 1. Poster only ── */}
      <div style={{
        ...CELL_BASE,
        background: 'rgba(255,255,255,0.04)',
        border:     '1px solid rgba(255,255,255,0.08)',
        padding:    '6px',
      }}>
        <div style={{
          width: 44, height: 62, borderRadius: 5,
          overflow: 'hidden',
          background: 'rgba(255,255,255,0.06)',
          border: '1px solid rgba(255,255,255,0.08)',
          flexShrink: 0,
        }}>
          {movie.poster_path ? (
            <img src={`${IMG_W92}${movie.poster_path}`} alt="" style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
          ) : (
            <div style={{ width: '100%', height: '100%', display: 'flex', alignItems: 'center', justifyContent: 'center', opacity: 0.3, fontSize: '1.2rem' }}>🎬</div>
          )}
        </div>
      </div>

      {/* ── 2. Original Title ── */}
      <div style={{ ...CELL_BASE, background: cellBg(titleMatch), borderColor: cellBorder(titleMatch), padding: '6px 8px' }}>
        <span style={{
          fontFamily:    'Orbitron, monospace',
          fontSize:      movie.original_title.length > 20 ? '0.45rem' : '0.55rem',
          fontWeight:    700,
          letterSpacing: '0.03em',
          color:         '#fff',
          lineHeight:    1.4,
          wordBreak:     'break-word',
          textAlign:     'center',
        }}>
          {movie.original_title}
        </span>
      </div>

      {/* ── 3. Genres ── */}
      <div style={{ ...CELL_BASE, background: cellBg(genresMatch), borderColor: cellBorder(genresMatch), gap: 3 }}>
        <div style={{ display: 'flex', flexWrap: 'wrap', gap: '2px 3px', justifyContent: 'center' }}>
          {movie.genres.map(g => (
            <span key={g.id} style={{
              fontFamily:    'Orbitron, monospace',
              fontSize:      '0.42rem',
              fontWeight:    700,
              letterSpacing: '0.06em',
              color:         matchedSet.has(g.id) ? '#fff' : 'rgba(255,255,255,0.55)',
              background:    matchedSet.has(g.id) ? 'rgba(255,255,255,0.2)' : 'rgba(0,0,0,0.2)',
              padding:       '1px 5px',
              borderRadius:  3,
            }}>
              {g.name}
            </span>
          ))}
          {movie.genres.length === 0 && <Val>N/A</Val>}
        </div>
      </div>

      {/* ── 4. Country ── */}
      <div style={{ ...CELL_BASE, background: cellBg(countryMatch), borderColor: cellBorder(countryMatch) }}>
        <Val>{countries.join(', ') || 'N/A'}</Val>
      </div>

      {/* ── 5. Year ── */}
      <div style={{ ...CELL_BASE, background: cellBg(yearHint), borderColor: cellBorder(yearHint) }}>
        {yearHint !== 'correct' && <Arrow dir={yearHint} />}
        <Val>{fmtYear(movie.release_date)}</Val>
      </div>

      {/* ── 6. Runtime ── */}
      <div style={{ ...CELL_BASE, background: cellBg(runtimeHint), borderColor: cellBorder(runtimeHint) }}>
        {runtimeHint !== 'correct' && <Arrow dir={runtimeHint} />}
        <Val>{fmtRuntime(movie.runtime)}</Val>
      </div>

      {/* ── 7. Revenue ── */}
      <div style={{ ...CELL_BASE, background: cellBg(revenueHint), borderColor: cellBorder(revenueHint) }}>
        {revenueHint !== 'correct' && <Arrow dir={revenueHint} />}
        <Val>{fmtRevenue(movie.revenue)}</Val>
      </div>
    </div>
  )
}
