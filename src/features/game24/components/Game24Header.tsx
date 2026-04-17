interface Game24HeaderProps {
  solvedCount: number
}

export function Game24Header({ solvedCount }: Game24HeaderProps) {
  return (
    <div style={{ textAlign: 'center', animation: 'g24-slide-up 0.5s ease both' }}>
      <div style={{
        fontFamily:    'Orbitron, monospace',
        fontSize:      '0.52rem',
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
        GAME 24
      </h1>

      <p style={{
        fontFamily:    'Rajdhani, sans-serif',
        fontSize:      '0.78rem',
        color:         'var(--text-muted)',
        letterSpacing: '0.14em',
        marginTop:     '0.4rem',
        textTransform: 'uppercase',
      }}>
        Use + − × ÷ on all 4 cards to make 24
      </p>

      {solvedCount > 0 && (
        <div style={{
          marginTop:     '0.6rem',
          display:       'inline-flex',
          alignItems:    'center',
          gap:           '0.4rem',
          padding:       '4px 14px',
          border:        '1px solid rgba(34,197,94,0.3)',
          borderRadius:  99,
          background:    'rgba(34,197,94,0.08)',
          fontFamily:    'Orbitron, monospace',
          fontSize:      '0.52rem',
          letterSpacing: '0.15em',
          color:         '#22C55E',
        }}>
          ✓&nbsp;{solvedCount} solved
        </div>
      )}
    </div>
  )
}
