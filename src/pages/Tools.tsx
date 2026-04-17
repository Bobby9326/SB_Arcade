import { ToolCard } from '../components/GameCard'
import { toolsData } from '../data/cards'

export default function Tools() {
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
              02 — Tools
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
            Creative <span className="gradient-text">Tools</span>
          </h1>
          <p
            className="font-rajdhani text-lg mt-3 max-w-xl"
            style={{ color: 'var(--text-secondary)', fontWeight: 400 }}
          >
            Powerful browser-based tools for creativity and fun — no sign-up required.
          </p>
        </div>

        {/* Cards Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-5 max-w-2xl">
          {toolsData.map((tool, i) => (
            <ToolCard key={tool.id} item={tool} index={i} />
          ))}
        </div>
      </div>
    </div>
  )
}
