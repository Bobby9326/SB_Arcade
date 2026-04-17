import { useWordle }       from '../../features/wordle/hooks/useWordle'
import { WordleToast }     from '../../features/wordle/components/WordleToast'
import { WordleHeader }    from '../../features/wordle/components/WordleHeader'
import { WordleBoard }     from '../../features/wordle/components/WordleBoard'
import { WordleKeyboard }  from '../../features/wordle/components/WordleKeyboard'

/* ─── CSS animations injected once at the page root ─── */
const WORDLE_STYLES = `
  @keyframes wordle-flip {
    0%   { transform: scaleY(1); }
    49%  { transform: scaleY(0.02); }
    50%  { transform: scaleY(0); }
    51%  { transform: scaleY(0.02); }
    100% { transform: scaleY(1); }
  }
  @keyframes wordle-pop {
    0%   { transform: scale(1); }
    55%  { transform: scale(1.12); }
    100% { transform: scale(1); }
  }
  @keyframes wordle-shake {
    0%,100% { transform: translateX(0); }
    15%  { transform: translateX(-8px); }
    30%  { transform: translateX(8px); }
    45%  { transform: translateX(-8px); }
    60%  { transform: translateX(8px); }
    75%  { transform: translateX(-4px); }
    90%  { transform: translateX(4px); }
  }
  @keyframes wordle-bounce {
    0%,20%,50%,80%,100% { transform: translateY(0); }
    40% { transform: translateY(-18px); }
    60% { transform: translateY(-9px); }
  }
  @keyframes wordle-toast-in {
    from { opacity: 0; transform: translateX(-50%) translateY(-10px) scale(0.96); }
    to   { opacity: 1; transform: translateX(-50%) translateY(0)     scale(1); }
  }
  @keyframes wordle-toast-out {
    from { opacity: 1; }
    to   { opacity: 0; }
  }
  @keyframes wordle-slide-up {
    from { opacity: 0; transform: translateY(16px); }
    to   { opacity: 1; transform: translateY(0); }
  }
  .wk:hover:not(:disabled) {
    filter: brightness(1.22);
    transform: translateY(-1px);
  }
  .wk:active:not(:disabled) {
    filter: brightness(0.88);
    transform: translateY(0) scale(0.97);
  }
`

export default function Wordle() {
  const {
    board, tileStatuses, currentRow, keyStatuses, targetWord,
    gameStatus, isLoading, isChecking, isRevealing,
    revealingRow, shakingRow, bounceRow, popTile,
    toastMsg, toastVisible,
    fetchWord, handleKeyClick,
  } = useWordle()

  const isInputBlocked = isRevealing || isChecking || isLoading || gameStatus === 'idle'

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
        gap:           '1.25rem',
      }}
    >
      <style>{WORDLE_STYLES}</style>

      <WordleToast msg={toastMsg} visible={toastVisible} />

      <WordleHeader
        gameStatus={gameStatus}
        currentRow={currentRow}
        isLoading={isLoading}
        isChecking={isChecking}
        isRevealing={isRevealing}
        onFetchWord={fetchWord}
      />

      <WordleBoard
        board={board}
        tileStatuses={tileStatuses}
        revealingRow={revealingRow}
        shakingRow={shakingRow}
        bounceRow={bounceRow}
        popTile={popTile}
        gameStatus={gameStatus}
        targetWord={targetWord}
      />

      <WordleKeyboard
        keyStatuses={keyStatuses}
        isInputBlocked={isInputBlocked}
        gameStatus={gameStatus}
        onKeyClick={handleKeyClick}
      />

      {/* Idle hint */}
      {gameStatus === 'idle' && (
        <p style={{
          fontFamily:    'Rajdhani, sans-serif',
          fontSize:      '0.82rem',
          color:         'var(--text-muted)',
          letterSpacing: '0.06em',
          textAlign:     'center',
          maxWidth:      300,
          lineHeight:    1.6,
          animation:     'wordle-slide-up 0.5s 0.2s ease both',
        }}>
          Press&nbsp;
          <span style={{ color: 'var(--accent)' }}>Start Game</span>
          &nbsp;to fetch a random 5-letter word.
          Use the keyboard or click the keys below to guess.
        </p>
      )}
    </div>
  )
}
