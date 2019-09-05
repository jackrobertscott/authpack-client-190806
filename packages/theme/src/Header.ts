import { createElement as create, FC, useContext, ReactNode } from 'react'
import { css } from 'emotion'
import { Theme } from './Theme'

export interface IHeader {
  Container: FC<{
    children: ReactNode
  }>
  Label: FC<{
    children: string
  }>
  Brand: FC<{
    children: string
  }>
}

export const Header: IHeader = {
  Container: ({ children }) => {
    const theme = useContext(Theme)
    return create('div', {
      children,
      className: css({
        all: 'unset',
        display: 'flex',
        padding: '25px',
        justifyContent: 'space-between',
        background: theme.headers.background,
        color: theme.headers.color,
      }),
    })
  },
  Label: ({ children }) => {
    const theme = useContext(Theme)
    return create('div', {
      children,
      className: css({
        all: 'unset',
        color: theme.headers.color,
      }),
    })
  },
  Brand: ({ children }) => {
    const theme = useContext(Theme)
    return create('div', {
      children,
      className: css({
        all: 'unset',
        color: theme.headers.brand,
      }),
    })
  },
}
