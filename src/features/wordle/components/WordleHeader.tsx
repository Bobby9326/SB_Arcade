import { MAX_ROWS } from '../constants/wordle.constants'
import type { GameStatus } from '../types/wordle.types'

interface WordleHeaderProps {
  gameStatus:   GameStatus
  currentRow:   number
  isLoading:    boolean
  isChecking:   boolean
  isRevealing:  boolean
  onFetchWord:  () => void
}

export function WordleHeader({
  gameStatus,
  currentRow,
  isLoading,
  isChecking,
  isRevealing,
  onFetchWord,
}: WordleHeaderProps) {
  const btnDisabled = isLoading || isRevealing

  const btnLabel =
    isLoading    ? '⟳ LOADING...'  :
    isChecking   ? '⟳ CHECKING...' :
    gameStatus === 'idle' ? '▶  START GAME'  : '↺  NEW WORD'

  return (
    <>
      {/* Title block */}
      <div style={{ textAlign: 'center', animation: 'wordle-slide-up 0.5s ease both' }}>
        <div style={{
          fontFamily:    'Orbitron, monospace',
          fontSize:      '0.55rem',
          letterSpacing: '0.35em',
          color:         'var(--text-muted)',
          marginBottom:  '0.35rem',
        }}>
          SB ARCADE
        </div>

        <h1
          className="gradient-text"
          style={{
            fontFamily:    'Orbitron, monospace',
            fontSize:      'clamp(1.8rem, 5vw, 2.8rem)',
            fontWeight:    900,
            letterSpacing: '0.18em',
            margin:        0,
            lineHeight:    1,
          }}
        >
          WORDLE
        </h1>

        <p style={{
          fontFamily:    'Rajdhani, sans-serif',
          fontSize:      '0.78rem',
          color:         'var(--text-muted)',
          letterSpacing: '0.18em',
          marginTop:     '0.4rem',
          textTransform: 'uppercase',
        }}>
          6 tries · 5 letters · 1 word
        </p>
      </div>

      {/* New Word / Start button */}
      <button
        onClick={onFetchWord}
        disabled={btnDisabled}
        className="wk"
        style={{
          fontFamily:    'Orbitron, monospace',
          fontSize:      '0.6rem',
          fontWeight:    700,
          letterSpacing: '0.18em',
          textTransform: 'uppercase',
          padding:       '9px 28px',
          border:        '1px solid',
          borderColor:   isLoading ? 'var(--border)' : 'var(--border-accent)',
          borderRadius:  8,
          background:    isLoading ? 'var(--bg-card)' : 'var(--accent-dim)',
          color:         isLoading ? 'var(--text-muted)' : 'var(--accent)',
          cursor:        btnDisabled ? 'not-allowed' : 'pointer',
          opacity:       btnDisabled ? 0.6 : 1,
          transition:    'all 0.2s ease',
          boxShadow:     isLoading ? 'none' : '0 0 16px var(--accent-dim)',
          animation:     'wordle-slide-up 0.5s 0.05s ease both',
        }}
      >
        {btnLabel}
      </button>

      {/* Attempt counter */}
      {gameStatus === 'playing' && (
        <div style={{
          fontFamily:    'Orbitron, monospace',
          fontSize:      '0.55rem',
          letterSpacing: '0.2em',
          color:         'var(--text-muted)',
        }}>
          ATTEMPT&nbsp;
          <span style={{ color: 'var(--accent)', fontWeight: 700 }}>
            {currentRow + 1}
          </span>
          &nbsp;/&nbsp;{MAX_ROWS}
        </div>
      )}
    </>
  )
}
