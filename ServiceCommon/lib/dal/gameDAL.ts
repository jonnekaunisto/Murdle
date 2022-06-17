import { DynamoDBDocument, GetCommandOutput } from "@aws-sdk/lib-dynamodb";
import { LobbyDAL } from "..";
import { gameRounds, gameWaitTimeSeconds, roundDurationSeconds } from "../game/gameRules";
import { getWordleId, getWordleWord } from "../game/wordle";
import { GameItem, PlayerScore, PublicUser, Round } from "../model/items";

export interface UpdatePlayerScoreOptions {
  gameId: string,
  userId: string,
  newScore: number;
}

export class GameDAL {
  private static readonly GAME_TABLE_NAME: string = "MurdleGame";
  public constructor(private readonly ddbDocClient: DynamoDBDocument, private readonly lobbyDAL: LobbyDAL) { }

  public async createGame(lobbyId: string): Promise<GameItem | undefined> {
    const lobbyItem = await this.lobbyDAL.getLobbyById(lobbyId);
    if (lobbyItem == undefined) {
      return undefined;
    }

    const gameId = lobbyId + '.' + getWordleId();
    const currentUnixTime = new Date().getTime();
    const gameItem: GameItem = {
      GameId: gameId,
      PlayerScores: this.fillInitialScores(lobbyItem.Players),
      Rounds: this.fillInitialRounds(),
      LobbyId: lobbyItem.LobbyId,
      Metadata: {
        CreatedAt: currentUnixTime,
      },
    };

    try {
      await this.ddbDocClient.put({
        TableName: GameDAL.GAME_TABLE_NAME,
        Item: gameItem,
      });
      return gameItem;
    }
    catch (error) {
      console.error(error);
      throw Error('Failed to Create Game');
    }
  }

  public async getGameById(gameId: string): Promise<GameItem | undefined> {
    return this.ddbDocClient.get({
      TableName: GameDAL.GAME_TABLE_NAME,
      Key: {
        GameId: gameId,
      },
    }).then((result: GetCommandOutput) => {
      return result.Item as GameItem | undefined;
    }).catch(error => {
      console.error(error);
      throw Error("Failed to GetLobbyById");
    });
  }

  public async updatePlayerScore(options: UpdatePlayerScoreOptions): Promise<GameItem | undefined> {
    const gameItem = await this.getGameById(options.gameId);
    if (gameItem == undefined) {
      return undefined;
    }

    const userIndex = this.findUserIndexInGame(gameItem, options.userId);
    if (userIndex == undefined) {
      return undefined;
    }
    const updatedScore = gameItem.PlayerScores[userIndex];
    updatedScore.Score = options.newScore;

    return this.ddbDocClient.update({
      TableName: GameDAL.GAME_TABLE_NAME,
      Key: {
        GameId: options.gameId,
      },
      UpdateExpression: `SET PlayerScores[${userIndex}] = :val`,
      ExpressionAttributeValues: { ':val': updatedScore },
      ReturnValues: 'ALL_NEW',
    }).then(response => {
      return response.Attributes as GameItem | undefined;
    }).catch(error => {
      console.error(error);
      throw Error("Failed to Remove From Lobby");
    });
  }

  private fillInitialScores(players: PublicUser[]): PlayerScore[] {
    return players.map(player => {
      return {
        Player: player,
        Score: 0,
        TotalTime: 0,
      }
    });
  }

  private fillInitialRounds(): Round[] {
    const rounds: Round[] = [];
    const currentUnixTime = new Date().getTime();
    var roundStartTime = currentUnixTime + 1000 * gameWaitTimeSeconds;

    for (let i: number = 0; i < gameRounds; i++) {
      const roundEndTime = roundStartTime + roundDurationSeconds * 1000
      const round: Round = {
        StartTime: roundStartTime,
        EndTime: roundEndTime,
        Status: "NOT_STARTED",
        WordleWord: getWordleWord(),
      }
      rounds.push(round);
      roundStartTime = roundEndTime + gameWaitTimeSeconds * 1000;
    }
    return rounds;
  }

  private findUserIndexInGame(game: GameItem, userId: string): number | undefined {
    var playerIndex: number | undefined;
    game.PlayerScores.forEach((playerScore, index) => {
      if (playerScore.Player.UserId == userId) {
        playerIndex = index;
        return;
      }
    })
    return playerIndex;
  }
}
