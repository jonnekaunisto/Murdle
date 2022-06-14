import { DynamoDBDocument, GetCommandOutput } from "@aws-sdk/lib-dynamodb";
import { LobbyItem, PublicUser } from "../model/items";

export interface CreateLobbyOptions {
  lobbyId: string,
  ownerUser: PublicUser,
}

export interface AddUserToLobbyOptions {
  lobbyId: string,
  publicUser: PublicUser,
}

export interface RemoveUserFromLobby {
  lobbyId: string,
  userId: string,
}

export class LobbyDAL {
  private static readonly LOBBY_TABLE_NAME: string = "MurdleLobby";
  public constructor(private readonly ddbDocClient: DynamoDBDocument) { }

  public async createLobby(options: CreateLobbyOptions): Promise<LobbyItem> {
    const currentUnixTime = new Date().getTime();
    const cleanupTimeDate = new Date();
    // Cleans up the item after 30 days
    cleanupTimeDate.setDate(cleanupTimeDate.getDate() + 30);
    const cleanupTime = Math.floor(cleanupTimeDate.getTime() / 1000)

    const lobbyItem: LobbyItem = {
      LobbyId: options.lobbyId,
      OwnerUserId: options.ownerUser.UserId,
      Players: [{
        UserId: options.ownerUser.UserId,
        UserName: options.ownerUser.UserName,
      }],
      Metadata: {
        CreatedAt: currentUnixTime,
      },
      Status: 'QUEUE',
      CleanupTime: cleanupTime,
    };

    try {
      await this.ddbDocClient.put({
        TableName: LobbyDAL.LOBBY_TABLE_NAME,
        Item: lobbyItem,
      });
      return lobbyItem;
    }
    catch (error) {
      console.error(error);
      throw Error('Failed to Create Lobby');
    }
  }

  public async getLobbyById(lobbyId: string): Promise<LobbyItem | undefined> {
    return this.ddbDocClient.get({
      TableName: LobbyDAL.LOBBY_TABLE_NAME,
      Key: {
        LobbyId: lobbyId,
      },
    }).then((result: GetCommandOutput) => {
      return result.Item as LobbyItem | undefined;
    }).catch(error => {
      console.error(error);
      throw Error("Failed to GetLobbyById");
    });
  }

  public async addUserToLobby(options: AddUserToLobbyOptions): Promise<LobbyItem | undefined> {
    const lobby = await this.getLobbyById(options.lobbyId);
    if (lobby == undefined) {
      return undefined;
    }

    const userIndex = this.findUserIndexInLobby(lobby, options.publicUser.UserId);
    if (userIndex != undefined) {
      return lobby;
    }

    return this.ddbDocClient.update({
      TableName: LobbyDAL.LOBBY_TABLE_NAME,
      Key: {
        LobbyId: options.lobbyId,
      },
      UpdateExpression: 'SET #ri = list_append(#ri, :vals)',
      ExpressionAttributeNames: { '#ri': "Players" },
      ExpressionAttributeValues: { ':vals': [options.publicUser] },
      ReturnValues: 'ALL_NEW',
    }).then(response => {
      return response.Attributes as LobbyItem | undefined;
    }).catch(error => {
      console.error(error);
      throw Error("Failed to Add To Lobby");
    });
  }

  public async removeUserFromLobby(options: RemoveUserFromLobby) {
    const lobby = await this.getLobbyById(options.lobbyId);
    if (lobby == undefined) {
      return undefined;
    }
    const userIndex = this.findUserIndexInLobby(lobby, options.userId);

    return this.ddbDocClient.update({
      TableName: LobbyDAL.LOBBY_TABLE_NAME,
      Key: {
        LobbyId: options.lobbyId,
      },
      UpdateExpression: `REMOVE Players[${userIndex}]`,
      ConditionExpression: `Players[${userIndex}].UserId = :userToRemove`,
      ExpressionAttributeValues: {
        ":userToRemove": options.userId,
      },
      ReturnValues: 'ALL_NEW',
    }).then(response => {
      return response.Attributes as LobbyItem | undefined;
    }).catch(error => {
      console.error(error);
      throw Error("Failed to Remove From Lobby");
    });
  }

  private findUserIndexInLobby(lobby: LobbyItem, userId: string): number | undefined {
    var playerIndex: number | undefined;
    lobby.Players.forEach((user, index) => {
      if (user.UserId == userId) {
        playerIndex = index;
        return;
      }
    })
    return playerIndex;
  }
}
