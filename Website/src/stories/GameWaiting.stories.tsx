import React from 'react';
import { ComponentStory, ComponentMeta } from '@storybook/react';
import { GameWaiting } from '../modules/gamePage/GameWaiting';


// More on default export: https://storybook.js.org/docs/react/writing-stories/introduction#default-export
export default {
  title: 'Game/GameWaiting',
  component: GameWaiting,
  // More on argTypes: https://storybook.js.org/docs/react/api/argtypes
} as ComponentMeta<typeof GameWaiting>;

const targetTime = Date.now() + 2 * 60 * 1000;
// More on component templates: https://storybook.js.org/docs/react/writing-stories/introduction#using-args
const Template: ComponentStory<typeof GameWaiting> = (args) => <GameWaiting {...args} />;

export const FirstRound = Template.bind({});
// More on args: https://storybook.js.org/docs/react/writing-stories/args
FirstRound.args = {
  startTime: targetTime,
  lastRound: undefined,
  playerScores: [{
    score: 1,
    totalTime: 1,
    player: {
        userId: 'playerId',
        userName: 'PlayerName',
    }
  }]
};

export const SecondRound = Template.bind({});
SecondRound.args = {
    startTime: targetTime,
    playerScores: [{
      score: 1,
      totalTime: 1,
      player: {
          userId: 'playerId',
          userName: 'PlayerName',
      }
    }],
    lastRound: {
        startTime: 0,
        endTime: 1,
        status: 'DONE',
        wordleWord: 'CRATE'
    }
  };