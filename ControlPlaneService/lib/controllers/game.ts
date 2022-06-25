import { Response } from "express";
import { GameDAL, gameRounds, GameItem, PlayerScore, LobbyDAL, Round } from "murdle-service-common";
import { AccessDeniedException, ResourceNotFoundException } from "../exceptions";
import { StartGameResponseContent, PlayerScore as ExternalPlayerScore, Round as ExternalRound, GameStructure, StartGameRequestContent, DescribeGameResponseContent } from "murdle-control-plane-client";
import { AuthInfo } from "./auth";
import { getWordleId, getWordleWord } from "../util/wordle";
import { convertUserItemToExternal } from "../util/converter";

export class GameController {
  public constructor(private readonly gameDAL: GameDAL, private readonly lobbyDAL: LobbyDAL) {}

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
      game: this.convertGameItemToExternal(gameItem),
    });
  }

  public async describeGame(gameId: string, res: Response<DescribeGameResponseContent, AuthInfo>) {
    const gameItem = await this.gameDAL.getGameById(gameId);
    if (gameItem == undefined) {
      throw new ResourceNotFoundException('Game not found');
    }
    res.send({
      game: this.convertGameItemToExternal(gameItem),
    });
  }

  private convertGameItemToExternal(gameItem: GameItem): GameStructure {
    return {
      gameId: gameItem.GameId,
      playerScores: gameItem.PlayerScores.map(this.convertPlayerScoreToExternal),
      rounds: gameItem.Rounds.map(this.convertGameRoundToExternal),
      lobbyId: gameItem.LobbyId,
    }
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
}