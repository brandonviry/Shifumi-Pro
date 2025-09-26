import { useState, useEffect } from 'react'
import { useGameStore } from '@/state/gameStore'
import { useTournamentStore } from '@/state/tournamentStore'
import { useSettingsStore } from '@/state/settingsStore'
import { TournamentService } from '@/services/tournament/TournamentService'
import MoveButton from '@/components/gameplay/MoveButton'
import Button from '@/components/common/Button'
import Card from '@/components/common/Card'
import { Trophy, Target, Users, Play, RotateCcw } from 'lucide-react'
import { Move, TournamentType } from '@/types'
import './Tournament.css'

export default function Tournament() {
  const { gameHistory } = useGameStore()
  const { aiType } = useSettingsStore()
  const { animationSpeed } = useSettingsStore()

  const {
    currentTournament,
    startTournament,
    playTournamentRound,
    endTournament,
  } = useTournamentStore()

  const [selectedMove, setSelectedMove] = useState<Move | null>(null)
  const [showResult, setShowResult] = useState(false)
  const [lastRound, setLastRound] = useState<any>(null)

  // Tournament setup state
  const [selectedType, setSelectedType] = useState<TournamentType>('bo3')

  useEffect(() => {
    if (currentTournament && currentTournament.rounds.length > 0) {
      const latestRound = currentTournament.rounds[currentTournament.rounds.length - 1]
      setLastRound(latestRound)
      setSelectedMove(latestRound.playerMove)

      const delay = animationSpeed === 'fast' ? 500 : animationSpeed === 'slow' ? 2000 : 1000
      const timer = setTimeout(() => {
        setShowResult(true)
      }, delay)

      return () => clearTimeout(timer)
    }
  }, [currentTournament, animationSpeed])

  const handleStartTournament = () => {
    startTournament(selectedType)
    setShowResult(false)
    setSelectedMove(null)
    setLastRound(null)
  }

  const handleMoveClick = (move: Move) => {
    if (!currentTournament || currentTournament.isComplete || showResult) return

    playTournamentRound(move, aiType, gameHistory)
  }

  const handleNextRound = () => {
    setShowResult(false)
    setSelectedMove(null)
    setLastRound(null)
  }

  const handleEndTournament = () => {
    endTournament()
    setShowResult(false)
    setSelectedMove(null)
    setLastRound(null)
  }

  const getResultMessage = () => {
    if (!lastRound || !showResult) return ''

    switch (lastRound.result) {
      case 'win':
        return '🎉 Manche gagnée!'
      case 'lose':
        return '😢 Manche perdue!'
      case 'draw':
        return '🤝 Manche nulle!'
    }
  }

  const getResultClass = () => {
    if (!lastRound) return ''
    return `tournament-result--${lastRound.result}`
  }

  const getMoveEmoji = (move: Move) => {
    switch (move) {
      case 'rock':
        return '🪨'
      case 'paper':
        return '📄'
      case 'scissors':
        return '✂️'
    }
  }

  const renderTournamentSetup = () => (
    <div className="tournament-setup">
      <h2 className="tournament-title">
        <Trophy size={28} />
        Mode Tournoi
      </h2>

      <Card className="tournament-config">
        <h3>Choisissez le format</h3>

        <div className="tournament-types">
          <button
            className={`tournament-type ${selectedType === 'bo3' ? 'active' : ''}`}
            onClick={() => setSelectedType('bo3')}
          >
            <Target size={20} />
            <div>
              <strong>Best of 3</strong>
              <p>Premier à 2 victoires</p>
            </div>
          </button>

          <button
            className={`tournament-type ${selectedType === 'bo5' ? 'active' : ''}`}
            onClick={() => setSelectedType('bo5')}
          >
            <Trophy size={20} />
            <div>
              <strong>Best of 5</strong>
              <p>Premier à 3 victoires</p>
            </div>
          </button>
        </div>

        <div className="tournament-info">
          <Users size={16} />
          <span>IA: {aiType === 'random' ? 'Aléatoire' : aiType === 'weighted' ? 'Pondérée' : 'Adaptative'}</span>
        </div>

        <Button onClick={handleStartTournament} size="large" fullWidth>
          <Play size={20} />
          Commencer le tournoi
        </Button>
      </Card>
    </div>
  )

  const renderTournamentGame = () => {
    if (!currentTournament) return null

    const status = TournamentService.getTournamentStatus(currentTournament)
    const score = TournamentService.getTournamentScore(currentTournament)

    return (
      <div className="tournament-game">
        <div className="tournament-header">
          <div className="tournament-info-bar">
            <div className="tournament-format">
              {currentTournament.type.toUpperCase()} - Manche {status.currentRound}
            </div>
            <div className="tournament-score">{score}</div>
            <div className="tournament-progress">
              Premier à {status.needsToWin}
            </div>
          </div>

          <div className="tournament-rounds">
            {Array.from({ length: status.totalRounds }, (_, i) => {
              const round = currentTournament.rounds[i]
              return (
                <div
                  key={i}
                  className={`round-indicator ${
                    round
                      ? round.result === 'win'
                        ? 'win'
                        : round.result === 'lose'
                        ? 'lose'
                        : 'draw'
                      : i === status.currentRound - 1
                      ? 'current'
                      : 'pending'
                  }`}
                >
                  {i + 1}
                </div>
              )
            })}
          </div>
        </div>

        <Card className="tournament-arena">
          <div className="tournament-players">
            <div className="player-section">
              <h3 className="player-title">Vous</h3>
              <div className="player-choice">
                {selectedMove && (
                  <div className="choice-display">
                    <span className="choice-emoji">{getMoveEmoji(selectedMove)}</span>
                  </div>
                )}
              </div>
            </div>

            <div className="vs-section">
              <span className="vs-text">VS</span>
              {showResult && (
                <div className={`result-message ${getResultClass()}`}>
                  {getResultMessage()}
                </div>
              )}
            </div>

            <div className="player-section">
              <h3 className="player-title">IA</h3>
              <div className="player-choice">
                {lastRound && showResult && (
                  <div className="choice-display">
                    <span className="choice-emoji">{getMoveEmoji(lastRound.aiMove)}</span>
                  </div>
                )}
                {selectedMove && !showResult && (
                  <div className="thinking">
                    <span className="thinking-text">🤔 Réflexion...</span>
                  </div>
                )}
              </div>
            </div>
          </div>

          {status.isComplete ? (
            <div className="tournament-complete">
              <div className={`tournament-winner ${status.winner === 'player' ? 'player-win' : 'ai-win'}`}>
                {TournamentService.getWinnerText(currentTournament)}
              </div>
              <div className="tournament-actions">
                <Button onClick={handleStartTournament} size="large">
                  <RotateCcw size={16} />
                  Nouveau tournoi
                </Button>
                <Button onClick={handleEndTournament} variant="secondary">
                  Terminer
                </Button>
              </div>
            </div>
          ) : showResult ? (
            <div className="round-complete">
              <Button onClick={handleNextRound} size="large">
                Manche suivante
              </Button>
              <Button onClick={handleEndTournament} variant="secondary" size="small">
                Abandonner
              </Button>
            </div>
          ) : (
            <div className="move-selection">
              <div className="move-buttons">
                <MoveButton move="rock" onClick={handleMoveClick} />
                <MoveButton move="paper" onClick={handleMoveClick} />
                <MoveButton move="scissors" onClick={handleMoveClick} />
              </div>
            </div>
          )}
        </Card>
      </div>
    )
  }

  return (
    <div className="tournament">
      {!currentTournament ? renderTournamentSetup() : renderTournamentGame()}
    </div>
  )
}