import { describe, it, expect } from 'vitest'
import { RandomAI } from './RandomAI'

describe('RandomAI', () => {
  const ai = new RandomAI()

  it('should have correct type', () => {
    expect(ai.type).toBe('random')
  })

  it('should return a valid move', () => {
    const validMoves = ['rock', 'paper', 'scissors']
    const move = ai.getMove([])
    expect(validMoves).toContain(move)
  })

  it('should ignore history and return random moves', () => {
    const mockHistory = [
      {
        id: '1',
        date: new Date(),
        playerMove: 'rock' as const,
        aiMove: 'paper' as const,
        result: 'lose' as const,
        aiType: 'random' as const,
        mode: 'single' as const,
      },
    ]

    const move = ai.getMove(mockHistory)
    const validMoves = ['rock', 'paper', 'scissors']
    expect(validMoves).toContain(move)
  })

  it('should return different moves over multiple calls (probabilistic)', () => {
    const moves = new Set()
    for (let i = 0; i < 50; i++) {
      moves.add(ai.getMove([]))
    }
    // With 50 calls, we should get at least 2 different moves
    expect(moves.size).toBeGreaterThan(1)
  })

  it('should not be affected by reset', () => {
    const move1 = ai.getMove([])
    ai.reset()
    const move2 = ai.getMove([])

    const validMoves = ['rock', 'paper', 'scissors']
    expect(validMoves).toContain(move1)
    expect(validMoves).toContain(move2)
  })
})