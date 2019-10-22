import { createElement as create, FC, ReactNode, useContext } from 'react'
import { css } from 'emotion'
import { Theme } from './Theme'

export interface ILayout {
  Container: FC<{
    children: ReactNode
  }>
}

export const Layout: ILayout = {
  Container: ({ children }) => {
    const theme = useContext(Theme)
    return create('div', {
      children,
      className: css({
        all: 'unset',
        display: 'flex',
        justifyContent: 'stretch',
        alignItems: 'stretch',
        overflow: 'hidden',
        position: 'absolute',
        left: 0,
        right: 0,
        top: 0,
        bottom: 0,
        flexGrow: 1,
      }),
    })
  },
}
