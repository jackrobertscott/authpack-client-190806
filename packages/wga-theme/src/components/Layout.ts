import { createElement as create, FC, ReactNode } from 'react'
import { css } from 'emotion'

export const Layout: FC<{
  children: ReactNode
  column?: boolean
  padding?: boolean
  divide?: boolean
}> = ({ children, column, padding, divide }) => {
  return create('div', {
    children,
    className: css({
      all: 'unset',
      display: 'flex',
      flexDirection: column ? 'column' : 'row',
      justifyContent: 'stretch',
      alignItems: 'stretch',
      overflow: 'hidden',
      flexGrow: 1,
      padding: padding ? 25 : 0,
      '& > div:not(:last-child)': divide && {
        margin: column ? `0 0 15px 0` : `0 15px 0 0`,
      },
    }),
  })
}
