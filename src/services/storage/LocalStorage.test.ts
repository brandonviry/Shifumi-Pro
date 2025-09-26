import { describe, it, expect, beforeEach, vi } from 'vitest'
import { LocalStorageService } from './LocalStorage'
import { GameHistory, Statistics, Settings, Tournament } from '@/types'

// Mock localStorage
const localStorageMock = {
  getItem: vi.fn(),
  setItem: vi.fn(),
  removeItem: vi.fn(),
  clear: vi.fn(),
}

Object.defineProperty(window, 'localStorage', {
  value: localStorageMock,
})

describe('LocalStorageService', () => {
  beforeEach(() => {
    vi.clearAllMocks()
  })

  describe('Game History', () => {
    it('should return empty array when no game history exists', () => {
      localStorageMock.getItem.mockReturnValue(null)

      const result = LocalStorageService.getGameHistory()

      expect(result).toEqual([])
      expect(localStorageMock.getItem).toHaveBeenCalledWith('shifumi_game_history')
    })

    it('should return parsed game history when it exists', () => {
      const mockHistory: GameHistory[] = [
        {
          id: '1',
          date: new Date('2024-01-01'),
          playerMove: 'rock',
          aiMove: 'paper',
          result: 'lose',
          aiType: 'random',
          mode: 'single',
        },
      ]

      localStorageMock.getItem.mockReturnValue(JSON.stringify(mockHistory))

      const result = LocalStorageService.getGameHistory()

      // Compare each property individually since dates are serialized differently
      expect(result).toHaveLength(1)
      expect(result[0].id).toBe('1')
      expect(result[0].playerMove).toBe('rock')
      expect(result[0].aiMove).toBe('paper')
      expect(result[0].result).toBe('lose')
      expect(result[0].aiType).toBe('random')
      expect(result[0].mode).toBe('single')
      expect(typeof result[0].date).toBe('string') // Date is serialized as string
    })

    it('should return empty array on JSON parse error', () => {
      localStorageMock.getItem.mockReturnValue('invalid json')
      const consoleSpy = vi.spyOn(console, 'error').mockImplementation(() => {})

      const result = LocalStorageService.getGameHistory()

      expect(result).toEqual([])
      expect(consoleSpy).toHaveBeenCalled()

      consoleSpy.mockRestore()
    })

    it('should save game history to localStorage', () => {
      const mockHistory: GameHistory[] = [
        {
          id: '1',
          date: new Date('2024-01-01'),
          playerMove: 'rock',
          aiMove: 'paper',
          result: 'lose',
          aiType: 'random',
          mode: 'single',
        },
      ]

      LocalStorageService.saveGameHistory(mockHistory)

      expect(localStorageMock.setItem).toHaveBeenCalledWith(
        'shifumi_game_history',
        JSON.stringify(mockHistory)
      )
    })
  })

  describe('Statistics', () => {
    it('should return null when no statistics exist', () => {
      localStorageMock.getItem.mockReturnValue(null)

      const result = LocalStorageService.getStatistics()

      expect(result).toBeNull()
      expect(localStorageMock.getItem).toHaveBeenCalledWith('shifumi_statistics')
    })

    it('should return parsed statistics when they exist', () => {
      const mockStats: Statistics = {
        totalGames: 10,
        wins: 5,
        losses: 3,
        draws: 2,
        winStreak: 3,
        currentStreak: 1,
        favoriteMove: 'rock',
        moveCounts: { rock: 5, paper: 3, scissors: 2 },
      }

      localStorageMock.getItem.mockReturnValue(JSON.stringify(mockStats))

      const result = LocalStorageService.getStatistics()

      expect(result).toEqual(mockStats)
    })

    it('should save statistics to localStorage', () => {
      const mockStats: Statistics = {
        totalGames: 10,
        wins: 5,
        losses: 3,
        draws: 2,
        winStreak: 3,
        currentStreak: 1,
        favoriteMove: 'rock',
        moveCounts: { rock: 5, paper: 3, scissors: 2 },
      }

      LocalStorageService.saveStatistics(mockStats)

      expect(localStorageMock.setItem).toHaveBeenCalledWith(
        'shifumi_statistics',
        JSON.stringify(mockStats)
      )
    })
  })

  describe('Settings', () => {
    it('should return default settings when none exist', () => {
      localStorageMock.getItem.mockReturnValue(null)

      const result = LocalStorageService.getSettings()

      expect(result).toEqual({
        theme: 'dark',
        language: 'fr',
        animationSpeed: 'normal',
        aiType: 'random',
      })
    })

    it('should return parsed settings when they exist', () => {
      const mockSettings: Settings = {
        theme: 'light',
        language: 'en',
        animationSpeed: 'fast',
        aiType: 'adaptive',
      }

      localStorageMock.getItem.mockReturnValue(JSON.stringify(mockSettings))

      const result = LocalStorageService.getSettings()

      expect(result).toEqual(mockSettings)
    })

    it('should save settings to localStorage', () => {
      const mockSettings: Settings = {
        theme: 'light',
        language: 'en',
        animationSpeed: 'fast',
        aiType: 'adaptive',
      }

      LocalStorageService.saveSettings(mockSettings)

      expect(localStorageMock.setItem).toHaveBeenCalledWith(
        'shifumi_settings',
        JSON.stringify(mockSettings)
      )
    })
  })

  describe('Tournaments', () => {
    it('should return empty array when no tournaments exist', () => {
      localStorageMock.getItem.mockReturnValue(null)

      const result = LocalStorageService.getTournaments()

      expect(result).toEqual([])
      expect(localStorageMock.getItem).toHaveBeenCalledWith('shifumi_tournaments')
    })

    it('should return parsed tournaments when they exist', () => {
      const mockTournaments: Tournament[] = [
        {
          id: '1',
          type: 'bo3',
          rounds: [],
          playerWins: 2,
          aiWins: 1,
          isComplete: true,
          winner: 'player',
        },
      ]

      localStorageMock.getItem.mockReturnValue(JSON.stringify(mockTournaments))

      const result = LocalStorageService.getTournaments()

      expect(result).toEqual(mockTournaments)
    })

    it('should save tournaments to localStorage', () => {
      const mockTournaments: Tournament[] = [
        {
          id: '1',
          type: 'bo3',
          rounds: [],
          playerWins: 2,
          aiWins: 1,
          isComplete: true,
          winner: 'player',
        },
      ]

      LocalStorageService.saveTournaments(mockTournaments)

      expect(localStorageMock.setItem).toHaveBeenCalledWith(
        'shifumi_tournaments',
        JSON.stringify(mockTournaments)
      )
    })
  })

  describe('Clear All Data', () => {
    it('should remove all localStorage keys', () => {
      LocalStorageService.clearAllData()

      expect(localStorageMock.removeItem).toHaveBeenCalledTimes(4)
      expect(localStorageMock.removeItem).toHaveBeenCalledWith('shifumi_game_history')
      expect(localStorageMock.removeItem).toHaveBeenCalledWith('shifumi_statistics')
      expect(localStorageMock.removeItem).toHaveBeenCalledWith('shifumi_settings')
      expect(localStorageMock.removeItem).toHaveBeenCalledWith('shifumi_tournaments')
    })

    it('should handle errors gracefully', () => {
      localStorageMock.removeItem.mockImplementation(() => {
        throw new Error('Storage error')
      })

      const consoleSpy = vi.spyOn(console, 'error').mockImplementation(() => {})

      expect(() => LocalStorageService.clearAllData()).not.toThrow()
      expect(consoleSpy).toHaveBeenCalled()

      consoleSpy.mockRestore()
    })
  })
})