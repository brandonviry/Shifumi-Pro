export type Move = 'rock' | 'paper' | 'scissors'
export type GameResult = 'win' | 'lose' | 'draw'
export type AIType = 'random' | 'weighted' | 'adaptive'
export type GameMode = 'single' | 'tournament'
export type TournamentType = 'bo3' | 'bo5'

export interface GameState {
  playerMove: Move | null
  aiMove: Move | null
  result: GameResult | null
  isPlaying: boolean
  round: number
}

export interface GameHistory {
  id: string
  date: Date
  playerMove: Move
  aiMove: Move
  result: GameResult
  aiType: AIType
  mode: GameMode
}

export interface Statistics {
  totalGames: number
  wins: number
  losses: number
  draws: number
  winStreak: number
  currentStreak: number
  favoriteMove: Move | null
  moveCounts: Record<Move, number>
}

export interface Tournament {
  id: string
  type: TournamentType
  rounds: GameHistory[]
  playerWins: number
  aiWins: number
  isComplete: boolean
  winner: 'player' | 'ai' | null
}

export interface Settings {
  theme: 'light' | 'dark'
  language: 'fr' | 'en'
  animationSpeed: 'slow' | 'normal' | 'fast'
  aiType: AIType
}

export interface AIEngine {
  getMove(history: GameHistory[]): Move
  reset(): void
  type: AIType
}