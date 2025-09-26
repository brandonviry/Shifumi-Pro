import { describe, it, expect } from 'vitest'
import { render, screen } from '@testing-library/react'
import Card from './Card'

describe('Card', () => {
  it('should render with correct content', () => {
    render(
      <Card>
        <p>Card content</p>
      </Card>
    )

    expect(screen.getByText('Card content')).toBeInTheDocument()
  })

  it('should apply correct padding class', () => {
    const { rerender } = render(<Card padding="small">Small Padding</Card>)
    expect(screen.getByText('Small Padding').closest('div')).toHaveClass('card--small')

    rerender(<Card padding="medium">Medium Padding</Card>)
    expect(screen.getByText('Medium Padding').closest('div')).toHaveClass('card--medium')

    rerender(<Card padding="large">Large Padding</Card>)
    expect(screen.getByText('Large Padding').closest('div')).toHaveClass('card--large')
  })

  it('should apply hoverable class when hoverable is true', () => {
    render(<Card hoverable>Hoverable Card</Card>)

    expect(screen.getByText('Hoverable Card').closest('div')).toHaveClass('card--hoverable')
  })

  it('should apply custom className', () => {
    render(<Card className="custom-card">Custom Card</Card>)

    expect(screen.getByText('Custom Card').closest('div')).toHaveClass('custom-card')
  })

  it('should have correct default props', () => {
    render(<Card>Default Card</Card>)

    const card = screen.getByText('Default Card').closest('div')
    expect(card).toHaveClass('card')
    expect(card).toHaveClass('card--medium')
    expect(card).not.toHaveClass('card--hoverable')
  })

  it('should combine multiple classes correctly', () => {
    render(
      <Card padding="large" hoverable className="custom">
        Multi Class Card
      </Card>
    )

    const card = screen.getByText('Multi Class Card').closest('div')
    expect(card).toHaveClass('card')
    expect(card).toHaveClass('card--large')
    expect(card).toHaveClass('card--hoverable')
    expect(card).toHaveClass('custom')
  })

  it('should render complex children content', () => {
    render(
      <Card>
        <div>
          <h2>Card Title</h2>
          <p>Card description</p>
          <button>Action</button>
        </div>
      </Card>
    )

    expect(screen.getByRole('heading', { level: 2 })).toHaveTextContent('Card Title')
    expect(screen.getByText('Card description')).toBeInTheDocument()
    expect(screen.getByRole('button', { name: 'Action' })).toBeInTheDocument()
  })
})