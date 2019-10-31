import { createElement as create, FC, useState, useEffect } from 'react'
import { css } from 'emotion'
import { Input } from './Input'

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
  return create(Input, {
    disabled,
    children: create('input', {
      value: current,
      type: 'number',
      placeholder,
      onBlur: event =>
        currentChange(String(parseNumber(event.target.value || ''))),
      onChange: event =>
        !disabled && currentChange(String(event.target.value || '')),
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
