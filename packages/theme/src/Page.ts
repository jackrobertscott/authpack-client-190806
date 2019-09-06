import {
  createElement as create,
  FC,
  ReactNode,
  useState,
  useContext,
} from 'react'
import { css } from 'emotion'
import { Iconbar } from './Iconbar'
import { Sidebar } from './Sidebar'
import { Theme } from './Theme'

export interface IPageSubrouter {
  id?: string
  label: string
  title: string
  children: ReactNode
}

export interface IPageRouter {
  id?: string
  icon: string
  label: string
  options: IPageSubrouter[]
}

export interface IPage {
  Container: FC<{
    children: ReactNode
  }>
  Contents: FC<{
    title: string
    description: string
    children: ReactNode
    button?: {
      icon: string
      label: string
      click: () => void
    }
  }>
  Router: FC<{
    screens: IPageRouter[]
    settings: IPageRouter[]
  }>
}

export const Page: IPage = {
  Container: ({ children }) => {
    return create('div', {
      children,
      className: css({
        all: 'unset',
        display: 'flex',
        justifyContent: 'stretch',
        alignItems: 'stretch',
        position: 'absolute',
        left: 0,
        right: 0,
        top: 0,
        bottom: 0,
      }),
    })
  },
  Contents: ({ title, description, children, button }) => {
    const theme = useContext(Theme)
    return create('div', {
      children: [
        create('div', {
          children: create('div', {
            children: [
              create('div', {
                children: title,
                className: css({
                  fontSize: '25px',
                  color: theme.headers.color,
                }),
              }),
              create('div', {
                children: description,
                className: css({
                  fontSize: '15px',
                  marginTop: '7.5px',
                  color: theme.headers.brand,
                }),
              }),
            ],
            className: css({
              all: 'unset',
              display: 'flex',
              flexDirection: 'column',
            }),
          }),
          className: css({
            all: 'unset',
            display: 'flex',
            padding: '25px',
            background: '#3E3E3E',
          }),
        }),
        create('div', {
          key: 'children',
          children,
          className: css({
            all: 'unset',
            display: 'flex',
            flexDirection: 'column',
            overflow: 'auto',
            flexGrow: 1,
            background: theme.gadgets.background,
            '&::-webkit-scrollbar': {
              width: '20px',
              display: 'initial',
              backgroundColor: 'hsla(0, 0, 0, 0)',
            },
            '&::-webkit-scrollbar-track': {
              backgroundColor: 'hsla(0, 0, 0, 0)',
            },
            '&::-webkit-scrollbar-thumb': {
              cursor: 'pointer',
              transition: '200ms',
              borderRadius: '100px',
              boxShadow: `inset 0 0 0 5px ${theme.gadgets.background}`,
              background: theme.gadgets.scrollbar,
            },
          }),
        }),
      ],
      className: css({
        all: 'unset',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'stretch',
        flexGrow: 1,
      }),
    })
  },
  Router: ({ screens, settings }) => {
    const options = screens.map((screen, i) => ({ id: String(i), ...screen }))
    const [active, changeActive] = useState<IPageRouter>(options[0])
    return create(Page.Container, {
      children: [
        create(Iconbar.Container, {
          key: 'iconbar',
          top: screens.map((screen, i) => {
            return create(Iconbar.Pointer, {
              key: screen.id || String(i),
              label: screen.label,
              children: create(Iconbar.Icon, {
                name: screen.icon,
                click: () => changeActive(screen),
              }),
            })
          }),
          bottom: settings.map((screen, i) => {
            return create(Iconbar.Pointer, {
              key: screen.id || String(i),
              label: screen.label,
              children: create(Iconbar.Icon, {
                name: screen.icon,
                click: () => changeActive(screen),
              }),
            })
          }),
        }),
        create(Sidebar.Container, {
          key: 'sidebar',
          title: 'Accounts',
          children: create(Sidebar.Links, {
            options: [
              {
                label: 'See all accounts',
                click: () => console.log('memes'),
              },
              {
                label: 'See all accounts',
                click: () => console.log('memes'),
              },
              {
                label: 'See all accounts',
                click: () => console.log('memes'),
              },
            ],
          }),
        }),
        active &&
          create((() => active.options[0].children) as FC, {
            key: 'children',
          }),
      ],
    })
  },
}
