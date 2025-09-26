import { useState } from 'react'
import Layout from './components/layout/Layout'
import Dashboard from './pages/Dashboard'
import Game from './pages/Game'
import Tournament from './pages/Tournament'
import Settings from './pages/Settings'
import History from './pages/History'

type Page = 'dashboard' | 'game' | 'tournament' | 'history' | 'settings'

function App() {
  const [currentPage, setCurrentPage] = useState<Page>('dashboard')

  const handleStartGame = () => {
    setCurrentPage('game')
  }

  const renderPage = () => {
    switch (currentPage) {
      case 'dashboard':
        return <Dashboard onStartGame={handleStartGame} />
      case 'game':
        return <Game />
      case 'tournament':
        return <Tournament />
      case 'history':
        return <History />
      case 'settings':
        return <Settings />
      default:
        return null
    }
  }

  return (
    <Layout currentPage={currentPage} onPageChange={setCurrentPage}>
      {renderPage()}
    </Layout>
  )
}

export default App