import '@fortawesome/fontawesome-free/css/all.min.css'
import { createElement as create, FC } from 'react'
import { storiesOf } from '@storybook/react'
import { css } from 'emotion'
import {
  Layout,
  IconBar,
  Gadgets,
  Modal,
  InputString,
  Button,
  Poster,
} from '../src/index'

console.clear()

const stories = storiesOf('Modals', module).addDecorator(data => {
  return create('div', {
    children: data(),
    className: css({
      display: 'flex',
      flexGrow: 1,
    }),
  })
})

stories.add('Form', () => {
  return create(Modal, {
    children: create(Layout, {
      grow: true,
      children: [
        create(SimpleIconBar, { key: 'SimpleIconBar' }),
        create(Gadgets, {
          title: 'Users',
          subtitle: 'Window Gadgets',
          children: create(SimpleForm),
        }),
      ],
    }),
  })
})

stories.add('Buttons', () => {
  return create(Modal, {
    children: create(Layout, {
      grow: true,
      children: [
        create(SimpleIconBar, { key: 'SimpleIconBar' }),
        create(Gadgets, {
          key: 'Gadgets',
          title: 'Users',
          subtitle: 'Window Gadgets',
          children: create(SimpleButtons),
        }),
      ],
    }),
  })
})

const SimpleIconBar: FC = () => {
  return create(IconBar, {
    icons: [
      {
        icon: 'home',
        label: 'Home',
        focused: true,
      },
      {
        icon: 'sliders-h',
        label: 'Preferences',
      },
      {
        icon: 'code',
        label: 'Developers',
      },
      {
        icon: 'cog',
        label: 'Settings',
        seperated: true,
      },
      {
        icon: 'user-circle',
        label: 'Account',
      },
    ],
  })
}

const SimpleForm: FC = () => {
  return create(Layout, {
    column: true,
    padding: true,
    divide: true,
    children: [
      create(InputString, {
        key: 'InputString',
        value: 'Hello world!',
      }),
      create(Button, {
        key: 'Button',
        label: 'Submit',
        click: () => console.log('Submit'),
      }),
    ],
  })
}

const SimpleButtons: FC = () => {
  return create(Layout, {
    column: true,
    children: [
      create(Poster, {
        key: 'Poster',
        icon: 'magic',
        label: 'Buttons',
        helper:
          'Lots of pretty buttons and this is a really long sentence to see what it looks like',
      }),
      create(Layout, {
        key: 'Layout',
        column: true,
        padding: true,
        divide: true,
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
            minor: true,
          }),
          create(Button, {
            key: 'Disabled',
            label: 'Disabled',
            click: () => console.log('Disabled'),
            disabled: true,
          }),
        ],
      }),
    ],
  })
}
