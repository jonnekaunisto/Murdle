export interface LocalUser {
  readonly userName: string,
  readonly userId: string,
  readonly authToken: string,
}

export class LocalUserDAL {
  private static readonly USER_ID_KEY_NAME = 'MurdleUserId';
  private static readonly USERNAME_KEY_NAME = 'MurdleUserName';
  private static readonly AUTH_TOKEN_KEY_NAME = 'MurdleAuthToken';

  private readonly localStorage: Storage;
  public constructor() {
    this.localStorage = window.localStorage;
  }

  public createUser(localUser: LocalUser): LocalUser {
    const user = this.getUser();
    if (user) {
      throw new Error('User already exists');
    }

    this.localStorage.setItem(LocalUserDAL.USER_ID_KEY_NAME, localUser.userId);
    this.localStorage.setItem(LocalUserDAL.USERNAME_KEY_NAME, localUser.userName);
    this.localStorage.setItem(LocalUserDAL.AUTH_TOKEN_KEY_NAME, localUser.authToken);
    return localUser;
  }

  public getUser(): LocalUser | undefined {
    const userId = this.localStorage.getItem(LocalUserDAL.USER_ID_KEY_NAME);
    const userName = this.localStorage.getItem(LocalUserDAL.USERNAME_KEY_NAME);
    const authToken = this.localStorage.getItem(LocalUserDAL.AUTH_TOKEN_KEY_NAME);

    if (!userId && !userName && !authToken) {
      return undefined;
    }
    if (!userId || !userName || !authToken) {
      throw Error('Local Storage is Corrupted')
    }
    return {
      userId,
      userName,
      authToken,
    }
  }

  public updateUser(userName: string): LocalUser | undefined {
    const user = this.getUser();
    if (user) {
      this.localStorage.setItem(LocalUserDAL.USERNAME_KEY_NAME, userName);
    }
    return user;
  }
}