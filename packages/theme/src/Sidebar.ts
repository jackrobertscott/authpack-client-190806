import { createElement as create, FC, useContext, ReactNode } from 'react'
import { css } from 'emotion'
import { Theme } from './Theme'

export interface ISidebar {
  Container: FC<{
    children: ReactNode
    title: ReactNode
  }>
  Links: FC<{
    options: Array<{
      id?: string
      label: string
      click: () => void
    }>
  }>
}

export const Sidebar: ISidebar = {
  Container: ({ children, title }) => {
    const theme = useContext(Theme)
    return create('div', {
      children: [
        create('div', {
          key: 'title',
          children: title,
          className: css({
            fontSize: '25px',
            marginBottom: '80px',
            color: theme.sidebar.title,
          }),
        }),
        create((() => children) as FC, {
          key: 'children',
        }),
        create('a', {
          key: 'brand',
          href: 'https://windowgadgets.io',
          target: '_blank',
          children: `Authenticator\nWindow Gadgets`,
          className: css({
            all: 'unset',
            whiteSpace: 'pre',
            cursor: 'pointer',
            transition: '200ms',
            filter: 'contrast(50%)',
            marginTop: 'auto',
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
        alignItems: 'stretch',
        width: '290px',
        padding: '25px',
        background: theme.sidebar.background,
        color: theme.sidebar.color,
      }),
    })
  },
  Links: ({ options }) => {
    const theme = useContext(Theme)
    return create('div', {
      children: options.map(({ id, click, label }, i) => {
        return create('div', {
          key: id || String(i),
          onClick: click,
          children: label,
          className: css({
            all: 'unset',
            cursor: 'pointer',
            transition: '200ms',
            color: theme.sidebar.color,
            '&:hover': {
              color: theme.sidebar.colorHover,
            },
          }),
        })
      }),
      className: css({
        all: 'unset',
        display: 'flex',
        flexDirection: 'column',
        color: theme.sidebar.color,
        '& > *, & > div': {
          marginBottom: '15px',
          '&:last-child': {
            marginBottom: 0,
          },
        },
      }),
    })
  },
}
