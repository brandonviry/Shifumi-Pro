import { useState, useMemo } from 'react'
import { useGameStore } from '@/state/gameStore'
import Card from '@/components/common/Card'
import Button from '@/components/common/Button'
import { History as HistoryIcon, Filter, Calendar, Trophy, Target, Users } from 'lucide-react'
import { GameResult, AIType } from '@/types'
import './History.css'

export default function History() {
  const { gameHistory, clearHistory } = useGameStore()
  const [filterResult, setFilterResult] = useState<GameResult | 'all'>('all')
  const [filterAI, setFilterAI] = useState<AIType | 'all'>('all')
  const [filterPeriod, setFilterPeriod] = useState<'all' | 'today' | 'week' | 'month'>('all')
  const [showClearConfirm, setShowClearConfirm] = useState(false)

  const filteredHistory = useMemo(() => {
    let filtered = [...gameHistory]

    // Filter by result
    if (filterResult !== 'all') {
      filtered = filtered.filter(game => game.result === filterResult)
    }

    // Filter by AI type
    if (filterAI !== 'all') {
      filtered = filtered.filter(game => game.aiType === filterAI)
    }

    // Filter by period
    if (filterPeriod !== 'all') {
      const now = new Date()
      filtered = filtered.filter(game => {
        const gameDate = new Date(game.date)
        switch (filterPeriod) {
          case 'today':
            return gameDate.toDateString() === now.toDateString()
          case 'week':
            const weekAgo = new Date(now.getTime() - 7 * 24 * 60 * 60 * 1000)
            return gameDate >= weekAgo
          case 'month':
            const monthAgo = new Date(now.getTime() - 30 * 24 * 60 * 60 * 1000)
            return gameDate >= monthAgo
          default:
            return true
        }
      })
    }

    return filtered
  }, [gameHistory, filterResult, filterAI, filterPeriod])

  const getResultIcon = (result: GameResult) => {
    switch (result) {
      case 'win':
        return '🏆'
      case 'lose':
        return '😞'
      case 'draw':
        return '🤝'
    }
  }

  const getResultText = (result: GameResult) => {
    switch (result) {
      case 'win':
        return 'Victoire'
      case 'lose':
        return 'Défaite'
      case 'draw':
        return 'Égalité'
    }
  }

  const getMoveEmoji = (move: string) => {
    switch (move) {
      case 'rock':
        return '🪨'
      case 'paper':
        return '📄'
      case 'scissors':
        return '✂️'
      default:
        return '❓'
    }
  }

  const getAILabel = (aiType: AIType) => {
    switch (aiType) {
      case 'random':
        return 'Aléatoire'
      case 'weighted':
        return 'Pondérée'
      case 'adaptive':
        return 'Adaptative'
    }
  }

  const formatDate = (date: Date) => {
    const gameDate = new Date(date)
    const now = new Date()
    const diffTime = now.getTime() - gameDate.getTime()
    const diffDays = Math.floor(diffTime / (1000 * 60 * 60 * 24))

    if (diffDays === 0) {
      return `Aujourd'hui ${gameDate.toLocaleTimeString('fr-FR', {
        hour: '2-digit',
        minute: '2-digit'
      })}`
    } else if (diffDays === 1) {
      return `Hier ${gameDate.toLocaleTimeString('fr-FR', {
        hour: '2-digit',
        minute: '2-digit'
      })}`
    } else if (diffDays < 7) {
      return `Il y a ${diffDays} jours`
    } else {
      return gameDate.toLocaleDateString('fr-FR')
    }
  }

  const handleClearHistory = () => {
    clearHistory()
    setShowClearConfirm(false)
  }

  return (
    <div className="history">
      <div className="history-header">
        <h2 className="history-title">
          <HistoryIcon size={28} />
          Historique des parties
        </h2>
        <p className="history-subtitle">
          {gameHistory.length} partie{gameHistory.length > 1 ? 's' : ''} jouée{gameHistory.length > 1 ? 's' : ''}
        </p>
      </div>

      <Card className="filters-section">
        <div className="filters-header">
          <Filter size={20} />
          <h3>Filtres</h3>
        </div>

        <div className="filters-grid">
          <div className="filter-group">
            <label className="filter-label">
              <Trophy size={16} />
              Résultat
            </label>
            <select
              value={filterResult}
              onChange={(e) => setFilterResult(e.target.value as any)}
              className="filter-select"
            >
              <option value="all">Tous les résultats</option>
              <option value="win">Victoires</option>
              <option value="lose">Défaites</option>
              <option value="draw">Égalités</option>
            </select>
          </div>

          <div className="filter-group">
            <label className="filter-label">
              <Users size={16} />
              Type d'IA
            </label>
            <select
              value={filterAI}
              onChange={(e) => setFilterAI(e.target.value as any)}
              className="filter-select"
            >
              <option value="all">Toutes les IA</option>
              <option value="random">Aléatoire</option>
              <option value="weighted">Pondérée</option>
              <option value="adaptive">Adaptative</option>
            </select>
          </div>

          <div className="filter-group">
            <label className="filter-label">
              <Calendar size={16} />
              Période
            </label>
            <select
              value={filterPeriod}
              onChange={(e) => setFilterPeriod(e.target.value as any)}
              className="filter-select"
            >
              <option value="all">Toute la période</option>
              <option value="today">Aujourd'hui</option>
              <option value="week">Cette semaine</option>
              <option value="month">Ce mois</option>
            </select>
          </div>
        </div>

        <div className="filter-results">
          <span className="results-count">
            <Target size={16} />
            {filteredHistory.length} partie{filteredHistory.length > 1 ? 's' : ''} trouvée{filteredHistory.length > 1 ? 's' : ''}
          </span>

          {gameHistory.length > 0 && (
            <div className="clear-history">
              {!showClearConfirm ? (
                <Button
                  onClick={() => setShowClearConfirm(true)}
                  variant="error"
                  size="small"
                >
                  Vider l'historique
                </Button>
              ) : (
                <div className="clear-confirm">
                  <Button
                    onClick={handleClearHistory}
                    variant="error"
                    size="small"
                  >
                    Confirmer
                  </Button>
                  <Button
                    onClick={() => setShowClearConfirm(false)}
                    variant="secondary"
                    size="small"
                  >
                    Annuler
                  </Button>
                </div>
              )}
            </div>
          )}
        </div>
      </Card>

      <div className="history-content">
        {filteredHistory.length === 0 ? (
          <Card className="empty-history">
            <div className="empty-state">
              <HistoryIcon size={48} />
              <h3>Aucune partie trouvée</h3>
              <p>
                {gameHistory.length === 0
                  ? "Vous n'avez encore joué aucune partie."
                  : "Aucune partie ne correspond à vos filtres."}
              </p>
            </div>
          </Card>
        ) : (
          <div className="games-grid">
            {filteredHistory.map((game) => (
              <Card key={game.id} className="game-card" hoverable>
                <div className="game-card-header">
                  <div className={`game-result ${game.result}`}>
                    <span className="result-icon">{getResultIcon(game.result)}</span>
                    <span className="result-text">{getResultText(game.result)}</span>
                  </div>
                  <div className="game-date">{formatDate(game.date)}</div>
                </div>

                <div className="game-card-content">
                  <div className="moves-display">
                    <div className="player-move">
                      <span className="move-label">Vous</span>
                      <span className="move-emoji">{getMoveEmoji(game.playerMove)}</span>
                    </div>
                    <div className="vs-divider">vs</div>
                    <div className="ai-move">
                      <span className="move-label">IA</span>
                      <span className="move-emoji">{getMoveEmoji(game.aiMove)}</span>
                    </div>
                  </div>

                  <div className="game-info">
                    <span className="ai-type">IA {getAILabel(game.aiType)}</span>
                    <span className="game-mode">{game.mode === 'single' ? 'Partie simple' : 'Tournoi'}</span>
                  </div>
                </div>
              </Card>
            ))}
          </div>
        )}
      </div>
    </div>
  )
}