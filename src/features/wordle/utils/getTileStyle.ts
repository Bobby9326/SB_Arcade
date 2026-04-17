import type { TileColors, TileStatus } from '../types/wordle.types'

export function getTileStyle(status: TileStatus): TileColors {
  switch (status) {
    case 'correct':
      return {
        bg:     'linear-gradient(135deg, #16A34A, #22C55E)',
        border: '#22C55E',
        color:  '#fff',
        shadow: '0 0 20px rgba(34,197,94,0.45), inset 0 1px 0 rgba(255,255,255,0.15)',
      }
    case 'present':
      return {
        bg:     'linear-gradient(135deg, #D97706, #F59E0B)',
        border: '#F59E0B',
        color:  '#fff',
        shadow: '0 0 20px rgba(245,158,11,0.45), inset 0 1px 0 rgba(255,255,255,0.15)',
      }
    case 'absent':
      return {
        bg:     '#161616',
        border: '#252525',
        color:  '#444',
        shadow: 'none',
      }
    case 'tbd':
      return {
        bg:     'transparent',
        border: 'rgba(255,255,255,0.4)',
        color:  'var(--text-primary)',
        shadow: 'none',
      }
    default:
      return {
        bg:     'transparent',
        border: 'rgba(255,255,255,0.07)',
        color:  'var(--text-primary)',
        shadow: 'none',
      }
  }
}
