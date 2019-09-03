import {
  createElement as create,
  useContext,
  useState,
  useEffect,
  FC,
} from 'react'
import { css } from 'emotion'
import { Theme } from './Theme'

export const Short: FC<{
  value?: string
  change?: (value: string) => any
}> = ({ value = '', change = () => {} }) => {
  const theme = useContext(Theme)
  const [state, changeState] = useState<string>(value)
  useEffect(() => changeState(value), [value])
  useEffect(() => change(state), [state])
  return create('input', {
    value: state,
    onChange: event =>
      state !== event.target.value && changeState(event.target.value),
    className: css({
      all: 'unset',
      cursor: 'pointer',
      padding: '15px',
      fontSize: theme.global.fonts,
      borderRadius: theme.global.radius,
      backgroundColor: theme.inputs.background,
      border: theme.inputs.border,
      color: theme.inputs.color,
      '&:hover': {
        boxShadow: '0 1px 5px rgba(0, 0, 0, 0.15)',
      },
    }),
  })
}
