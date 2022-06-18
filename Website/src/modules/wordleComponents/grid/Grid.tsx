import { CompletedRow } from './CompletedRow'
import { CurrentRow } from './CurrentRow'
import { EmptyRow } from './EmptyRow'

type Props = {
  solution: string
  guesses: string[]
  currentGuess: string
  isRevealing?: boolean
  currentRowClassName: string
}

export const Grid = ({
  solution,
  guesses,
  currentGuess,
  isRevealing,
  currentRowClassName,
}: Props) => {
  const empties =
    guesses.length < 5 - 1
      ? Array.from(Array(5 - 1 - guesses.length))
      : []

  return (
    <>
      {guesses.map((guess, i) => (
        <CompletedRow
          key={i}
          solution={solution}
          guess={guess}
          isRevealing={isRevealing && guesses.length - 1 === i}
        />
      ))}
      {guesses.length < 5 && (
        <CurrentRow guess={currentGuess} className={currentRowClassName} />
      )}
      {empties.map((_, i) => (
        <EmptyRow key={i} />
      ))}
    </>
  )
}
