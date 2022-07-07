import { ReactNode } from 'react'
import classnames from 'classnames'
import { LetterStatus } from '../common/util'


type Props = {
  children?: ReactNode
  value: string
  width?: number
  status?: LetterStatus
  onClick: (value: string) => void
  isRevealing?: boolean
}

export const Key = ({
  children,
  status,
  width = 40,
  value,
  onClick,
  isRevealing,
}: Props) => {
  const keyDelayMs = 1 * 5
  const isHighContrast = false

  const classes = classnames(
    'flex items-center justify-center rounded mx-0.5 text-xs font-bold cursor-pointer select-none dark:text-white',
    {
      'transition ease-in-out': isRevealing,
      'bg-slate-200 dark:bg-slate-600 hover:bg-slate-300 active:bg-slate-400':
        !status,
      'bg-slate-400 dark:bg-slate-800 text-white': status === 'ABSENT',
      'bg-orange-500 hover:bg-orange-600 active:bg-orange-700 text-white':
        status === 'CORRECT' && isHighContrast,
      'bg-cyan-500 hover:bg-cyan-600 active:bg-cyan-700 text-white':
        status === 'PRESENT' && isHighContrast,
      'bg-green-500 hover:bg-green-600 active:bg-green-700 text-white':
        status === 'CORRECT' && !isHighContrast,
      'bg-yellow-500 hover:bg-yellow-600 active:bg-yellow-700 text-white':
        status === 'PRESENT' && !isHighContrast,
    }
  )

  const styles = {
    transitionDelay: isRevealing ? `${keyDelayMs}ms` : 'unset',
    width: `${width}px`,
    height: '58px',
  }

  const handleClick: React.MouseEventHandler<HTMLButtonElement> = (event) => {
    onClick(value)
    event.currentTarget.blur()
  }

  return (
    <button
      style={styles}
      aria-label={`${value} ${status}`}
      className={classes}
      onClick={handleClick}
    >
      {children || value}
    </button>
  )
}
