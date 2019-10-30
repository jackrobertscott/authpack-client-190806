import '@fortawesome/fontawesome-free/css/all.min.css'
import { createElement as create, useState } from 'react'
import { storiesOf } from '@storybook/react'
import { css } from 'emotion'
import { Button, InputCode, Modal, IconBar, Page, Layout } from '../src/index'

console.clear()

const stories = storiesOf('Components', module).addDecorator(data => {
  return create('div', {
    children: data(),
    className: css({
      display: 'flex',
      flexDirection: 'column',
      flexGrow: 1,
      padding: 50,
      '& > div': {
        marginBottom: 25,
        '&:last-child': {
          marginBottom: 0,
        },
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
  return create(EditorHandler)
})

stories.add('IconBar', () => {
  return create(Layout, {
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
            options: [
              {
                label: 'User',
                helper: 'Update your personal settings',
                icon: 'user',
                solid: true,
              },
            ],
          },
          {
            icon: 'times-circle',
            label: 'Close',
            seperated: true,
            click: close,
          },
        ],
      }),
    ],
  })
})

stories.add('Modal', () => {
  return create(Modal, {
    children: null,
  })
})

stories.add('Page', () => {
  return create(Page, {
    title: 'Users',
    subtitle: 'People who have registered on your app',
    children: null,
    corner: {
      icon: 'plus',
      label: 'Create User',
      solid: true,
      click: () => console.log('corner'),
    },
  })
})
