import { describe, it, expect, vi } from 'vitest'
import { render, screen, fireEvent } from '@testing-library/react'
import MoveButton from './MoveButton'

describe('MoveButton', () => {
  it('should render correct move emoji and label for rock', () => {
    const handleClick = vi.fn()
    render(<MoveButton move="rock" onClick={handleClick} />)

    expect(screen.getByText('🪨')).toBeInTheDocument()
    expect(screen.getByText('Pierre')).toBeInTheDocument()
  })

  it('should render correct move emoji and label for paper', () => {
    const handleClick = vi.fn()
    render(<MoveButton move="paper" onClick={handleClick} />)

    expect(screen.getByText('📄')).toBeInTheDocument()
    expect(screen.getByText('Feuille')).toBeInTheDocument()
  })

  it('should render correct move emoji and label for scissors', () => {
    const handleClick = vi.fn()
    render(<MoveButton move="scissors" onClick={handleClick} />)

    expect(screen.getByText('✂️')).toBeInTheDocument()
    expect(screen.getByText('Ciseaux')).toBeInTheDocument()
  })

  it('should call onClick with correct move when clicked', () => {
    const handleClick = vi.fn()
    render(<MoveButton move="rock" onClick={handleClick} />)

    fireEvent.click(screen.getByRole('button'))

    expect(handleClick).toHaveBeenCalledWith('rock')
    expect(handleClick).toHaveBeenCalledTimes(1)
  })

  it('should not call onClick when disabled', () => {
    const handleClick = vi.fn()
    render(<MoveButton move="rock" onClick={handleClick} disabled />)

    fireEvent.click(screen.getByRole('button'))

    expect(handleClick).not.toHaveBeenCalled()
  })

  it('should apply disabled attribute when disabled', () => {
    const handleClick = vi.fn()
    render(<MoveButton move="rock" onClick={handleClick} disabled />)

    expect(screen.getByRole('button')).toBeDisabled()
  })

  it('should apply selected class when selected', () => {
    const handleClick = vi.fn()
    render(<MoveButton move="rock" onClick={handleClick} selected />)

    expect(screen.getByRole('button')).toHaveClass('selected')
  })

  it('should not apply selected class when not selected', () => {
    const handleClick = vi.fn()
    render(<MoveButton move="rock" onClick={handleClick} selected={false} />)

    expect(screen.getByRole('button')).not.toHaveClass('selected')
  })

  it('should have correct default props', () => {
    const handleClick = vi.fn()
    render(<MoveButton move="rock" onClick={handleClick} />)

    const button = screen.getByRole('button')
    expect(button).not.toBeDisabled()
    expect(button).not.toHaveClass('selected')
  })

  it('should work with all move types', () => {
    const handleClick = vi.fn()

    const { rerender } = render(<MoveButton move="rock" onClick={handleClick} />)
    fireEvent.click(screen.getByRole('button'))
    expect(handleClick).toHaveBeenLastCalledWith('rock')

    rerender(<MoveButton move="paper" onClick={handleClick} />)
    fireEvent.click(screen.getByRole('button'))
    expect(handleClick).toHaveBeenLastCalledWith('paper')

    rerender(<MoveButton move="scissors" onClick={handleClick} />)
    fireEvent.click(screen.getByRole('button'))
    expect(handleClick).toHaveBeenLastCalledWith('scissors')

    expect(handleClick).toHaveBeenCalledTimes(3)
  })

  it('should maintain button structure with emoji and label', () => {
    const handleClick = vi.fn()
    render(<MoveButton move="rock" onClick={handleClick} />)

    const button = screen.getByRole('button')
    const emoji = screen.getByText('🪨')
    const label = screen.getByText('Pierre')

    expect(button).toContainElement(emoji)
    expect(button).toContainElement(label)
  })
})