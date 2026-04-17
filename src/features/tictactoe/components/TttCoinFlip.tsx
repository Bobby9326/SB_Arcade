import { PLAYER_COLOR, BOT_COLOR } from '../constants/tictactoe.constants'

interface TttCoinFlipProps {
  flipKey:    number
  flipDisp:   'player' | 'bot'
  flipResult: 'player' | 'bot' | null
}

export function TttCoinFlip({ flipKey, flipDisp, flipResult }: TttCoinFlipProps) {
  return (
    <div
      key={flipKey}
      style={{
        textAlign:  'center',
        padding:    '1.75rem 3rem',
        background: 'rgba(255,255,255,0.02)',
        border:     '1px solid var(--border)',
        borderRadius: 18,
        minWidth:   300,
        animation:  'ttt-glow-in 0.35s ease both',
        boxShadow:  '0 4px 40px rgba(0,0,0,0.3)',
      }}
    >
      <div style={{
        fontFamily:    'Orbitron, monospace',
        fontSize:      '0.5rem',
        letterSpacing: '0.3em',
        color:         'var(--text-muted)',
        marginBottom:  '1rem',
      }}>
        ⟳ &nbsp;DECIDING WHO GOES FIRST
      </div>

      <div
        key={`${flipKey}-${flipDisp}`}
        style={{
          fontFamily:  'Orbitron, monospace',
          fontSize:    '3rem',
          fontWeight:  900,
          letterSpacing: '0.08em',
          color:       flipDisp === 'player' ? PLAYER_COLOR : BOT_COLOR,
          animation:   'ttt-flip-char 0.07s ease both',
          minHeight:   '4rem',
          display:     'flex',
          alignItems:  'center',
          justifyContent: 'center',
          textShadow:  flipDisp === 'player'
            ? '0 0 30px rgba(249,115,22,0.6)'
            : '0 0 30px rgba(96,165,250,0.6)',
        }}
      >
        {flipDisp === 'player' ? 'YOU' : 'BOT'}
      </div>

      {flipResult && (
        <div style={{
          fontFamily:  'Orbitron, monospace',
          fontSize:    '0.6rem',
          fontWeight:  700,
          letterSpacing: '0.15em',
          color:       flipResult === 'player' ? PLAYER_COLOR : BOT_COLOR,
          animation:   'ttt-result-in 0.55s cubic-bezier(0.34,1.56,0.64,1) both',
          marginTop:   '0.85rem',
          padding:     '8px 24px',
          border:      `1px solid ${flipResult === 'player' ? 'rgba(249,115,22,0.35)' : 'rgba(96,165,250,0.35)'}`,
          borderRadius: 99,
          background:  flipResult === 'player' ? 'rgba(249,115,22,0.1)' : 'rgba(96,165,250,0.1)',
          display:     'inline-block',
          boxShadow:   flipResult === 'player'
            ? '0 0 16px rgba(249,115,22,0.25)'
            : '0 0 16px rgba(96,165,250,0.25)',
        }}>
          {flipResult === 'player' ? '⚡  YOU GO FIRST' : '🤖  BOT GOES FIRST'}
        </div>
      )}
    </div>
  )
}
