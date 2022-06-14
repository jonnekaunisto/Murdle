import { UserItem, UsersDAL } from "murdle-service-common";
import { AccessDeniedException } from "../exceptions";

export interface AuthInfo {
  authenticatedUser: UserItem,
}

export class AuthController {
  public constructor(private readonly usersDAL: UsersDAL) {}

  public async authenticateUser(authToken: string | string[] | undefined): Promise<UserItem> {
    if (authToken == undefined) {
      console.log('Auth token is undefined');
      throw new AccessDeniedException('Access Denied: Auth Token Not Provided');
    }
    if (typeof authToken !== 'string') {
      console.log('Auth token is not a string');
      throw new AccessDeniedException('Access Denied: Auth Token Malformed');
    }
    const userItem = await this.usersDAL.getUserByAuthToken(authToken);
    if (userItem == undefined) {
      console.log('Auth token is not valid');
      throw new AccessDeniedException('Access Denied: Auth Token Not Found');
    }
    return userItem;
  }
}