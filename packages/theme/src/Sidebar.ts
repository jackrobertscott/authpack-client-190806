import { createElement as create, FC, useContext, ReactNode } from 'react'
import { css } from 'emotion'
import { Theme } from './Theme'

export interface ISidebar {
  Container: FC<{
    title: ReactNode
    options: Array<{
      id?: string
      label: string
      click: () => void
    }>
  }>
}

export const Sidebar: ISidebar = {
  Container: ({ title, options }) => {
    const theme = useContext(Theme)
    return create('div', {
      children: [
        create('div', {
          key: 'title',
          children: title,
          className: css({
            fontSize: '25px',
            marginBottom: '75px',
            color: theme.sidebar.title,
          }),
        }),
        create('div', {
          key: 'options',
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
            filter: 'contrast(70%)',
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
        width: '240px',
        padding: '25px',
        background: theme.sidebar.background,
        color: theme.sidebar.color,
      }),
    })
  },
}
