import type { PixelGrid } from '../types/pixelart.types'
import { EXPORT_PX } from '../constants/pixelart.constants'

function buildExportCanvas(grid: PixelGrid, gridSize: number): HTMLCanvasElement {
  const canvas = document.createElement('canvas')
  canvas.width  = EXPORT_PX
  canvas.height = EXPORT_PX
  const ctx      = canvas.getContext('2d')!
  const cellSize = EXPORT_PX / gridSize

  // Default: transparent background
  for (let y = 0; y < gridSize; y++) {
    for (let x = 0; x < gridSize; x++) {
      const color = grid[y]?.[x]
      if (color) {
        ctx.fillStyle = color
        ctx.fillRect(x * cellSize, y * cellSize, cellSize, cellSize)
      }
    }
  }

  return canvas
}

export function downloadPNG(grid: PixelGrid, gridSize: number): void {
  const canvas = buildExportCanvas(grid, gridSize)
  const link   = document.createElement('a')
  link.href     = canvas.toDataURL('image/png')
  link.download = `pixel-art-${gridSize}x${gridSize}.png`
  link.click()
}

export async function copyToClipboard(grid: PixelGrid, gridSize: number): Promise<void> {
  const canvas = buildExportCanvas(grid, gridSize)
  return new Promise((resolve, reject) => {
    canvas.toBlob(blob => {
      if (!blob) { reject(new Error('Blob creation failed')); return }
      navigator.clipboard
        .write([new ClipboardItem({ 'image/png': blob })])
        .then(resolve)
        .catch(reject)
    }, 'image/png')
  })
}
