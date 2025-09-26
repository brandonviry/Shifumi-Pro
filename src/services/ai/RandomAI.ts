import { AIEngine, Move, GameHistory } from '@/types'
import { getRandomMove } from '@/utils/gameLogic'

export class RandomAI implements AIEngine {
  public readonly type = 'random'

  getMove(_history: GameHistory[]): Move {
    return getRandomMove()
  }

  reset(): void {
    // Nothing to reset for random AI
  }
}