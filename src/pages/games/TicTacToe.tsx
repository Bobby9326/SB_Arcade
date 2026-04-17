import { useTicTacToe }       from '../../features/tictactoe/hooks/useTicTacToe'
import { TttScoreboard }      from '../../features/tictactoe/components/TttScoreboard'
import { TttCoinFlip }        from '../../features/tictactoe/components/TttCoinFlip'
import { TttStatusBar }       from '../../features/tictactoe/components/TttStatusBar'
import { TttBoard }           from '../../features/tictactoe/components/TttBoard'
import { TttSymbolLegend }    from '../../features/tictactoe/components/TttSymbolLegend'
import { TttKeyboardHint }    from '../../features/tictactoe/components/TttKeyboardHint'

const TTT_STYLES = `
  @keyframes ttt-place {
    0%   { transform: scale(0.4); opacity: 0; }
    65%  { transform: scale(1.18); }
    100% { transform: scale(1); opacity: 1; }
  }
  @keyframes ttt-win-pulse-green {
    0%,100% { filter: drop-shadow(0 0 6px rgba(34,197,94,0.7)); }
    50%     { filter: drop-shadow(0 0 18px rgba(34,197,94,1)) drop-shadow(0 0 32px rgba(34,197,94,0.4)); }
  }
  @keyframes ttt-win-pulse-blue {
    0%,100% { filter: drop-shadow(0 0 6px rgba(96,165,250,0.7)); }
    50%     { filter: drop-shadow(0 0 18px rgba(96,165,250,1)) drop-shadow(0 0 32px rgba(96,165,250,0.4)); }
  }
  @keyframes ttt-slide-up {
    from { opacity: 0; transform: translateY(18px); }
    to   { opacity: 1; transform: translateY(0); }
  }
  @keyframes ttt-result-in {
    0%   { opacity: 0; transform: scale(0.65); }
    65%  { transform: scale(1.08); }
    100% { opacity: 1; transform: scale(1); }
  }
  @keyframes ttt-flip-char {
    0%   { opacity: 0; transform: scaleY(0.2); }
    100% { opacity: 1; transform: scaleY(1); }
  }
  @keyframes ttt-thinking-dot {
    0%,80%,100% { transform: scale(0); opacity: 0.3; }
    40%         { transform: scale(1); opacity: 1; }
  }
  @keyframes ttt-glow-in {
    from { opacity: 0; transform: scale(0.92); }
    to   { opacity: 1; transform: scale(1); }
  }
  .ttt-cell {
    transition: border-color 0.15s ease, background 0.15s ease, box-shadow 0.2s ease, opacity 0.2s ease;
  }
  .ttt-cell:hover {
    border-color: rgba(249,115,22,0.3) !important;
  }
  .ttt-cell-canplay:hover {
    background: rgba(249,115,22,0.04) !important;
  }
  .ttt-key-btn {
    transition: all 0.15s ease;
  }
  .ttt-key-btn:hover:not(:disabled) {
    filter: brightness(1.2);
    transform: translateY(-1px);
  }
  .ttt-key-btn:active:not(:disabled) {
    filter: brightness(0.85);
    transform: scale(0.97);
  }
`

export default function TicTacToe() {
  const {
    board, pSym, bSym, turn, status, winLine, scores,
    flipDisp, flipResult, thinking, selCell, hoverCell, lastPlaced, flipKey,
    startGame, placePlayer, setHoverCell,
  } = useTicTacToe()

  const showBoard = status === 'playing' || status === 'won' || status === 'lost' || status === 'draw'

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
        gap:           '1.1rem',
      }}
    >
      <style>{TTT_STYLES}</style>

      {/* Header */}
      <div style={{ textAlign: 'center', animation: 'ttt-slide-up 0.5s ease both' }}>
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
            fontSize:      'clamp(1.6rem, 5vw, 2.6rem)',
            fontWeight:    900,
            letterSpacing: '0.12em',
            margin:        0,
            lineHeight:    1,
          }}
        >
          TIC TAC TOE
        </h1>
        <p style={{
          fontFamily:    'Rajdhani, sans-serif',
          fontSize:      '0.74rem',
          color:         'var(--text-muted)',
          letterSpacing: '0.2em',
          marginTop:     '0.38rem',
          textTransform: 'uppercase',
        }}>
          Minimax AI · Unbeatable
        </p>
      </div>

      <TttScoreboard scores={scores} />

      {status === 'flipping' && (
        <TttCoinFlip
          flipKey={flipKey}
          flipDisp={flipDisp}
          flipResult={flipResult}
        />
      )}

      {showBoard && (
        <TttStatusBar
          status={status}
          thinking={thinking}
          pSym={pSym}
          bSym={bSym}
        />
      )}

      {showBoard && (
        <TttBoard
          board={board}
          pSym={pSym}
          status={status}
          turn={turn}
          winLine={winLine}
          lastPlaced={lastPlaced}
          selCell={selCell}
          hoverCell={hoverCell}
          onPlace={placePlayer}
          onHoverIn={setHoverCell}
          onHoverOut={() => setHoverCell(null)}
        />
      )}

      {pSym && showBoard && (
        <TttSymbolLegend pSym={pSym} bSym={bSym} />
      )}

      {/* Start / New Game button */}
      <button
        onClick={startGame}
        disabled={status === 'flipping' || thinking}
        className="ttt-key-btn"
        style={{
          fontFamily:    'Orbitron, monospace',
          fontSize:      '0.6rem',
          fontWeight:    700,
          letterSpacing: '0.18em',
          padding:       '10px 28px',
          border:        '1px solid var(--border-accent)',
          borderRadius:  8,
          background:    'var(--accent-dim)',
          color:         'var(--accent)',
          cursor:        (status === 'flipping' || thinking) ? 'not-allowed' : 'pointer',
          opacity:       (status === 'flipping' || thinking) ? 0.5 : 1,
          boxShadow:     '0 0 18px var(--accent-dim)',
          animation:     'ttt-slide-up 0.5s 0.1s ease both',
        }}
      >
        {status === 'idle'     ? '▶  START GAME'  :
         status === 'flipping' ? '⟳  DECIDING...' :
                                 '↺  NEW GAME'}
      </button>

      {status !== 'idle' && status !== 'flipping' && (
        <TttKeyboardHint board={board} pSym={pSym} selCell={selCell} />
      )}
    </div>
  )
}
