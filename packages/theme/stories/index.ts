import { createElement as create } from 'react'
import { storiesOf } from '@storybook/react'
import { css } from 'emotion'
import { Button } from '../src/Button'

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
  .add('Buttons', () => [
    create(Button, {
      label: 'Hello',
      click: () => console.log(123),
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
