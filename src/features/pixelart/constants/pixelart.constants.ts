import type { GridSize } from '../types/pixelart.types'

/** Internal canvas pixel size (fixed) */
export const CANVAS_PX = 512

/** Exported PNG pixel size */
export const EXPORT_PX = 512

export const MAX_HISTORY = 60
export const GRID_SIZES: GridSize[] = [16, 32, 64]
export const DEFAULT_SIZE: GridSize = 32
export const DEFAULT_COLOR = '#F97316'

/** 24 curated palette colours */
export const DEFAULT_PALETTE: string[] = [
  '#000000', '#1C1C1C', '#3D3D3D', '#808080', '#C0C0C0', '#FFFFFF',
  '#FF0000', '#FF4500', '#FF8C00', '#FFD700', '#A8E63D', '#00D26A',
  '#00FFFF', '#00BFFF', '#1E90FF', '#0000CD', '#7B2FBE', '#FF00FF',
  '#FF1493', '#C71585', '#8B4513', '#556B2F', '#006994', '#191970',
]
