import type { PixelGrid } from '../types/pixelart.types'

export function createGrid(size: number): PixelGrid {
  return Array.from({ length: size }, () => Array(size).fill(''))
}

/** BFS flood fill. fillColor = '' means erase. */
export function floodFill(
  grid:      PixelGrid,
  x:         number,
  y:         number,
  fillColor: string,
  size:      number,
): PixelGrid {
  const target = grid[y][x]
  if (target === fillColor) return grid

  const next    = grid.map(r => [...r])
  const visited = new Set<string>()
  const queue:  [number, number][] = [[x, y]]

  while (queue.length) {
    const [cx, cy] = queue.pop()!
    const key = `${cx},${cy}`
    if (visited.has(key))                       continue
    if (cx < 0 || cy < 0 || cx >= size || cy >= size) continue
    if (next[cy][cx] !== target)                continue

    visited.add(key)
    next[cy][cx] = fillColor
    queue.push([cx - 1, cy], [cx + 1, cy], [cx, cy - 1], [cx, cy + 1])
  }

  return next
}

/** Convert an image File to a PixelGrid at the given size. */
export function imageToGrid(file: File, size: number): Promise<PixelGrid> {
  return new Promise((resolve, reject) => {
    const img = new Image()
    img.onload = () => {
      const off = document.createElement('canvas')
      off.width  = size
      off.height = size
      const ctx  = off.getContext('2d')!
      ctx.imageSmoothingEnabled = true
      ctx.drawImage(img, 0, 0, size, size)

      const { data } = ctx.getImageData(0, 0, size, size)
      const grid: PixelGrid = []

      for (let row = 0; row < size; row++) {
        const r: string[] = []
        for (let col = 0; col < size; col++) {
          const i = (row * size + col) * 4
          const [rd, g, b, a] = [data[i], data[i+1], data[i+2], data[i+3]]
          r.push(a < 128 ? '' : `#${rd.toString(16).padStart(2,'0')}${g.toString(16).padStart(2,'0')}${b.toString(16).padStart(2,'0')}`)
        }
        grid.push(r)
      }

      URL.revokeObjectURL(img.src)
      resolve(grid)
    }
    img.onerror = reject
    img.src = URL.createObjectURL(file)
  })
}
