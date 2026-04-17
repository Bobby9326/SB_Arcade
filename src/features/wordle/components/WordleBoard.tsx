import { FLIP_DURATION, FLIP_GAP } from '../constants/wordle.constants'
import { getTileStyle } from '../utils/getTileStyle'
import type { TileStatus, GameStatus } from '../types/wordle.types'

interface WordleBoardProps {
  board:        string[][]
  tileStatuses: TileStatus[][]
  revealingRow: number | null
  shakingRow:   number | null
  bounceRow:    number | null
  popTile:      string | null
  gameStatus:   GameStatus
  targetWord:   string
}

export function WordleBoard({
  board,
  tileStatuses,
  revealingRow,
  shakingRow,
  bounceRow,
  popTile,
  gameStatus,
  targetWord,
}: WordleBoardProps) {
  return (
    <>
      {/* Grid container */}
      <div
        style={{
          padding:      '1.25rem',
          background:   'rgba(255,255,255,0.018)',
          borderRadius: 16,
          border:       '1px solid var(--border)',
          boxShadow:    '0 4px 48px rgba(0,0,0,0.35)',
          animation:    'wordle-slide-up 0.5s 0.1s ease both',
        }}
      >
        <div style={{ display: 'flex', flexDirection: 'column', gap: 6 }}>
          {board.map((row, rowIdx) => {
            const isShaking   = shakingRow   === rowIdx
            const isBouncing  = bounceRow    === rowIdx
            const isRevealRow = revealingRow === rowIdx

            return (
              <div
                key={rowIdx}
                style={{
                  display:   'flex',
                  gap:       6,
                  animation: isShaking ? 'wordle-shake 0.65s ease' : undefined,
                }}
              >
                {row.map((letter, colIdx) => {
                  const status    = tileStatuses[rowIdx][colIdx]
                  const colors    = getTileStyle(status)
                  const isPopping = popTile === `${rowIdx}-${colIdx}`

                  let anim: string | undefined
                  if (isRevealRow) {
                    anim = `wordle-flip ${FLIP_DURATION}ms ease ${colIdx * FLIP_GAP}ms both`
                  } else if (isPopping) {
                    anim = 'wordle-pop 0.14s ease'
                  } else if (isBouncing) {
                    anim = `wordle-bounce 0.55s ease ${colIdx * 75}ms both`
                  }

                  return (
                    <div
                      key={colIdx}
                      style={{
                        width:       58,
                        height:      58,
                        display:     'flex',
                        alignItems:  'center',
                        justifyContent: 'center',
                        fontSize:    '1.45rem',
                        fontWeight:  800,
                        fontFamily:  'Orbitron, monospace',
                        letterSpacing: '0.02em',
                        border:      `2px solid ${colors.border}`,
                        borderRadius: 8,
                        background:  colors.bg,
                        color:       colors.color,
                        boxShadow:   colors.shadow,
                        animation:   anim,
                        userSelect:  'none',
                        transition:  status === 'tbd' ? 'border-color 0.08s ease' : 'none',
                        willChange:  isRevealRow ? 'transform' : 'auto',
                      }}
                    >
                      {letter}
                    </div>
                  )
                })}
              </div>
            )
          })}
        </div>
      </div>

      {/* Game-over badge */}
      {(gameStatus === 'won' || gameStatus === 'lost') && (
        <div
          style={{
            textAlign:  'center',
            animation:  'wordle-slide-up 0.5s ease both',
            display:    'flex',
            flexDirection: 'column',
            alignItems: 'center',
            gap:        '0.5rem',
          }}
        >
          <div style={{
            fontFamily:    'Orbitron, monospace',
            fontSize:      '0.55rem',
            letterSpacing: '0.25em',
            color:         gameStatus === 'won' ? '#22C55E' : 'var(--text-muted)',
            padding:       '6px 16px',
            border:        `1px solid ${gameStatus === 'won' ? 'rgba(34,197,94,0.3)' : 'var(--border)'}`,
            borderRadius:  99,
            background:    gameStatus === 'won' ? 'rgba(34,197,94,0.08)' : 'transparent',
          }}>
            {gameStatus === 'won' ? '— VICTORY —' : '— GAME OVER —'}
          </div>

          {gameStatus === 'lost' && (
            <p style={{
              fontFamily: 'Rajdhani, sans-serif',
              fontSize:   '0.9rem',
              color:      'var(--text-secondary)',
              margin:     0,
            }}>
              The word was&nbsp;
              <span style={{
                color:      'var(--accent)',
                fontFamily: 'Orbitron, monospace',
                fontWeight: 700,
              }}>
                {targetWord}
              </span>
            </p>
          )}
        </div>
      )}
    </>
  )
}
