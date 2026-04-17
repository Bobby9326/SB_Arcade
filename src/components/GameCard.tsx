import { useNavigate } from 'react-router-dom'
import type { CardItem } from '../data/cards'

interface GameCardProps {
  item: CardItem
  index: number
}

const difficultyColor: Record<string, string> = {
  Easy: '#22C55E',
  Medium: '#F97316',
  Hard: '#EF4444',
}

export const GameCard = ({ item, index }: GameCardProps) => {
  const navigate = useNavigate()

  const delay = index * 80

  return (
    <div
      className="game-card scanline p-6 flex flex-col gap-4 animate-fade-up"
      style={{ animationDelay: `${delay}ms`, animationFillMode: 'both', opacity: 0 }}
      onClick={() => navigate(item.path)}
      role="button"
      tabIndex={0}
      onKeyDown={e => e.key === 'Enter' && navigate(item.path)}
      aria-label={`Open ${item.title}`}
    >
      {/* Top Row */}
      <div className="flex items-start justify-between">
        {/* Icon */}
        <div
          className="icon-container w-14 h-14 rounded-xl flex items-center justify-center text-2xl"
          style={{
            background: `${item.color}15`,
            border: `1px solid ${item.color}30`,
          }}
        >
          {item.icon}
        </div>

        {/* Badges */}
        <div className="flex flex-col items-end gap-2">
          <span className={`badge ${item.category === 'game' ? 'badge-game' : 'badge-tool'}`}>
            {item.badge}
          </span>
          {item.difficulty && (
            <span
              className="badge"
              style={{
                background: `${difficultyColor[item.difficulty]}15`,
                borderColor: `${difficultyColor[item.difficulty]}40`,
                color: difficultyColor[item.difficulty],
              }}
            >
              {item.difficulty}
            </span>
          )}
        </div>
      </div>

      {/* Content */}
      <div className="flex flex-col gap-2 flex-1">
        <h3
          className="font-orbitron font-bold text-lg leading-tight"
          style={{ color: 'var(--text-primary)' }}
        >
          {item.title}
        </h3>
        <p
          className="font-rajdhani text-sm leading-relaxed flex-1"
          style={{ color: 'var(--text-secondary)', fontWeight: 400 }}
        >
          {item.description}
        </p>
      </div>

      {/* Tags */}
      <div className="flex flex-wrap gap-2">
        {item.tags.map(tag => (
          <span
            key={tag}
            className="text-xs px-2 py-0.5 rounded-md font-rajdhani font-medium"
            style={{
              background: 'var(--accent-dim)',
              color: 'var(--text-muted)',
              border: '1px solid var(--border)',
            }}
          >
            {tag}
          </span>
        ))}
      </div>

      {/* CTA Arrow */}
      <div className="flex items-center gap-2 mt-1 group/arrow">
        <span
          className="font-orbitron text-xs font-600 tracking-wider uppercase transition-colors duration-200"
          style={{ color: 'var(--accent)' }}
        >
          Play Now
        </span>
        <svg
          className="transition-transform duration-300 group-hover/arrow:translate-x-1.5"
          width="14"
          height="14"
          viewBox="0 0 14 14"
          fill="none"
          style={{ color: 'var(--accent)' }}
        >
          <path
            d="M1 7H13M13 7L7.5 1.5M13 7L7.5 12.5"
            stroke="currentColor"
            strokeWidth="1.5"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </svg>
      </div>
    </div>
  )
}

export const ToolCard = ({ item, index }: GameCardProps) => {
  const navigate = useNavigate()
  const delay = index * 80

  return (
    <div
      className="game-card scanline p-6 flex flex-col gap-4 animate-fade-up"
      style={{ animationDelay: `${delay}ms`, animationFillMode: 'both', opacity: 0 }}
      onClick={() => navigate(item.path)}
      role="button"
      tabIndex={0}
      onKeyDown={e => e.key === 'Enter' && navigate(item.path)}
      aria-label={`Open ${item.title}`}
    >
      <div className="flex items-start justify-between">
        <div
          className="icon-container w-14 h-14 rounded-xl flex items-center justify-center text-2xl"
          style={{
            background: `${item.color}15`,
            border: `1px solid ${item.color}30`,
          }}
        >
          {item.icon}
        </div>
        <span className="badge badge-tool">{item.badge}</span>
      </div>

      <div className="flex flex-col gap-2 flex-1">
        <h3
          className="font-orbitron font-bold text-lg leading-tight"
          style={{ color: 'var(--text-primary)' }}
        >
          {item.title}
        </h3>
        <p
          className="font-rajdhani text-sm leading-relaxed flex-1"
          style={{ color: 'var(--text-secondary)', fontWeight: 400 }}
        >
          {item.description}
        </p>
      </div>

      <div className="flex flex-wrap gap-2">
        {item.tags.map(tag => (
          <span
            key={tag}
            className="text-xs px-2 py-0.5 rounded-md font-rajdhani font-medium"
            style={{
              background: 'var(--accent-dim)',
              color: 'var(--text-muted)',
              border: '1px solid var(--border)',
            }}
          >
            {tag}
          </span>
        ))}
      </div>

      <div className="flex items-center gap-2 mt-1 group/arrow">
        <span
          className="font-orbitron text-xs font-600 tracking-wider uppercase transition-colors duration-200"
          style={{ color: item.color }}
        >
          Open Tool
        </span>
        <svg
          className="transition-transform duration-300 group-hover/arrow:translate-x-1.5"
          width="14"
          height="14"
          viewBox="0 0 14 14"
          fill="none"
          style={{ color: item.color }}
        >
          <path
            d="M1 7H13M13 7L7.5 1.5M13 7L7.5 12.5"
            stroke="currentColor"
            strokeWidth="1.5"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </svg>
      </div>
    </div>
  )
}
