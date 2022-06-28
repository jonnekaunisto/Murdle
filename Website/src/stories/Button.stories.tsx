import React from 'react';
import { ComponentStory, ComponentMeta } from '@storybook/react';
import { FormButton } from '../modules/common/Buttons';


// More on default export: https://storybook.js.org/docs/react/writing-stories/introduction#default-export
export default {
  title: 'Component/Button',
  component: FormButton,
  // More on argTypes: https://storybook.js.org/docs/react/api/argtypes
  argTypes: {
    backgroundColor: { control: 'color' },
  },
} as ComponentMeta<typeof FormButton>;

// More on component templates: https://storybook.js.org/docs/react/writing-stories/introduction#using-args
const Template: ComponentStory<typeof FormButton> = (args) => <FormButton {...args} />;

export const Primary = Template.bind({});
// More on args: https://storybook.js.org/docs/react/writing-stories/args
Primary.args = {
  message: 'SignUp',
  color: 'red'
};

export const Secondary = Template.bind({});
Secondary.args = {
  message: 'Login',
  color: 'indigo'
};
