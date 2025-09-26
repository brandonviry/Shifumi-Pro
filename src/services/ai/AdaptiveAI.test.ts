import { describe, it, expect, beforeEach } from 'vitest'
import { AdaptiveAI } from './AdaptiveAI'
import { GameHistory } from '@/types'

describe('AdaptiveAI', () => {
  const ai = new AdaptiveAI()

  beforeEach(() => {
    ai.reset()
  })

  it('should have correct type', () => {
    expect(ai.type).toBe('adaptive')
  })

  it('should return random move when history is too short', () => {
    const validMoves = ['rock', 'paper', 'scissors']

    expect(validMoves).toContain(ai.getMove([]))

    const shortHistory: GameHistory[] = [
      {
        id: '1',
        date: new Date(),
        playerMove: 'rock',
        aiMove: 'paper',
        result: 'lose',
        aiType: 'adaptive',
        mode: 'single',
      },
    ]

    expect(validMoves).toContain(ai.getMove(shortHistory))
  })

  it('should analyze patterns and predict next move', () => {
    const history: GameHistory[] = [
      // First occurrence of rock-paper-scissors pattern
      {
        id: '1',
        date: new Date(),
        playerMove: 'rock',
        aiMove: 'paper',
        result: 'lose',
        aiType: 'adaptive',
        mode: 'single',
      },
      {
        id: '2',
        date: new Date(),
        playerMove: 'paper',
        aiMove: 'scissors',
        result: 'lose',
        aiType: 'adaptive',
        mode: 'single',
      },
      {
        id: '3',
        date: new Date(),
        playerMove: 'scissors',
        aiMove: 'rock',
        result: 'lose',
        aiType: 'adaptive',
        mode: 'single',
      },
      {
        id: '4',
        date: new Date(),
        playerMove: 'rock', // What came after rock-paper-scissors
        aiMove: 'paper',
        result: 'lose',
        aiType: 'adaptive',
        mode: 'single',
      },
      // Recent pattern: rock-paper-scissors (should predict rock next)
      {
        id: '5',
        date: new Date(),
        playerMove: 'rock',
        aiMove: 'paper',
        result: 'lose',
        aiType: 'adaptive',
        mode: 'single',
      },
      {
        id: '6',
        date: new Date(),
        playerMove: 'paper',
        aiMove: 'scissors',
        result: 'lose',
        aiType: 'adaptive',
        mode: 'single',
      },
      {
        id: '7',
        date: new Date(),
        playerMove: 'scissors',
        aiMove: 'rock',
        result: 'lose',
        aiType: 'adaptive',
        mode: 'single',
      },
    ]

    // Should predict rock and counter with paper
    const move = ai.getMove(history)
    expect(move).toBe('paper')
  })

  it('should handle patterns with no matches in history', () => {
    const history: GameHistory[] = [
      {
        id: '1',
        date: new Date(),
        playerMove: 'rock',
        aiMove: 'paper',
        result: 'lose',
        aiType: 'adaptive',
        mode: 'single',
      },
      {
        id: '2',
        date: new Date(),
        playerMove: 'paper',
        aiMove: 'scissors',
        result: 'lose',
        aiType: 'adaptive',
        mode: 'single',
      },
      {
        id: '3',
        date: new Date(),
        playerMove: 'scissors',
        aiMove: 'rock',
        result: 'lose',
        aiType: 'adaptive',
        mode: 'single',
      },
      // Recent pattern that doesn't exist in history
      {
        id: '4',
        date: new Date(),
        playerMove: 'paper',
        aiMove: 'scissors',
        result: 'lose',
        aiType: 'adaptive',
        mode: 'single',
      },
      {
        id: '5',
        date: new Date(),
        playerMove: 'rock',
        aiMove: 'paper',
        result: 'lose',
        aiType: 'adaptive',
        mode: 'single',
      },
      {
        id: '6',
        date: new Date(),
        playerMove: 'paper',
        aiMove: 'scissors',
        result: 'lose',
        aiType: 'adaptive',
        mode: 'single',
      },
    ]

    // Should return random move when pattern not found
    const validMoves = ['rock', 'paper', 'scissors']
    const move = ai.getMove(history)
    expect(validMoves).toContain(move)
  })

  it('should reset internal patterns', () => {
    const history: GameHistory[] = [
      {
        id: '1',
        date: new Date(),
        playerMove: 'rock',
        aiMove: 'paper',
        result: 'lose',
        aiType: 'adaptive',
        mode: 'single',
      },
    ]

    ai.getMove(history)
    ai.reset()

    // After reset, should work as if no patterns learned
    const validMoves = ['rock', 'paper', 'scissors']
    const move = ai.getMove([])
    expect(validMoves).toContain(move)
  })

  it('should handle multiple pattern matches and choose most frequent', () => {
    const history: GameHistory[] = [
      // Pattern rock-paper-scissors -> rock (2 times)
      {
        id: '1',
        date: new Date(),
        playerMove: 'rock',
        aiMove: 'paper',
        result: 'lose',
        aiType: 'adaptive',
        mode: 'single',
      },
      {
        id: '2',
        date: new Date(),
        playerMove: 'paper',
        aiMove: 'scissors',
        result: 'lose',
        aiType: 'adaptive',
        mode: 'single',
      },
      {
        id: '3',
        date: new Date(),
        playerMove: 'scissors',
        aiMove: 'rock',
        result: 'lose',
        aiType: 'adaptive',
        mode: 'single',
      },
      {
        id: '4',
        date: new Date(),
        playerMove: 'rock', // First occurrence
        aiMove: 'paper',
        result: 'lose',
        aiType: 'adaptive',
        mode: 'single',
      },
      {
        id: '5',
        date: new Date(),
        playerMove: 'rock',
        aiMove: 'paper',
        result: 'lose',
        aiType: 'adaptive',
        mode: 'single',
      },
      {
        id: '6',
        date: new Date(),
        playerMove: 'paper',
        aiMove: 'scissors',
        result: 'lose',
        aiType: 'adaptive',
        mode: 'single',
      },
      {
        id: '7',
        date: new Date(),
        playerMove: 'scissors',
        aiMove: 'rock',
        result: 'lose',
        aiType: 'adaptive',
        mode: 'single',
      },
      {
        id: '8',
        date: new Date(),
        playerMove: 'rock', // Second occurrence
        aiMove: 'paper',
        result: 'lose',
        aiType: 'adaptive',
        mode: 'single',
      },
      // Recent pattern
      {
        id: '9',
        date: new Date(),
        playerMove: 'rock',
        aiMove: 'paper',
        result: 'lose',
        aiType: 'adaptive',
        mode: 'single',
      },
      {
        id: '10',
        date: new Date(),
        playerMove: 'paper',
        aiMove: 'scissors',
        result: 'lose',
        aiType: 'adaptive',
        mode: 'single',
      },
      {
        id: '11',
        date: new Date(),
        playerMove: 'scissors',
        aiMove: 'rock',
        result: 'lose',
        aiType: 'adaptive',
        mode: 'single',
      },
    ]

    // Should predict rock (most frequent after pattern) and counter with paper
    const move = ai.getMove(history)
    expect(move).toBe('paper')
  })
})