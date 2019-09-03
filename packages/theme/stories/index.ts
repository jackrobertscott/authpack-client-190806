import { createElement as create } from 'react'
import { storiesOf } from '@storybook/react'
import { css } from 'emotion'
import { Button, Short, Gadget, Iconbar, Icon } from '../src/index'

const stories = storiesOf('Authenticator', module)

stories
  .addDecorator(data =>
    create('div', {
      children: data(),
      className: css({
        padding: '50px',
        '& > *': {
          marginBottom: '20px',
        },
      }),
    })
  )
  .add('Gadgets', () =>
    create(Gadget, {
      children: create(Iconbar, {
        children: create(Icon, { name: 'home' }),
      }),
    })
  )
  .add('Buttons', () => [
    create(Short, {
      value: 'memes',
    }),
    create(Button, {
      label: 'Hello',
      click: () => console.log(123),
    }),
    create(Button, {
      label: 'Hello',
      click: () => console.log(123),
    }),
  ])
