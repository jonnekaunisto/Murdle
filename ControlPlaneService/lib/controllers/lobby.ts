import { Response } from "express";
import { LobbyDAL, LobbyItem, PublicUser } from "murdle-service-common";
import { ResourceNotFoundException } from "../exceptions";
import { CreateLobbyResponseContent, PublicUser as ExternalPublicUser, LobbyStructure, LeaveLobbyResponseContent, JoinLobbyResponseContent } from "murdle-control-plane-client";
import { AuthInfo } from "./auth";
import { getWordleId } from "../util/wordle";
import { convertUserItemToExternal } from "../util/converter";

export class LobbyController {
  public constructor(private readonly lobbyDAL: LobbyDAL) {}

  public async createLobby(res: Response<CreateLobbyResponseContent, AuthInfo>) {
    const authenticatedUser = res.locals.authenticatedUser;
    const lobbyItem = await this.lobbyDAL.createLobby({
      lobbyId: getWordleId(),
      ownerUser: {
        UserId: authenticatedUser.UserId,
        UserName: authenticatedUser.UserName,
      }
    });
    res.send({
      lobby: this.convertLobbyItemToExternal(lobbyItem),
    });
  }

  public async joinLobby(lobbyId: string, res: Response<JoinLobbyResponseContent, AuthInfo>) {
    const authenticatedUser = res.locals.authenticatedUser;
    const lobbyItem = await this.lobbyDAL.addUserToLobby({
      lobbyId: lobbyId,
      publicUser: {
        UserId: authenticatedUser.UserId,
        UserName: authenticatedUser.UserName,
      }
    });

    if (lobbyItem == undefined) {
      throw new ResourceNotFoundException('Lobby Not found');
    }

    res.send({
      lobby: this.convertLobbyItemToExternal(lobbyItem),
    });
  }

  public async leaveLobby(lobbyId: string, res: Response<LeaveLobbyResponseContent, AuthInfo>) {
    const authenticatedUser = res.locals.authenticatedUser;
    const lobbyItem = await this.lobbyDAL.removeUserFromLobby({
      lobbyId,
      userId: authenticatedUser.UserId,
    });

    if (lobbyItem == undefined) {
      throw new ResourceNotFoundException('Lobby Not Found');
    }
    res.send({
      lobby: this.convertLobbyItemToExternal(lobbyItem),
    });
  }

  private convertLobbyItemToExternal(lobbyItem: LobbyItem): LobbyStructure {
    return {
      lobbyId: lobbyItem.LobbyId,
      players: lobbyItem.Players.map(convertUserItemToExternal),
      ownerUserId: lobbyItem.OwnerUserId,
    }
  }
}