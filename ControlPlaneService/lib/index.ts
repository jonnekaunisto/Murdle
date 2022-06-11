import { createApp } from "./app";
import { DynamoDBDocument } from '@aws-sdk/lib-dynamodb';
import { DynamoDBClient } from '@aws-sdk/client-dynamodb';
import { getDefaultTranslateConfig, UsersDAL } from 'murdle-service-common';
import { UsersController } from './controllers/users';

const serverlessExpress = require('@vendia/serverless-express');

const ddbDocClient = DynamoDBDocument.from(
  new DynamoDBClient({}),
  getDefaultTranslateConfig(),
);

const usersDAL = new UsersDAL(ddbDocClient);
const usersController = new UsersController(usersDAL);
const app = createApp(usersController);

exports.handler = serverlessExpress({ app });