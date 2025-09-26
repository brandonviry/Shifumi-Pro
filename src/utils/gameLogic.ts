import { Move, GameResult } from '@/types'

export function determineWinner(playerMove: Move, aiMove: Move): GameResult {
  if (playerMove === aiMove) {
    return 'draw'
  }

  const winConditions: Record<Move, Move> = {
    rock: 'scissors',
    paper: 'rock',
    scissors: 'paper',
  }

  return winConditions[playerMove] === aiMove ? 'win' : 'lose'
}

export function getRandomMove(): Move {
  const moves: Move[] = ['rock', 'paper', 'scissors']
  return moves[Math.floor(Math.random() * moves.length)]
}

export function calculateWinRate(wins: number, totalGames: number): number {
  return totalGames === 0 ? 0 : Math.round((wins / totalGames) * 100)
}