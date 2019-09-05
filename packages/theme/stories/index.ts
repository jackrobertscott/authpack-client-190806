import { createElement as create } from 'react'
import { storiesOf } from '@storybook/react'
import { css } from 'emotion'
import { Button, Inputs, Gadget } from '../src/index'

const stories = storiesOf('Components', module).addDecorator(data => {
  return create('div', {
    children: data(),
    className: css({
      padding: '50px',
      '& > *, & > div': {
        marginBottom: '20px',
      },
    }),
  })
})

stories.add('Buttons', () => {
  return [
    create(Inputs.Container, {
      children: create(Inputs.String, {
        value: 'memes',
      }),
    }),
    create(Inputs.Container, {
      children: create(Inputs.Number, {
        value: 3,
      }),
    }),
    create(Button.Container, {
      label: 'Hello',
      click: () => console.log(123),
    }),
    create(Button.Container, {
      label: 'Hello',
      click: () => console.log(123),
    }),
  ]
})
