import { Trophy, Target, TrendingUp, Zap } from 'lucide-react'
import { useGameStore } from '@/state/gameStore'
import StatCard from '@/components/analytics/StatCard'
import WinRateChart from '@/components/analytics/WinRateChart'
import Card from '@/components/common/Card'
import Button from '@/components/common/Button'
import { calculateWinRate } from '@/utils/gameLogic'
import './Dashboard.css'

interface DashboardProps {
  onStartGame: () => void
}

export default function Dashboard({ onStartGame }: DashboardProps) {
  const { statistics, gameHistory } = useGameStore()

  const winRate = calculateWinRate(statistics.wins, statistics.totalGames)
  const recentGames = gameHistory.slice(0, 5)

  return (
    <div className="dashboard">
      <div className="dashboard-header">
        <h2 className="dashboard-title">Dashboard</h2>
        <Button onClick={onStartGame} size="large">
          Nouvelle Partie
        </Button>
      </div>

      <div className="stats-grid">
        <StatCard
          title="Total des parties"
          value={statistics.totalGames}
          icon={<Target size={24} />}
          color="primary"
        />
        <StatCard
          title="Taux de victoire"
          value={`${winRate}%`}
          icon={<Trophy size={24} />}
          color="success"
        />
        <StatCard
          title="Série actuelle"
          value={statistics.currentStreak}
          icon={<TrendingUp size={24} />}
          color="secondary"
        />
        <StatCard
          title="Meilleure série"
          value={statistics.winStreak}
          icon={<Zap size={24} />}
          color="warning"
        />
      </div>

      <div className="dashboard-content">
        <div className="dashboard-chart">
          <Card>
            <h3 className="section-title">Répartition des résultats</h3>
            {statistics.totalGames > 0 ? (
              <WinRateChart statistics={statistics} />
            ) : (
              <div className="empty-state">
                <p>Aucune partie jouée</p>
                <Button onClick={onStartGame}>Commencer à jouer</Button>
              </div>
            )}
          </Card>
        </div>

        <div className="dashboard-sidebar">
          <Card>
            <h3 className="section-title">Coup favori</h3>
            <div className="favorite-move">
              {statistics.favoriteMove ? (
                <div className="favorite-move-content">
                  <span className="move-emoji">
                    {statistics.favoriteMove === 'rock'
                      ? '🪨'
                      : statistics.favoriteMove === 'paper'
                      ? '📄'
                      : '✂️'}
                  </span>
                  <span className="move-name">
                    {statistics.favoriteMove === 'rock'
                      ? 'Pierre'
                      : statistics.favoriteMove === 'paper'
                      ? 'Feuille'
                      : 'Ciseaux'}
                  </span>
                  <span className="move-count">
                    {statistics.moveCounts[statistics.favoriteMove]} fois
                  </span>
                </div>
              ) : (
                <p className="no-favorite">Aucun coup joué</p>
              )}
            </div>
          </Card>

          <Card>
            <h3 className="section-title">Parties récentes</h3>
            <div className="recent-games">
              {recentGames.length > 0 ? (
                <div className="games-list">
                  {recentGames.map(game => (
                    <div
                      key={game.id}
                      className={`game-item game-item--${game.result}`}
                    >
                      <div className="game-moves">
                        <span>{game.playerMove === 'rock' ? '🪨' : game.playerMove === 'paper' ? '📄' : '✂️'}</span>
                        <span>vs</span>
                        <span>{game.aiMove === 'rock' ? '🪨' : game.aiMove === 'paper' ? '📄' : '✂️'}</span>
                      </div>
                      <div className={`game-result ${game.result}`}>
                        {game.result === 'win' ? 'Victoire' : game.result === 'lose' ? 'Défaite' : 'Égalité'}
                      </div>
                    </div>
                  ))}
                </div>
              ) : (
                <p className="no-recent">Aucune partie récente</p>
              )}
            </div>
          </Card>
        </div>
      </div>
    </div>
  )
}