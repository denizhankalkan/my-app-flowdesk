import React from 'react';
import { Meta, StoryFn } from '@storybook/react';
import RecentTrades, { RecentTradesProps } from '../components/RecentTradesTable';

export default {
  title: 'Components/RecentTrades',
  component: RecentTrades,
} as Meta;

const Template: StoryFn<RecentTradesProps> = (args) => <RecentTrades {...args} />;

export const Default = Template.bind({});
Default.args = {
  data: [
    { id: 3205644686, price: "45000", qty: "0.5", quoteQty: "480.51505920", time: 1693849425585, isBuyerMaker: true, isBestMatch: true},
  ],
};
