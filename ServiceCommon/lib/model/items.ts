export interface UserMetadata {
  CreatedAt: number,
}

export interface UserItem {
  UserId: string,
  UserName: string,
  AuthToken: string,
  Metadata: UserMetadata,
}