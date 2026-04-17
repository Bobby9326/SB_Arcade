import type { ExprToken, GameStatus } from '../types/game24.types'

interface Game24DisplayProps {
  expr:        ExprToken[]
  evalResult:  number | null
  evalError:   string | null
  solution:    string
  gameStatus:  GameStatus
  isShaking:   boolean
}

/* ─── Tokenize solver solution string for coloured display ─── */
interface SolToken { value: string; kind: 'num' | 'op' | 'paren' }

function parseSolution(sol: string): SolToken[] {
  const tokens: SolToken[] = []
  let i = 0
  while (i < sol.length) {
    if (sol[i] === ' ') { i++; continue }
    if (/\d/.test(sol[i])) {
      let num = ''
      while (i < sol.length && /\d/.test(sol[i])) num += sol[i++]
      tokens.push({ value: num, kind: 'num' })
    } else if ('+-×÷'.includes(sol[i])) {
      tokens.push({ value: sol[i++], kind: 'op' })
    } else {
      tokens.push({ value: sol[i++], kind: 'paren' })
    }
  }
  return tokens
}

function solTokenColor(kind: SolToken['kind']): string {
  if (kind === 'num')   return '#F97316'
  if (kind === 'op')    return 'var(--text-primary)'
  return '#555'
}

export function Game24Display({
  expr,
  evalResult,
  evalError,
  solution,
  gameStatus,
  isShaking,
}: Game24DisplayProps) {

  const isEmpty = expr.length === 0

  return (
    <div style={{ width: '100%', maxWidth: 380, animation: 'g24-slide-up 0.5s 0.12s ease both' }}>

      {/* ── Expression bar ── */}
      <div
        style={{
          minHeight:    62,
          padding:      '10px 16px',
          background:   'rgba(0,0,0,0.35)',
          border:       `1px solid ${evalError ? 'rgba(239,68,68,0.35)' : gameStatus === 'won' ? 'rgba(34,197,94,0.35)' : 'rgba(255,255,255,0.07)'}`,
          borderRadius: 10,
          display:      'flex',
          alignItems:   'center',
          flexWrap:     'wrap',
          gap:          '4px 2px',
          position:     'relative',
          animation:    isShaking ? 'g24-shake 0.62s ease' : undefined,
          boxShadow:    gameStatus === 'won'
            ? '0 0 20px rgba(34,197,94,0.2)'
            : 'inset 0 2px 8px rgba(0,0,0,0.3)',
          transition:   'border-color 0.2s ease, box-shadow 0.2s ease',
        }}
      >
        {isEmpty ? (
          <span style={{
            fontFamily:    'Rajdhani, sans-serif',
            fontSize:      '0.85rem',
            color:         'var(--text-muted)',
            letterSpacing: '0.06em',
            userSelect:    'none',
          }}>
            Click cards and operators to build your expression…
          </span>
        ) : (
          <>
            {expr.map((tok, i) => (
              <span
                key={i}
                style={{
                  fontFamily:  'Orbitron, monospace',
                  fontSize:    tok.type === 'number' ? '1.1rem' : '0.9rem',
                  fontWeight:  tok.type === 'number' ? 800 : 600,
                  color:
                    tok.type === 'number'
                      ? 'var(--accent)'
                      : tok.value === '(' || tok.value === ')'
                      ? '#555'
                      : 'var(--text-primary)',
                  letterSpacing: '0.02em',
                  lineHeight:  1,
                  padding:     tok.type === 'symbol' ? '0 3px' : '0 1px',
                  animation:   i === expr.length - 1 ? 'g24-token-in 0.15s ease' : undefined,
                }}
              >
                {tok.value}
              </span>
            ))}
            {/* Blinking cursor */}
            <span className="g24-cursor" style={{
              width:      2,
              height:     '1.1rem',
              background: 'var(--accent)',
              borderRadius: 1,
              display:    'inline-block',
              verticalAlign: 'middle',
            }} />
          </>
        )}
      </div>

      {/* ── Feedback row ── */}
      <div style={{ minHeight: 28, marginTop: '0.5rem', textAlign: 'center' }}>
        {gameStatus === 'won' && (
          <div style={{
            fontFamily:    'Orbitron, monospace',
            fontSize:      '0.7rem',
            fontWeight:    700,
            letterSpacing: '0.15em',
            color:         '#22C55E',
            animation:     'g24-win-badge 0.5s cubic-bezier(0.34,1.56,0.64,1) both',
          }}>
            = 24 &nbsp;✓ &nbsp;CORRECT!
          </div>
        )}

        {evalError && gameStatus !== 'won' && (
          <div style={{
            fontFamily:    'Rajdhani, sans-serif',
            fontSize:      '0.82rem',
            letterSpacing: '0.06em',
            color:         '#F87171',
            animation:     'g24-token-in 0.18s ease',
          }}>
            {evalError}
          </div>
        )}

        {!evalError && evalResult !== null && gameStatus !== 'won' && (
          <div style={{
            fontFamily: 'Orbitron, monospace',
            fontSize:   '0.6rem',
            color:      'var(--text-muted)',
          }}>
            = {evalResult}
          </div>
        )}
      </div>

      {/* ── Solution reveal (give up) ── */}
      {gameStatus === 'revealed' && (
        <div style={{
          marginTop:    '0.75rem',
          padding:      '12px 16px',
          background:   'rgba(249,115,22,0.06)',
          border:       '1px solid rgba(249,115,22,0.25)',
          borderRadius: 10,
          animation:    'g24-win-badge 0.45s cubic-bezier(0.34,1.56,0.64,1) both',
        }}>
          <div style={{
            fontFamily:    'Orbitron, monospace',
            fontSize:      '0.5rem',
            letterSpacing: '0.25em',
            color:         'var(--accent)',
            marginBottom:  '0.5rem',
          }}>
            SOLUTION
          </div>

          <div style={{ display: 'flex', flexWrap: 'wrap', gap: '2px 0', alignItems: 'center' }}>
            {parseSolution(solution).map((tok, i) => (
              <span
                key={i}
                style={{
                  fontFamily:    'Orbitron, monospace',
                  fontSize:      tok.kind === 'num' ? '1.05rem' : '0.85rem',
                  fontWeight:    tok.kind === 'num' ? 800 : 600,
                  color:         solTokenColor(tok.kind),
                  padding:       tok.kind === 'op' ? '0 5px' : tok.kind === 'paren' ? '0 2px' : '0 3px',
                  letterSpacing: '0.02em',
                  animation:     `g24-token-in 0.2s ${i * 0.04}s ease both`,
                }}
              >
                {tok.value}
              </span>
            ))}
            <span style={{
              fontFamily: 'Orbitron, monospace',
              fontSize:   '0.85rem',
              color:      '#22C55E',
              padding:    '0 0 0 6px',
            }}>
              = 24
            </span>
          </div>
        </div>
      )}
    </div>
  )
}
