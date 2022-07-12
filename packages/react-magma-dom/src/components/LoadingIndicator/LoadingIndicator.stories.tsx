import React from 'react';
import { LoadingIndicator, LoadingIndicatorType } from '.';
import { Card, CardBody } from '../Card';

export default {
  component: LoadingIndicator,
  title: 'LoadingIndicator',
  argTypes: {
    percentage: {
      control: {
        type: 'number',
      },
    },
    type: {
      control: {
        type: 'select',
        options: LoadingIndicatorType,
      },
    },
    isInverse: {
      defaultValue: false,
      control: {
        type: 'boolean',
      },
    },
  },
};

export const Default = args => {
  return (
    <Card isInverse={args.isInverse}>
      <CardBody>
        <LoadingIndicator {...args} />
      </CardBody>
    </Card>
  );
};
Default.args = {
  message1: 'Loading...',
  message2: 'Thank you for your patience. Still loading...',
  message3: 'Sorry for the delay. This is taking longer than expected.',
}