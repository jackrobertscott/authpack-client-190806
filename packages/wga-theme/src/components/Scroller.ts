import { createElement as create, ReactNode, FC } from 'react'
import { css } from 'emotion'
import { useTheme } from '../contexts/Theme'

export const Scroller: FC<{
  children: ReactNode
  maxheight?: number
  border?: string
}> = ({ children, maxheight, border }) => {
  const theme = useTheme()
  return create('div', {
    children,
    className: css({
      all: 'unset',
      display: 'flex',
      position: 'relative',
      flexDirection: 'column',
      overflow: 'auto',
      flexGrow: 1,
      maxHeight: maxheight,
      '&::-webkit-scrollbar': {
        width: '25px',
        cursor: 'pointer',
        display: 'initial',
        backgroundColor: 'hsla(0, 0, 0, 0)',
        borderLeft: border,
      },
      '&::-webkit-scrollbar-track': {
        backgroundColor: 'hsla(0, 0, 0, 0)',
      },
      '&::-webkit-scrollbar-thumb': {
        cursor: 'pointer',
        transition: '200ms',
        borderLeft: border,
        background: theme.scroller.background,
      },
      '&::-webkit-scrollbar-thumb:hover': {
        background: theme.scroller.backgroundHover,
      },
    }),
  })
}
