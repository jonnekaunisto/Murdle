import { PublicUser as ExternalPublicUser } from "murdle-control-plane-client";
import { PublicUser } from "murdle-service-common";

export function convertUserItemToExternal(userItem: PublicUser): ExternalPublicUser {
  return {
    userId: userItem.UserId,
    userName: userItem.UserName
  }
}