import { OPERATORS } from '../constants/game24.constants'
import type { GameStatus } from '../types/game24.types'

interface Game24KeypadProps {
  gameStatus:  GameStatus
  canCheck:    boolean       // true when all 4 numbers are in expr
  onSymbol:    (value: string) => void
  onBackspace: () => void
  onClear:     () => void
  onCheck:     () => void
  onGiveUp:    () => void
  onNewGame:   () => void
}

interface KeyDef {
  label:   string
  action:  () => void
  wide?:   boolean
  variant: 'operator' | 'control' | 'primary' | 'danger' | 'new'
  disabled?: boolean
}

export function Game24Keypad({
  gameStatus,
  canCheck,
  onSymbol,
  onBackspace,
  onClear,
  onCheck,
  onGiveUp,
  onNewGame,
}: Game24KeypadProps) {

  const isOver    = gameStatus === 'won' || gameStatus === 'revealed'
  const isPlaying = gameStatus === 'playing'

  const operatorRow: KeyDef[] = OPERATORS.map(op => ({
    label:    op,
    action:   () => onSymbol(op),
    variant:  'operator',
    disabled: !isPlaying,
  }))

  const controlRow: KeyDef[] = [
    { label: '(',  action: () => onSymbol('('),  variant: 'control', disabled: !isPlaying },
    { label: ')',  action: () => onSymbol(')'),  variant: 'control', disabled: !isPlaying },
    { label: '⌫',  action: onBackspace,           variant: 'control', disabled: !isPlaying },
    { label: '✕',  action: onClear,               variant: 'control', disabled: !isPlaying },
  ]

  function keyColors(variant: KeyDef['variant'], disabled = false) {
    if (disabled) return {
      bg:     'rgba(255,255,255,0.02)',
      border: 'rgba(255,255,255,0.04)',
      color:  'var(--text-muted)',
    }
    switch (variant) {
      case 'operator': return {
        bg:     'rgba(255,255,255,0.06)',
        border: 'rgba(255,255,255,0.08)',
        color:  'var(--text-primary)',
      }
      case 'control': return {
        bg:     'rgba(255,255,255,0.04)',
        border: 'rgba(255,255,255,0.06)',
        color:  'var(--text-secondary)',
      }
      case 'primary': return {
        bg:     canCheck ? 'var(--accent-dim)' : 'rgba(255,255,255,0.03)',
        border: canCheck ? 'var(--border-accent)' : 'rgba(255,255,255,0.05)',
        color:  canCheck ? 'var(--accent)' : 'var(--text-muted)',
      }
      case 'danger': return {
        bg:     'rgba(239,68,68,0.08)',
        border: 'rgba(239,68,68,0.25)',
        color:  '#F87171',
      }
      case 'new': return {
        bg:     'var(--accent-dim)',
        border: 'var(--border-accent)',
        color:  'var(--accent)',
      }
    }
  }

  function renderRow(keys: KeyDef[], rowAnimation: string) {
    return (
      <div style={{ display: 'flex', gap: 6, animation: rowAnimation }}>
        {keys.map(k => {
          const c = keyColors(k.variant, k.disabled)
          return (
            <button
              key={k.label}
              onClick={k.action}
              disabled={k.disabled}
              className="g24-btn"
              style={{
                flex:          k.wide ? 2 : 1,
                height:        50,
                display:       'flex',
                alignItems:    'center',
                justifyContent: 'center',
                fontFamily:    'Orbitron, monospace',
                fontSize:      k.label.length > 2 ? '0.52rem' : '0.85rem',
                fontWeight:    700,
                letterSpacing: k.label.length > 2 ? '0.1em' : '0.04em',
                border:        `1px solid ${c.border}`,
                borderRadius:  8,
                background:    c.bg,
                color:         c.color,
                cursor:        k.disabled ? 'default' : 'pointer',
                transition:    'all 0.15s ease',
                userSelect:    'none',
                boxShadow:     k.variant === 'primary' && canCheck
                  ? '0 0 16px var(--accent-dim)'
                  : k.variant === 'new'
                  ? '0 0 16px var(--accent-dim)'
                  : 'none',
              }}
            >
              {k.label}
            </button>
          )
        })}
      </div>
    )
  }

  return (
    <div
      style={{
        display:       'flex',
        flexDirection: 'column',
        gap:           7,
        width:         '100%',
        maxWidth:      380,
        animation:     'g24-slide-up 0.5s 0.18s ease both',
      }}
    >
      {/* Operators: + − × ÷ */}
      {renderRow(operatorRow, 'g24-slide-up 0.5s 0.2s ease both')}

      {/* Controls: ( ) ⌫ ✕ */}
      {renderRow(controlRow, 'g24-slide-up 0.5s 0.25s ease both')}

      {/* Action row */}
      <div style={{
        display:   'flex',
        gap:       7,
        animation: 'g24-slide-up 0.5s 0.3s ease both',
      }}>
        {/* Give Up — only shown during active game */}
        {isPlaying && (() => {
          const c = keyColors('danger')
          return (
            <button
              onClick={onGiveUp}
              className="g24-btn"
              style={{
                flex:          1,
                height:        50,
                fontFamily:    'Orbitron, monospace',
                fontSize:      '0.5rem',
                fontWeight:    700,
                letterSpacing: '0.12em',
                border:        `1px solid ${c.border}`,
                borderRadius:  8,
                background:    c.bg,
                color:         c.color,
                cursor:        'pointer',
                transition:    'all 0.15s ease',
                userSelect:    'none',
              }}
            >
              GIVE UP
            </button>
          )
        })()}

        {/* Check — only during active game */}
        {isPlaying && (() => {
          const c = keyColors('primary')
          return (
            <button
              onClick={onCheck}
              className="g24-btn"
              style={{
                flex:          2,
                height:        50,
                fontFamily:    'Orbitron, monospace',
                fontSize:      '0.58rem',
                fontWeight:    700,
                letterSpacing: '0.14em',
                border:        `1px solid ${c.border}`,
                borderRadius:  8,
                background:    c.bg,
                color:         c.color,
                cursor:        canCheck ? 'pointer' : 'default',
                transition:    'all 0.15s ease',
                userSelect:    'none',
                boxShadow:     canCheck ? '0 0 16px var(--accent-dim)' : 'none',
              }}
            >
              ✓ &nbsp;CHECK
            </button>
          )
        })()}

        {/* New Game — shown when game is over */}
        {isOver && (() => {
          const c = keyColors('new')
          return (
            <button
              onClick={onNewGame}
              className="g24-btn"
              style={{
                flex:          1,
                height:        50,
                fontFamily:    'Orbitron, monospace',
                fontSize:      '0.52rem',
                fontWeight:    700,
                letterSpacing: '0.12em',
                border:        `1px solid ${c.border}`,
                borderRadius:  8,
                background:    c.bg,
                color:         c.color,
                cursor:        'pointer',
                transition:    'all 0.15s ease',
                userSelect:    'none',
                boxShadow:     '0 0 16px var(--accent-dim)',
              }}
            >
              ↺ &nbsp;NEW GAME
            </button>
          )
        })()}
      </div>
    </div>
  )
}
