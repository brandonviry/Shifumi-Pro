import { Move } from '@/types'
import './MoveButton.css'

interface MoveButtonProps {
  move: Move
  onClick: (move: Move) => void
  disabled?: boolean
  selected?: boolean
}

const moveEmojis = {
  rock: '🪨',
  paper: '📄',
  scissors: '✂️',
}

const moveLabels = {
  rock: 'Pierre',
  paper: 'Feuille',
  scissors: 'Ciseaux',
}

export default function MoveButton({
  move,
  onClick,
  disabled = false,
  selected = false,
}: MoveButtonProps) {
  return (
    <button
      className={`move-button ${selected ? 'selected' : ''}`}
      onClick={() => onClick(move)}
      disabled={disabled}
    >
      <span className="move-emoji">{moveEmojis[move]}</span>
      <span className="move-label">{moveLabels[move]}</span>
    </button>
  )
}