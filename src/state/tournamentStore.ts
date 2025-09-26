import { create } from 'zustand'
import { Tournament, TournamentType, Move, GameHistory, AIType } from '@/types'
import { TournamentService } from '@/services/tournament/TournamentService'
import { LocalStorageService } from '@/services/storage/LocalStorage'

interface TournamentStore {
  currentTournament: Tournament | null
  tournaments: Tournament[]

  // Tournament actions
  startTournament: (type: TournamentType) => void
  playTournamentRound: (playerMove: Move, aiType: AIType, gameHistory: GameHistory[]) => void
  endTournament: () => void

  // Tournament history
  loadTournaments: () => void
  saveTournaments: () => void
  clearTournaments: () => void
}

export const useTournamentStore = create<TournamentStore>((set, get) => ({
  currentTournament: null,
  tournaments: [],

  startTournament: (type: TournamentType) => {
    const tournament = TournamentService.createTournament(type)
    set({ currentTournament: tournament })
  },

  playTournamentRound: (playerMove: Move, aiType: AIType, gameHistory: GameHistory[]) => {
    const { currentTournament } = get()
    if (!currentTournament || currentTournament.isComplete) return

    const updatedTournament = TournamentService.playRound(
      currentTournament,
      playerMove,
      aiType,
      gameHistory
    )

    set({ currentTournament: updatedTournament })

    // If tournament is complete, save it to history
    if (updatedTournament.isComplete) {
      const { tournaments } = get()
      const updatedTournaments = [updatedTournament, ...tournaments].slice(0, 100) // Keep last 100 tournaments

      set({ tournaments: updatedTournaments })
      LocalStorageService.saveTournaments(updatedTournaments)
    }
  },

  endTournament: () => {
    const { currentTournament, tournaments } = get()

    if (currentTournament) {
      // Save tournament to history even if not complete (abandoned)
      const updatedTournaments = [currentTournament, ...tournaments].slice(0, 100)
      set({
        currentTournament: null,
        tournaments: updatedTournaments
      })
      LocalStorageService.saveTournaments(updatedTournaments)
    } else {
      set({ currentTournament: null })
    }
  },

  loadTournaments: () => {
    const tournaments = LocalStorageService.getTournaments()
    set({ tournaments })
  },

  saveTournaments: () => {
    const { tournaments } = get()
    LocalStorageService.saveTournaments(tournaments)
  },

  clearTournaments: () => {
    set({ tournaments: [] })
    LocalStorageService.saveTournaments([])
  },
}))

// Load tournaments on store creation
useTournamentStore.getState().loadTournaments()