import type { MovieDetails } from '../types/moviedle.types'
import { IMG_W342 } from '../constants/moviedle.constants'

interface MoviedleWinModalProps {
  target:     MovieDetails
  guessCount: number
  onNewGame:  () => void
}

export function MoviedleWinModal({ target, guessCount, onNewGame }: MoviedleWinModalProps) {
  const imgSrc = target.backdrop_path
    ? `${IMG_W342}${target.backdrop_path}`
    : target.poster_path ? `${IMG_W342}${target.poster_path}` : null

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
          maxWidth:     420,
          background:   'rgba(15,15,15,0.97)',
          border:       '1px solid rgba(34,197,94,0.35)',
          borderRadius: 16,
          overflow:     'hidden',
          boxShadow:    '0 0 60px rgba(34,197,94,0.15)',
          animation:    'md-modal-in 0.4s cubic-bezier(0.34,1.56,0.64,1) both',
        }}
      >
        {/* Backdrop image */}
        {imgSrc && (
          <div style={{ position: 'relative', height: 180, overflow: 'hidden' }}>
            <img src={imgSrc} alt="" style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
            <div style={{
              position:   'absolute',
              inset:      0,
              background: 'linear-gradient(to bottom, transparent 30%, rgba(15,15,15,0.95) 100%)',
            }} />
          </div>
        )}

        <div style={{ padding: '1.5rem', textAlign: 'center' }}>
          {/* Badge */}
          <div style={{
            display:        'inline-flex',
            alignItems:     'center',
            gap:            '0.4rem',
            padding:        '5px 18px',
            background:     'rgba(34,197,94,0.12)',
            border:         '1px solid rgba(34,197,94,0.4)',
            borderRadius:   99,
            fontFamily:     'Orbitron, monospace',
            fontSize:       '0.52rem',
            letterSpacing:  '0.2em',
            color:          '#22C55E',
            marginBottom:   '1rem',
            animation:      'md-badge-pop 0.5s 0.2s cubic-bezier(0.34,1.56,0.64,1) both',
          }}>
            ✓ &nbsp;CORRECT!
          </div>

          {/* Movie title */}
          <h2 style={{
            fontFamily:    'Orbitron, monospace',
            fontSize:      'clamp(1rem, 4vw, 1.4rem)',
            fontWeight:    900,
            color:         'var(--text-primary)',
            letterSpacing: '0.06em',
            margin:        '0 0 0.35rem',
            lineHeight:    1.2,
          }}>
            {target.title}
          </h2>

          {target.original_title !== target.title && (
            <div style={{
              fontFamily: 'Rajdhani, sans-serif',
              fontSize:   '0.8rem',
              color:      'var(--text-muted)',
              marginBottom: '1rem',
            }}>
              {target.original_title}
            </div>
          )}

          {/* Guess count */}
          <div style={{
            fontFamily:    'Rajdhani, sans-serif',
            fontSize:      '0.85rem',
            color:         'var(--text-secondary)',
            letterSpacing: '0.06em',
            marginBottom:  '1.5rem',
          }}>
            Solved in&nbsp;
            <span style={{ color: 'var(--accent)', fontWeight: 700 }}>
              {guessCount} {guessCount === 1 ? 'guess' : 'guesses'}
            </span>
          </div>

          {/* New game button */}
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
              boxShadow:     '0 0 20px var(--accent-dim)',
            }}
          >
            ↺ &nbsp;PLAY AGAIN
          </button>
        </div>
      </div>
    </div>
  )
}
