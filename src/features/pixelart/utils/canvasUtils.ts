import type { PixelGrid } from '../types/pixelart.types'
import { CANVAS_PX } from '../constants/pixelart.constants'

/** Draw checkerboard pattern for transparent cells */
function drawChecker(
  ctx:      CanvasRenderingContext2D,
  px:       number,
  py:       number,
  cellSize: number,
) {
  const csz = Math.max(2, Math.floor(cellSize / 2))
  for (let cy = 0; cy < cellSize; cy += csz) {
    for (let cx = 0; cx < cellSize; cx += csz) {
      ctx.fillStyle = (Math.floor(cy / csz) + Math.floor(cx / csz)) % 2 === 0
        ? '#c4c4c4' : '#787878'
      ctx.fillRect(
        px + cx, py + cy,
        Math.min(csz, cellSize - cx),
        Math.min(csz, cellSize - cy),
      )
    }
  }
}

export function renderGrid(
  ctx:      CanvasRenderingContext2D,
  grid:     PixelGrid,
  gridSize: number,
  hover:    [number, number] | null = null,
): void {
  const cellSize = CANVAS_PX / gridSize

  ctx.clearRect(0, 0, CANVAS_PX, CANVAS_PX)

  /* ── Cells ── */
  for (let y = 0; y < gridSize; y++) {
    for (let x = 0; x < gridSize; x++) {
      const color = grid[y]?.[x] ?? ''
      const px = x * cellSize
      const py = y * cellSize
      if (!color) {
        drawChecker(ctx, px, py, cellSize)
      } else {
        ctx.fillStyle = color
        ctx.fillRect(px, py, cellSize, cellSize)
      }
    }
  }

  /* ── Grid lines ── */
  ctx.strokeStyle = gridSize <= 16 ? 'rgba(255,255,255,0.14)' : 'rgba(255,255,255,0.06)'
  ctx.lineWidth   = 0.5
  for (let i = 0; i <= gridSize; i++) {
    ctx.beginPath(); ctx.moveTo(i * cellSize, 0);       ctx.lineTo(i * cellSize, CANVAS_PX); ctx.stroke()
    ctx.beginPath(); ctx.moveTo(0, i * cellSize);        ctx.lineTo(CANVAS_PX, i * cellSize); ctx.stroke()
  }

  /* ── Hover highlight ── */
  if (hover) {
    const [hx, hy] = hover
    ctx.strokeStyle = 'rgba(255,255,255,0.9)'
    ctx.lineWidth   = 2
    ctx.strokeRect(hx * cellSize + 1, hy * cellSize + 1, cellSize - 2, cellSize - 2)
  }
}

/** Clamp mouse/touch position to grid coordinates */
export function toGridCoords(
  clientX:  number,
  clientY:  number,
  canvas:   HTMLCanvasElement,
  gridSize: number,
): [number, number] {
  const rect = canvas.getBoundingClientRect()
  const x = Math.floor(((clientX - rect.left) / rect.width)  * gridSize)
  const y = Math.floor(((clientY - rect.top)  / rect.height) * gridSize)
  return [
    Math.max(0, Math.min(gridSize - 1, x)),
    Math.max(0, Math.min(gridSize - 1, y)),
  ]
}
