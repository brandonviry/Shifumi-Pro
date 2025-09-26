import { ReactNode } from 'react'
import Card from '../common/Card'
import './StatCard.css'

interface StatCardProps {
  title: string
  value: string | number
  icon?: ReactNode
  color?: 'primary' | 'secondary' | 'success' | 'warning' | 'error'
  subtitle?: string
}

export default function StatCard({
  title,
  value,
  icon,
  color = 'primary',
  subtitle,
}: StatCardProps) {
  return (
    <Card className={`stat-card stat-card--${color}`} padding="medium">
      <div className="stat-card-content">
        {icon && <div className="stat-card-icon">{icon}</div>}
        <div className="stat-card-info">
          <h3 className="stat-card-title">{title}</h3>
          <div className="stat-card-value">{value}</div>
          {subtitle && <div className="stat-card-subtitle">{subtitle}</div>}
        </div>
      </div>
    </Card>
  )
}