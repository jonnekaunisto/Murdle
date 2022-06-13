import { DynamoDBDocument } from "@aws-sdk/lib-dynamodb";
import { DynamoDBClient } from '@aws-sdk/client-dynamodb';
import { getDefaultTranslateConfig } from '../lib/dal/config';
import { LobbyItem, PublicUser } from '../lib';
import { LobbyDAL } from "../lib/dal/lobbyDAL";

const lobbyOwner: PublicUser = {
  UserId: 'MockUserId',
  UserName: 'MockUserName',
}

const player: PublicUser = {
  UserId: 'MockPlayerId',
  UserName: 'MockPlayerName',
}

const testLobby: LobbyItem = {
  LobbyId: 'MockLobbyId',
  OwnerUserId: lobbyOwner.UserId,
  Players: [lobbyOwner],
  Metadata: {
    CreatedAt: 1,
  },
  Status: 'QUEUE',
  /**
   * DynamoDB TTL attribute
   */
  CleanupTime: 1,
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

describe('End to End', () => {
  test('CRUD', async () => {

    // Create
    const initialLobby = await lobbyDAL.createLobby({
      lobbyId: testLobby.LobbyId,
      ownerUser: lobbyOwner,
    });

    expect(initialLobby.CleanupTime).toBeDefined();
    expect(initialLobby.Metadata).toBeDefined();
    expect(initialLobby.Metadata.CreatedAt).toBeDefined();
    testLobby.CleanupTime = initialLobby.CleanupTime;
    testLobby.Metadata = initialLobby.Metadata;
    expect(initialLobby).toEqual(testLobby);

    // Lookup with LobbyId
    const lobbyIdLobby = await lobbyDAL.getLobbyById(testLobby.LobbyId);
    expect(lobbyIdLobby).toEqual(testLobby);

    // Add Player
    const addLobby = await lobbyDAL.addUserToLobby({
      lobbyId: testLobby.LobbyId,
      publicUser: player,
    });
    testLobby.Players.push(player);
    expect(addLobby).toEqual(testLobby);

    // Remove Player
    const removeLobby = await lobbyDAL.removeUserFromLobby({
      lobbyId: testLobby.LobbyId,
      userId: player.UserId,
    });
    testLobby.Players.pop();
    expect(removeLobby).toEqual(testLobby);
  });
});