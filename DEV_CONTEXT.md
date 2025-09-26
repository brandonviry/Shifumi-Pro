# Contexte Développement - Shifumi Pro

## 🎯 État actuel du projet (2025-09-26)

### ✅ Fonctionnalités complétées
- [x] Setup React + Vite + TypeScript complet
- [x] Architecture modulaire avec structure recommandée
- [x] 3 types d'IA (Random, Weighted, Adaptive) fonctionnels
- [x] Dashboard avec statistiques temps réel + graphiques Recharts
- [x] Interface de jeu complète avec animations
- [x] State management Zustand (gameStore + settingsStore + tournamentStore)
- [x] Stockage localStorage avec persistance
- [x] Components UI (Layout, Button, Card, MoveButton, StatCard)
- [x] Pages principales (Dashboard, Game, Tournament, Settings, History)
- [x] Page Settings complète (thème, langue, vitesse animations, IA, reset)
- [x] Page History avec filtres (résultat, IA, période)
- [x] **Mode Tournoi BO3/BO5** avec suivi des manches et scores
- [x] **Tests unitaires complets** (79 tests passants)
- [x] **Internationalisation i18n** FR/EN avec react-i18next
- [x] Responsive design + CSS variables
- [x] Build et dev server fonctionnels

### 🔄 Prochaines évolutions
- [ ] Finalisation traductions anglaises dans l'interface
- [ ] Thème clair complet
- [ ] Graphiques temporels avancés

### 🚀 Évolutions futures
- [ ] Animations avancées et transitions
- [ ] Graphiques temporels (courbes de victoires)
- [ ] Mode multijoueur
- [ ] Thème clair
- [ ] PWA / Service Worker

## 🏗️ Architecture technique

### Stack principal
- **Frontend**: React 18 + TypeScript strict
- **Build**: Vite 7 avec HMR
- **State**: Zustand (gameStore, settingsStore)
- **Persistence**: localStorage via LocalStorageService
- **UI**: CSS natif + variables, Recharts, Lucide icons
- **Tests**: Vitest + Testing Library (configuré)

### Structure des stores
```typescript
// gameStore: gameState, statistics, history, AI management
// settingsStore: theme, language, animationSpeed, aiType
// tournamentStore: currentTournament, tournaments history, tournament actions
```

### Services implémentés
```typescript
// AIFactory: RandomAI, WeightedAI, AdaptiveAI
// LocalStorageService: CRUD pour history, stats, settings, tournaments
// gameLogic: determineWinner, getRandomMove, calculateWinRate
// TournamentService: création, gestion manches, détection victoire BO3/BO5
```

### Pages et composants clés
- **Layout**: Navigation principale (Dashboard, Game, Tournament, History, Settings)
- **Dashboard**: StatCards + WinRateChart + parties récentes + bouton nouvelle partie
- **Game**: Interface de jeu avec sélection IA + animations + résultats temps réel
- **Tournament**: Mode tournoi BO3/BO5 avec suivi des manches, scores et gagnant
- **Settings**: Configuration complète (thème, langue, vitesse, IA, reset données)
- **History**: Historique filtrable (résultat, IA, période) avec pagination visuelle
- **Components**: Button, Card, MoveButton, StatCard modulaires et réutilisables

## 🎨 Design system

### Palette couleurs (CSS variables)
```css
--color-primary: #1e40af (bleu)
--color-secondary: #06b6d4 (cyan)
--color-background: #0f172a (sombre)
--color-surface: #1e293b
--color-success: #10b981 (vert)
--color-warning: #f59e0b (orange)
--color-error: #ef4444 (rouge)
```

### Breakpoints responsive
- Mobile: < 768px
- Tablet: 768px - 1024px
- Desktop: > 1024px

## 🎮 Logique de jeu

### Types d'IA implémentés
1. **RandomAI**: Choix 100% aléatoires
2. **WeightedAI**: Analyse les 10 derniers coups, contre le plus fréquent
3. **AdaptiveAI**: Recherche patterns de 3 coups, prédit le suivant

### Stockage données
- **gameHistory**: Array des 1000 dernières parties
- **statistics**: totalGames, wins/losses/draws, streaks, moveCounts
- **settings**: theme, language, animationSpeed, aiType
- **tournaments**: Array des 100 derniers tournois avec détails des manches

## 📋 Scripts disponibles

```json
{
  "dev": "vite",                    // Dev server port 5174
  "build": "tsc && vite build",     // Build production
  "preview": "vite preview",        // Preview build
  "test": "vitest",                 // Tests unitaires
  "coverage": "vitest run --coverage",
  "lint": "eslint . --ext ts,tsx",  // ESLint check
  "format": "prettier --write"      // Code formatting
}
```

## 🚨 Points d'attention

### Build actuel
- ✅ `npm run build` fonctionne (dernière erreur Recharts fixée)
- ✅ Dev server démarre sur port 5174
- ✅ TypeScript strict activé
- ✅ ESLint configuré

### Prochaines tâches prioritaires
1. **Finalisation i18n**: Appliquer les traductions dans toute l'interface
2. **Thème clair**: Implémentation des variables CSS pour thème light
3. **Code splitting**: Lazy loading des pages pour optimiser le bundle
4. **PWA**: Service Worker et manifest pour app mobile

## 💡 Pour continuer efficacement

### Commandes de diagnostic rapide
```bash
npm run build    # Vérifier si tout compile
npm run test     # Lancer les tests
npm run lint     # Vérifier le code
npm run dev      # Démarrer le dev
```

### Structure à respecter
- Nouveaux components dans `/src/components/{category}/`
- Pages dans `/src/pages/`
- Utils/services dans dossiers dédiés
- CSS co-localisé avec composants
- Types centralisés dans `/src/types/`

### Patterns établis
- Zustand pour state management
- CSS variables pour théming
- LocalStorageService pour persistance
- Composants modulaires avec props typées
- Responsive-first design

## 📞 État des dépendances

### Core
- react@19.1.1, vite@7.1.7, typescript@5.9.2
- zustand@5.0.8, recharts@3.2.1, lucide-react@0.544.0
- react-i18next@15.2.2, i18next@24.3.0

### Dev
- vitest@3.2.4, eslint@9.36.0, prettier@3.6.2
- @testing-library/react@16.3.0

---
**Dernière mise à jour**: 2025-09-26
**Status**: ✅ Core fonctionnel, prêt pour évolutions