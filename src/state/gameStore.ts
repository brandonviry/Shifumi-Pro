import { create } from 'zustand'
import {
  GameState,
  GameHistory,
  Statistics,
  Move,
  GameResult,
  AIType,
  GameMode,
} from '@/types'
import { determineWinner } from '@/utils/gameLogic'
import { AIFactory } from '@/services/ai/AIFactory'
import { LocalStorageService } from '@/services/storage/LocalStorage'

interface GameStore extends GameState {
  // Game actions
  playMove: (playerMove: Move) => void
  resetGame: () => void

  // Statistics
  statistics: Statistics
  updateStatistics: (result: GameResult) => void
  resetStatistics: () => void

  // History
  gameHistory: GameHistory[]
  addToHistory: (
    playerMove: Move,
    aiMove: Move,
    result: GameResult,
    aiType: AIType,
    mode: GameMode
  ) => void
  clearHistory: () => void

  // AI
  aiType: AIType
  setAIType: (type: AIType) => void
}

const initialStatistics: Statistics = {
  totalGames: 0,
  wins: 0,
  losses: 0,
  draws: 0,
  winStreak: 0,
  currentStreak: 0,
  favoriteMove: null,
  moveCounts: { rock: 0, paper: 0, scissors: 0 },
}

export const useGameStore = create<GameStore>((set, get) => ({
  // Initial game state
  playerMove: null,
  aiMove: null,
  result: null,
  isPlaying: false,
  round: 1,

  // Initial statistics (load from localStorage)
  statistics: LocalStorageService.getStatistics() || initialStatistics,

  // Initial history (load from localStorage)
  gameHistory: LocalStorageService.getGameHistory(),

  // Initial AI type
  aiType: LocalStorageService.getSettings().aiType,

  // Game actions
  playMove: (playerMove: Move) => {
    const state = get()
    const ai = AIFactory.create(state.aiType)
    const aiMove = ai.getMove(state.gameHistory)
    const result = determineWinner(playerMove, aiMove)

    // Update game state
    set({
      playerMove,
      aiMove,
      result,
      isPlaying: true,
      round: state.round + 1,
    })

    // Update statistics and history
    get().updateStatistics(result)
    get().addToHistory(playerMove, aiMove, result, state.aiType, 'single')
  },

  resetGame: () => {
    set({
      playerMove: null,
      aiMove: null,
      result: null,
      isPlaying: false,
      round: 1,
    })
  },

  // Statistics management
  updateStatistics: (result: GameResult) => {
    const state = get()
    const stats = { ...state.statistics }

    stats.totalGames++

    if (result === 'win') {
      stats.wins++
      stats.currentStreak++
      stats.winStreak = Math.max(stats.winStreak, stats.currentStreak)
    } else if (result === 'lose') {
      stats.losses++
      stats.currentStreak = 0
    } else {
      stats.draws++
      stats.currentStreak = 0
    }

    // Update move counts and favorite move
    if (state.playerMove) {
      stats.moveCounts[state.playerMove]++

      // Determine favorite move
      const moves = Object.entries(stats.moveCounts) as [Move, number][]
      moves.sort((a, b) => b[1] - a[1])
      stats.favoriteMove = moves[0][0]
    }

    set({ statistics: stats })
    LocalStorageService.saveStatistics(stats)
  },

  resetStatistics: () => {
    set({ statistics: initialStatistics })
    LocalStorageService.saveStatistics(initialStatistics)
  },

  // History management
  addToHistory: (
    playerMove: Move,
    aiMove: Move,
    result: GameResult,
    aiType: AIType,
    mode: GameMode
  ) => {
    const state = get()
    const newGame: GameHistory = {
      id: crypto.randomUUID(),
      date: new Date(),
      playerMove,
      aiMove,
      result,
      aiType,
      mode,
    }

    const updatedHistory = [newGame, ...state.gameHistory].slice(0, 1000) // Keep last 1000 games

    set({ gameHistory: updatedHistory })
    LocalStorageService.saveGameHistory(updatedHistory)
  },

  clearHistory: () => {
    set({ gameHistory: [] })
    LocalStorageService.saveGameHistory([])
  },

  // AI management
  setAIType: (type: AIType) => {
    set({ aiType: type })
    const settings = LocalStorageService.getSettings()
    settings.aiType = type
    LocalStorageService.saveSettings(settings)
  },
}))