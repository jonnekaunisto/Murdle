import React from "react";
import { ComponentStory, ComponentMeta } from "@storybook/react";
import { LoadedLobby } from "../modules/lobbyPage/LoadedLobby";
import { PublicUser } from "murdle-control-plane-client";

// More on default export: https://storybook.js.org/docs/react/writing-stories/introduction#default-export
export default {
  title: "Lobby/LoadedLobby",
  component: LoadedLobby,
} as ComponentMeta<typeof LoadedLobby>;

// More on component templates: https://storybook.js.org/docs/react/writing-stories/introduction#using-args
const Template: ComponentStory<typeof LoadedLobby> = (args) => (
  <LoadedLobby {...args} />
);
const ownerId = 'ownerId';

const players: PublicUser[] = [
  {
    userId: "id1",
    userName: "Thomas",
  },
  {
    userId: "id2",
    userName: "Zach",
  },
  {
    userId: ownerId,
    userName: 'Owner',
  }
];

export const OwnerLobby = Template.bind({});
OwnerLobby.args = {
  lobby: {
    players,
    ownerUserId: ownerId,
    lobbyId: "someId",
  },
  localUser: {
    userId: ownerId,
    userName: "Owner",
    authToken: "someToken",
  },
};
// More on args: https://storybook.js.org/docs/react/writing-stories/args

export const PlayerLobby = Template.bind({});
PlayerLobby.args = {
  lobby: {
    players: players,
    ownerUserId: ownerId,
    lobbyId: "someId",
  },
  localUser: {
    userId: 'id1',
    userName: "UserName",
    authToken: "someToken",
  },
};
