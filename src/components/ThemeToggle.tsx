import { useTheme } from '../contexts/ThemeContext'

export const ThemeToggle = () => {
  const { isDark, toggleTheme } = useTheme()

  return (
    <button
      onClick={toggleTheme}
      aria-label="Toggle theme"
      className="relative flex items-center justify-center w-10 h-10 rounded-xl border transition-all duration-300 group"
      style={{
        background: 'var(--bg-card)',
        borderColor: 'var(--border)',
      }}
    >
      <span className="text-lg transition-transform duration-300 group-hover:scale-110">
        {isDark ? '☀️' : '🌙'}
      </span>
      <span
        className="absolute inset-0 rounded-xl opacity-0 group-hover:opacity-100 transition-opacity duration-300"
        style={{ boxShadow: '0 0 15px var(--accent-glow)' }}
      />
    </button>
  )
}
