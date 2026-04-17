export type Tool     = 'pen' | 'fill' | 'eraser' | 'eyedropper'
export type GridSize = 16 | 32 | 64

/** Each cell: '#RRGGBB' | '' (transparent) */
export type PixelGrid = string[][]

export interface HistState {
  stack: PixelGrid[]
  index: number
}
