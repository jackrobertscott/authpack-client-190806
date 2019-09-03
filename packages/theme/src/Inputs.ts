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
  String: FC<{
    value?: string
    change?: (value: string) => any
  }>
  Number: FC<{
    value?: number
    change?: (value: number) => any
    decimals?: boolean
  }>
  Icon: FC<{
    name?: string
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
        fontSize: theme.global.fonts,
        border: theme.inputs.border,
        color: theme.inputs.color,
        '&:hover': {
          boxShadow: '0 1px 5px rgba(0, 0, 0, 0.15)',
        },
      }),
    })
  },
  String: ({ value = '', change = () => {} }) => {
    const [state, changeState] = useState<string>(value)
    useEffect(() => changeState(value), [value])
    useEffect(() => change(state), [state])
    return create('input', {
      value: state,
      onChange: event =>
        state !== event.target.value && changeState(event.target.value),
      className: css({
        all: 'unset',
        padding: '15px',
        cursor: 'pointer',
        display: 'flex',
        flexGrow: 1,
      }),
    })
  },
  Number: ({ value = 0, change = () => {}, decimals = true }) => {
    const [state, changeState] = useState<number>(value)
    useEffect(() => changeState(value), [value])
    useEffect(() => change(state), [state])
    return create('input', {
      value: state,
      onChange: event => {
        const parsed = decimals
          ? parseFloat(event.target.value)
          : parseInt(event.target.value)
        if (event.target.value.length === 0) {
          changeState(0)
        } else if (!isNaN(parsed) && parsed !== state) {
          changeState(parsed)
        }
      },
      className: css({
        all: 'unset',
        padding: '15px',
        cursor: 'pointer',
        display: 'flex',
        flexGrow: 1,
      }),
    })
  },
  Icon: ({ name = 'save' }) => {
    return create('div', {
      className: `far fa-${name} ${css({
        textAlign: 'center',
      })}`,
    })
  },
}
