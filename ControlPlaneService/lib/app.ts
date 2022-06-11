import { Request, Response } from 'express';
import { UsersController } from './controllers/users';
import { CreateUserRequestContent, CreateUserResponseContent, UpdateUserRequestContent, UpdateUserResponseContent } from "murdle-control-plane-client";
import { BaseException } from './exceptions';
const { getCurrentInvoke } = require('@vendia/serverless-express');
const bodyParser = require('body-parser');
const ejs = require('ejs').__express;
const path = require('path');
const cors = require('cors');
const compression = require('compression');
const express = require('express');

function getClaims(): { userSub: string, userEmail: string } {
  const currentInvoke = getCurrentInvoke();
  const authorizer = currentInvoke.event.requestContext.authorizer;
  if (authorizer != undefined && authorizer.claims != undefined &&
    authorizer.claims['sub'] != undefined && authorizer.claims['email'] != undefined) {
    const userSub = authorizer.claims['sub'];
    const userEmail = authorizer.claims['email'];
    return {
      userSub,
      userEmail,
    }
  }
  console.log('Could not find authorizer');
  throw new Error('Could not find authorizer');
}

export function createApp(usersController: UsersController): any {
  const app = express();
  app.set('view engine', 'ejs');
  app.engine('.ejs', ejs);
  app.use(compression());

  app.use(cors());

  app.use(bodyParser.json());
  app.use(bodyParser.urlencoded({ extended: true }));

  // NOTE: tests can't find the views directory without this
  app.set('views', path.join(__dirname, 'views'));

  app.use(function(req: Request, res, next) {
    console.log(`Entering ${req.method} ${req.path}`)
    next();
  });

  // Users
  // Create
  app.post('/v1/user', (req: Request<{}, {}, CreateUserRequestContent>, res: Response<CreateUserResponseContent>, next) => {
    usersController.createUser(req.body, res).catch(next);
  });

  // Update
  app.post('/v1/user/:userId', (req: Request<{ formName: string }, {}, UpdateUserRequestContent>, res: Response<UpdateUserResponseContent>, next) => {
    usersController.updateForm(req.params.formName, req.body, res).catch(next);
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