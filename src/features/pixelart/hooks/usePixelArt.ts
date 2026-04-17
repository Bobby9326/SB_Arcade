import { useState, useCallback } from 'react'
import type { Tool, GridSize, PixelGrid, HistState } from '../types/pixelart.types'
import { DEFAULT_SIZE, DEFAULT_COLOR, MAX_HISTORY } from '../constants/pixelart.constants'
import { createGrid, imageToGrid } from '../utils/gridUtils'
import { downloadPNG, copyToClipboard } from '../utils/exportUtils'

export interface PixelArtState {
  grid:        PixelGrid
  gridSize:    GridSize
  tool:        Tool
  activeColor: string
  canUndo:     boolean
  canRedo:     boolean
  isProcessing: boolean
  toastMsg:    string
}

export interface PixelArtActions {
  setTool:          (t: Tool) => void
  setColor:         (c: string) => void
  setGridSize:      (s: GridSize) => void
  commitStroke:     (newGrid: PixelGrid) => void
  undo:             () => void
  redo:             () => void
  clear:            () => void
  uploadImage:      (file: File) => Promise<void>
  download:         () => void
  copy:             () => Promise<void>
}

function pushToHistory(hist: HistState, newGrid: PixelGrid): HistState {
  const stack = [
    ...hist.stack.slice(0, hist.index + 1),
    newGrid.map(r => [...r]),
  ]
  const trimmed = stack.length > MAX_HISTORY ? stack.slice(-MAX_HISTORY) : stack
  return { stack: trimmed, index: trimmed.length - 1 }
}

export function usePixelArt(): PixelArtState & PixelArtActions {
  const [hist, setHist] = useState<HistState>(() => {
    const g = createGrid(DEFAULT_SIZE)
    return { stack: [g], index: 0 }
  })
  const [gridSize,     setGridSizeState]  = useState<GridSize>(DEFAULT_SIZE)
  const [tool,         setTool]           = useState<Tool>('pen')
  const [activeColor,  setColor]          = useState(DEFAULT_COLOR)
  const [isProcessing, setIsProcessing]   = useState(false)
  const [toastMsg,     setToastMsg]       = useState('')

  const grid    = hist.stack[hist.index]
  const canUndo = hist.index > 0
  const canRedo = hist.index < hist.stack.length - 1

  function toast(msg: string) {
    setToastMsg(msg)
    setTimeout(() => setToastMsg(''), 2200)
  }

  /* ── Commit stroke ── */
  const commitStroke = useCallback((newGrid: PixelGrid) => {
    setHist(prev => pushToHistory(prev, newGrid))
  }, [])

  /* ── Undo / Redo ── */
  const undo = useCallback(() => {
    setHist(prev => prev.index > 0 ? { ...prev, index: prev.index - 1 } : prev)
  }, [])
  const redo = useCallback(() => {
    setHist(prev => prev.index < prev.stack.length - 1 ? { ...prev, index: prev.index + 1 } : prev)
  }, [])

  /* ── Change grid size (resets canvas) ── */
  const setGridSize = useCallback((s: GridSize) => {
    setGridSizeState(s)
    const g = createGrid(s)
    setHist({ stack: [g], index: 0 })
  }, [])

  /* ── Clear ── */
  const clear = useCallback(() => {
    const g = createGrid(gridSize)
    setHist(prev => pushToHistory(prev, g))
  }, [gridSize])

  /* ── Upload image ── */
  const uploadImage = useCallback(async (file: File) => {
    setIsProcessing(true)
    try {
      const newGrid = await imageToGrid(file, gridSize)
      setHist(prev => pushToHistory(prev, newGrid))
    } catch {
      toast('Failed to load image')
    } finally {
      setIsProcessing(false)
    }
  }, [gridSize])

  /* ── Export ── */
  const download = useCallback(() => {
    downloadPNG(grid, gridSize)
  }, [grid, gridSize])

  const copy = useCallback(async () => {
    try {
      await copyToClipboard(grid, gridSize)
      toast('Copied to clipboard!')
    } catch {
      toast('Copy failed — try downloading instead')
    }
  }, [grid, gridSize])

  return {
    grid, gridSize, tool, activeColor, canUndo, canRedo, isProcessing, toastMsg,
    setTool, setColor, setGridSize, commitStroke, undo, redo, clear, uploadImage, download, copy,
  }
}
