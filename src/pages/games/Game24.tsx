import { useGame24 }        from '../../features/game24/hooks/useGame24'
import { Game24Header }     from '../../features/game24/components/Game24Header'
import { Game24Cards }      from '../../features/game24/components/Game24Cards'
import { Game24Display }    from '../../features/game24/components/Game24Display'
import { Game24Keypad }     from '../../features/game24/components/Game24Keypad'

/* ─── CSS animations injected once at the page root ─── */
const GAME24_STYLES = `
  @keyframes g24-slide-up {
    from { opacity: 0; transform: translateY(18px); }
    to   { opacity: 1; transform: translateY(0); }
  }
  @keyframes g24-shake {
    0%,100% { transform: translateX(0); }
    15%  { transform: translateX(-7px); }
    30%  { transform: translateX(7px); }
    45%  { transform: translateX(-7px); }
    60%  { transform: translateX(7px); }
    75%  { transform: translateX(-3px); }
    90%  { transform: translateX(3px); }
  }
  @keyframes g24-win-badge {
    0%   { opacity: 0; transform: scale(0.7); }
    60%  { transform: scale(1.08); }
    100% { opacity: 1; transform: scale(1); }
  }
  @keyframes g24-token-in {
    from { opacity: 0; transform: scale(0.6) translateY(4px); }
    to   { opacity: 1; transform: scale(1) translateY(0); }
  }
  @keyframes g24-cursor-blink {
    0%,100% { opacity: 1; }
    50%     { opacity: 0; }
  }
  .g24-cursor {
    animation: g24-cursor-blink 1.1s ease infinite;
  }
  .g24-btn:hover:not(:disabled) {
    filter:    brightness(1.28);
    transform: translateY(-1px);
  }
  .g24-btn:active:not(:disabled) {
    filter:    brightness(0.85);
    transform: translateY(0) scale(0.96);
  }
  .g24-card:hover {
    border-color: rgba(249,115,22,0.45) !important;
    box-shadow:   0 4px 24px rgba(249,115,22,0.18) !important;
    transform:    translateY(-3px) scale(1.03);
  }
  .g24-card:active {
    transform: translateY(0) scale(0.98);
  }
`

export default function Game24() {
  const {
    numbers, expr, usedIndices, gameStatus,
    evalResult, evalError, solution, solvedCount, isShaking,
    newGame, placeNumber, placeSymbol, backspace, clear, check, giveUp,
  } = useGame24()

  const canCheck = expr.filter(t => t.type === 'number').length === 4

  return (
    <div
      className="grid-bg"
      style={{
        minHeight:     '100vh',
        background:    'var(--bg-primary)',
        paddingTop:    '5.5rem',
        paddingBottom: '3rem',
        display:       'flex',
        flexDirection: 'column',
        alignItems:    'center',
        gap:           '1.5rem',
      }}
    >
      <style>{GAME24_STYLES}</style>

      <Game24Header solvedCount={solvedCount} />

      <Game24Cards
        numbers={numbers}
        usedIndices={usedIndices}
        onCardClick={placeNumber}
        disabled={gameStatus !== 'playing'}
      />

      <Game24Display
        expr={expr}
        evalResult={evalResult}
        evalError={evalError}
        solution={solution}
        gameStatus={gameStatus}
        isShaking={isShaking}
      />

      <Game24Keypad
        gameStatus={gameStatus}
        canCheck={canCheck}
        onSymbol={placeSymbol}
        onBackspace={backspace}
        onClear={clear}
        onCheck={check}
        onGiveUp={giveUp}
        onNewGame={newGame}
      />
    </div>
  )
}
