import { Response } from "express";
import { GameDAL, gameRounds, GameItem, PlayerScore, LobbyDAL, Round, PlayerRoundState } from "murdle-service-common";
import { AccessDeniedException, ResourceNotFoundException, ValidationException } from "../exceptions";
import { StartGameResponseContent, PlayerScore as ExternalPlayerScore, Round as ExternalRound, GameStructure, StartGameRequestContent, DescribeGameResponseContent, CurrentPlayerRoundState, PlayerGuess as ExternalPlayerGuess, SubmitGameGuessRequestContent, SubmitGameGuessResponseContent } from "murdle-control-plane-client";
import { AuthInfo } from "./auth";
import { getWordleId, getWordleWord } from "../util/wordle";
import { convertUserItemToExternal } from "../util/converter";
import { calculateMatchingLetters, calculatePoints } from "../util/gameLogic";

export class GameController {
  public constructor(private readonly gameDAL: GameDAL, private readonly lobbyDAL: LobbyDAL) { }

  public async startGame(body: StartGameRequestContent, res: Response<StartGameResponseContent, AuthInfo>) {
    const authenticatedUser = res.locals.authenticatedUser;
    const lobbyItem = await this.lobbyDAL.getLobbyById(body.lobbyId);
    if (lobbyItem == undefined) {
      throw new ResourceNotFoundException('Lobby not found');
    }
    if (authenticatedUser.UserId != lobbyItem.OwnerUserId) {
      throw new AccessDeniedException('User is not owner of lobby');
    }

    const wordleWords: string[] = [];
    for (let i: number = 0; i < gameRounds; i++) {
      wordleWords.push(getWordleWord());
    }

    const gameItem = await this.gameDAL.createGame({
      gameId: `${lobbyItem.LobbyId}.${getWordleId()}`,
      lobbyId: body.lobbyId,
      wordleWords,
      players: lobbyItem.Players,
    });
    res.send({
      game: this.convertGameItemToExternal(authenticatedUser.UserId, gameItem),
    });
  }

  public async describeGame(gameId: string, res: Response<DescribeGameResponseContent, AuthInfo>) {
    const authenticatedUser = res.locals.authenticatedUser;
    const gameItem = await this.gameDAL.getGameById(gameId);
    if (gameItem == undefined) {
      throw new ResourceNotFoundException('Game not found');
    }
    res.send({
      game: this.convertGameItemToExternal(authenticatedUser.UserId, gameItem),
    });
  }

  public async submitGameGuess(gameId: string, body: SubmitGameGuessRequestContent, res: Response<SubmitGameGuessResponseContent, AuthInfo>) {
    const guess = body.guess.toLowerCase();
    const authenticatedUser = res.locals.authenticatedUser;
    const gameItem = await this.gameDAL.getGameById(gameId);
    if (gameItem == undefined) {
      throw new ResourceNotFoundException('Game not found');
    }
    const playerIds = gameItem.PlayerScores.map(player => player.Player.UserId);
    const userIndex = GameDAL.findUserIndexInGame(gameItem, authenticatedUser.UserId);
    if (userIndex == undefined) {
      console.log(`User ${authenticatedUser.UserId} is not part of ${playerIds.toString()}`);
      throw new AccessDeniedException('User not part of game');
    }

    if (body.roundNumber > gameItem.Rounds.length) {
      throw new ResourceNotFoundException('Round not found');
    }

    const roundIndex = body.roundNumber - 1;
    const playerRoundState = gameItem.PlayerScores[userIndex].PlayerRoundStates[roundIndex];
    if (playerRoundState.PlayerGuesses.length >= 5) {
      throw new ValidationException('Cannot add any more guesses');
    }

    const round = gameItem.Rounds[roundIndex];
    const solution = round.WordleWord.toLowerCase();
    const lastGuess = playerRoundState.PlayerGuesses[playerRoundState.PlayerGuesses.length -1];
    if (lastGuess == solution) {
      throw new ValidationException('Game round is already won');
    }

    const currentUnixTime = new Date().getTime();
    if (currentUnixTime > round.EndTime || currentUnixTime < round.StartTime) {
      throw new ValidationException('Game is not in progress');
    }

    var responseGameItem: GameItem | undefined = await this.gameDAL.addPlayerGuess({
      gameId,
      userId: authenticatedUser.UserId,
      roundNumber: body.roundNumber,
      playerGuess: guess,
    });
    if (responseGameItem == undefined) {
      throw new ResourceNotFoundException('Game not found');
    }

    // Check if the user got the word right
    const playerScore = gameItem.PlayerScores[userIndex].Score;
    if (round.WordleWord.toLowerCase() == guess) {
      responseGameItem = await this.gameDAL.updatePlayerScore({
        gameId,
        userId: authenticatedUser.UserId,
        newScore: playerScore + calculatePoints(playerRoundState, round),
      });
      if (responseGameItem == undefined) {
        throw new ResourceNotFoundException('Game not found');
      }
    }

    // End round if this is the last player to complete
    if (this.isRoundComplete(responseGameItem, roundIndex)) {
      responseGameItem = await this.gameDAL.endGameRound({
        gameId,
        roundNumber: body.roundNumber,
      });
      if (responseGameItem == undefined) {
        throw new ResourceNotFoundException('Game not found');
      }
    }

    res.send({
      game: this.convertGameItemToExternal(authenticatedUser.UserId, responseGameItem),
    });
  }

