# Shifumi Pro - Rock Paper Scissors Game

Une application web moderne et interactive de Pierre-Feuille-Ciseaux avec intelligence artificielle, statistiques avancées et interface utilisateur premium.

## 🚀 Fonctionnalités

### ✨ Fonctionnalités essentielles
- **Mode Joueur vs IA** avec 3 types d'IA :
  - Aléatoire : Choix complètement aléatoires
  - Pondérée : Apprend des coups favoris du joueur
  - Adaptative : Analyse les patterns pour prédire les coups
- **Dashboard** avec statistiques en temps réel
- **Historique** détaillé des parties
- **Interface responsive** (mobile, tablette, desktop)

### 📊 Statistiques avancées
- Taux de victoire en temps réel
- Série de victoires actuelle et record
- Coup favori avec compteurs
- Graphique en secteurs des résultats
- Historique des 5 dernières parties

### 🎨 Interface utilisateur
- Design moderne avec thème sombre
- Animations fluides et micro-interactions
- Interface entièrement responsive
- Palette de couleurs bleu nuit / cyan

## 🛠️ Technologies utilisées

- **Frontend** : React 18 + TypeScript
- **Bundler** : Vite
- **State Management** : Zustand
- **Graphiques** : Recharts
- **Icônes** : Lucide React
- **Styling** : CSS natif avec variables CSS
- **Tests** : Vitest + Testing Library
- **Linting** : ESLint + Prettier

## 🚀 Installation et lancement

```bash
# Installation des dépendances
npm install

# Lancement en mode développement
npm run dev

# Build de production
npm run build

# Prévisualisation du build
npm run preview

# Tests
npm run test

# Couverture de tests
npm run coverage

# Linting
npm run lint

# Formatage du code
npm run format
```

## 📁 Structure du projet

```
src/
  assets/                 # Ressources statiques
  components/             # Composants React
    analytics/            # Composants de statistiques
    common/               # Composants réutilisables
    gameplay/             # Composants de jeu
    layout/               # Composants de mise en page
  hooks/                  # Hooks personnalisés
  i18n/                   # Internationalisation
  pages/                  # Pages principales
  services/               # Services (IA, stockage)
    ai/                   # Moteurs d'intelligence artificielle
    storage/              # Gestion du stockage local
  state/                  # Gestion d'état (Zustand)
  styles/                 # Styles globaux
  types/                  # Types TypeScript
  utils/                  # Utilitaires
  test/                   # Configuration des tests
tests/                    # Tests unitaires
```

## 🎮 Comment jouer

1. **Dashboard** : Consultez vos statistiques globales
2. **Nouvelle partie** : Cliquez sur "Nouvelle Partie" ou allez dans l'onglet "Game"
3. **Choisir l'IA** : Sélectionnez le type d'IA (Aléatoire, Pondérée, Adaptative)
4. **Jouer** : Cliquez sur Pierre, Feuille ou Ciseaux
5. **Résultat** : Découvrez le choix de l'IA et le résultat
6. **Rejouer** : Cliquez sur "Rejouer" pour une nouvelle manche

## 🤖 Types d'Intelligence Artificielle

### Aléatoire
- Choix complètement aléatoires
- Parfait pour débuter

### Pondérée
- Analyse vos 10 derniers coups
- Contre votre coup le plus fréquent
- Difficulté intermédiaire

### Adaptative
- Recherche des patterns dans vos coups
- Prédit votre prochain coup basé sur l'historique
- Difficulté élevée

## 📊 Stockage des données

- **localStorage** : Toutes les données sont sauvegardées localement
- **Statistiques** : Persistance automatique après chaque partie
- **Historique** : Conservation des 1000 dernières parties
- **Paramètres** : Sauvegarde des préférences utilisateur

## 🎨 Personnalisation

L'application utilise des variables CSS pour faciliter la personnalisation :

```css
:root {
  --color-primary: #1e40af;
  --color-secondary: #06b6d4;
  --color-background: #0f172a;
  /* ... autres variables */
}
```

## 🧪 Tests

Le projet inclut une suite de tests complète :

```bash
# Lancer les tests
npm run test

# Tests en mode watch
npm run test -- --watch

# Couverture de code
npm run coverage
```

## 📈 Performance

- **Lighthouse Score** : Optimisé pour des scores élevés
- **Code Splitting** : Chargement optimisé des composants
- **Lazy Loading** : Chargement différé des ressources
- **Bundle optimisé** : Build de production minifié

## 🔒 Sécurité

- **Validation des inputs** : Protection contre les données malveillantes
- **Timers anti-spam** : Prévention des actions répétées
- **Pas de secrets** : Aucune donnée sensible dans le code

## 🚀 Évolutions futures

- ✅ Mode tournoi (BO3/BO5) - Implémenté
- ✅ Internationalisation (FR/EN) - Implémenté
- Multijoueur en ligne
- Plus de types d'IA
- Thèmes multiples (clair/sombre)
- Statistiques avancées avec graphiques temporels

---

**Shifumi Pro** - Une expérience de jeu Pierre-Feuille-Ciseaux moderne et immersive ! 🎮