import { createElement as create } from 'react'
import { storiesOf } from '@storybook/react'
import { css } from 'emotion'
import { Button } from '../src/index'

console.clear()

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
    create(Button, {
      label: 'Regular',
      click: () => console.log('Regular'),
    }),
    create(Button, {
      label: 'Minor',
      icon: 'bolt',
      solid: true,
      minor: true,
      click: () => console.log('Minor'),
    }),
    create(Button, {
      label: 'Disabled',
      disabled: true,
      click: () => console.log('Disabled'),
    }),
  ]
})
