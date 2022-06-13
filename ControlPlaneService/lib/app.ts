import { Request, Response } from 'express';
import { UsersController } from './controllers/users';
import { CreateLobbyResponseContent, CreateUserRequestContent, CreateUserResponseContent, JoinLobbyResponseContent, LeaveLobbyResponseContent, UpdateUserRequestContent, UpdateUserResponseContent } from "murdle-control-plane-client";
import { BaseException } from './exceptions';
import { AuthController, AuthInfo } from './controllers/auth';
import { UserItem } from 'murdle-service-common';
import { LobbyController } from './controllers/lobby';
const { getCurrentInvoke } = require('@vendia/serverless-express');
const bodyParser = require('body-parser');
const ejs = require('ejs').__express;
const path = require('path');
const cors = require('cors');
const compression = require('compression');
const express = require('express');

export function createApp(usersController: UsersController, lobbyController: LobbyController, authController: AuthController): any {
  const app = express();
  app.set('view engine', 'ejs');
  app.engine('.ejs', ejs);
  app.use(compression());

  app.use(cors());

  app.use(bodyParser.json());
  app.use(bodyParser.urlencoded({ extended: true }));

  // NOTE: tests can't find the views directory without this
  app.set('views', path.join(__dirname, 'views'));

  app.use(function(req: Request, res: Response<{}, {hi: String}>, next) {
    console.log(`Entering ${req.method} ${req.path}`);
    
    next();
  });

  // Create User
  app.post('/v1/user', (req: Request<{}, {}, CreateUserRequestContent>, res: Response<CreateUserResponseContent>, next) => {
    usersController.createUser(req.body, res).catch(next);
  });

  // Auth
  // Has to be under create user since it is not authenticated
  app.use(function(req: Request, res: Response<{}, AuthInfo>, next) {
    console.log(`Entering ${req.method} ${req.path}`);

    // Murdle Authentication Token
    authController.authenticateUser(req.headers['X-User-Token']).then(userItem => {
      res.locals.authenticatedUser = userItem;
      next();
    }).catch(next);    
  });

  // Update User
  app.post('/v1/user/:userId', (req: Request<{ userId: string }, {}, UpdateUserRequestContent>, res: Response<UpdateUserResponseContent, AuthInfo>, next) => {
    usersController.updateUser(req.params.userId, req.body, res).catch(next);
  });

  // Create Lobby
  app.post('/v1/lobby', (req: Request, res: Response<CreateLobbyResponseContent, AuthInfo>, next) => {
    lobbyController.createLobby(res).catch(next);
  });

  // Join Lobby
  app.post('/v1/lobby/:lobbyId', (req: Request<{ lobbyId: string }>, res: Response<JoinLobbyResponseContent, AuthInfo>, next) => {
    lobbyController.joinLobby(req.params.lobbyId, res).catch(next);
  });

  // Leave Lobby
  app.delete('/v1/lobby/:lobbyId', (req: Request<{ lobbyId: string }>, res: Response<LeaveLobbyResponseContent, AuthInfo>, next) => {
    lobbyController.leaveLobby(req.params.lobbyId, res).catch(next);
  });

  app.use(function (err, req, res: Response, next) {
    console.log("In the error handler")
    console.error(err);
    if (err instanceof BaseException) {
      res.status(err.errorCode);
      return res.send({
        message: err.message,
      });
    } else {
      res.status(500);
      return res.send({
        message: 'Unexpected server error encountered',
      })
    }
  });
  return app;
}