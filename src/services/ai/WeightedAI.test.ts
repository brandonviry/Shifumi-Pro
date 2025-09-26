import { describe, it, expect, beforeEach } from 'vitest'
import { WeightedAI } from './WeightedAI'
import { GameHistory } from '@/types'

describe('WeightedAI', () => {
  const ai = new WeightedAI()

  beforeEach(() => {
    ai.reset()
  })

  it('should have correct type', () => {
    expect(ai.type).toBe('weighted')
  })

  it('should return random move when history is empty', () => {
    const validMoves = ['rock', 'paper', 'scissors']
    const move = ai.getMove([])
    expect(validMoves).toContain(move)
  })

  it('should counter the most frequent player move', () => {
    const history: GameHistory[] = [
      {
        id: '1',
        date: new Date(),
        playerMove: 'rock',
        aiMove: 'paper',
        result: 'lose',
        aiType: 'weighted',
        mode: 'single',
      },
      {
        id: '2',
        date: new Date(),
        playerMove: 'rock',
        aiMove: 'scissors',
        result: 'win',
        aiType: 'weighted',
        mode: 'single',
      },
      {
        id: '3',
        date: new Date(),
        playerMove: 'rock',
        aiMove: 'paper',
        result: 'lose',
        aiType: 'weighted',
        mode: 'single',
      },
    ]

    // Player plays rock most frequently, so AI should counter with paper
    const move = ai.getMove(history)
    expect(move).toBe('paper')
  })

  it('should analyze only recent moves (last 10)', () => {
    const history: GameHistory[] = []

    // Add 15 games with scissors (older)
    for (let i = 0; i < 15; i++) {
      history.push({
        id: `old-${i}`,
        date: new Date(Date.now() - (20 - i) * 1000),
        playerMove: 'scissors',
        aiMove: 'rock',
        result: 'lose',
        aiType: 'weighted',
        mode: 'single',
      })
    }

    // Add 5 recent games with rock
    for (let i = 0; i < 5; i++) {
      history.push({
        id: `recent-${i}`,
        date: new Date(Date.now() - i * 1000),
        playerMove: 'rock',
        aiMove: 'paper',
        result: 'lose',
        aiType: 'weighted',
        mode: 'single',
      })
    }

    // Should counter rock (most frequent in last 10), not scissors
    const move = ai.getMove(history)
    expect(move).toBe('paper')
  })

  it('should reset internal state', () => {
    const history: GameHistory[] = [
      {
        id: '1',
        date: new Date(),
        playerMove: 'rock',
        aiMove: 'paper',
        result: 'lose',
        aiType: 'weighted',
        mode: 'single',
      },
    ]

    ai.getMove(history)
    ai.reset()

    // After reset, should work as if no history
    const validMoves = ['rock', 'paper', 'scissors']
    const move = ai.getMove([])
    expect(validMoves).toContain(move)
  })

  it('should handle mixed move patterns', () => {
    const history: GameHistory[] = [
      {
        id: '1',
        date: new Date(),
        playerMove: 'rock',
        aiMove: 'paper',
        result: 'lose',
        aiType: 'weighted',
        mode: 'single',
      },
      {
        id: '2',
        date: new Date(),
        playerMove: 'paper',
        aiMove: 'scissors',
        result: 'lose',
        aiType: 'weighted',
        mode: 'single',
      },
      {
        id: '3',
        date: new Date(),
        playerMove: 'scissors',
        aiMove: 'rock',
        result: 'lose',
        aiType: 'weighted',
        mode: 'single',
      },
    ]

    // All moves appear once, should still return a valid counter
    const move = ai.getMove(history)
    const validMoves = ['rock', 'paper', 'scissors']
    expect(validMoves).toContain(move)
  })
})