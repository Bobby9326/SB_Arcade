interface MoviedleHeaderProps {
  guessCount: number
  gameStatus: 'loading' | 'playing' | 'won' | 'lost'
  onGiveUp:   () => void
  onNewGame:  () => void
}

export function MoviedleHeader({ guessCount, gameStatus, onGiveUp, onNewGame }: MoviedleHeaderProps) {
  const isOver    = gameStatus === 'won' || gameStatus === 'lost'
  const isPlaying = gameStatus === 'playing'

  return (
    <div style={{ textAlign: 'center', animation: 'md-slide-up 0.5s ease both' }}>
      <div style={{
        fontFamily:    'Orbitron, monospace',
        fontSize:      '0.5rem',
        letterSpacing: '0.38em',
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
        MOVIEDLE
      </h1>

      <p style={{
        fontFamily:    'Rajdhani, sans-serif',
        fontSize:      '0.78rem',
        color:         'var(--text-muted)',
        letterSpacing: '0.14em',
        marginTop:     '0.4rem',
        textTransform: 'uppercase',
      }}>
        Guess the mystery movie from the clues
      </p>

      {/* Stats + actions */}
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '0.75rem', marginTop: '0.75rem', flexWrap: 'wrap' }}>
        {guessCount > 0 && (
          <div style={{
            display:       'inline-flex',
            alignItems:    'center',
            gap:           '0.35rem',
            padding:       '4px 14px',
            border:        '1px solid rgba(249,115,22,0.25)',
            borderRadius:  99,
            background:    'rgba(249,115,22,0.06)',
            fontFamily:    'Orbitron, monospace',
            fontSize:      '0.5rem',
            letterSpacing: '0.15em',
            color:         'var(--accent)',
          }}>
            {guessCount} {guessCount === 1 ? 'GUESS' : 'GUESSES'}
          </div>
        )}

        {isPlaying && (
          <button
            onClick={onGiveUp}
            style={{
              fontFamily:    'Orbitron, monospace',
              fontSize:      '0.46rem',
              fontWeight:    700,
              letterSpacing: '0.14em',
              padding:       '5px 16px',
              border:        '1px solid rgba(239,68,68,0.3)',
              borderRadius:  99,
              background:    'rgba(239,68,68,0.07)',
              color:         '#F87171',
              cursor:        'pointer',
              transition:    'all 0.15s ease',
            }}
          >
            GIVE UP
          </button>
        )}

        {isOver && (
          <button
            onClick={onNewGame}
            style={{
              fontFamily:    'Orbitron, monospace',
              fontSize:      '0.46rem',
              fontWeight:    700,
              letterSpacing: '0.14em',
              padding:       '5px 16px',
              border:        '1px solid var(--border-accent)',
              borderRadius:  99,
              background:    'var(--accent-dim)',
              color:         'var(--accent)',
              cursor:        'pointer',
              transition:    'all 0.15s ease',
              boxShadow:     '0 0 14px var(--accent-dim)',
            }}
          >
            ↺ NEW GAME
          </button>
        )}
      </div>
    </div>
  )
}
