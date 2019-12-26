import '@fortawesome/fontawesome-free/css/all.min.css'
import faker from 'faker'
import { createElement as element, FC, useState, ReactNode } from 'react'
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
  return element(Root, {
    theme: 'night_sky',
    children: element('div', {
      children: data(),
      className: css({
        display: 'flex',
        flexGrow: 1,
      }),
    }),
  })
})

stories.add('Table', () => {
  return element(Layout, {
    grow: true,
    children: [
      element(SimpleIconBar, {
        children: element(SimpleSidebar, {
          children: element(SimpleScreen),
        }),
      }),
    ],
  })
})

const SimpleIconBar: FC<{ children: ReactNode }> = ({ children }) => {
  return element(IconBar, {
    children,
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

const SimpleSidebar: FC<{ children: ReactNode }> = ({ children }) => {
  return element(SideBar, {
    title: 'Home',
    footer: 'Authpack',
    children,
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
  return element(Page, {
    title: 'Users',
    subtitle: 'All accounts registered on your app',
    noscroll: element(SimpleSearchBar),
    children: element(SimpleTable),
    corner: {
      icon: 'plus',
      label: 'New User',
      click: () => console.log('Create'),
    },
  })
}

const SimpleSearchBar: FC = () => {
  const [value, valueChange] = useState<string>('')
  return element(SearchBar, {
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
  return element(Table, {
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
