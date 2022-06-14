import { createApp } from "./app";
import { DynamoDBDocument } from '@aws-sdk/lib-dynamodb';
import { DynamoDBClient } from '@aws-sdk/client-dynamodb';
import { getDefaultTranslateConfig, LobbyDAL, UsersDAL } from 'murdle-service-common';
import { UsersController } from './controllers/users';
import { AuthController } from "./controllers/auth";
import { LobbyController } from "./controllers/lobby";

const serverlessExpress = require('@vendia/serverless-express');

const ddbDocClient = DynamoDBDocument.from(
  new DynamoDBClient({}),
  getDefaultTranslateConfig(),
);

const usersDAL = new UsersDAL(ddbDocClient);
const lobbyDAL = new LobbyDAL(ddbDocClient);
const usersController = new UsersController(usersDAL);
const authController = new AuthController(usersDAL);
const lobbyController = new LobbyController(lobbyDAL);
const app = createApp(usersController, lobbyController, authController);

exports.handler = serverlessExpress({ app });