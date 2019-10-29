import { createElement as create, useState, FC } from 'react'
import { storiesOf } from '@storybook/react'
import { css } from 'emotion'
import {
  Button,
  InputCode,
  Modal,
  Gadgets,
  IconBar,
  Layout,
} from '../src/index'

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
      key: 'Regular',
      label: 'Regular',
      click: () => console.log('Regular'),
    }),
    create(Button, {
      key: 'Minor',
      label: 'Minor',
      click: () => console.log('Minor'),
      icon: 'bolt',
      solid: true,
      minor: true,
    }),
    create(Button, {
      key: 'Disabled',
      label: 'Disabled',
      click: () => console.log('Disabled'),
      disabled: true,
    }),
  ]
})

const examples = {
  email: 'fred@example.com',
  username: 'Fred',
  age: 32,
  fruits: ['banana', 'apple', 'blue berry'],
}
const code = JSON.stringify(examples, null, 2)
const EditorHandler = () => {
  const [value, valueChange] = useState<string>(code)
  return create(InputCode, {
    value,
    language: 'json',
    change: valueChange,
  })
}
stories.add('Editor', () => {
  return create(EditorHandler)
})

stories.add('Modal', () => {
  return create(Modal, {
    children: create(Layout, {
      children: [
        create(IconBar, {
          key: 'iconBar',
          icons: [
            {
              icon: 'home',
              solid: true,
              label: 'Home',
            },
            {
              icon: 'cog',
              solid: true,
              label: 'Settings',
            },
          ],
        }),
        create(Gadgets, {
          key: 'gadgets',
          title: 'Hello',
          subtitle: 'Window Gadgets',
          children: 'Hello world!',
        }),
      ],
    }),
  })
})
