import { ReactNode } from 'react'
import { Settings, BarChart3, History, Trophy, Gamepad2 } from 'lucide-react'
import './Layout.css'

interface LayoutProps {
  children: ReactNode
  currentPage: 'dashboard' | 'game' | 'tournament' | 'history' | 'settings'
  onPageChange: (page: 'dashboard' | 'game' | 'tournament' | 'history' | 'settings') => void
}

export default function Layout({ children, currentPage, onPageChange }: LayoutProps) {
  return (
    <div className="layout">
      <header className="layout-header">
        <div className="layout-header-content">
          <h1 className="layout-title">Shifumi Pro</h1>
          <nav className="layout-nav">
            <button
              className={`nav-button ${currentPage === 'dashboard' ? 'active' : ''}`}
              onClick={() => onPageChange('dashboard')}
            >
              <BarChart3 size={20} />
              Dashboard
            </button>
            <button
              className={`nav-button ${currentPage === 'game' ? 'active' : ''}`}
              onClick={() => onPageChange('game')}
            >
              <Gamepad2 size={20} />
              Game
            </button>
            <button
              className={`nav-button ${currentPage === 'tournament' ? 'active' : ''}`}
              onClick={() => onPageChange('tournament')}
            >
              <Trophy size={20} />
              Tournoi
            </button>
            <button
              className={`nav-button ${currentPage === 'history' ? 'active' : ''}`}
              onClick={() => onPageChange('history')}
            >
              <History size={20} />
              History
            </button>
            <button
              className={`nav-button ${currentPage === 'settings' ? 'active' : ''}`}
              onClick={() => onPageChange('settings')}
            >
              <Settings size={20} />
              Settings
            </button>
          </nav>
        </div>
      </header>
      <main className="layout-main">
        {children}
      </main>
    </div>
  )
}