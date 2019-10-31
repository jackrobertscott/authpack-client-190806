import {
  createElement as create,
  FC,
  ReactNode,
  ChangeEvent,
  useState,
  useEffect,
} from 'react'
import { useTheme } from '../contexts/Theme'
import { css } from 'emotion'

export const InputString: FC<{
  value?: string
  change?: (value: string) => void
  placeholder?: string
  disabled?: boolean
  password?: boolean
}> = ({ value = '', change, placeholder, disabled, password }) => {
  return create(Container, {
    disabled,
    children: create('input', {
      value,
      type: password ? 'password' : 'text',
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

export const InputNumber: FC<{
  value?: number
  change?: (value?: number) => void
  placeholder?: string
  disabled?: boolean
  integer?: boolean
}> = ({ value, change, placeholder, disabled, integer }) => {
  const [current, currentChange] = useState<string>(String(value || ''))
  const parseNumber = (target: string) => {
    const data = integer ? parseInt(target, 10) : parseFloat(target)
    return isNaN(data) ? undefined : data
  }
  useEffect(() => currentChange(String(value || '')), [value])
  useEffect(() => {
    const data = parseNumber(current)
    if (change && data) change(data)
    else if (change && !current.trim().length) change(undefined)
  }, [current])
  return create(Container, {
    disabled,
    children: create('input', {
      value: current,
      type: 'number',
      placeholder,
      onBlur: event =>
        currentChange(String(parseNumber(event.target.value || ''))),
      onChange: event => currentChange(String(event.target.value || '')),
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
