import { GameStructure, Round } from "murdle-control-plane-client";

export type RoundStatus = 'won' | 'lost' | 'in_progress' | 'waiting';
export type GameStatus = 'complete' | 'in_progress';
export type GameActionType = 'won' | 'recalculate' | 'lost';

export interface GameAction {
  readonly game: GameStructure,
  readonly type: GameActionType,
}

export interface GameState {
  readonly currentRound: Round;
  readonly currentRoundIndex: number;
  readonly roundStatus: RoundStatus;
  readonly gameStatus: GameStatus;
}

export function calculateInitialState(game: GameStructure): GameState {

  const { round: currentRound, index: currentRoundIndex } = getCurrentRound(game);

  const roundStatus = getCurrentRoundStatus(currentRound);
  const gameStatus = getGameStatus(game);

  return {
    currentRound,
    currentRoundIndex,
    roundStatus,
    gameStatus
  }
}

function recalculate(game: GameStructure, gameState: GameState): GameState {
  const { round: currentRound, index: currentRoundIndex } = getCurrentRound(game);

  const roundStatus = gameState.currentRoundIndex == currentRoundIndex ? 
    getCurrentRoundStatus(currentRound, gameState.roundStatus) : getCurrentRoundStatus(currentRound);
  const gameStatus = getGameStatus(game);

  return {
    currentRound,
    currentRoundIndex,
    roundStatus,
    gameStatus
  }
}

function getCurrentRoundStatus(round: Round, currentRoundStatus?: RoundStatus): RoundStatus {
  const currentTime = Date.now();
  if (round.startTime > currentTime) {
    return 'waiting';
  } else if (currentRoundStatus == 'lost' || currentRoundStatus == 'won') {
    return currentRoundStatus;
  } else {
    return 'in_progress';
  }
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
    if (currentTime < round.endTime && currentTime > round.startTime) {
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

function lost(gameState: GameState): GameState {
  return {
    currentRound: gameState.currentRound,
    currentRoundIndex: gameState.currentRoundIndex,
    roundStatus: 'lost',
    gameStatus: gameState.gameStatus,
  }
}

function won(gameState: GameState): GameState {
  return {
    currentRound: gameState.currentRound,
    currentRoundIndex: gameState.currentRoundIndex,
    roundStatus: 'won',
    gameStatus: gameState.gameStatus,
  }
}

export function gameStateReducer(state: GameState, action: GameAction) {
  switch (action.type) {
    case 'recalculate':
      return recalculate(action.game, state);
    case 'won':
      return won(state);
    case 'lost':
      return lost(state);
    default:
      throw new Error();
  }
}
