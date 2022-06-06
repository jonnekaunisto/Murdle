import { DynamoDBDocument } from "@aws-sdk/lib-dynamodb";
import { DynamoDBClient } from '@aws-sdk/client-dynamodb';
import { getDefaultTranslateConfig } from '../lib/dal/config';
import { UserItem } from '../lib/model/items';
import { UsersDAL } from "../lib/dal/usersDAL";

const testUser: UserItem = {
  UserId: 'TODO',
  UserName: 'fakeName',
  AuthToken: 'TODO',
  Metadata: {
    CreatedAt: 1,
  }
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
const usersDAL = new UsersDAL(ddb);

describe('End to End', () => {
  test('CRUD', async () => {

    // Create
    const initialUser = await usersDAL.createUser({
      userName: testUser.UserName,
    });

    expect(initialUser.AuthToken).toBeDefined();
    expect(initialUser.UserId).toBeDefined();
    expect(initialUser.Metadata).toBeDefined();
    expect(initialUser.Metadata.CreatedAt).toBeDefined();
    testUser.AuthToken = initialUser.AuthToken;
    testUser.UserId = initialUser.UserId;
    testUser.Metadata = initialUser.Metadata;
    expect(initialUser).toEqual(testUser);

    // Lookup with UserId
    const userIdUser = await usersDAL.getUserById(testUser.UserId);
    expect(userIdUser).toEqual(testUser);

    // Lookup with AuthToken
    const authTokeUser = await usersDAL.getUserByAuthToken(testUser.AuthToken);
    expect(authTokeUser).toEqual(testUser);

    // Update
    testUser.UserName = 'AnotherName';
    const updatedUser = await usersDAL.updateUser({
      userId: initialUser.UserId,
      userName: testUser.UserName
    });
    expect(updatedUser).toEqual(testUser);

    // Update non existent form
    const nonExistentUser = await usersDAL.updateUser({
      userId: 'notExists',
      userName: 'mock',
    });
    expect(nonExistentUser).toBeUndefined();
  });
});