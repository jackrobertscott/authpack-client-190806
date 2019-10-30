import { createElement as create, useState } from 'react'
import { storiesOf } from '@storybook/react'
import {
  Button,
  InputCode,
  Modal,
  Gadgets,
  IconBar,
  Layout,
  Divider,
  Snippet,
} from '../src/index'

console.clear()

const stories = storiesOf('Gadgets', module).addDecorator(data => {
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
              seperated: true,
              icon: 'times-circle',
              label: 'Close',
              click: close,
            },
          ],
        }),
        create(Gadgets, {
          key: 'gadgets',
          title: 'Hello',
          subtitle: 'Window Gadgets',
          children: data(),
        }),
      ],
    }),
  })
})

stories.add('Buttons', () => {
  return create(Divider, {
    children: [
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
    ],
  })
})

stories.add('Snippets', () => {
  return create('div', {
    children: [
      create(Snippet, {
        key: 'Snippet',
        icon: 'inbox',
        solid: true,
        label: 'Email',
        value: 'jack@example.com',
        click: () => console.log('Snippet'),
      }),
      create(Snippet, {
        key: 'Snippet2',
        icon: 'inbox',
        solid: true,
        label: 'Email',
        value: 'jack@example.com',
      }),
    ],
  })
})

stories.add('Editor', () => {
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
  return create(Divider, {
    children: create(EditorHandler),
  })
})
