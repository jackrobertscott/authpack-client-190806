import { createElement as create, FC, ReactNode } from 'react'
import { css } from 'emotion'

export const Divider: FC<{
  children: ReactNode
}> = ({ children }) => {
  return create('div', {
    children,
    className: css({
      all: 'unset',
      display: 'flex',
      flexDirection: 'column',
      flexGrow: 1,
      padding: 25,
      '& > div:not(:last-child)': {
        marginBottom: 15,
      },
    }),
  })
}
