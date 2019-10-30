import { createElement as create } from 'react'
import { storiesOf } from '@storybook/react'
import {
  Button,
  IconBar,
  Layout,
  Page,
  SideBar,
  Divider,
  Table,
} from '../src/index'

console.clear()

const stories = storiesOf('Page', module).addDecorator(data => {
  return create(Layout, {
    children: [
      create(IconBar, {
        key: 'iconBar',
        icons: [
          {
            icon: 'home',
            label: 'Home',
          },
          {
            seperated: true,
            icon: 'times-circle',
            solid: false,
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
          },
          {
            label: 'Sessions',
            icon: 'history',
          },
          {
            label: 'Teams',
            icon: 'users',
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

stories.add('Table', () => {
  return create(Table, {
    header: [
      { label: 'Id', icon: 'chevron-down', click: () => console.log('Id') },
      { label: 'Name' },
      { label: 'Email' },
    ],
    rows: [
      { id: 1, name: 'Jack Scott', email: 'jack@example.com' },
      { id: 2, name: 'Fred Blogs', email: 'fred@example.com' },
      { id: 3, name: 'Sophie Pots', email: 'sophie@example.com' },
    ].map(({ id, name, email }) => ({
      id: String(id),
      click: () => console.log(id),
      cells: [
        { icon: 'hashtag', value: id },
        { icon: 'user', value: name },
        { icon: 'inbox', value: email },
      ],
    })),
  })
})
