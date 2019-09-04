import { createElement as create, FC, useContext, ReactNode } from 'react'
import { css } from 'emotion'
import { Theme } from './Theme'

export interface IIconbar {
  Container: FC<{
    children: ReactNode
  }>
  Icon: FC<{
    name: string
    click?: () => any
  }>
  Pointer: FC<{
    children: ReactNode
    label: string
  }>
}

export const Iconbar: IIconbar = {
  Container: ({ children }) => {
    const theme = useContext(Theme)
    return create('div', {
      children,
      className: css({
        all: 'unset',
        display: 'flex',
        flexDirection: 'column',
        padding: '25px',
        backgroundColor: theme.iconbar.background,
        '& > *, & > div': {
          marginBottom: '25px',
          '&:last-child': {
            marginBottom: 0,
          },
        },
      }),
    })
  },
  Icon: ({ name, click }) => {
    const theme = useContext(Theme)
    return create('div', {
      onClick: click,
      className: `fas fa-${name} ${css({
        fontSize: '25px',
        transition: '200ms',
        textAlign: 'center',
        lineHeight: '1.2em',
        cursor: 'pointer',
        width: '100%',
        color: theme.iconbar.color,
        '&:hover': {
          color: theme.iconbar.colorHover,
        },
      })}`,
    })
  },
  Pointer: ({ children, label }) => {
    const theme = useContext(Theme)
    return create('div', {
      children: [
        children,
        create('div', {
          children: create('div', {
            children: label,
            className: css({
              all: 'unset',
              display: 'flex',
              padding: '15px',
              fontSize: theme.global.fonts,
              borderRadius: theme.global.radius,
              backgroundColor: theme.pointers.background,
              border: theme.pointers.border,
              color: theme.pointers.color,
              boxShadow: '0 1px 5px rgba(0, 0, 0, 0.15)',
            }),
          }),
          className: `toggle-pointer ${css({
            all: 'unset',
            width: '300px',
            position: 'absolute',
            left: '100%',
            top: '-12.5px',
            marginLeft: '10px',
            display: 'none',
            '&:hover': {
              display: 'flex',
            },
          })}`,
        }),
      ],
      className: css({
        all: 'unset',
        display: 'flex',
        position: 'relative',
        '&:hover .toggle-pointer': {
          display: 'flex',
        },
      }),
    })
  },
}
