import { GameStructure, PlayerScore, Round } from "murdle-control-plane-client";
import { LetterStatus } from "../wordleComponents/common/util";

export type RoundStatus = 'won' | 'lost' | 'in_progress' | 'waiting';
export type GameStatus = 'complete' | 'in_progress';
export type GameActionType = 'won' | 'recalculate' | 'lost';

export interface GameAction {
  readonly game: GameStructure,
  readonly type: GameActionType,
}

export interface CurrentRoundGuessResult {
  guessedLetterStatus: LetterStatus[],
}

export interface GameState {
  readonly currentRound: Round;
  readonly lastRound?: Round;
  readonly currentRoundIndex: number;
  readonly roundStatus: RoundStatus;
  readonly gameStatus: GameStatus;
  readonly playerScores: PlayerScore[];
  readonly currentRoundGuesses: string[],
  readonly currentRoundGuessResults: CurrentRoundGuessResult[],
}

function sortPlayerScores(playerScores: PlayerScore[]): PlayerScore[] {
  return playerScores.sort((scoreA, scoreB) => {
    if (scoreA.score != scoreB.score) {
      // The higher the score the better
      return scoreA.score - scoreB.score
    } else {
      // The lower the total time the better
      return scoreB.totalTime - scoreA.totalTime;
    }
  })
}

export function recalculate(game: GameStructure): GameState {
  const { round: currentRound, index: currentRoundIndex } = getCurrentRound(game);

  var lastRound: Round | undefined;
  if (currentRoundIndex > 0) {
    lastRound = game.rounds[currentRoundIndex -1];
  }

  const roundStatus = getCurrentRoundStatus(currentRound, currentRoundIndex, game);
  const gameStatus = getGameStatus(game);

  const currentRoundGuesses = getCurrentRoundGuesses(game, currentRoundIndex);

  return {
    currentRound,
    lastRound,
    currentRoundIndex,
    roundStatus,
    gameStatus,
    playerScores: sortPlayerScores(game.playerScores),
    currentRoundGuesses,
    currentRoundGuessResults: getCurrentRoundGuessResults(game, currentRoundIndex),
  }
}

function getCurrentRoundStatus(round: Round, roundIndex: number, game: GameStructure): RoundStatus {
  const guesses = game.currentPlayerRoundStates[roundIndex].playerGuesses;
  // Check if round is lost
  if (guesses.length == 5) {
    const wrongLetters = 
      guesses[4].guessLetterResult.filter(result => result.status != 'CORRECT');
    if (wrongLetters.length > 0) {
      return 'lost';
    }
  }

  // Check if round is won
  const rightGuesses = guesses.filter(guess => {
    const rightLetters = guess.guessLetterResult.filter(result => result.status == 'CORRECT');
    return rightLetters.length == 5;
  });
  if (rightGuesses.length > 0) {
    return 'won';
  }

  // Check if round is in progress
  const currentTime = Date.now();
  if (round.startTime > currentTime) {
    return 'waiting';
  }
  else {
    return 'in_progress';
  }
}

function getCurrentRoundGuessResults(game: GameStructure, roundIndex: number): CurrentRoundGuessResult[] {
  return game.currentPlayerRoundStates[roundIndex].playerGuesses.map(guess => {
      const roundResult: CurrentRoundGuessResult = {
        guessedLetterStatus: guess.guessLetterResult.map(result => result.status)
      }
      return roundResult;
  });
}

function getGameStatus(game: GameStructure): GameStatus {
  const currentTime = Date.now();
  const lastRound = game.rounds[game.rounds.length - 1];
  if (currentTime > lastRound.endTime) {
    return 'complete';
  } else {
    return 'in_progress';
  }
}

function getCurrentRound(game: GameStructure): { round: Round, index: number } {
  const currentTime = Date.now();
  var currentRoundIndex: number | undefined = game.rounds.length - 1;
  var currentRound = game.rounds[currentRoundIndex];
  game.rounds.forEach((round, index) => {
    var lastRound: Round | undefined;
    if (index > 0) {
      lastRound = game.rounds[index - 1];
    }
    const startTime = lastRound != undefined ? lastRound.endTime : round.startTime;
    if (currentTime < round.endTime && currentTime > startTime) {
      currentRound = round;
      currentRoundIndex = index;
    }
  });
  if (currentTime < game.rounds[0].startTime) {
    currentRound = game.rounds[0];
    currentRoundIndex = 0;
  }
  currentRoundIndex = currentRoundIndex;
  return {
    round: currentRound,
    index: currentRoundIndex,
  }
}

function getCurrentRoundGuesses(game: GameStructure, currentRoundIndex: number) {
  const playerGuesses = game.currentPlayerRoundStates[currentRoundIndex].playerGuesses;
  return playerGuesses.map(guess => guess.guessedWord.toUpperCase());
}

export function gameStateReducer(state: GameState, action: GameAction) {
  switch (action.type) {
    case 'recalculate':
      return recalculate(action.game);
    default:
      throw new Error("Action not found");
  }
}
