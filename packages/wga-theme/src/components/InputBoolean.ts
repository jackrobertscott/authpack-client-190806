import { createElement as create, FC } from 'react'
import { css } from 'emotion'
import { Input } from './Input'
import { Icon } from './Icon'
import { useTheme } from '../contexts/Theme'

export const InputBoolean: FC<{
  value?: boolean
  change?: (value: boolean) => void
  disabled?: boolean
}> = ({ value = false, change, disabled }) => {
  return create('div', {
    onClick: () => change && !disabled && change(!value),
    className: css({
      all: 'unset',
      display: 'flex',
      cursor: 'pointer',
      flexGrow: 1,
      maxWidth: 90,
    }),
    children: create(Input, {
      disabled,
      children: create('div', {
        className: css({
          all: 'unset',
          display: 'flex',
          transition: '200ms',
          justifyContent: 'flex-end',
          flexGrow: value ? 1 : 0,
        }),
        children: create(Knob, {
          value,
        }),
      }),
    }),
  })
}

const Knob: FC<{
  value: boolean
}> = ({ value }) => {
  const theme = useTheme()
  return create('div', {
    className: css({
      all: 'unset',
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'center',
      transition: '200ms',
      width: 28,
      height: 28,
      margin: 10,
      borderRadius: theme.global.radius,
      color: value ? theme.input.valueHover : theme.input.value,
      background: value ? theme.input.on : theme.input.off,
    }),
    children: create(Icon, {
      icon: value ? 'check' : 'times',
    }),
  })
}
