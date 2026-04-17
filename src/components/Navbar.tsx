import { useState } from 'react'
import { Link, useLocation } from 'react-router-dom'
import { ThemeToggle } from './ThemeToggle'

const navLinks = [
  { label: 'Home', path: '/' },
  { label: 'Games', path: '/games' },
  { label: 'Tools', path: '/tools' },
]

export const Navbar = () => {
  const { pathname } = useLocation()
  const [mobileOpen, setMobileOpen] = useState(false)

  return (
    <nav className="navbar fixed top-0 left-0 right-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <Link to="/" className="flex items-center gap-2 group">
            <div>
              <img src="/logo.png" alt="Logo" className="w-8 h-8 object-contain" />
            </div>
            <span
              className="font-orbitron font-bold text-sm tracking-widest hidden sm:block transition-colors duration-200"
              style={{ color: 'var(--text-primary)' }}
            >
              <span style={{ color: 'var(--accent)' }}>Ar</span>cade
            </span>
          </Link>

          {/* Desktop Nav */}
          <div className="hidden md:flex items-center gap-8">
            {navLinks.map(link => (
              <Link
                key={link.path}
                to={link.path}
                className={`nav-link ${pathname === link.path ? 'active' : ''}`}
              >
                {link.label}
              </Link>
            ))}
          </div>

          {/* Right Side */}
          <div className="flex items-center gap-3">
            <ThemeToggle />

            {/* Mobile Menu Button */}
            <button
              onClick={() => setMobileOpen(prev => !prev)}
              className="md:hidden flex flex-col gap-1.5 p-2 rounded-lg transition-colors duration-200"
              style={{ color: 'var(--text-secondary)' }}
              aria-label="Toggle menu"
            >
              <span
                className="block w-5 h-0.5 transition-all duration-300 origin-center"
                style={{
                  background: 'var(--accent)',
                  transform: mobileOpen ? 'rotate(45deg) translate(4px, 4px)' : 'none',
                }}
              />
              <span
                className="block w-5 h-0.5 transition-all duration-300"
                style={{
                  background: 'var(--accent)',
                  opacity: mobileOpen ? 0 : 1,
                }}
              />
              <span
                className="block w-5 h-0.5 transition-all duration-300 origin-center"
                style={{
                  background: 'var(--accent)',
                  transform: mobileOpen ? 'rotate(-45deg) translate(4px, -4px)' : 'none',
                }}
              />
            </button>
          </div>
        </div>

        {/* Mobile Menu */}
        <div
          className="md:hidden overflow-hidden transition-all duration-300"
          style={{ maxHeight: mobileOpen ? '200px' : '0px' }}
        >
          <div
            className="py-4 flex flex-col gap-4 border-t"
            style={{ borderColor: 'var(--border)' }}
          >
            {navLinks.map(link => (
              <Link
                key={link.path}
                to={link.path}
                onClick={() => setMobileOpen(false)}
                className={`nav-link w-fit ${pathname === link.path ? 'active' : ''}`}
              >
                {link.label}
              </Link>
            ))}
          </div>
        </div>
      </div>
    </nav>
  )
}
