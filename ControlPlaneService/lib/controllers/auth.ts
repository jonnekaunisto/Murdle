import { UserItem, UsersDAL } from "murdle-service-common";
import { AccessDeniedException } from "../exceptions";

export interface AuthInfo {
  authenticatedUser: UserItem,
}

export class AuthController {
  public constructor(private readonly usersDAL: UsersDAL) {}

  public async authenticateUser(authToken: string | string[] | undefined): Promise<UserItem> {
    if (typeof authToken !== 'string') {
      throw new AccessDeniedException('Access Denied');
    }
    if (authToken == undefined) {
      throw new AccessDeniedException('Access Denied');
    }
    const userItem = await this.usersDAL.getUserByAuthToken(authToken);
    if (userItem == undefined) {
      throw new AccessDeniedException('Access Denied');
    }
    return userItem;
  }
}