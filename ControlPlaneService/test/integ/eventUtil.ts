import {  CreateUserRequestContent, CreateUserResponseContent } from "murdle-control-plane-client";
const serverlessExpress = require('@vendia/serverless-express');
import { createApp } from '../../lib/app';
import { DynamoDBClient } from '@aws-sdk/client-dynamodb';
import { DynamoDBDocument } from '@aws-sdk/lib-dynamodb';
import { UsersController } from '../../lib/controllers/users';
import { getDefaultTranslateConfig, UsersDAL } from 'murdle-service-common';

interface EventOptions {
  path: string,
  method: "GET" | "POST" |"PUT" | "DELETE",
  body?: any, 
  sub?: string,
  email?: string,
  queryStringParameters?: any,
}

export interface RawResponse {
  body: string,
  statusCode: number,
}


export interface APIResponse<T> {
  body?: T;
  statusCode: number,
  error?: ErrorResponse;
}

export interface ErrorResponse {
  message: string,
}

export interface PutFormClients {
  usersDAL: UsersDAL;
  handler: any;
}

export function createClients(): PutFormClients {
  const ddbDocClient = DynamoDBDocument.from(
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

  const usersDAL = new UsersDAL(ddbDocClient);
  const usersController = new UsersController(usersDAL);
  const app = createApp(usersController);
  const handler = serverlessExpress({ app });
  return {
    handler,
    usersDAL,
  }
}

function createEvent(options: EventOptions) {
  return {
    path: options.path,
    httpMethod: options.method,
    headers: {
      accept: 'text/html,application/xhtml+xml,application/xml;q=0.9,image/avif,image/webp,image/apng,*/*;q=0.8,application/signed-exchange;v=b3;q=0.9',
      'accept-encoding': 'gzip, deflate, br',
      'accept-language': 'en-US,en;q=0.9,es;q=0.8,fi;q=0.7',
      'cache-control': 'max-age=0',
      'content-type': 'application/json',
    },
    requestContext: {
      httpMethod: options.method,
      path: options.path,
      authorizer: {
        claims: {
          sub: options.sub || 'fakeSub',
          email: options.email || 'fake@email.com'
        }
      }
    },
    queryStringParameters: options.queryStringParameters,
    multiValueQueryStringParameters: options.queryStringParameters,
    body: JSON.stringify(options.body),
    isBase64Encoded: false
  };
}

export async function executeAPI<T>(handler: any, event: any): Promise<APIResponse<T>> {
  const rawResponse: RawResponse = await handler(event);
  if (rawResponse.statusCode >= 200 && rawResponse.statusCode < 300) {
    return {
      statusCode: rawResponse.statusCode,
      body: JSON.parse(rawResponse.body) as T
    }
  } else {
    return {
      statusCode: rawResponse.statusCode,
      error: JSON.parse(rawResponse.body) as ErrorResponse
    }
  }
}

export async function executeCreateUser(handler: any, requestContent: CreateUserRequestContent, sub: string, email: string): Promise<APIResponse<CreateUserResponseContent>> {
  const event = createEvent({
    path: `/v1/user`,
    method: 'POST',
    body: requestContent,
    sub: sub,
    email: email,
  });
  return await executeAPI<CreateUserResponseContent>(handler, event);
}

