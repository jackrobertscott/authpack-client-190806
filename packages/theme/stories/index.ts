import { createElement as create } from 'react'
import { storiesOf } from '@storybook/react'
import { css } from 'emotion'
import { Button, Inputs, Gadget, Iconbar, Pointer } from '../src/index'

const stories = storiesOf('Authenticator', module)

stories
  .addDecorator(data =>
    create('div', {
      children: data(),
      className: css({
        padding: '50px',
        '& > *, & > div': {
          marginBottom: '20px',
        },
      }),
    })
  )
  .add('Gadgets', () =>
    create(Gadget.Container, {
      children: create(Iconbar.Container, {
        children: [
          create(Iconbar.Icon, {
            name: 'home',
            click: () => console.log('hello'),
          }),
          create(Iconbar.Divider),
          create(Pointer.Container, {
            contents: 'Hello world!',
            children: create(Iconbar.Icon, {
              name: 'bolt',
            }),
          }),
          create(Iconbar.Divider),
          create(Iconbar.Icon, {
            name: 'broom',
          }),
        ],
      }),
    })
  )
  .add('Buttons', () => [
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
  ])
