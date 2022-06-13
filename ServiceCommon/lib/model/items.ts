// Common
export interface Metadata {
  CreatedAt: number,
}

// User
export interface UserItem {
  UserId: string,
  UserName: string,
  AuthToken: string,
  Metadata: Metadata,
}

// Lobby
export interface PublicUser {
  UserId: string,
  UserName: string,
}
export type LobbyStatus = 'QUEUE' | 'IN_GAME';
export interface LobbyItem {
  LobbyId: string,
  OwnerUserId: string,
  Players: PublicUser[],
  Metadata: Metadata,
  Status: LobbyStatus,
  CurrentGameExpirationTime?: number,
  /**
   * DynamoDB TTL attribute
   */
  CleanupTime: number,
}