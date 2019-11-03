import { createElement as create, useState, FC } from 'react'
import { storiesOf } from '@storybook/react'
import {
  Button,
  IconBar,
  Layout,
  Page,
  SideBar,
  Table,
  SearchBar,
  Toaster,
  Empty,
  Theme,
} from '../src/index'
import { useToaster } from '../src/hooks/useToaster'
import { BlueHarvester } from '../src/themes/BlueHarvester'

console.clear()

const stories = storiesOf('Page', module).addDecorator(data => {
  return create(Theme.Provider, {
    value: BlueHarvester,
    children: create(Layout, {
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
        create((() => data()) as FC, {
          key: 'data',
        }),
      ],
    }),
  })
})

stories.add('Buttons', () => {
  return create(Page, {
    key: 'page',
    title: 'Buttons',
    subtitle: 'These are some pretty buttons',
    children: create(Layout, {
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
  })
})

stories.add('Table', () => {
  const Searching = () => {
    const toaster = useToaster()
    const [value, valueChange] = useState<string>('')
    return create(SearchBar, {
      value,
      change: valueChange,
      devmode: true,
      options: [
        {
          icon: 'angle-double-left',
          label: 'Previous',
          click: () =>
            toaster.add({
              label: 'Error',
              helper: 'No previous items available',
            }),
        },
        {
          icon: 'angle-double-right',
          label: 'Next',
          click: () => console.log('Next'),
        },
      ],
    })
  }
  const items = [
    { name: 'Jack Scott', email: 'jack@example.com' },
    { name: 'Fred Blogs', email: 'fred@example.com' },
    { name: 'Sophie Pots', email: 'sophie@example.com' },
  ]
  return create(Page, {
    key: 'page',
    title: 'Users',
    subtitle: 'People who have registered on your app',
    corner: {
      icon: 'plus',
      label: 'Create User',
      click: () => console.log('Corner'),
    },
    noscroll: [
      create(Toaster, {
        key: 'toaster',
      }),
      create(Searching, {
        key: 'searching',
      }),
    ],
    children: [
      create(Table, {
        key: 'table',
        header: [
          { label: 'Id', icon: 'chevron-down', click: () => console.log('Id') },
          { label: 'Name' },
          { label: 'Email' },
        ],
        rows: items
          .concat(items)
          .concat(items)
          .concat(items)
          .map(({ name, email }, index) => ({
            id: String(index),
            click: () => console.log(index),
            cells: [
              { icon: 'hashtag', value: index },
              { icon: 'user-circle', value: name },
              { icon: 'at', value: email },
            ],
          })),
      }),
    ],
  })
})

stories.add('Empty Table', () => {
  const items = [
    { name: 'Jack Scott', email: 'jack@example.com' },
    { name: 'Fred Blogs', email: 'fred@example.com' },
    { name: 'Sophie Pots', email: 'sophie@example.com' },
  ]
  return create(Page, {
    key: 'page',
    title: 'Users',
    subtitle: 'People who have registered on your app',
    corner: {
      icon: 'plus',
      label: 'Create User',
      click: () => console.log('Corner'),
    },
    noscroll: create(Toaster),
    children: [
      create(Empty, {
        icon: 'users',
        label: 'Users',
        helper: 'Create a user manually or by using the Authenticator API',
        children: create(Button, {
          key: 'Regular',
          label: 'See API',
          click: () => console.log('Regular'),
        }),
      }),
      create(Table, {
        key: 'table',
        header: [
          { label: 'Id', icon: 'chevron-down', click: () => console.log('Id') },
          { label: 'Name' },
          { label: 'Email' },
        ],
        rows: items.concat(items).map(({ name, email }, index) => ({
          id: String(index),
          click: () => console.log(index),
          cells: [
            { icon: 'hashtag', value: index },
            { icon: 'user-circle', value: name },
            { icon: 'at', value: email },
          ],
        })),
      }),
    ],
  })
})
