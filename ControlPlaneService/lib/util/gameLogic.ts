import { GuessedLetterResult } from "murdle-control-plane-client";
import { PlayerRoundState, Round } from "murdle-service-common";

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

export function calculatePoints(playerRoundState: PlayerRoundState, round: Round) {
  // 1 guess = 60 points
  // 2 guesses = 50
  // ...
  // 6 guesses = 10
  var totalScore = (7 - playerRoundState.PlayerGuesses.length) * 10;

  // Q1 = 40
  // Q2 = 30
  // Q4 = 10
  const roundDuration = round.StartTime - round.EndTime;
  const currentUnixTime = new Date().getTime();
  const elapsedTime = currentUnixTime - round.StartTime;
  const quarter = Math.ceil((elapsedTime / roundDuration) * 4);
  totalScore += (5 - quarter) * 10;

  return totalScore;
}