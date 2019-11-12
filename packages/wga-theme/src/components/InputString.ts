import { createElement as create, FC } from 'react'
import { css } from 'emotion'
import { InputContainer } from './Input'

export const InputString: FC<{
  value?: string
  change?: (value: string) => void
  placeholder?: string
  disabled?: boolean
  password?: boolean
}> = ({ value, change, placeholder, disabled, password }) => {
  return create(InputContainer, {
    disabled,
    children: create('input', {
      value: value || '',
      type: password ? 'password' : 'text',
      placeholder,
      onChange: event => change && !disabled && change(event.target.value),
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
