import { createElement as create } from 'react'
import { storiesOf } from '@storybook/react'
import { Button, IconBar, Layout, Page, SideBar, Divider } from '../src/index'

console.clear()

const stories = storiesOf('Page', module).addDecorator(data => {
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
            seperated: true,
            icon: 'times-circle',
            label: 'Close',
            click: close,
          },
        ],
      }),
      create(SideBar, {
        key: 'sideBar',
        title: 'Home',
        footer: 'jack@example.com',
        options: [
          {
            label: 'Users',
            icon: 'user',
            solid: true,
          },
          {
            label: 'Sessions',
            icon: 'history',
            solid: true,
          },
          {
            label: 'Teams',
            icon: 'users',
            solid: true,
          },
        ],
      }),
      create(Page, {
        key: 'page',
        title: 'Users',
        subtitle: 'People who have registered on your app',
        children: data(),
        corner: {
          icon: 'plus',
          label: 'Create User',
          solid: true,
          click: () => console.log('Corner'),
        },
      }),
    ],
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
