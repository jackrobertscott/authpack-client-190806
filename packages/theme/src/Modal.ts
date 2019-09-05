import { createElement as create, FC, useContext, ReactNode } from 'react'
import { css } from 'emotion'
import { Theme } from './Theme'

export interface IModal {
  Container: FC<{
    children: ReactNode
  }>
}

export const Modal: IModal = {
  Container: ({ children }) => {
    const theme = useContext(Theme)
    return create('div', {
      children: create('div', {
        children,
        className: css({
          all: 'unset',
          height: theme.modals.height,
          width: theme.modals.width,
          display: 'flex',
        }),
      }),
      className: css({
        all: 'unset',
        background: theme.modals.background,
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        position: 'absolute',
        left: 0,
        right: 0,
        top: 0,
        bottom: 0,
      }),
    })
  },
}
