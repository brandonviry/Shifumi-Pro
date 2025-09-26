import { GameHistory, Statistics, Settings, Tournament } from '@/types'

const KEYS = {
  GAME_HISTORY: 'shifumi_game_history',
  STATISTICS: 'shifumi_statistics',
  SETTINGS: 'shifumi_settings',
  TOURNAMENTS: 'shifumi_tournaments',
} as const

export class LocalStorageService {
  static getGameHistory(): GameHistory[] {
    try {
      const data = localStorage.getItem(KEYS.GAME_HISTORY)
      return data ? JSON.parse(data) : []
    } catch (error) {
      console.error('Error loading game history:', error)
      return []
    }
  }

  static saveGameHistory(history: GameHistory[]): void {
    try {
      localStorage.setItem(KEYS.GAME_HISTORY, JSON.stringify(history))
    } catch (error) {
      console.error('Error saving game history:', error)
    }
  }

  static getStatistics(): Statistics | null {
    try {
      const data = localStorage.getItem(KEYS.STATISTICS)
      return data ? JSON.parse(data) : null
    } catch (error) {
      console.error('Error loading statistics:', error)
      return null
    }
  }

  static saveStatistics(stats: Statistics): void {
    try {
      localStorage.setItem(KEYS.STATISTICS, JSON.stringify(stats))
    } catch (error) {
      console.error('Error saving statistics:', error)
    }
  }

  static getSettings(): Settings {
    try {
      const data = localStorage.getItem(KEYS.SETTINGS)
      return data
        ? JSON.parse(data)
        : {
            theme: 'dark',
            language: 'fr',
            animationSpeed: 'normal',
            aiType: 'random',
          }
    } catch (error) {
      console.error('Error loading settings:', error)
      return {
        theme: 'dark',
        language: 'fr',
        animationSpeed: 'normal',
        aiType: 'random',
      }
    }
  }

  static saveSettings(settings: Settings): void {
    try {
      localStorage.setItem(KEYS.SETTINGS, JSON.stringify(settings))
    } catch (error) {
      console.error('Error saving settings:', error)
    }
  }

  static getTournaments(): Tournament[] {
    try {
      const data = localStorage.getItem(KEYS.TOURNAMENTS)
      return data ? JSON.parse(data) : []
    } catch (error) {
      console.error('Error loading tournaments:', error)
      return []
    }
  }

  static saveTournaments(tournaments: Tournament[]): void {
    try {
      localStorage.setItem(KEYS.TOURNAMENTS, JSON.stringify(tournaments))
    } catch (error) {
      console.error('Error saving tournaments:', error)
    }
  }

  static clearAllData(): void {
    try {
      Object.values(KEYS).forEach(key => {
        localStorage.removeItem(key)
      })
    } catch (error) {
      console.error('Error clearing data:', error)
    }
  }
}