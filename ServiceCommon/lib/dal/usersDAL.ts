import { DynamoDBDocument, GetCommandOutput, QueryCommandOutput } from "@aws-sdk/lib-dynamodb";
import { v4 as uuidv4 } from 'uuid';
import { UserItem } from "../model/items";


export interface CreateUserOptions {
  userName: string,
}

export interface UpdateUserOptions {
  userId: string,
  userName: string,
}

export class UsersDAL {
  private static readonly USERS_TABLE_NAME: string = "MurdleUsers";

  public constructor( private readonly ddbDocClient: DynamoDBDocument) {}

  public async createUser(options: CreateUserOptions): Promise<UserItem> {
    const userId = uuidv4();
    const userAuthToken = uuidv4();
    const currentUnixTime = new Date().getTime();

    const userItem: UserItem = {
      UserId: userId,
      AuthToken: userAuthToken,
      UserName: options.userName,
      Metadata: {
        CreatedAt: currentUnixTime,
      }
    };

    try {
      await this.ddbDocClient.put({
        TableName: UsersDAL.USERS_TABLE_NAME,
        Item: userItem,
      });
      return userItem;
    }
    catch (error) {
      console.error(error);
      throw Error('Failed to Create User');
    }
  }

  public async getUserById(userId: string): Promise<UserItem | undefined> {
    return this.ddbDocClient.get({
      TableName: UsersDAL.USERS_TABLE_NAME,
      Key: {
        UserId: userId,
      },
    }).then((result: GetCommandOutput) => {
      return result.Item as UserItem | undefined;
    }).catch(error => {
      console.error(error);
      throw Error("Failed to GetUserById");
    });
  }

  public async getUserByAuthToken(authToken: string): Promise<UserItem | undefined> {
    return this.ddbDocClient.query({
      TableName: UsersDAL.USERS_TABLE_NAME,
      IndexName: 'AuthTokenLookup',
      KeyConditionExpression: 'AuthToken = :authToken',
      ExpressionAttributeValues: {
        ':authToken': authToken,
      }
    }).then((result: QueryCommandOutput) => {
      if (result.Items != undefined) {
        if (result.Items.length > 0) {
          return result.Items[0] as UserItem;
        } else {
          return undefined;
        }
      } else {
        return undefined;
      }
    }).catch(error => {
      console.error(error);
      throw Error("Failed to GetUserByAuthToken");
    });;
  }

  public async updateUser(options: UpdateUserOptions): Promise<UserItem | undefined> {
    const user = await this.getUserById(options.userId);
    if (user == undefined) {
      return undefined;
    }

    var updateExpression: string | undefined;
    var expressionAttributeValues: { [key: string]: any } = {};
    var expressionAttributeNames: { [key: string]: string } = {};

    const updateValues: { key: string, value: any }[] = [
      { key: 'UserName', value: options.userName },
    ];

    const updatedAttributes = updateValues.filter(entry => entry.value != undefined);

    updatedAttributes.forEach(entry => {
      if (updateExpression == undefined) {
        updateExpression = 'SET ';
      } else {
        updateExpression += ', ';
      }

      var keyAlias = `#${entry.key.substring(0, 3)}`;
      var valueAlias = `:${entry.key.substring(0, 3)}`;
      updateExpression += `${keyAlias} = ${valueAlias}`
      expressionAttributeValues[valueAlias] = entry.value;
      // Needed since Status is a reserved word
      //https://docs.aws.amazon.com/amazondynamodb/latest/developerguide/ReservedWords.html
      expressionAttributeNames[keyAlias] = entry.key;
    });

    return this.ddbDocClient.update({
      TableName: UsersDAL.USERS_TABLE_NAME,
      Key: {
        UserId: options.userId,
      },
      UpdateExpression: updateExpression,
      ExpressionAttributeValues: expressionAttributeValues,
      ExpressionAttributeNames: expressionAttributeNames,
      ReturnValues: 'ALL_NEW',
    }).then(response => {
      return response.Attributes as UserItem | undefined;
    }).catch(error => {
      console.error(error);
      throw Error("Failed to UpdateForm");
    });
  }
}