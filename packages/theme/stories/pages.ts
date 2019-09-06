import { createElement as create } from 'react'
import { storiesOf } from '@storybook/react'
import { css } from 'emotion'
import { Page, Search, List } from '../src/index'

console.clear()

const stories = storiesOf('Pages', module).addDecorator(data => {
  return create('div', {
    children: data(),
    className: css({
      /* styles */
    }),
  })
})

stories.add('Search', () => {
  return create(Search.Container, {
    children: [
      create(Search.Input, {
        key: 'search',
        icon: 'search',
        change: console.log,
        placeholder: 'Search...',
      }),
      create(Search.Group, {
        key: 'results',
        icon: 'stream',
        label: '25 of 1,543 Results',
        click: () => console.log('results'),
      }),
      create(Search.Group, {
        key: 'previous',
        icon: 'angle-double-left',
        label: 'Previous',
        click: () => console.log('prev'),
      }),
      create(Search.Group, {
        key: 'next',
        icon: 'angle-double-right',
        label: 'Next',
        click: () => console.log('next'),
      }),
    ],
  })
})

stories.add('List', () => {
  const items = ['bell', 'bolt', 'carrot', 'cat']
  return create(List.Container, {
    children: items.map(row =>
      create(List.Row, {
        key: row,
        click: () => console.log(row),
        children: items.map(icon =>
          create(List.Cell, {
            key: icon,
            icon,
            label: 'Hello',
            value: '12345',
          })
        ),
      })
    ),
  })
})

const UserPage = () => {
  return create(Page.Contents, {
    key: 'contents',
    title: 'Accounts',
    description: 'Hello world',
    children: '',
  })
}

stories.add('Users', () => {
  return create(Page.Router, {
    screens: [
      {
        icon: 'users',
        label: 'Accounts',
        options: [
          {
            label: 'See all accounts',
            title: 'All Accounts',
            children: create(UserPage),
          },
        ],
      },
      {
        icon: 'project-diagram',
        label: 'Groups',
        options: [],
      },
      {
        icon: 'check-double',
        label: 'Reports',
        options: [],
      },
    ],
    settings: [
      {
        icon: 'code',
        label: 'Developer Mode',
        options: [],
      },
      {
        icon: 'cog',
        label: 'Settings',
        options: [],
      },
      {
        icon: 'bars',
        label: 'Workspace',
        options: [],
      },
      {
        icon: 'user-circle',
        label: 'Profile',
        options: [],
      },
    ],
  })
})
