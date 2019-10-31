import { createElement as create, FC, ReactNode } from 'react'
import { useTheme } from '../contexts/Theme'
import { css } from 'emotion'

export const Input: FC<{
  children: ReactNode
  disabled?: boolean
}> = ({ children, disabled }) => {
  const theme = useTheme()
  return create('div', {
    children,
    className: css({
      all: 'unset',
      display: 'flex',
      alignItems: 'center',
      transition: '200ms',
      position: 'relative',
      flexGrow: 1,
      fontSize: theme.global.fonts,
      borderRadius: theme.global.radius,
      background: disabled
        ? theme.input.backgroundDisabled
        : theme.input.background,
      border: theme.input.border,
      color: theme.input.value,
      '&:hover, &:focus-within': !disabled && {
        background: theme.input.backgroundHover,
        boxShadow: theme.input.shadow,
        color: theme.input.valueHover,
      },
    }),
  })
}
