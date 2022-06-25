import { GameStructure, Round } from "murdle-control-plane-client";

type RoundStatus = 'won' | 'lost' | 'in_progress' | 'waiting';
type GameStatus =  'complete' | 'in_progress';


export class GameState {
  public currentRound: Round;
  public currentRoundIndex: number;
  public roundStatus: RoundStatus;
  public gameStatus: GameStatus;

  public constructor(game: GameStructure) {
    // Unix time in seconds
    const currentTime = Date.now();

    const {round: currentRound, index: currentRoundIndex} = this.getCurrentRound(game);
    this.currentRound = currentRound;
    this.currentRoundIndex = currentRoundIndex;
    
    this.roundStatus = this.getCurrentRoundStatus(this.currentRound);
    this.gameStatus = this.getGameStatus(game);
  }

  public recalculate(game: GameStructure): boolean {
    var roundChanged = false;
    const { round: currentRound, index: currentRoundIndex} = this.getCurrentRound(game);
    
    // Check if round changed
    if (currentRound.startTime != this.currentRound.startTime) {
      this.currentRound = currentRound;
      this.currentRoundIndex = currentRoundIndex;
      roundChanged = true;
    }

    this.roundStatus = this.getCurrentRoundStatus(currentRound);
    this.gameStatus = this.getGameStatus(game);

    return roundChanged;
  }

  private getCurrentRoundStatus(round: Round): RoundStatus {
    const currentTime = Date.now();
    if (round.startTime > currentTime) {
      return 'waiting';
    } else {
      return 'in_progress';
    }
  }

  private getGameStatus(game: GameStructure): GameStatus {
    const currentTime = Date.now();
    const lastRound = game.rounds[game.rounds.length - 1];
    if (currentTime > lastRound.endTime) {
      return 'complete';
    } else {
      return 'in_progress';
    }
  }

  private getCurrentRound(game: GameStructure): {round:  Round, index: number} {
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

  public lost() {
    this.roundStatus = 'lost';
  }

  public won() {
    this.roundStatus = 'won';
  }
}

