import { describe, it, expect, beforeEach, vi } from 'vitest'
import { useSettingsStore } from './settingsStore'
import { LocalStorageService } from '@/services/storage/LocalStorage'

// Mock LocalStorageService
vi.mock('@/services/storage/LocalStorage')

const mockLocalStorageService = vi.mocked(LocalStorageService)

describe('settingsStore', () => {
  beforeEach(() => {
    vi.clearAllMocks()

    // Mock default settings for each test
    mockLocalStorageService.getSettings.mockReturnValue({
      theme: 'dark',
      language: 'fr',
      animationSpeed: 'normal',
      aiType: 'random',
    })

    // Reset store to defaults
    useSettingsStore.getState().resetSettings()
  })

  it('should initialize with default settings', () => {
    const store = useSettingsStore.getState()

    expect(store.theme).toBe('dark')
    expect(store.language).toBe('fr')
    expect(store.animationSpeed).toBe('normal')
    expect(store.aiType).toBe('random')
  })

  it('should update settings correctly', () => {
    const store = useSettingsStore.getState()

    store.updateSettings({ theme: 'light' })

    const updatedStore = useSettingsStore.getState()
    expect(updatedStore.theme).toBe('light')
    expect(updatedStore.language).toBe('fr') // Should remain unchanged
    expect(updatedStore.animationSpeed).toBe('normal') // Should remain unchanged
    expect(updatedStore.aiType).toBe('random') // Should remain unchanged
  })

  it('should save settings to localStorage when updated', () => {
    const store = useSettingsStore.getState()

    store.updateSettings({ theme: 'light', language: 'en' })

    expect(mockLocalStorageService.saveSettings).toHaveBeenCalledWith({
      theme: 'light',
      language: 'en',
      animationSpeed: 'normal',
      aiType: 'random',
    })
  })

  it('should reset settings to defaults', () => {
    const store = useSettingsStore.getState()

    // First change some settings
    store.updateSettings({ theme: 'light', language: 'en' })

    // Then reset
    store.resetSettings()

    const resetStore = useSettingsStore.getState()
    expect(resetStore.theme).toBe('dark')
    expect(resetStore.language).toBe('fr')
    expect(resetStore.animationSpeed).toBe('normal')
    expect(resetStore.aiType).toBe('random')
  })

  it('should not include store methods in saved settings', () => {
    const store = useSettingsStore.getState()

    store.updateSettings({ theme: 'light' })

    const savedSettings = mockLocalStorageService.saveSettings.mock.calls[0][0]

    expect(savedSettings).not.toHaveProperty('updateSettings')
    expect(savedSettings).not.toHaveProperty('resetSettings')
    expect(savedSettings).toHaveProperty('theme')
    expect(savedSettings).toHaveProperty('language')
    expect(savedSettings).toHaveProperty('animationSpeed')
    expect(savedSettings).toHaveProperty('aiType')
  })

  it('should handle multiple setting updates', () => {
    const store = useSettingsStore.getState()

    store.updateSettings({
      theme: 'light',
      language: 'en',
      animationSpeed: 'fast',
      aiType: 'adaptive',
    })

    const updatedStore = useSettingsStore.getState()
    expect(updatedStore.theme).toBe('light')
    expect(updatedStore.language).toBe('en')
    expect(updatedStore.animationSpeed).toBe('fast')
    expect(updatedStore.aiType).toBe('adaptive')
  })
})