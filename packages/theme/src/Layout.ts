import { createElement as create, FC, ReactNode } from 'react'
import { css } from 'emotion'

export interface ILayout {
  Container: FC<{
    children: ReactNode
  }>
}

export const Layout: ILayout = {
  Container: ({ children }) => {
    return create('div', {
      children,
      className: css({
        all: 'unset',
        display: 'flex',
        alignItems: 'stretch',
        overflow: 'hidden',
        flexGrow: 1,
      }),
    })
  },
}
