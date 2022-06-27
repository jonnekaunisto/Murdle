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

// Game
export type RoundStatus = 'NOT_STARTED' | 'IN_PROGRESS' | 'DONE';
export interface PlayerScore {
  Player: PublicUser,
  Score: number,
  TotalTime: number,
  PlayerRoundStates: PlayerRoundState[],
}

export interface Round {
  StartTime: number,
  EndTime: number,
  Status: RoundStatus,
  WordleWord: string,
}

export interface PlayerGuess {
  Guess: string,
}

export interface PlayerRoundState {
  PlayerGuesses: PlayerGuess[],
}

export interface PlayerGameState {
  UserId: string,
  PlayerRoundStates: PlayerRoundState[],
}

export interface GameItem {
  GameId: string,
  PlayerScores: PlayerScore[],
  Rounds: Round[],
  LobbyId: string,
  Metadata: Metadata,
}