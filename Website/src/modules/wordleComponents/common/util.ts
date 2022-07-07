export type LetterStatus = 'ABSENT' | 'CORRECT' | 'PRESENT';

export const getStatuses = (
  solution: string,
  guesses: string[]
): { [key: string]: LetterStatus } => {
  const charObj: { [key: string]: LetterStatus } = {}
  const splitSolution = solution.split('');

  guesses.forEach((word) => {
    word.split('').forEach((letter, i) => {
      if (!splitSolution.includes(letter)) {
        // make status absent
        return (charObj[letter] = 'ABSENT')
      }

      if (letter === splitSolution[i]) {
        //make status correct
        return (charObj[letter] = 'CORRECT')
      }

      if (charObj[letter] !== 'CORRECT') {
        //make status present
        return (charObj[letter] = 'PRESENT')
      }
    })
  })

  return charObj
}

export const getGuessStatuses = (
  solution: string,
  guess: string
): LetterStatus[] => {
  const splitSolution = solution.split('');
  const splitGuess = guess.split('');

  const solutionCharsTaken = splitSolution.map((_) => false)

  const statuses: LetterStatus[] = Array.from(Array(guess.length))

  // handle all correct cases first
  splitGuess.forEach((letter, i) => {
    if (letter === splitSolution[i]) {
      statuses[i] = 'CORRECT'
      solutionCharsTaken[i] = true
      return
    }
  })

  splitGuess.forEach((letter, i) => {
    if (statuses[i]) return

    if (!splitSolution.includes(letter)) {
      // handles the absent case
      statuses[i] = 'ABSENT'
      return
    }

    // now we are left with "present"s
    const indexOfPresentChar = splitSolution.findIndex(
      (x, index) => x === letter && !solutionCharsTaken[index]
    )

    if (indexOfPresentChar > -1) {
      statuses[i] = 'PRESENT'
      solutionCharsTaken[indexOfPresentChar] = true
      return
    } else {
      statuses[i] = 'ABSENT'
      return
    }
  })

  return statuses
}
