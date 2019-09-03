import {
  createElement as create,
  useContext,
  useState,
  useEffect,
  FC,
  ReactNode,
} from 'react'
import { css } from 'emotion'
import { Theme } from './Theme'

export interface IInputs {
  Container: FC<{
    children: ReactNode
  }>
  Short: FC<{
    value?: string
    change?: (value: string) => any
  }>
}

export const Inputs: IInputs = {
  Container: ({ children }) => {
    const theme = useContext(Theme)
    return create('div', {
      children,
      className: css({
        all: 'unset',
        display: 'flex',
        borderRadius: theme.global.radius,
        backgroundColor: theme.inputs.background,
        border: theme.inputs.border,
        color: theme.inputs.color,
        '&:hover': {
          boxShadow: '0 1px 5px rgba(0, 0, 0, 0.15)',
        },
      }),
    })
  },
  Short: ({ value = '', change = () => {} }) => {
    const theme = useContext(Theme)
    const [state, changeState] = useState<string>(value)
    useEffect(() => changeState(value), [value])
    useEffect(() => change(state), [state])
    return create(Inputs.Container, {
      children: create('input', {
        value: state,
        onChange: event =>
          state !== event.target.value && changeState(event.target.value),
        className: css({
          all: 'unset',
          padding: '15px',
          display: 'flex',
          flexGrow: 1,
          cursor: 'pointer',
          fontSize: theme.global.fonts,
        }),
      }),
    })
  },
}
