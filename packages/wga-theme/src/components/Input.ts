import { createElement as create, FC, ReactNode } from 'react'
import { useTheme } from '../contexts/Theme'
import { css } from 'emotion'

export const InputString: FC<{
  value?: string
  change?: (value: string) => void
  placeholder?: string
  disabled?: boolean
}> = ({ value = '', change, placeholder, disabled }) => {
  return create(Container, {
    disabled,
    children: create('input', {
      value,
      placeholder,
      onChange: event => change && change(event.target.value),
      className: css({
        all: 'unset',
        display: 'flex',
        cursor: 'pointer',
        flexGrow: 1,
        padding: 15,
      }),
    }),
  })
}

const Container: FC<{
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
