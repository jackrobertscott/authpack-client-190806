import { createElement as create, FC, useContext, ReactNode } from 'react'
import { css } from 'emotion'
import { Theme } from './Theme'

export interface IIconbar {
  Container: FC<{
    children: ReactNode
  }>
  Divider: FC<{}>
  Icon: FC<{
    name: string
    click?: () => any
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
      }),
    })
  },
  Divider: () => {
    return create('div', {
      className: css({
        height: '25px',
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
        cursor: 'pointer',
        width: '100%',
        color: theme.iconbar.color,
        '&:hover': {
          color: theme.iconbar.colorHover,
        },
      })}`,
    })
  },
}
