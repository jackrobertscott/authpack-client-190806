import { createElement as create, FC, ReactNode } from 'react'
import { css } from 'emotion'

export const Layout: FC<{
  children: ReactNode
  column?: boolean
  padding?: boolean
  divide?: boolean
  center?: boolean
  grow?: boolean
  hide?: boolean
  media?: boolean
  breakpoint?: number
}> = ({
  children,
  column,
  padding,
  divide,
  center,
  grow,
  hide,
  media,
  breakpoint = 810,
}) => {
  return create('div', {
    children,
    className: css({
      all: 'unset',
      display: 'flex',
      flexDirection: column ? 'column' : 'row',
      justifyContent: center && !column ? 'center' : 'stretch',
      alignItems: center && column ? 'center' : 'stretch',
      position: 'relative',
      overflow: hide ? 'hidden' : 'visible',
      flexGrow: grow ? 1 : 0,
      padding: padding ? '20px 25px' : 0,
      '& > div:not(:last-child)': divide && {
        margin: column ? `0 0 20px 0` : `0 20px 0 0`,
      },
      [`@media (max-width: ${breakpoint + 50}px)`]: media && {
        flexDirection: 'column',
        justifyContent: 'stretch',
        alignItems: center ? 'center' : 'stretch',
        '& > div:not(:last-child)': divide && {
          margin: `0 0 20px 0`,
        },
      },
    }),
  })
}
