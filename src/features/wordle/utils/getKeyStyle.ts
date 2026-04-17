import type { TileColors, TileStatus } from '../types/wordle.types'

export function getKeyStyle(status?: TileStatus): TileColors {
  switch (status) {
    case 'correct':
      return {
        bg:     'linear-gradient(135deg, #16A34A, #22C55E)',
        border: '#22C55E',
        color:  '#fff',
        shadow: '0 0 12px rgba(34,197,94,0.4)',
      }
    case 'present':
      return {
        bg:     'linear-gradient(135deg, #D97706, #F59E0B)',
        border: '#F59E0B',
        color:  '#fff',
        shadow: '0 0 12px rgba(245,158,11,0.4)',
      }
    case 'absent':
      return {
        bg:     '#0C0C0C',
        border: '#181818',
        color:  '#333',
        shadow: 'none',
      }
    default:
      return {
        bg:     'rgba(255,255,255,0.055)',
        border: 'rgba(255,255,255,0.06)',
        color:  'var(--text-primary)',
        shadow: 'none',
      }
  }
}
