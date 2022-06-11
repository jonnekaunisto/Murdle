import { Response } from "express";
import { UsersDAL } from "murdle-service-common";
import { UserNotFoundException } from "../exceptions";
import { CreateUserRequestContent, CreateUserResponseContent, UpdateUserRequestContent, UpdateUserResponseContent } from "murdle-control-plane-client";

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

  public async updateForm(userId: string, body: UpdateUserRequestContent, res: Response<UpdateUserResponseContent>) {
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
        userToken: userItem.AuthToken,
      }
    });
  }

}