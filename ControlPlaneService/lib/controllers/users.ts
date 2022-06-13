import { Response } from "express";
import { UsersDAL } from "murdle-service-common";
import { AccessDeniedException, UserNotFoundException } from "../exceptions";
import { CreateUserRequestContent, CreateUserResponseContent, UpdateUserRequestContent, UpdateUserResponseContent } from "murdle-control-plane-client";
import { AuthInfo } from "./auth";

export class UsersController {
  public constructor(private readonly usersDAL: UsersDAL) {}

  public async createUser(body: CreateUserRequestContent, res: Response<CreateUserResponseContent>) {
    const userItem = await this.usersDAL.createUser({
      userName: body.userName
    });
    res.send({
      user: {
        userId: userItem.UserId,
        userName: userItem.UserName,
        userToken: userItem.AuthToken,
      }
    });
  }

  public async updateUser(userId: string, body: UpdateUserRequestContent, res: Response<UpdateUserResponseContent, AuthInfo>) {
    if (userId != res.locals.authenticatedUser.UserId) {
      throw new AccessDeniedException('Access Denied');
    }

    const userItem = await this.usersDAL.updateUser({
      userId,
      userName: body.userName,
    });

    if (userItem == undefined) {
      throw new UserNotFoundException(userId)
    }
    res.send({
      user: {
        userId: userItem.UserId,
        userName: userItem.UserName,
      }
    });
  }
}