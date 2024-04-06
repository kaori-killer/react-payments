import type { Meta, StoryObj } from '@storybook/react';

import CardContent, { CardProps } from './CardContent';
import CardBox from './CardBox';

const cardNumber = {
  firstNumber: '1111',
  secondNumber: '1111',
  thirdNumber: '1111',
  fourthNumber: '1111',
};

const expirationDate = {
  month: '12',
  year: '23',
};

const meta: Meta<typeof CardContent> = {
  title: 'CARD/CARD',
  component: CardContent,
  argTypes: {
    variant: {
      options: ['small', 'big'],
      control: { type: 'radio' },
    },
    expirationDate: {
      control: { type: 'object' },
    },
  },
  decorators: [
    (Story) => (
      <CardBox>
        <Story />
      </CardBox>
    ),
  ],
};

export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = (args: CardProps) => <CardContent {...args} />;

Default.args = {
  variant: 'small',
  cardNumber,
  ownerName: 'SoJeong',
  expirationDate,
  cardCompany: '포코',
};
