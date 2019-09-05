import {
  createElement as create,
  FC,
  useContext,
  ReactNode,
  useState,
} from 'react'
import { css } from 'emotion'
import { Theme } from './Theme'
import { Iconbar } from './Iconbar'
import { Header } from './Header'

export interface IGadgetRouter {
  id?: string
  icon: string
  label: string
  children: ReactNode
}

export interface IGadget {
  Container: FC<{
    children: ReactNode
  }>
  Contents: FC<{
    children: ReactNode
    label: string
    brand: string
  }>
  Spacer: FC<{
    children: ReactNode
  }>
  Router: FC<{
    brand: string
    screens: IGadgetRouter[]
    close?: () => void
  }>
}

export const Gadget: IGadget = {
  Container: ({ children }) => {
    const theme = useContext(Theme)
    return create('div', {
      children,
      className: css({
        all: 'unset',
        display: 'flex',
        flexGrow: 1,
        overflow: 'hidden',
        fontSize: theme.global.fonts,
        borderRadius: theme.global.radius,
        background: theme.gadgets.background,
        border: theme.gadgets.border,
      }),
    })
  },
  Contents: ({ children, label, brand }) => {
    const theme = useContext(Theme)
    return create('div', {
      children: create('div', {
        children: [
          create(Header.Container, {
            key: 'header',
            children: [
              create(Header.Label, {
                key: 'label',
                children: label,
              }),
              create(Header.Brand, {
                key: 'brand',
                children: brand,
              }),
            ],
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
          create('a', {
            key: 'brand',
            href: 'https://windowgadgets.io',
            target: '_blank',
            children: `Authenticator\nWindow Gadgets`,
            className: css({
              all: 'unset',
              padding: '25px',
              textAlign: 'right',
              whiteSpace: 'pre',
              cursor: 'pointer',
              transition: '200ms',
              filter: 'contrast(70%)',
              marginLeft: 'auto',
              color: theme.gadgets.background,
              '&:hover': {
                filter: 'contrast(30%)',
              },
            }),
          }),
        ],
        className: css({
          all: 'unset',
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'space-between',
          overflow: 'hidden',
          flexGrow: 1,
        }),
      }),
      className: css({
        all: 'unset',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'flex-start',
        flexGrow: 1,
      }),
    })
  },
  Spacer: ({ children }) => {
    return create('div', {
      children,
      className: css({
        all: 'unset',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'flex-start',
        flexGrow: 1,
        padding: '25px',
        '& > *, & > div': {
          marginBottom: '25px',
          '&:last-child': {
            marginBottom: 0,
          },
        },
      }),
    })
  },
  Router: ({ screens, brand, close }) => {
    const options = screens.map((screen, i) => ({ id: String(i), ...screen }))
    const [active, changeActive] = useState<IGadgetRouter>(options[0])
    return create(Gadget.Container, {
      children: [
        create(Iconbar.Container, {
          key: 'iconbar',
          top: options.map(screen => {
            return create(Iconbar.Pointer, {
              key: screen.id,
              label: screen.label,
              children: create(Iconbar.Icon, {
                name: screen.icon,
                click: () => changeActive(screen),
              }),
            })
          }),
          bottom:
            close &&
            create(Iconbar.Pointer, {
              label: 'Close',
              children: create(Iconbar.Icon, {
                name: 'times-circle',
                click: close,
              }),
            }),
        }),
        create(Gadget.Contents, {
          key: 'contents',
          label: active.label,
          brand,
          children:
            active &&
            create((() => active.children) as FC, {
              key: 'children',
            }),
        }),
      ],
    })
  },
}
