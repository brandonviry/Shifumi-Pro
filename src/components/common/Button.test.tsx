import { describe, it, expect, vi } from 'vitest'
import { render, screen, fireEvent } from '@testing-library/react'
import Button from './Button'

describe('Button', () => {
  it('should render with correct text', () => {
    render(<Button>Test Button</Button>)

    expect(screen.getByRole('button')).toHaveTextContent('Test Button')
  })

  it('should call onClick when clicked', () => {
    const handleClick = vi.fn()
    render(<Button onClick={handleClick}>Click Me</Button>)

    fireEvent.click(screen.getByRole('button'))

    expect(handleClick).toHaveBeenCalledTimes(1)
  })

  it('should not call onClick when disabled', () => {
    const handleClick = vi.fn()
    render(
      <Button onClick={handleClick} disabled>
        Disabled Button
      </Button>
    )

    fireEvent.click(screen.getByRole('button'))

    expect(handleClick).not.toHaveBeenCalled()
  })

  it('should apply correct variant class', () => {
    const { rerender } = render(<Button variant="primary">Primary</Button>)
    expect(screen.getByRole('button')).toHaveClass('button--primary')

    rerender(<Button variant="secondary">Secondary</Button>)
    expect(screen.getByRole('button')).toHaveClass('button--secondary')

    rerender(<Button variant="success">Success</Button>)
    expect(screen.getByRole('button')).toHaveClass('button--success')

    rerender(<Button variant="warning">Warning</Button>)
    expect(screen.getByRole('button')).toHaveClass('button--warning')

    rerender(<Button variant="error">Error</Button>)
    expect(screen.getByRole('button')).toHaveClass('button--error')
  })

  it('should apply correct size class', () => {
    const { rerender } = render(<Button size="small">Small</Button>)
    expect(screen.getByRole('button')).toHaveClass('button--small')

    rerender(<Button size="medium">Medium</Button>)
    expect(screen.getByRole('button')).toHaveClass('button--medium')

    rerender(<Button size="large">Large</Button>)
    expect(screen.getByRole('button')).toHaveClass('button--large')
  })

  it('should apply full width class when fullWidth is true', () => {
    render(<Button fullWidth>Full Width</Button>)

    expect(screen.getByRole('button')).toHaveClass('button--full-width')
  })

  it('should apply custom className', () => {
    render(<Button className="custom-class">Custom</Button>)

    expect(screen.getByRole('button')).toHaveClass('custom-class')
  })

  it('should have disabled attribute when disabled', () => {
    render(<Button disabled>Disabled</Button>)

    expect(screen.getByRole('button')).toBeDisabled()
  })

  it('should have correct default props', () => {
    render(<Button>Default</Button>)

    const button = screen.getByRole('button')
    expect(button).toHaveClass('button--primary')
    expect(button).toHaveClass('button--medium')
    expect(button).not.toHaveClass('button--full-width')
    expect(button).not.toBeDisabled()
  })

  it('should render children content', () => {
    render(
      <Button>
        <span>Icon</span>
        Text Content
      </Button>
    )

    expect(screen.getByText('Icon')).toBeInTheDocument()
    expect(screen.getByText('Text Content')).toBeInTheDocument()
  })
})