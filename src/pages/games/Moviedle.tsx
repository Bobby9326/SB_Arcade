import { useMoviedle }          from '../../features/moviedle/hooks/useMoviedle'
import { MoviedleHeader }       from '../../features/moviedle/components/MoviedleHeader'
import { MoviedleSearch }       from '../../features/moviedle/components/MoviedleSearch'
import { MoviedleGuessRow }     from '../../features/moviedle/components/MoviedleGuessRow'
import { MoviedleWinModal }     from '../../features/moviedle/components/MoviedleWinModal'
import { MoviedleGiveUpModal }  from '../../features/moviedle/components/MoviedleGiveUpModal'
import { CELL_GRID, COLUMN_LABELS } from '../../features/moviedle/constants/moviedle.constants'

const MOVIEDLE_STYLES = `
  @keyframes md-slide-up {
    from { opacity: 0; transform: translateY(16px); }
    to   { opacity: 1; transform: translateY(0); }
  }
  @keyframes md-row-in {
    from { opacity: 0; transform: translateY(10px) scale(0.98); }
    to   { opacity: 1; transform: translateY(0)   scale(1); }
  }
  @keyframes md-backdrop-in {
    from { opacity: 0; }
    to   { opacity: 1; }
  }
  @keyframes md-modal-in {
    from { opacity: 0; transform: scale(0.88) translateY(20px); }
    to   { opacity: 1; transform: scale(1)    translateY(0); }
  }
  @keyframes md-badge-pop {
    from { opacity: 0; transform: scale(0.6); }
    60%  { transform: scale(1.1); }
    to   { opacity: 1; transform: scale(1); }
  }
  @keyframes md-spin {
    to { transform: rotate(360deg); }
  }
  @keyframes md-pulse {
    0%,100% { opacity: 1; }
    50%     { opacity: 0.4; }
  }
`

/* ── Column header row ── */
function ColumnHeaders() {
  return (
    <div
      style={{
        display:             'grid',
        gridTemplateColumns: CELL_GRID,
        gap:                 6,
        animation:           'md-slide-up 0.5s 0.18s ease both',
      }}
    >
      {COLUMN_LABELS.map(label => (
        <div
          key={label}
          style={{
            padding:       '6px 8px',
            textAlign:     'center',
            fontFamily:    'Orbitron, monospace',
            fontSize:      '0.44rem',
            fontWeight:    700,
            letterSpacing: '0.14em',
            color:         'var(--text-muted)',
            background:    'rgba(255,255,255,0.03)',
            border:        '1px solid rgba(255,255,255,0.05)',
            borderRadius:  6,
            userSelect:    'none',
          }}
        >
          {label}
        </div>
      ))}
    </div>
  )
}

export default function Moviedle() {
  const {
    target, guesses, gameStatus, dropdownItems,
    searchQuery, isSearching, isSubmitting,
    dropdownOpen, showWin, showGiveUp,
    setSearchQuery, setDropdownOpen,
    submitGuess, giveUp, newGame,
  } = useMoviedle()

  const isPlaying = gameStatus === 'playing'

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
      <style>{MOVIEDLE_STYLES}</style>

      {/* Header */}
      <MoviedleHeader
        guessCount={guesses.length}
        gameStatus={gameStatus}
        onGiveUp={giveUp}
        onNewGame={newGame}
      />

      {/* Loading state */}
      {gameStatus === 'loading' && (
        <div style={{
          display:    'flex',
          alignItems: 'center',
          gap:        10,
          fontFamily: 'Orbitron, monospace',
          fontSize:   '0.55rem',
          color:      'var(--text-muted)',
          letterSpacing: '0.2em',
          animation:  'md-pulse 1.4s ease infinite',
        }}>
          <div style={{
            width: 18, height: 18,
            border: '2px solid rgba(249,115,22,0.2)',
            borderTopColor: 'var(--accent)',
            borderRadius: '50%',
            animation: 'md-spin 0.8s linear infinite',
          }} />
          LOADING MOVIE…
        </div>
      )}

      {/* Search input */}
      {isPlaying && (
        <div style={{ width: '100%', maxWidth: 520, animation: 'md-slide-up 0.5s 0.1s ease both' }}>
          <MoviedleSearch
            query={searchQuery}
            dropdownItems={dropdownItems}
            isSearching={isSearching}
            isSubmitting={isSubmitting}
            dropdownOpen={dropdownOpen}
            disabled={!isPlaying || isSubmitting}
            onQueryChange={setSearchQuery}
            onOpenChange={setDropdownOpen}
            onSelect={submitGuess}
          />
        </div>
      )}

      {/* Guess board */}
      {guesses.length > 0 && (
        <div
          style={{
            width:    '100%',
            maxWidth: 900,
            padding:  '0 1rem',
            overflowX: 'auto',
          }}
        >
          {/* Min-width wrapper so it scrolls on mobile */}
          <div style={{ minWidth: 660, display: 'flex', flexDirection: 'column', gap: 6 }}>
            <ColumnHeaders />
            {guesses.map((g, i) => (
              <MoviedleGuessRow key={g.movie.id} comparison={g} index={i} />
            ))}
          </div>
        </div>
      )}

      {/* Empty state hint */}
      {isPlaying && guesses.length === 0 && (
        <p style={{
          fontFamily:    'Rajdhani, sans-serif',
          fontSize:      '0.82rem',
          color:         'var(--text-muted)',
          letterSpacing: '0.06em',
          textAlign:     'center',
          maxWidth:      360,
          lineHeight:    1.7,
          animation:     'md-slide-up 0.5s 0.25s ease both',
        }}>
          Type a movie title above to make your first guess.<br/>
          Clues will appear after each attempt.
        </p>
      )}

      {/* Win modal */}
      {showWin && target && (
        <MoviedleWinModal
          target={target}
          guessCount={guesses.length}
          onNewGame={newGame}
        />
      )}

      {/* Give up modal */}
      {showGiveUp && target && (
        <MoviedleGiveUpModal
          target={target}
          onNewGame={newGame}
        />
      )}
    </div>
  )
}
