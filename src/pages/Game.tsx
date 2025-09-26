import { useState, useEffect } from 'react'
import { useGameStore } from '@/state/gameStore'
import { useSettingsStore } from '@/state/settingsStore'
import MoveButton from '@/components/gameplay/MoveButton'
import Button from '@/components/common/Button'
import Card from '@/components/common/Card'
import { Move } from '@/types'
import './Game.css'

export default function Game() {
  const {
    playerMove,
    aiMove,
    result,
    isPlaying,
    playMove,
    resetGame,
    aiType,
    setAIType,
  } = useGameStore()

  const { animationSpeed } = useSettingsStore()
  const [showResult, setShowResult] = useState(false)

  useEffect(() => {
    if (result) {
      const delay = animationSpeed === 'fast' ? 500 : animationSpeed === 'slow' ? 2000 : 1000
      const timer = setTimeout(() => {
        setShowResult(true)
      }, delay)
      return () => clearTimeout(timer)
    } else {
      setShowResult(false)
    }
  }, [result, animationSpeed])

  const handleMoveClick = (move: Move) => {
    if (!isPlaying || showResult) {
      playMove(move)
    }
  }

  const handlePlayAgain = () => {
    resetGame()
    setShowResult(false)
  }

  const getResultMessage = () => {
    if (!result || !showResult) return ''

    switch (result) {
      case 'win':
        return '🎉 Vous avez gagné!'
      case 'lose':
        return '😢 Vous avez perdu!'
      case 'draw':
        return '🤝 Égalité!'
    }
  }

  const getResultClass = () => {
    if (!result) return ''
    return `game-result--${result}`
  }

  return (
    <div className="game">
      <div className="game-header">
        <h2 className="game-title">Pierre, Feuille, Ciseaux</h2>

        <div className="ai-selector">
          <label htmlFor="ai-type" className="ai-label">
            Type d'IA:
          </label>
          <select
            id="ai-type"
            value={aiType}
            onChange={(e) => setAIType(e.target.value as any)}
            className="ai-select"
          >
            <option value="random">Aléatoire</option>
            <option value="weighted">Pondérée</option>
            <option value="adaptive">Adaptative</option>
          </select>
        </div>
      </div>

      <Card className="game-arena">
        <div className="game-players">
          <div className="player-section">
            <h3 className="player-title">Vous</h3>
            <div className="player-choice">
              {playerMove && (
                <div className={`choice-display ${isPlaying ? 'animate' : ''}`}>
                  <span className="choice-emoji">
                    {playerMove === 'rock' ? '🪨' : playerMove === 'paper' ? '📄' : '✂️'}
                  </span>
                  <span className="choice-label">
                    {playerMove === 'rock' ? 'Pierre' : playerMove === 'paper' ? 'Feuille' : 'Ciseaux'}
                  </span>
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
            <h3 className="player-title">IA ({aiType})</h3>
            <div className="player-choice">
              {aiMove && showResult && (
                <div className="choice-display">
                  <span className="choice-emoji">
                    {aiMove === 'rock' ? '🪨' : aiMove === 'paper' ? '📄' : '✂️'}
                  </span>
                  <span className="choice-label">
                    {aiMove === 'rock' ? 'Pierre' : aiMove === 'paper' ? 'Feuille' : 'Ciseaux'}
                  </span>
                </div>
              )}
              {isPlaying && !showResult && (
                <div className="thinking">
                  <span className="thinking-text">🤔 Réflexion...</span>
                </div>
              )}
            </div>
          </div>
        </div>

        <div className="game-controls">
          {!isPlaying || showResult ? (
            <div className="move-buttons">
              <MoveButton
                move="rock"
                onClick={handleMoveClick}
                selected={playerMove === 'rock'}
                disabled={isPlaying && !showResult}
              />
              <MoveButton
                move="paper"
                onClick={handleMoveClick}
                selected={playerMove === 'paper'}
                disabled={isPlaying && !showResult}
              />
              <MoveButton
                move="scissors"
                onClick={handleMoveClick}
                selected={playerMove === 'scissors'}
                disabled={isPlaying && !showResult}
              />
            </div>
          ) : (
            <div className="waiting">
              <p>Partie en cours...</p>
            </div>
          )}

          {showResult && (
            <div className="game-actions">
              <Button onClick={handlePlayAgain} size="large">
                Rejouer
              </Button>
            </div>
          )}
        </div>
      </Card>
    </div>
  )
}