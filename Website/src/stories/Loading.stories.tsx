import React from 'react';
import { ComponentStory, ComponentMeta } from '@storybook/react';
import { Loading } from '../modules/common/Loading';


// More on default export: https://storybook.js.org/docs/react/writing-stories/introduction#default-export
export default {
  title: 'Component/Loading',
  component: Loading,
} as ComponentMeta<typeof Loading>;

// More on component templates: https://storybook.js.org/docs/react/writing-stories/introduction#using-args
const Template: ComponentStory<typeof Loading> = (args) => <Loading {...args} />;

export const LoadingInProgress = Template.bind({});
// More on args: https://storybook.js.org/docs/react/writing-stories/args
export const LoadedWithError = Template.bind({});
LoadedWithError.args = {
  errorMessage: 'Could not load the page',
};
