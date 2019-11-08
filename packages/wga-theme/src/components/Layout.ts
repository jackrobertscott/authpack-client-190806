import { createElement as create, FC, ReactNode } from 'react'
import { css } from 'emotion'

export const Layout: FC<{
  children: ReactNode
  column?: boolean
  padding?: boolean
  divide?: boolean
  center?: boolean
}> = ({ children, column, padding, divide, center }) => {
  return create('div', {
    children,
    className: css({
      all: 'unset',
      display: 'flex',
      flexDirection: column ? 'column' : 'row',
      justifyContent: center && !column ? 'center' : 'stretch',
      alignItems: center && column ? 'center' : 'stretch',
      position: 'relative',
      overflow: 'hidden',
      flexGrow: 1,
      padding: padding ? 25 : 0,
      '& > div:not(:last-child)': divide && {
        margin: column ? `0 0 15px 0` : `0 15px 0 0`,
      },
    }),
  })
}
