import React from 'react';
import { storiesOf } from '@storybook/react';
import { action } from '@storybook/addon-actions';
import Label from '../src/label/Label';

storiesOf('Label', module)
  .add('with name and backgroundColor', () => (
    <Label key='1' name='Test Label' color='000666'/>
  ))
