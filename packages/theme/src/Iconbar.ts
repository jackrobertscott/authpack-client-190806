import { createElement as create, FC, useContext, ReactNode } from 'react'
import { css } from 'emotion'
import { Theme } from './Theme'

export const Iconbar: FC<{
  children: ReactNode
}> = ({ children }) => {
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
}

export const Icon: FC<{
  name: string
}> = ({ name }) => {
  const theme = useContext(Theme)
  return create('div', {
    className: `fas fa-${name} ${css({
      color: theme.iconbar.color,
      fontSize: '25px',
    })}`,
  })
}
