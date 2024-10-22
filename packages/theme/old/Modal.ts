import { createElement as create, FC, useContext, ReactNode } from 'react'
import { css } from 'emotion'
import { Theme } from './Theme'

export interface IModal {
  Container: FC<{
    children: ReactNode
    click?: () => void
    visible?: boolean
  }>
}

export const Modal: IModal = {
  Container: ({ children, click, visible = true }) => {
    const theme = useContext(Theme)
    return create('div', {
      onClick: (event: any) =>
        click && event.target === event.currentTarget && click(),
      children: create('div', {
        children,
        className: css({
          all: 'unset',
          display: 'flex',
          overflow: 'hidden',
          position: 'relative',
          fontSize: theme.global.fonts,
          borderRadius: theme.global.radius,
          width: theme.modals.width,
          height: theme.modals.height,
          background: theme.modals.inside,
          boxShadow: theme.modals.shadow,
          border: theme.modals.border,
        }),
      }),
      className: css({
        all: 'unset',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        position: 'absolute',
        left: 0,
        right: 0,
        top: 0,
        bottom: 0,
        zIndex: 1000,
        transition: '200ms',
        pointerEvents: visible ? 'all' : 'none',
        opacity: visible ? 1 : 0,
        background: theme.modals.background,
        [`@media (max-width: ${theme.modals.width}), (max-height: ${theme.modals.height})`]: {
          alignItems: 'stretch',
          '& > *': {
            width: '100%',
            height: 'auto',
            flexGrow: 1,
            borderRadius: 0,
          },
        },
      }),
    })
  },
}
