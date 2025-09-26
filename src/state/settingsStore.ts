import { create } from 'zustand'
import { Settings } from '@/types'
import { LocalStorageService } from '@/services/storage/LocalStorage'

interface SettingsStore extends Settings {
  updateSettings: (settings: Partial<Settings>) => void
  resetSettings: () => void
}

const defaultSettings: Settings = {
  theme: 'dark',
  language: 'fr',
  animationSpeed: 'normal',
  aiType: 'random',
}

export const useSettingsStore = create<SettingsStore>((set, get) => ({
  // Load initial settings from localStorage
  ...LocalStorageService.getSettings(),

  updateSettings: (newSettings: Partial<Settings>) => {
    const currentSettings = get()
    const updatedSettings = { ...currentSettings, ...newSettings }

    // Remove store methods from the settings object
    const { updateSettings, resetSettings, ...settingsToSave } = updatedSettings

    set(updatedSettings)
    LocalStorageService.saveSettings(settingsToSave as Settings)
  },

  resetSettings: () => {
    set(defaultSettings)
    LocalStorageService.saveSettings(defaultSettings)
  },
}))