import { createElement as create, FC, useContext, ReactNode } from 'react'
import { css } from 'emotion'
import { Theme } from './Theme'

export interface IIconbar {
  Container: FC<{
    top: ReactNode
    bottom?: ReactNode
  }>
  Spacer: FC<{
    children: ReactNode
  }>
  Icon: FC<{
    name: string
    click?: () => void
  }>
  Pointer: FC<{
    children: ReactNode
    label: string
  }>
}

export const Iconbar: IIconbar = {
  Container: ({ top, bottom }) => {
    const theme = useContext(Theme)
    return create('div', {
      children: [
        create(Iconbar.Spacer, {
          key: 'top',
          children: top,
        }),
        bottom &&
          create(Iconbar.Spacer, {
            key: 'bottom',
            children: bottom,
          }),
      ],
      className: css({
        all: 'unset',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'space-between',
        padding: '25px',
        background: theme.iconbar.background,
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
        alignItems: 'center',
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
      className: `fas far fa-${name} ${css({
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
        create((() => children) as FC, {
          key: 'children',
        }),
        create('div', {
          key: 'pointer',
          children: create('div', {
            children: label,
            className: css({
              all: 'unset',
              display: 'flex',
              padding: '15px',
              fontSize: theme.global.fonts,
              borderRadius: theme.global.radius,
              background: theme.pointers.background,
              border: theme.pointers.border,
              color: theme.pointers.color,
              boxShadow: '0 1px 5px rgba(0, 0, 0, 0.15)',
            }),
          }),
          className: `toggle-pointer ${css({
            all: 'unset',
            width: '300px',
            position: 'absolute',
            zIndex: 100,
            left: '100%',
            top: '-10px',
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
