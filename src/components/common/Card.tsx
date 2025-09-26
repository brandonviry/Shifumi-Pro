import { ReactNode } from 'react'
import './Card.css'

interface CardProps {
  children: ReactNode
  className?: string
  padding?: 'small' | 'medium' | 'large'
  hoverable?: boolean
}

export default function Card({
  children,
  className = '',
  padding = 'medium',
  hoverable = false,
}: CardProps) {
  const classes = [
    'card',
    `card--${padding}`,
    hoverable ? 'card--hoverable' : '',
    className,
  ]
    .filter(Boolean)
    .join(' ')

  return <div className={classes}>{children}</div>
}