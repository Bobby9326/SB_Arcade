import { useRef, useEffect } from 'react'
import type { Tool, PixelGrid } from '../types/pixelart.types'
import { CANVAS_PX } from '../constants/pixelart.constants'
import { renderGrid, toGridCoords } from '../utils/canvasUtils'
import { floodFill } from '../utils/gridUtils'

interface PixelCanvasProps {
  grid:         PixelGrid
  gridSize:     number
  tool:         Tool
  activeColor:  string
  onStrokeEnd:  (newGrid: PixelGrid) => void
  onPickColor:  (color: string) => void
}

export function PixelCanvas({
  grid, gridSize, tool, activeColor, onStrokeEnd, onPickColor,
}: PixelCanvasProps) {
  const canvasRef    = useRef<HTMLCanvasElement>(null)
  const workRef      = useRef<PixelGrid>([])
  const isDrawingRef = useRef(false)
  const hoverRef     = useRef<[number, number] | null>(null)
  const lastCellRef  = useRef<[number, number] | null>(null)

  /* ── Sync workRef when grid changes externally (undo/redo, size change) ── */
  useEffect(() => {
    workRef.current = grid.map(r => [...r])
    redraw()
  }, [grid, gridSize]) // eslint-disable-line react-hooks/exhaustive-deps

  function redraw() {
    const ctx = canvasRef.current?.getContext('2d')
    if (!ctx) return
    renderGrid(ctx, workRef.current, gridSize, hoverRef.current)
  }

  function paint(x: number, y: number) {
    if (tool === 'eraser') {
      workRef.current[y][x] = ''
    } else {
      workRef.current[y][x] = activeColor
    }
  }

  /* ── Pointer helper ── */

  function handleDown(clientX: number, clientY: number) {
    const [x, y] = toGridCoords(clientX, clientY, canvasRef.current!, gridSize)

    if (tool === 'eyedropper') {
      const color = workRef.current[y][x]
      if (color) onPickColor(color)
      return
    }

    if (tool === 'fill') {
      const filled = floodFill(workRef.current, x, y, activeColor, gridSize)
      workRef.current = filled
      redraw()
      onStrokeEnd(filled.map(r => [...r]))
      return
    }

    isDrawingRef.current = true
    lastCellRef.current  = [x, y]
    paint(x, y)
    redraw()
  }

  function handleMove(clientX: number, clientY: number) {
    const [x, y] = toGridCoords(clientX, clientY, canvasRef.current!, gridSize)
    hoverRef.current = [x, y]

    if (isDrawingRef.current) {
      // Avoid repainting same cell repeatedly
      const last = lastCellRef.current
      if (!last || last[0] !== x || last[1] !== y) {
        lastCellRef.current = [x, y]
        paint(x, y)
      }
    }
    redraw()
  }

  function handleUp() {
    if (!isDrawingRef.current) return
    isDrawingRef.current = false
    onStrokeEnd(workRef.current.map(r => [...r]))
  }

  /* ── Mouse events ── */
  function onMouseDown(e: React.MouseEvent) { handleDown(e.clientX, e.clientY) }
  function onMouseMove(e: React.MouseEvent) { handleMove(e.clientX, e.clientY) }
  function onMouseUp()                      { handleUp() }
  function onMouseLeave() {
    hoverRef.current = null
    if (isDrawingRef.current) {
      isDrawingRef.current = false
      onStrokeEnd(workRef.current.map(r => [...r]))
    }
    redraw()
  }

  /* ── Touch events ── */
  function onTouchStart(e: React.TouchEvent) {
    e.preventDefault()
    const t = e.touches[0]
    handleDown(t.clientX, t.clientY)
  }
  function onTouchMove(e: React.TouchEvent) {
    e.preventDefault()
    const t = e.touches[0]
    handleMove(t.clientX, t.clientY)
  }
  function onTouchEnd(e: React.TouchEvent) {
    e.preventDefault()
    handleUp()
  }

  const cursor = tool === 'eyedropper' ? 'crosshair'
               : tool === 'fill'       ? 'cell'
               : tool === 'eraser'     ? 'cell'
               : 'crosshair'

  return (
    <canvas
      ref={canvasRef}
      width={CANVAS_PX}
      height={CANVAS_PX}
      onMouseDown={onMouseDown}
      onMouseMove={onMouseMove}
      onMouseUp={onMouseUp}
      onMouseLeave={onMouseLeave}
      onTouchStart={onTouchStart}
      onTouchMove={onTouchMove}
      onTouchEnd={onTouchEnd}
      onContextMenu={e => e.preventDefault()}
      style={{
        width:           '100%',
        maxWidth:        CANVAS_PX,
        aspectRatio:     '1 / 1',
        display:         'block',
        imageRendering:  'pixelated',
        cursor,
        touchAction:     'none',
        borderRadius:    10,
        border:          '1px solid rgba(255,255,255,0.08)',
        boxShadow:       '0 4px 40px rgba(0,0,0,0.5)',
      }}
    />
  )
}

