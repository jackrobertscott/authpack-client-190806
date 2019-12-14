import { createElement as element, ReactNode, FC } from 'react'
import { css } from 'emotion'
import { useTheme } from '../hooks/useTheme'

export const Scroller: FC<{
  children: ReactNode
  disable?: boolean
  maxheight?: number
  always?: boolean
}> = ({ children, disable, maxheight, always }) => {
  const theme = useTheme()
  return element('div', {
    children: element('div', {
      children,
      className: css({
        all: 'unset',
        display: 'flex',
        flexDirection: 'column',
        flexGrow: 1,
        flexShrink: 0,
      }),
    }),
    className: css({
      all: 'unset',
      display: 'flex',
      position: 'relative',
      flexDirection: 'column',
      overflowY: always ? 'scroll' : disable ? 'hidden' : 'auto',
      overflowX: 'hidden',
      flexGrow: 1,
      maxHeight: maxheight,
      '&::-webkit-scrollbar': {
        width: '25px',
        cursor: 'pointer',
        display: 'initial',
        backgroundColor: 'hsla(0, 0, 0, 0)',
      },
      '&::-webkit-scrollbar-track': {
        backgroundColor: 'hsla(0, 0, 0, 0)',
        borderLeft: theme.scroller.border,
        background: theme.scroller.underneath,
      },
      '&::-webkit-scrollbar-thumb': {
        cursor: 'pointer',
        transition: '200ms',
        borderLeft: theme.scroller.border,
        background: theme.scroller.background,
      },
      '&::-webkit-scrollbar-thumb:hover': {
        background: theme.scroller.backgroundHover,
      },
    }),
  })
}
