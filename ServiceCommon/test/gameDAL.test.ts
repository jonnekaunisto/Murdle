import { DynamoDBDocument } from "@aws-sdk/lib-dynamodb";
import { DynamoDBClient } from '@aws-sdk/client-dynamodb';
import { getDefaultTranslateConfig } from '../lib/dal/config';
import { GameItem, LobbyItem, PlayerGuess, PublicUser } from '../lib';
import { LobbyDAL } from "../lib/dal/lobbyDAL";
import { GameDAL } from "../lib/dal/gameDAL";

const lobbyOwner: PublicUser = {
  UserId: 'MockUserId',
  UserName: 'MockUserName',
}

const player: PublicUser = {
  UserId: 'MockPlayerId',
  UserName: 'MockPlayerName',
}

const testLobby: LobbyItem = {
  LobbyId: 'MockLobbyIdForGame',
  OwnerUserId: lobbyOwner.UserId,
  Players: [lobbyOwner, player],
  Metadata: {
    CreatedAt: 1,
  },
  Status: 'QUEUE',
  /**
   * DynamoDB TTL attribute
   */
  CleanupTime: 1,
}

const testWordleWords = ['aaaaa', 'bbbbb'];
const testGame: GameItem = {
  GameId: "testGameId",
  PlayerScores: [
    {
      Player: {
        UserId: "MockUserId",
        UserName: "MockUserName",
      },
      Score: 0,
      TotalTime: 0,
      PlayerRoundStates: [
        {
          PlayerGuesses: []
        },
        {
          PlayerGuesses: []
        },
        {
          PlayerGuesses: []
        },
        {
          PlayerGuesses: []
        }
      ]
    },
    {
      Player: {
        UserId: "MockPlayerId",
        UserName: "MockPlayerName",
      },
      Score: 0,
      TotalTime: 0,
      PlayerRoundStates: [
        {
          PlayerGuesses: []
        },
        {
          PlayerGuesses: []
        },
        {
          PlayerGuesses: []
        },
        {
          PlayerGuesses: []
        }
      ]
    },
  ],
  Rounds: [
    {
      StartTime: 1483574415000, // Thu Jan 05 2017 00:00:15 GMT+0000
      EndTime: 1483574595000,   // Thu Jan 05 2017 00:03:15 GMT+0000
      Status: "NOT_STARTED",
      WordleWord: "aaaaa",
    },
    {
      StartTime: 1483574610000, // Thu Jan 05 2017 00:03:30 GMT+0000
      EndTime: 1483574790000,   // Thu Jan 05 2017 00:06:30 GMT+0000
      Status: "NOT_STARTED",
      WordleWord: "bbbbb",
    },
  ],
  LobbyId: testLobby.LobbyId,
  Metadata: {
    CreatedAt: 1,
  }
}

const testPlayerGuess: PlayerGuess = {
  Guess: 'crate',
}

const ddb = DynamoDBDocument.from(
  new DynamoDBClient({
    endpoint: 'http://localhost:8000',
    region: 'local-env',
    credentials: {
      accessKeyId: 'fakeMyKeyId',
      secretAccessKey: 'fakeSecretAccessKey'
    }
  }),
  getDefaultTranslateConfig(),
);
const lobbyDAL = new LobbyDAL(ddb);
const gameDAL = new GameDAL(ddb, lobbyDAL);

describe('End to End', () => {
  beforeAll(() => {
    jest.useFakeTimers('modern')
    jest.setSystemTime(new Date('2017-01-05'))
  });
  afterAll(() => {
    jest.useRealTimers()
  });
  test('CRUD', async () => {
    // Create Game
    const initialGame = await gameDAL.createGame({
      lobbyId: testLobby.LobbyId,
      gameId: testGame.GameId,
      wordleWords: testWordleWords,
      players: testLobby.Players,
    });
    if (initialGame == undefined) {
      expect(initialGame).toBeDefined();
      return;
    }
    expect(initialGame.Metadata).toBeDefined();
    expect(initialGame.Metadata.CreatedAt).toBeDefined();
    testGame.Metadata = initialGame.Metadata;
    expect(initialGame).toEqual(testGame);

    // Get Game
    const getGame = await gameDAL.getGameById(testGame.GameId);
    if (getGame == undefined) {
      expect(getGame).toBeDefined();
      return;
    }
    expect(getGame).toEqual(testGame);

    // Update Player Score
    const newScore = 10;
    const updatedGame = await gameDAL.updatePlayerScore({
      gameId: testGame.GameId,
      userId: lobbyOwner.UserId,
      newScore,
    })
    if (updatedGame == undefined) {
      expect(updatedGame).toBeDefined();
      return;
    }
    testGame.PlayerScores[0].Score = newScore;
    expect(updatedGame).toEqual(testGame);

    const gameWithPlayerGuess = await gameDAL.addPlayerGuess({
      gameId: testGame.GameId,
      userId: lobbyOwner.UserId,
      roundNumber: 1,
      playerGuess: testPlayerGuess,
    });
    testGame.PlayerScores[0].PlayerRoundStates[0].PlayerGuesses.push(testPlayerGuess);
    expect(gameWithPlayerGuess).toEqual(testGame);
  });
});