  private convertGameItemToExternal(currentUserId: string, gameItem: GameItem): GameStructure {
    return {
      gameId: gameItem.GameId,
      playerScores: gameItem.PlayerScores.map(this.convertPlayerScoreToExternal),
      rounds: gameItem.Rounds.map(this.convertGameRoundToExternal),
      lobbyId: gameItem.LobbyId,
      currentPlayerRoundStates: this.getCurrentPlayerRoundStates(currentUserId, gameItem),
    }
  }

  private getCurrentPlayerRoundStates(currentUserId: string, gameItem: GameItem): CurrentPlayerRoundState[] {
    const userIndex = GameDAL.findUserIndexInGame(gameItem, currentUserId);
    if (userIndex == undefined) {
      return [];
    }

    return gameItem.PlayerScores[userIndex].PlayerRoundStates.map((playerRoundState, index) => {
      const roundWord = gameItem.Rounds[index].WordleWord;
      return {
        playerGuesses: playerRoundState.PlayerGuesses.map(playerGuess => 
            this.convertPlayerRoundStateToExternal(playerGuess, roundWord)),
      }
    })
  }

  private convertPlayerRoundStateToExternal(playerGuess: string, solution: string): ExternalPlayerGuess {
    return {
      guessedWord: playerGuess,
      guessLetterResult: calculateMatchingLetters(solution, playerGuess),
    };
  }

  private convertGameRoundToExternal(roundItem: Round): ExternalRound {
    const externalRound: ExternalRound = {
      startTime: roundItem.StartTime,
      endTime: roundItem.EndTime,
      status: "NOT_STARTED", // TODO: Change based on current time
      wordleWord: roundItem.WordleWord, // TODO: Only show when game is done
    }
    return externalRound
  }

  private convertPlayerScoreToExternal(playerScore: PlayerScore): ExternalPlayerScore {
    return {
      player: convertUserItemToExternal(playerScore.Player),
      score: playerScore.Score,
      totalTime: playerScore.TotalTime,
    }
  }

  private isRoundComplete(game: GameItem, roundIndex: number): boolean {
    const correctWord = game.Rounds[roundIndex].WordleWord;
    const incompletePlayers = game.PlayerScores.filter(score => !this.isUserRoundComplete(score.PlayerRoundStates[roundIndex], correctWord));
    return incompletePlayers.length == 0;
  }

  private isUserRoundComplete(userRound: PlayerRoundState, correctWord: string): boolean {
    if (userRound.PlayerGuesses.length == 5) {
      return true;
    }

    const correctGuesses = userRound.PlayerGuesses.filter(guess => guess.toLowerCase() == correctWord.toLowerCase());
    return correctGuesses.length != 0;
  }
}