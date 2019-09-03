import { createElement as create, FC, useContext, ReactNode } from 'react'
import { css } from 'emotion'
import { Theme } from './Theme'

export const Gadget: FC<{
  children: ReactNode
}> = ({ children }) => {
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
}
