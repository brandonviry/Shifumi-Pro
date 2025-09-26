import { describe, it, expect } from 'vitest'
import { determineWinner, getRandomMove, calculateWinRate } from './gameLogic'

describe('gameLogic', () => {
  describe('determineWinner', () => {
    it('should return draw when both players have same move', () => {
      expect(determineWinner('rock', 'rock')).toBe('draw')
      expect(determineWinner('paper', 'paper')).toBe('draw')
      expect(determineWinner('scissors', 'scissors')).toBe('draw')
    })

    it('should return win when player wins', () => {
      expect(determineWinner('rock', 'scissors')).toBe('win')
      expect(determineWinner('paper', 'rock')).toBe('win')
      expect(determineWinner('scissors', 'paper')).toBe('win')
    })

    it('should return lose when player loses', () => {
      expect(determineWinner('rock', 'paper')).toBe('lose')
      expect(determineWinner('paper', 'scissors')).toBe('lose')
      expect(determineWinner('scissors', 'rock')).toBe('lose')
    })
  })

  describe('getRandomMove', () => {
    it('should return a valid move', () => {
      const validMoves = ['rock', 'paper', 'scissors']
      const move = getRandomMove()
      expect(validMoves).toContain(move)
    })

    it('should return different moves over multiple calls (probabilistic)', () => {
      const moves = new Set()
      for (let i = 0; i < 50; i++) {
        moves.add(getRandomMove())
      }
      // With 50 calls, we should get at least 2 different moves
      expect(moves.size).toBeGreaterThan(1)
    })
  })

  describe('calculateWinRate', () => {
    it('should return 0 when totalGames is 0', () => {
      expect(calculateWinRate(0, 0)).toBe(0)
      expect(calculateWinRate(10, 0)).toBe(0)
    })

    it('should calculate correct win rate', () => {
      expect(calculateWinRate(5, 10)).toBe(50)
      expect(calculateWinRate(3, 10)).toBe(30)
      expect(calculateWinRate(7, 10)).toBe(70)
      expect(calculateWinRate(10, 10)).toBe(100)
    })

    it('should round to nearest integer', () => {
      expect(calculateWinRate(1, 3)).toBe(33) // 33.33... rounded
      expect(calculateWinRate(2, 3)).toBe(67) // 66.66... rounded
    })
  })
})