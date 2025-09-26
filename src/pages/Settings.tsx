import { useSettingsStore } from '@/state/settingsStore'
import { useGameStore } from '@/state/gameStore'
import Card from '@/components/common/Card'
import Button from '@/components/common/Button'
import { Settings as SettingsIcon, Palette, Globe, Zap, RotateCcw, AlertTriangle } from 'lucide-react'
import { useState } from 'react'
import './Settings.css'

export default function Settings() {
  const {
    theme,
    language,
    animationSpeed,
    aiType,
    updateSettings,
    resetSettings,
  } = useSettingsStore()

  const { resetStatistics, clearHistory, setAIType } = useGameStore()
  const [showResetConfirm, setShowResetConfirm] = useState(false)

  const handleThemeChange = (newTheme: 'light' | 'dark') => {
    updateSettings({ theme: newTheme })
  }

  const handleLanguageChange = (newLanguage: 'fr' | 'en') => {
    updateSettings({ language: newLanguage })
  }

  const handleAnimationSpeedChange = (speed: 'slow' | 'normal' | 'fast') => {
    updateSettings({ animationSpeed: speed })
  }

  const handleAITypeChange = (type: 'random' | 'weighted' | 'adaptive') => {
    updateSettings({ aiType: type })
    setAIType(type)
  }

  const handleResetAllData = () => {
    resetStatistics()
    clearHistory()
    resetSettings()
    setShowResetConfirm(false)
  }

  return (
    <div className="settings">
      <div className="settings-header">
        <h2 className="settings-title">
          <SettingsIcon size={28} />
          Paramètres
        </h2>
        <p className="settings-subtitle">
          Personnalisez votre expérience de jeu
        </p>
      </div>

      <div className="settings-grid">
        <Card className="setting-section">
          <div className="setting-header">
            <Palette size={20} />
            <h3>Apparence</h3>
          </div>

          <div className="setting-group">
            <label className="setting-label">Thème</label>
            <div className="theme-selector">
              <button
                className={`theme-option ${theme === 'dark' ? 'active' : ''}`}
                onClick={() => handleThemeChange('dark')}
              >
                🌙 Sombre
              </button>
              <button
                className={`theme-option ${theme === 'light' ? 'active' : ''}`}
                onClick={() => handleThemeChange('light')}
                disabled
              >
                ☀️ Clair (Bientôt)
              </button>
            </div>
            <p className="setting-help">
              Le thème clair sera disponible dans une prochaine version
            </p>
          </div>
        </Card>

        <Card className="setting-section">
          <div className="setting-header">
            <Globe size={20} />
            <h3>Langue</h3>
          </div>

          <div className="setting-group">
            <label className="setting-label">Langue de l'interface</label>
            <div className="language-selector">
              <button
                className={`language-option ${language === 'fr' ? 'active' : ''}`}
                onClick={() => handleLanguageChange('fr')}
              >
                🇫🇷 Français
              </button>
              <button
                className={`language-option ${language === 'en' ? 'active' : ''}`}
                onClick={() => handleLanguageChange('en')}
                disabled
              >
                🇬🇧 English (Bientôt)
              </button>
            </div>
            <p className="setting-help">
              L'anglais sera disponible dans une prochaine version
            </p>
          </div>
        </Card>

        <Card className="setting-section">
          <div className="setting-header">
            <Zap size={20} />
            <h3>Animations</h3>
          </div>

          <div className="setting-group">
            <label className="setting-label">Vitesse des animations</label>
            <div className="speed-selector">
              <button
                className={`speed-option ${animationSpeed === 'slow' ? 'active' : ''}`}
                onClick={() => handleAnimationSpeedChange('slow')}
              >
                🐌 Lente
              </button>
              <button
                className={`speed-option ${animationSpeed === 'normal' ? 'active' : ''}`}
                onClick={() => handleAnimationSpeedChange('normal')}
              >
                ⚡ Normal
              </button>
              <button
                className={`speed-option ${animationSpeed === 'fast' ? 'active' : ''}`}
                onClick={() => handleAnimationSpeedChange('fast')}
              >
                🚀 Rapide
              </button>
            </div>
            <p className="setting-help">
              Contrôle la vitesse des transitions et animations du jeu
            </p>
          </div>
        </Card>

        <Card className="setting-section">
          <div className="setting-header">
            <SettingsIcon size={20} />
            <h3>Intelligence Artificielle</h3>
          </div>

          <div className="setting-group">
            <label className="setting-label">Type d'IA par défaut</label>
            <div className="ai-selector">
              <button
                className={`ai-option ${aiType === 'random' ? 'active' : ''}`}
                onClick={() => handleAITypeChange('random')}
              >
                🎲 Aléatoire
              </button>
              <button
                className={`ai-option ${aiType === 'weighted' ? 'active' : ''}`}
                onClick={() => handleAITypeChange('weighted')}
              >
                ⚖️ Pondérée
              </button>
              <button
                className={`ai-option ${aiType === 'adaptive' ? 'active' : ''}`}
                onClick={() => handleAITypeChange('adaptive')}
              >
                🧠 Adaptative
              </button>
            </div>
            <div className="ai-descriptions">
              <div className="ai-description">
                <strong>Aléatoire :</strong> Choix complètement aléatoires, parfait pour débuter
              </div>
              <div className="ai-description">
                <strong>Pondérée :</strong> Analyse vos coups favoris et adapte sa stratégie
              </div>
              <div className="ai-description">
                <strong>Adaptative :</strong> Recherche des patterns dans vos coups pour prédire
              </div>
            </div>
          </div>
        </Card>

        <Card className="setting-section danger-section">
          <div className="setting-header">
            <AlertTriangle size={20} />
            <h3>Zone dangereuse</h3>
          </div>

          <div className="setting-group">
            <label className="setting-label">Réinitialisation des données</label>
            <p className="danger-warning">
              ⚠️ Cette action supprimera définitivement toutes vos statistiques,
              votre historique et remettra les paramètres par défaut.
            </p>

            {!showResetConfirm ? (
              <Button
                onClick={() => setShowResetConfirm(true)}
                variant="error"
                size="medium"
              >
                <RotateCcw size={16} />
                Réinitialiser toutes les données
              </Button>
            ) : (
              <div className="reset-confirmation">
                <p className="confirm-text">
                  Êtes-vous sûr ? Cette action est irréversible.
                </p>
                <div className="confirm-buttons">
                  <Button
                    onClick={handleResetAllData}
                    variant="error"
                    size="small"
                  >
                    Oui, supprimer tout
                  </Button>
                  <Button
                    onClick={() => setShowResetConfirm(false)}
                    variant="secondary"
                    size="small"
                  >
                    Annuler
                  </Button>
                </div>
              </div>
            )}
          </div>
        </Card>
      </div>
    </div>
  )
}