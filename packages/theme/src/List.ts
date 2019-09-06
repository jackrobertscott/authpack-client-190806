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
    value: string
  }>
}

export const List: IList = {
  Container: ({ children }) => {
    const theme = useContext(Theme)
    return create('div', {
      children,
      className: css({
        all: 'unset',
        display: 'table',
        borderCollapse: 'collapse',
        width: '100%',
        background: theme.lists.background,
        color: theme.lists.color,
      }),
    })
  },
  Row: ({ children, click }) => {
    const theme = useContext(Theme)
    return create('div', {
      children,
      className: css({
        all: 'unset',
        display: 'table-row',
        transition: '200ms',
        cursor: click && 'pointer',
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
  Cell: ({ icon, label, value }) => {
    const theme = useContext(Theme)
    return create('div', {
      children: create('div', {
        children: [
          create('div', {
            key: 'icon',
            className: `fas far fa-${icon} ${css({
              lineHeight: '1.2em',
              marginRight: '7.5px',
              color: theme.lists.label,
            })}`,
          }),
          create('div', {
            key: 'marker',
            children: [
              create('div', {
                key: 'label',
                children: label,
                className: css({
                  color: theme.lists.label,
                  marginBottom: '3.75px',
                }),
              }),
              create('div', {
                key: 'value',
                children: value,
              }),
            ],
            className: css({
              display: 'flex',
              flexDirection: 'column',
            }),
          }),
        ],
        className: css({
          all: 'unset',
          display: 'flex',
        }),
      }),
      className: css({
        all: 'unset',
        display: 'table-cell',
        padding: '25px',
      }),
    })
  },
}
