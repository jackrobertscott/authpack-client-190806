import '@fortawesome/fontawesome-free/css/all.min.css'
import faker from 'faker'
import { createElement as create, FC, useState } from 'react'
import { storiesOf } from '@storybook/react'
import { css } from 'emotion'
import {
  IconBar,
  Layout,
  SideBar,
  Page,
  Table,
  SearchBar,
  Root,
} from '../src/index'

console.clear()

const stories = storiesOf('Pages', module).addDecorator(data => {
  return create(Root, {
    theme: 'snow_storm',
    children: create('div', {
      children: data(),
      className: css({
        display: 'flex',
        flexGrow: 1,
      }),
    }),
  })
})

stories.add('Table', () => {
  return create(Layout, {
    grow: true,
    children: [
      create(SimpleIconBar, { key: 'SimpleIconBar' }),
      create(SimpleSidebar, { key: 'SimpleSidebar' }),
      create(SimpleScreen, { key: 'SimpleScreen' }),
    ],
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
        helper: 'Change your settings',
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

const SimpleSidebar: FC = () => {
  return create(SideBar, {
    title: 'Home',
    footer: 'Window Gadgets',
    options: [
      {
        icon: 'user',
        label: 'Users',
        focused: true,
      },
      {
        icon: 'users',
        label: 'Teams',
      },
      {
        icon: 'history',
        label: 'Sessions',
      },
    ],
  })
}

const SimpleScreen: FC = () => {
  return create(Page, {
    title: 'Users',
    subtitle: 'All accounts registered on your app',
    noscroll: create(SimpleSearchBar),
    children: create(SimpleTable),
    corner: {
      icon: 'plus',
      label: 'Create User',
      click: () => console.log('Create'),
    },
  })
}

const SimpleSearchBar: FC = () => {
  const [value, valueChange] = useState<string>('')
  return create(SearchBar, {
    value,
    change: valueChange,
    options: [
      {
        icon: 'stream',
        label: `Showing 50 of 2500`,
      },
      {
        icon: 'angle-double-left',
        label: 'Previous',
        click: () => console.log('Previous'),
        disabled: true,
      },
      {
        icon: 'angle-double-right',
        label: 'Next',
        click: () => console.log('Next'),
      },
    ],
  })
}

const SimpleTable: FC = () => {
  return create(Table, {
    header: [
      {
        icon: 'bars',
        label: 'Name',
        click: () => console.log('Name'),
      },
      {
        icon: 'bars',
        label: 'Email',
        click: () => console.log('Email'),
      },
      {
        icon: 'bars',
        label: 'Username',
        click: () => console.log('Username'),
      },
    ],
    rows: FakeUsers.map(({ id, name, email, username }) => ({
      id,
      click: () => console.log(id),
      cells: [
        { icon: 'user', value: name },
        { icon: 'at', value: email },
        { icon: 'tags', value: username },
      ],
    })),
  })
}

const FakeUsers: Array<{
  id: string
  name: string
  email: string
  username: string
}> = Array.from(Array(15).keys()).map(() => ({
  id: faker.random.uuid(),
  name: faker.name.findName(),
  email: faker.internet.email(),
  username: faker.internet.userName(),
}))
