import { createElement as create, FC, useContext, ReactNode } from 'react'
import { css } from 'emotion'
import { Theme } from './Theme'

export interface IList {
  Container: FC<{
    children: ReactNode
  }>
  Row: FC<{
    children: ReactNode
    click?: () => void
  }>
  Cell: FC<{
    icon: string
    label: string
    value?: string
    end?: boolean
  }>
}

export const List: IList = {
  Container: ({ children }) => {
    return create('div', {
      children,
      className: css({
        all: 'unset',
        width: '100%',
      }),
    })
  },
  Row: ({ children, click }) => {
    const theme = useContext(Theme)
    return create('div', {
      children,
      onClick: click,
      className: css({
        all: 'unset',
        display: 'flex',
        transition: '200ms',
        cursor: click && 'pointer',
        color: theme.lists.color,
        background: theme.lists.background,
        borderBottom: theme.lists.border,
        '&:hover:not(:active)': {
          background: click && theme.lists.backgroundHover,
        },
        '&:last-child': {
          borderBottom: 'none',
        },
      }),
    })
  },
  Cell: ({ icon, label, value, end }) => {
    const theme = useContext(Theme)
    return create('div', {
      children: create('div', {
        children: [
          create('div', {
            key: 'label',
            children: [
              create('div', {
                key: 'icon',
                className: `fas far fa-${icon} ${css({
                  lineHeight: '1.5em',
                  marginRight: '7.5px',
                  width: '17.5px',
                  color: theme.lists.label,
                })}`,
              }),
              create('div', {
                key: 'label',
                children: label,
                className: css({
                  color: theme.lists.label,
                  marginBottom: '3.75px',
                }),
              }),
            ],
            className: css({
              display: 'flex',
            }),
          }),
          create('div', {
            key: 'value',
            children: value || '...',
            className: css({
              marginLeft: '25px',
            }),
          }),
        ],
        className: css({
          all: 'unset',
          display: 'flex',
          flexDirection: 'column',
          alignItems: end ? 'flex-end' : 'flex-start',
        }),
      }),
      className: css({
        all: 'unset',
        padding: '25px',
        paddingRight: 0,
        flexGrow: 1,
        flexShrink: 0,
        flexBasis: 0,
        '&:last-child': {
          paddingRight: '25px',
        },
      }),
    })
  },
}
