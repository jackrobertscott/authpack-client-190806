import { createElement as create, FC, useContext, ReactNode } from 'react'
import { css } from 'emotion'
import { Theme } from './Theme'

export interface ISidebar {
  Container: FC<{
    children: ReactNode
  }>
}

export const Sidebar: ISidebar = {
  Container: ({ children }) => {
    const theme = useContext(Theme)
    return create('div', {
      children,
      className: css({
        all: 'unset',
        width: '340px',
        background: theme.sidebar.background,
      }),
    })
  },
}
