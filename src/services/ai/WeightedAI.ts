import { AIEngine, Move, GameHistory } from '@/types'
import { getRandomMove } from '@/utils/gameLogic'

export class WeightedAI implements AIEngine {
  public readonly type = 'weighted'
  private moveCounts: Record<Move, number> = {
    rock: 0,
    paper: 0,
    scissors: 0,
  }

  getMove(history: GameHistory[]): Move {
    if (history.length === 0) {
      return getRandomMove()
    }

    // Analyze player's move patterns
    this.updateMoveCounts(history)

    // Find the most frequent player move
    const mostFrequentMove = this.getMostFrequentPlayerMove()

    // Counter the most frequent move
    return this.getCounterMove(mostFrequentMove)
  }

  private updateMoveCounts(history: GameHistory[]): void {
    this.moveCounts = { rock: 0, paper: 0, scissors: 0 }

    // Count recent moves (last 10 games) with higher weight
    const recentHistory = history.slice(-10)
    recentHistory.forEach(game => {
      this.moveCounts[game.playerMove] += 1
    })
  }

  private getMostFrequentPlayerMove(): Move {
    const moves = Object.entries(this.moveCounts) as [Move, number][]
    moves.sort((a, b) => b[1] - a[1])

    return moves[0][0]
  }

  private getCounterMove(move: Move): Move {
    const counters: Record<Move, Move> = {
      rock: 'paper',
      paper: 'scissors',
      scissors: 'rock',
    }

    return counters[move]
  }

  reset(): void {
    this.moveCounts = { rock: 0, paper: 0, scissors: 0 }
  }
}