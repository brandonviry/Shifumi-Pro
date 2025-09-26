import { useEffect } from 'react'
import { useTranslation } from 'react-i18next'
import { useSettingsStore } from '@/state/settingsStore'

export function useLanguage() {
  const { i18n } = useTranslation()
  const { language, updateSettings } = useSettingsStore()

  useEffect(() => {
    // Sync i18n language with store
    if (i18n.language !== language) {
      i18n.changeLanguage(language)
    }
  }, [language, i18n])

  const changeLanguage = (newLanguage: 'fr' | 'en') => {
    updateSettings({ language: newLanguage })
    i18n.changeLanguage(newLanguage)
  }

  return {
    currentLanguage: language,
    changeLanguage,
    isLanguageLoaded: i18n.isInitialized,
  }
}