import { createElement as create, FC, useContext, ReactNode } from 'react'
import { css } from 'emotion'
import { Theme } from './Theme'

export interface IGadget {
  Container: FC<{
    children: ReactNode
  }>
  Contents: FC<{
    children: ReactNode
  }>
  Spacer: FC<{
    children: ReactNode
  }>
}

export const Gadget: IGadget = {
  Container: ({ children }) => {
    const theme = useContext(Theme)
    return create('div', {
      children,
      className: css({
        all: 'unset',
        width: '545px',
        height: '760px',
        display: 'flex',
        fontSize: theme.global.fonts,
        borderRadius: theme.global.radius,
        backgroundColor: theme.gadgets.background,
        border: theme.gadgets.border,
      }),
    })
  },
  Contents: ({ children }) => {
    return create('div', {
      children,
      className: css({
        all: 'unset',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'flex-start',
        flexGrow: 1,
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
        justifyContent: 'flex-start',
        flexGrow: 1,
        padding: '25px',
        '& > *, & > div': {
          marginBottom: '25px',
          '&:last-child': {
            marginBottom: 0,
          },
        },
      }),
    })
  },
}
