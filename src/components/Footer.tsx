import { Link } from 'react-router-dom'

const NAV_GAMES = [
  { label: 'Wordle',      to: '/games/wordle'    },
  { label: 'Moviedle',    to: '/games/moviedle'  },
  { label: 'Game 24',     to: '/games/game24'    },
  { label: 'Tic Tac Toe', to: '/games/ttt'       },
]

const NAV_TOOLS = [
  { label: 'Pixel Art Editor',    to: '/tools/pixel-art'  },
  { label: 'FIFA Stat Generator', to: '/tools/fifa-stat'  },
]

const TECH_STACK = ['React 18', 'TypeScript', 'Vite', 'Tailwind CSS', 'React Router']

export function Footer() {
  const year = new Date().getFullYear()

  return (
    <footer style={{
      borderTop:  '1px solid rgba(255,255,255,0.06)',
      background: 'linear-gradient(to bottom, transparent, rgba(0,0,0,0.4))',
      position:   'relative',
      overflow:   'hidden',
    }}>
      {/* Subtle top glow line */}
      <div style={{
        position:   'absolute',
        top:        0,
        left:       '50%',
        transform:  'translateX(-50%)',
        width:      '40%',
        height:     1,
        background: 'linear-gradient(90deg, transparent, rgba(249,115,22,0.5), transparent)',
        pointerEvents: 'none',
      }} />

      <div style={{ maxWidth: 1280, margin: '0 auto', padding: '3rem 1.5rem 2rem' }}>

        {/* ── Main grid ── */}
        <div style={{
          display:             'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(180px, 1fr))',
          gap:                 '2.5rem',
          marginBottom:        '2.5rem',
        }}>

          {/* Brand column */}
          <div style={{ gridColumn: 'span 1' }}>
            <Link to="/" style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 14, textDecoration: 'none' }}>
              <img src="/logo.png" alt="Logo" style={{ width: 32, height: 32, objectFit: 'contain', flexShrink: 0 }} />
              <span style={{
                fontFamily:    'Orbitron, monospace',
                fontWeight:    700,
                fontSize:      '0.875rem',
                letterSpacing: '0.1em',
                color:         'var(--text-primary)',
              }}>
                <span style={{ color: 'var(--accent)' }}>Ar</span>cade
              </span>
            </Link>

            <p style={{
              fontFamily:  'Rajdhani, sans-serif',
              fontSize:    '0.82rem',
              color:       'var(--text-muted)',
              lineHeight:  1.7,
              maxWidth:    220,
            }}>
              A portfolio showcase of mini games and creative tools built with modern web tech.
            </p>

            {/* Accent dots decoration */}
            <div style={{ display: 'flex', gap: 5, marginTop: 16 }}>
              {['#F97316','#3B82F6','#22C55E','#EC4899','#A855F7'].map(c => (
                <div key={c} style={{
                  width:        6,
                  height:       6,
                  borderRadius: '50%',
                  background:   c,
                  boxShadow:    `0 0 6px ${c}88`,
                  opacity:      0.7,
                }} />
              ))}
            </div>
          </div>

          {/* Games column */}
          <div>
            <div style={{
              fontFamily:    'Orbitron, monospace',
              fontSize:      '0.44rem',
              letterSpacing: '0.28em',
              color:         'var(--accent)',
              marginBottom:  14,
              display:       'flex',
              alignItems:    'center',
              gap:           8,
            }}>
              <span style={{
                display:     'inline-block',
                width:       16,
                height:      1,
                background:  'var(--accent)',
              }} />
              GAMES
            </div>
            <ul style={{ listStyle: 'none', margin: 0, padding: 0, display: 'flex', flexDirection: 'column', gap: 8 }}>
              {NAV_GAMES.map(item => (
                <li key={item.to}>
                  <Link
                    to={item.to}
                    style={{
                      fontFamily:     'Rajdhani, sans-serif',
                      fontSize:       '0.88rem',
                      color:          'var(--text-secondary)',
                      textDecoration: 'none',
                      letterSpacing:  '0.04em',
                      display:        'flex',
                      alignItems:     'center',
                      gap:            6,
                      transition:     'color 0.15s ease',
                    }}
                    onMouseEnter={e => (e.currentTarget.style.color = 'var(--accent)')}
                    onMouseLeave={e => (e.currentTarget.style.color = 'var(--text-secondary)')}
                  >
                    <span style={{
                      width:        4,
                      height:       4,
                      borderRadius: '50%',
                      background:   'rgba(249,115,22,0.4)',
                      flexShrink:   0,
                    }} />
                    {item.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Tools column */}
          <div>
            <div style={{
              fontFamily:    'Orbitron, monospace',
              fontSize:      '0.44rem',
              letterSpacing: '0.28em',
              color:         'var(--accent)',
              marginBottom:  14,
              display:       'flex',
              alignItems:    'center',
              gap:           8,
            }}>
              <span style={{
                display:    'inline-block',
                width:      16,
                height:     1,
                background: 'var(--accent)',
              }} />
              TOOLS
            </div>
            <ul style={{ listStyle: 'none', margin: 0, padding: 0, display: 'flex', flexDirection: 'column', gap: 8 }}>
              {NAV_TOOLS.map(item => (
                <li key={item.to}>
                  <Link
                    to={item.to}
                    style={{
                      fontFamily:     'Rajdhani, sans-serif',
                      fontSize:       '0.88rem',
                      color:          'var(--text-secondary)',
                      textDecoration: 'none',
                      letterSpacing:  '0.04em',
                      display:        'flex',
                      alignItems:     'center',
                      gap:            6,
                      transition:     'color 0.15s ease',
                    }}
                    onMouseEnter={e => (e.currentTarget.style.color = 'var(--accent)')}
                    onMouseLeave={e => (e.currentTarget.style.color = 'var(--text-secondary)')}
                  >
                    <span style={{
                      width:        4,
                      height:       4,
                      borderRadius: '50%',
                      background:   'rgba(249,115,22,0.4)',
                      flexShrink:   0,
                    }} />
                    {item.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Tech stack column */}
          <div>
            <div style={{
              fontFamily:    'Orbitron, monospace',
              fontSize:      '0.44rem',
              letterSpacing: '0.28em',
              color:         'var(--accent)',
              marginBottom:  14,
              display:       'flex',
              alignItems:    'center',
              gap:           8,
            }}>
              <span style={{
                display:    'inline-block',
                width:      16,
                height:     1,
                background: 'var(--accent)',
              }} />
              BUILT WITH
            </div>
            <div style={{ display: 'flex', flexWrap: 'wrap', gap: 6 }}>
              {TECH_STACK.map(tech => (
                <span key={tech} style={{
                  fontFamily:    'Orbitron, monospace',
                  fontSize:      '0.4rem',
                  letterSpacing: '0.1em',
                  padding:       '3px 9px',
                  background:    'rgba(255,255,255,0.04)',
                  border:        '1px solid rgba(255,255,255,0.08)',
                  borderRadius:  20,
                  color:         'var(--text-muted)',
                }}>
                  {tech}
                </span>
              ))}
            </div>
          </div>
        </div>

        {/* ── Divider ── */}
        <div style={{
          height:     1,
          background: 'rgba(255,255,255,0.05)',
          marginBottom: '1.5rem',
        }} />

        {/* ── Bottom bar ── */}
        <div style={{
          display:        'flex',
          flexWrap:       'wrap',
          alignItems:     'center',
          justifyContent: 'space-between',
          gap:            12,
        }}>
          <span style={{
            fontFamily:  'Rajdhani, sans-serif',
            fontSize:    '0.78rem',
            color:       'var(--text-muted)',
            letterSpacing: '0.04em',
          }}>
            © {year} SB Arcade — Portfolio Project
          </span>

          <div style={{ display: 'flex', alignItems: 'center', gap: 6 }}>
            <span style={{
              fontFamily:  'Rajdhani, sans-serif',
              fontSize:    '0.72rem',
              color:       'var(--text-muted)',
            }}>
              Made with
            </span>
            <span style={{
              color:     '#EF4444',
              fontSize:  '0.8rem',
              animation: 'footer-pulse 2s ease-in-out infinite',
            }}>
              ♥
            </span>
            <span style={{
              fontFamily:  'Rajdhani, sans-serif',
              fontSize:    '0.72rem',
              color:       'var(--text-muted)',
            }}>
              and lots of
            </span>
            <span style={{ fontSize: '0.75rem' }}>☕</span>
          </div>
        </div>
      </div>

      <style>{`
        @keyframes footer-pulse {
          0%,100% { opacity: 0.6; transform: scale(1); }
          50%      { opacity: 1;   transform: scale(1.2); }
        }
      `}</style>
    </footer>
  )
}
