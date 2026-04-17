import { KEYBOARD_ROWS } from '../constants/wordle.constants'
import { getKeyStyle } from '../utils/getKeyStyle'
import type { TileStatus, GameStatus } from '../types/wordle.types'

interface WordleKeyboardProps {
  keyStatuses:    Record<string, TileStatus>
  isInputBlocked: boolean
  gameStatus:     GameStatus
  onKeyClick:     (key: string) => void
}

export function WordleKeyboard({
  keyStatuses,
  isInputBlocked,
  gameStatus,
  onKeyClick,
}: WordleKeyboardProps) {
  return (
    <div
      style={{
        display:       'flex',
        flexDirection: 'column',
        gap:           7,
        alignItems:    'center',
        animation:     'wordle-slide-up 0.5s 0.15s ease both',
      }}
    >
      {KEYBOARD_ROWS.map((keys, rowIdx) => (
        <div key={rowIdx} style={{ display: 'flex', gap: 5 }}>
          {keys.map(key => {
            const kStatus  = key.length === 1 ? keyStatuses[key] : undefined
            const kColors  = getKeyStyle(kStatus)
            const isWide   = key === 'ENTER' || key === '⌫'

            return (
              <button
                key={key}
                onClick={() => onKeyClick(key)}
                disabled={isInputBlocked}
                className="wk"
                style={{
                  minWidth:      isWide ? 68 : 40,
                  height:        56,
                  padding:       '0 6px',
                  display:       'flex',
                  alignItems:    'center',
                  justifyContent: 'center',
                  fontSize:      isWide ? '0.5rem' : '0.78rem',
                  fontWeight:    700,
                  fontFamily:    'Orbitron, monospace',
                  letterSpacing: isWide ? '0.06em' : '0.04em',
                  border:        `1px solid ${kColors.border}`,
                  borderRadius:  7,
                  background:    kColors.bg,
                  color:         kColors.color,
                  cursor:        isInputBlocked ? 'default' : 'pointer',
                  opacity:       isInputBlocked && gameStatus === 'idle' ? 0.4 : 1,
                  boxShadow:     kColors.shadow || 'inset 0 1px 0 rgba(255,255,255,0.05)',
                  transition:    'all 0.15s ease',
                  userSelect:    'none',
                }}
              >
                {key}
              </button>
            )
          })}
        </div>
      ))}
    </div>
  )
}
