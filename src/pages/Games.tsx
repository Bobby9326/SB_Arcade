import { GameCard } from '../components/GameCard'
import { gamesData } from '../data/cards'

export default function Games() {
  return (
    <div
      className="min-h-screen grid-bg pt-24 pb-20 px-4 sm:px-6 lg:px-8"
      style={{ background: 'var(--bg-primary)' }}
    >
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="mb-12 animate-fade-up" style={{ animationFillMode: 'both', opacity: 0 }}>
          <div className="flex items-center gap-3 mb-3">
            <div className="section-line w-6" />
            <span
              className="font-orbitron text-xs font-700 tracking-widest uppercase"
              style={{ color: 'var(--accent)' }}
            >
              01 — Games
            </span>
          </div>
          <h1
            className="font-orbitron font-black"
            style={{
              fontSize: 'clamp(2rem, 5vw, 3.5rem)',
              color: 'var(--text-primary)',
              lineHeight: 1.1,
            }}
          >
            Mini <span className="gradient-text">Games</span>
          </h1>
          <p
            className="font-rajdhani text-lg mt-3 max-w-xl"
            style={{ color: 'var(--text-secondary)', fontWeight: 400 }}
          >
            Challenge yourself with our collection of mini games — from word puzzles to football trivia.
          </p>
        </div>

        {/* Cards Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
          {gamesData.map((game, i) => (
            <GameCard key={game.id} item={game} index={i} />
          ))}
        </div>
      </div>
    </div>
  )
}
