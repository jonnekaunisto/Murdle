import { GuessedLetterResult } from "murdle-control-plane-client";

// TODO: Make it work with multiple letters
export function calculateMatchingLetters(solution: string, guess: string): GuessedLetterResult[] {
  const splitSolution = solution.split('');
  return guess.split('').map((guessChar, index) => {
    if (guessChar == splitSolution[index]) {
      return {
        letter: guessChar,
        status: 'CORRECT'
      }
    }
    if (solution.includes(guessChar)) {
      return {
        letter: guessChar,
        status: 'PRESENT',
      }
    }
    else {
      return {
        letter: guessChar,
        status: 'ABSENT',
      }
    }
  })
}