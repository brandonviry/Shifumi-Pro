import { AIEngine, Move, GameHistory } from '@/types'
import { getRandomMove } from '@/utils/gameLogic'

export class AdaptiveAI implements AIEngine {
  public readonly type = 'adaptive'
  private patternLength = 3
  private patterns: Map<string, Record<Move, number>> = new Map()

  getMove(history: GameHistory[]): Move {
    if (history.length < this.patternLength) {
      return getRandomMove()
    }

    // Get the recent pattern of player moves
    const recentMoves = history
      .slice(-this.patternLength)
      .map(game => game.playerMove)
      .join('')

    // Look for this pattern in history and predict next move
    const predictedMove = this.predictNextMove(history, recentMoves)

    // Counter the predicted move
    return this.getCounterMove(predictedMove)
  }

  private predictNextMove(history: GameHistory[], pattern: string): Move {
    // Find all occurrences of this pattern in history
    const patternOccurrences: Move[] = []

    for (let i = 0; i <= history.length - this.patternLength - 1; i++) {
      const currentPattern = history
        .slice(i, i + this.patternLength)
        .map(game => game.playerMove)
        .join('')

      if (currentPattern === pattern && i + this.patternLength < history.length) {
        patternOccurrences.push(history[i + this.patternLength].playerMove)
      }
    }

    if (patternOccurrences.length === 0) {
      return getRandomMove()
    }

    // Count frequency of moves that followed this pattern
    const moveCounts: Record<Move, number> = { rock: 0, paper: 0, scissors: 0 }
    patternOccurrences.forEach(move => {
      moveCounts[move]++
    })

    // Return the most frequent move
    const moves = Object.entries(moveCounts) as [Move, number][]
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
    this.patterns.clear()
  }
}