import { Link } from 'react-router-dom'
import { GameCard, ToolCard } from '../components/GameCard'
import { gamesData, toolsData } from '../data/cards'

const SectionHeader = ({
  title,
  subtitle,
  linkTo,
  linkLabel,
}: {
  title: string
  subtitle: string
  linkTo: string
  linkLabel: string
}) => (
  <div className="flex items-end justify-between mb-8">
    <div className="flex flex-col gap-2">
      <div className="flex items-center gap-3">
        <div className="section-line w-6" />
        <span
          className="font-orbitron text-xs font-700 tracking-widest uppercase"
          style={{ color: 'var(--accent)' }}
        >
          {subtitle}
        </span>
      </div>
      <h2 className="section-title text-2xl sm:text-3xl">{title}</h2>
    </div>
    <Link
      to={linkTo}
      className="hidden sm:flex items-center gap-2 font-orbitron text-xs tracking-wider uppercase transition-all duration-200 group"
      style={{ color: 'var(--text-muted)' }}
    >
      <span className="group-hover:text-accent transition-colors" style={{ color: 'inherit' }}>
        {linkLabel}
      </span>
      <svg
        className="transition-transform duration-300 group-hover:translate-x-1"
        width="12"
        height="12"
        viewBox="0 0 14 14"
        fill="none"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      >
        <path d="M1 7H13M13 7L7.5 1.5M13 7L7.5 12.5" />
      </svg>
    </Link>
  </div>
)

export default function Home() {
  return (
    <div
      className="min-h-screen grid-bg"
      style={{ background: 'var(--bg-primary)' }}
    >
      {/* ── HERO ── */}
      <section className="relative pt-32 pb-20 px-4 sm:px-6 lg:px-8 overflow-hidden">
        {/* Ambient orbs */}
        <div
          className="hero-orb w-96 h-96 opacity-20"
          style={{
            background: 'radial-gradient(circle, #F97316 0%, transparent 70%)',
            top: '-80px',
            right: '-80px',
          }}
        />
        <div
          className="hero-orb w-64 h-64 opacity-10"
          style={{
            background: 'radial-gradient(circle, #3B82F6 0%, transparent 70%)',
            bottom: '0px',
            left: '10%',
          }}
        />

        <div className="max-w-7xl mx-auto relative">
          <div className="max-w-3xl">
            {/* Eyebrow */}
            <div
              className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full mb-6 animate-fade-in"
              style={{
                background: 'var(--accent-dim)',
                border: '1px solid var(--border-accent)',
                animationDelay: '0ms',
              }}
            >
              <span
                className="w-1.5 h-1.5 rounded-full"
                style={{
                  background: 'var(--accent)',
                  boxShadow: '0 0 6px var(--accent-glow)',
                  animation: 'pulse-glow 2s ease-in-out infinite',
                }}
              />
              <span
                className="font-orbitron text-xs font-600 tracking-widest uppercase"
                style={{ color: 'var(--accent)' }}
              >
                Portfolio — SB Arcade
              </span>
            </div>

            {/* Headline */}
            <h1
              className="font-orbitron font-black mb-4 animate-fade-up leading-none"
              style={{
                fontSize: 'clamp(2.5rem, 6vw, 5rem)',
                animationDelay: '80ms',
                animationFillMode: 'both',
                opacity: 0,
              }}
            >
              <span style={{ color: 'var(--text-primary)' }}>PLAY.</span>
              <br />
              <span className="gradient-text text-glow">CREATE.</span>
              <br />
              <span style={{ color: 'var(--text-primary)' }}>EXPLORE.</span>
            </h1>

            {/* Subtitle */}
            <p
              className="font-rajdhani text-lg sm:text-xl max-w-xl animate-fade-up"
              style={{
                color: 'var(--text-secondary)',
                animationDelay: '160ms',
                animationFillMode: 'both',
                opacity: 0,
                fontWeight: 400,
                lineHeight: 1.6,
              }}
            >
              A collection of mini games and creative tools — built as a portfolio showcase.
              Dive in, explore, and have fun.
            </p>

            {/* CTA Buttons */}
            <div
              className="flex flex-wrap gap-4 mt-8 animate-fade-up"
              style={{ animationDelay: '240ms', animationFillMode: 'both', opacity: 0 }}
            >
              <Link
                to="/games"
                className="flex items-center gap-2 px-6 py-3 rounded-xl font-orbitron text-sm font-bold tracking-wider uppercase transition-all duration-300 hover:scale-105"
                style={{
                  background: 'linear-gradient(135deg, #F97316, #FB923C)',
                  color: '#fff',
                  boxShadow: '0 4px 20px var(--accent-glow)',
                }}
              >
                🎮 Browse Games
              </Link>
              <Link
                to="/tools"
                className="flex items-center gap-2 px-6 py-3 rounded-xl font-orbitron text-sm font-bold tracking-wider uppercase transition-all duration-300 hover:scale-105"
                style={{
                  background: 'var(--bg-card)',
                  color: 'var(--text-primary)',
                  border: '1px solid var(--border)',
                }}
              >
                🛠️ Open Tools
              </Link>
            </div>
          </div>

          {/* Stats Bar */}
          <div
            className="flex flex-wrap gap-6 mt-14 pt-8 animate-fade-up"
            style={{
              borderTop: '1px solid var(--border)',
              animationDelay: '320ms',
              animationFillMode: 'both',
              opacity: 0,
            }}
          >
            {[
              { value: '4', label: 'Mini Games' },
              { value: '2', label: 'Creative Tools' },
              { value: '∞', label: 'Fun Factor' },
            ].map(stat => (
              <div key={stat.label} className="flex flex-col gap-0.5">
                <span
                  className="font-orbitron font-black text-3xl gradient-text"
                >
                  {stat.value}
                </span>
                <span
                  className="font-rajdhani text-sm font-500"
                  style={{ color: 'var(--text-muted)' }}
                >
                  {stat.label}
                </span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── GAMES SECTION ── */}
      <section className="px-4 sm:px-6 lg:px-8 pb-16">
        <div className="max-w-7xl mx-auto">
          <SectionHeader
            title="Mini Games"
            subtitle="01 — Games"
            linkTo="/games"
            linkLabel="View All"
          />
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
            {gamesData.map((game, i) => (
              <GameCard key={game.id} item={game} index={i} />
            ))}
          </div>
        </div>
      </section>

      {/* ── TOOLS SECTION ── */}
      <section className="px-4 sm:px-6 lg:px-8 pb-24">
        <div className="max-w-7xl mx-auto">
          <SectionHeader
            title="Creative Tools"
            subtitle="02 — Tools"
            linkTo="/tools"
            linkLabel="View All"
          />
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-5 max-w-2xl">
            {toolsData.map((tool, i) => (
              <ToolCard key={tool.id} item={tool} index={i} />
            ))}
          </div>
        </div>
      </section>

    </div>
  )
}
