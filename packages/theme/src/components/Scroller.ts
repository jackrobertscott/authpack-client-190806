import { createElement as element, ReactNode, FC } from 'react'
import { css } from 'emotion'
import { useTheme } from '../hooks/useTheme'

export const Scroller: FC<{
  children: ReactNode
  disable?: boolean
  maxheight?: number
  always?: boolean
  xaxis?: boolean
  yaxis?: boolean
  bordertop?: boolean
  borderleft?: boolean
}> = ({
  children,
  disable,
  maxheight,
  always,
  xaxis,
  yaxis = true,
  bordertop,
  borderleft,
}) => {
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
      overflowY: !yaxis
        ? 'hidden'
        : always
        ? 'scroll'
        : disable
        ? 'hidden'
        : 'auto',
      overflowX: !xaxis
        ? 'hidden'
        : always
        ? 'scroll'
        : disable
        ? 'hidden'
        : 'auto',
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
        background: theme.scroller.underneath,
        borderLeft: borderleft ? theme.scroller.border : undefined,
        borderTop: bordertop ? theme.scroller.border : undefined,
      },
      '&::-webkit-scrollbar-thumb': {
        cursor: 'pointer',
        transition: '200ms',
        background: theme.scroller.background,
        borderLeft: borderleft ? theme.scroller.border : undefined,
        borderTop: bordertop ? theme.scroller.border : undefined,
      },
      '&::-webkit-scrollbar-thumb:hover': {
        background: theme.scroller.backgroundHover,
      },
      '&::-webkit-scrollbar-corner': {
        background: theme.scroller.underneath,
      },
    }),
  })
}
