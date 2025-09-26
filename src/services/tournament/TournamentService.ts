import { Tournament, TournamentType, GameHistory, Move } from '@/types'
import { determineWinner } from '@/utils/gameLogic'
import { AIFactory } from '@/services/ai/AIFactory'

export class TournamentService {
  static createTournament(type: TournamentType): Tournament {
    return {
      id: crypto.randomUUID(),
      type,
      rounds: [],
      playerWins: 0,
      aiWins: 0,
      isComplete: false,
      winner: null,
    }
  }

  static playRound(
    tournament: Tournament,
    playerMove: Move,
    aiType: string,
    gameHistory: GameHistory[]
  ): Tournament {
    // Create AI and get its move
    const ai = AIFactory.create(aiType as any)
    const aiMove = ai.getMove(gameHistory)

    // Determine winner
    const result = determineWinner(playerMove, aiMove)

    // Create round history entry
    const round: GameHistory = {
      id: crypto.randomUUID(),
      date: new Date(),
      playerMove,
      aiMove,
      result,
      aiType: aiType as any,
      mode: 'tournament',
    }

    // Update tournament
    const updatedTournament = { ...tournament }
    updatedTournament.rounds.push(round)

    if (result === 'win') {
      updatedTournament.playerWins++
    } else if (result === 'lose') {
      updatedTournament.aiWins++
    }

    // Check if tournament is complete
    const maxWins = tournament.type === 'bo3' ? 2 : 3

    if (updatedTournament.playerWins >= maxWins) {
      updatedTournament.isComplete = true
      updatedTournament.winner = 'player'
    } else if (updatedTournament.aiWins >= maxWins) {
      updatedTournament.isComplete = true
      updatedTournament.winner = 'ai'
    }

    return updatedTournament
  }

  static getTournamentStatus(tournament: Tournament): {
    currentRound: number
    totalRounds: number
    needsToWin: number
    playerWins: number
    aiWins: number
    isComplete: boolean
    winner: 'player' | 'ai' | null
  } {
    const maxWins = tournament.type === 'bo3' ? 2 : 3
    const maxRounds = tournament.type === 'bo3' ? 3 : 5

    return {
      currentRound: tournament.rounds.length + 1,
      totalRounds: maxRounds,
      needsToWin: maxWins,
      playerWins: tournament.playerWins,
      aiWins: tournament.aiWins,
      isComplete: tournament.isComplete,
      winner: tournament.winner,
    }
  }

  static getTournamentScore(tournament: Tournament): string {
    return `${tournament.playerWins} - ${tournament.aiWins}`
  }

  static canContinue(tournament: Tournament): boolean {
    return !tournament.isComplete
  }

  static getWinnerText(tournament: Tournament): string {
    if (!tournament.isComplete || !tournament.winner) {
      return ''
    }

    return tournament.winner === 'player'
      ? '🏆 Vous avez remporté le tournoi!'
      : '🤖 L\'IA a remporté le tournoi!'
  }
}