import { DynamoDBDocument, GetCommandOutput } from "@aws-sdk/lib-dynamodb";
import { LobbyDAL } from "..";
import { gameRounds, gameWaitTimeSeconds, roundDurationSeconds } from "../game/gameRules";
import { GameItem, PlayerRoundState, PlayerScore, PublicUser, Round } from "../model/items";

export interface CreateGameOptions {
  lobbyId: string,
  gameId: string,
  wordleWords: string[],
  players: PublicUser[],
}

export interface AddPlayerGuessOptions {
  gameId: string,
  userId: string,
  roundNumber: number,
  playerGuess: string,
}

export interface UpdatePlayerScoreOptions {
  gameId: string,
  userId: string,
  newScore: number;
}

export class GameDAL {
  private static readonly GAME_TABLE_NAME: string = "MurdleGame";
  public constructor(private readonly ddbDocClient: DynamoDBDocument, private readonly lobbyDAL: LobbyDAL) { }

  public async createGame(options: CreateGameOptions): Promise<GameItem> {
    const currentUnixTime = new Date().getTime();
    const gameItem: GameItem = {
      GameId: options.gameId,
      PlayerScores: this.fillInitialScores(options.players),
      Rounds: this.fillInitialRounds(options.wordleWords),
      LobbyId: options.lobbyId,
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

  public async addPlayerGuess(options: AddPlayerGuessOptions): Promise<GameItem | undefined> {
    const gameItem = await this.getGameById(options.gameId);
    if (gameItem == undefined) {
      console.log('Game not found');
      return undefined;
    }

    const userIndex = GameDAL.findUserIndexInGame(gameItem, options.userId);
    if (userIndex == undefined) {
      console.log('User not found');
      return undefined;
    }

    if (options.roundNumber > gameItem.Rounds.length) {
      console.log('Round not found')
      return undefined;
    }
    const roundIndex = options.roundNumber - 1;

    const attributeLocation = `#ps[${roundIndex}].#prs[${roundIndex}].#pg`;
    
    return this.ddbDocClient.update({
      TableName: GameDAL.GAME_TABLE_NAME,
      Key: {
        GameId: options.gameId,
      },
      UpdateExpression: `SET ${attributeLocation} = list_append(${attributeLocation}, :vals)`,
      ExpressionAttributeNames: { 
        '#ps': 'PlayerScores',
        '#prs': 'PlayerRoundStates',
        '#pg': 'PlayerGuesses',
     },
      ExpressionAttributeValues: { ':vals': [options.playerGuess] },
      ReturnValues: 'ALL_NEW',
    }).then(response => {
      return response.Attributes as GameItem | undefined;
    }).catch(error => {
      console.error(error);
      throw Error("Failed to Add To Guesses");
    });
  }

  public async updatePlayerScore(options: UpdatePlayerScoreOptions): Promise<GameItem | undefined> {
    const gameItem = await this.getGameById(options.gameId);
    if (gameItem == undefined) {
      return undefined;
    }

    const userIndex = GameDAL.findUserIndexInGame(gameItem, options.userId);
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
      throw Error("Failed to Update Score");
    });
  }

  private fillInitialScores(players: PublicUser[]): PlayerScore[] {
    return players.map(player => {
      return {
        Player: player,
        Score: 0,
        TotalTime: 0,
        PlayerRoundStates: this.fillInitialRoundState(),
      }
    });
  }

  private fillInitialRoundState(): PlayerRoundState[] {
    const playerRoundStates: PlayerRoundState[] = [];
    for(let i = 0; i < gameRounds; i++) {
      playerRoundStates.push({
        PlayerGuesses: [],
      });
    }
    return playerRoundStates;
  }

  private fillInitialRounds(wordleWords: string[]): Round[] {
    const rounds: Round[] = [];
    const currentUnixTime = new Date().getTime();
    var roundStartTime = currentUnixTime + 1000 * gameWaitTimeSeconds;

    return wordleWords.map(wordleWord => {
      const roundEndTime = roundStartTime + roundDurationSeconds * 1000
      const round: Round = {
        StartTime: roundStartTime,
        EndTime: roundEndTime,
        Status: "NOT_STARTED",
        WordleWord: wordleWord,
      }
      rounds.push(round);
      roundStartTime = roundEndTime + gameWaitTimeSeconds * 1000;
      return round;
    });
  }

  public static findUserIndexInGame(game: GameItem, userId: string): number | undefined {
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
