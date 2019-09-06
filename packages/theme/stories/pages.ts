import { createElement as create } from 'react'
import { storiesOf } from '@storybook/react'
import { css } from 'emotion'
import { Page } from '../src/index'

console.clear()

const stories = storiesOf('Pages', module).addDecorator(data => {
  return create('div', {
    children: data(),
    className: css({
      /* styles */
    }),
  })
})

const UserPage = () => {
  return create(Page.Contents, {
    key: 'contents',
    title: 'Accounts',
    description: 'Hello world',
    children: 'blah',
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
