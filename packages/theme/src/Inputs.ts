import {
  createElement as create,
  useContext,
  useState,
  useEffect,
  FC,
  ReactNode,
  ChangeEvent,
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
    placeholder?: string
  }>
  Number: FC<{
    value?: number
    change?: (value: number) => any
    placeholder?: string | number
    decimals?: boolean
  }>
  Icon: FC<{
    name?: string
  }>
  Label: FC<{
    name?: string
    description?: string
    children?: ReactNode
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
        transition: '200ms',
        borderRadius: theme.global.radius,
        backgroundColor: theme.inputs.background,
        fontSize: theme.global.fonts,
        border: theme.inputs.border,
        color: theme.inputs.color,
        '&:hover, &:focus-within': {
          backgroundColor: theme.inputs.backgroundHover,
        },
      }),
    })
  },
  String: ({ value = '', change = () => {}, placeholder }) => {
    const [state, changeState] = useState<string>(value)
    useEffect(() => changeState(value), [value])
    useEffect(() => change(state), [state])
    return create('input', {
      value: state,
      onChange: event =>
        state !== event.target.value && changeState(event.target.value),
      placeholder,
      className: css({
        all: 'unset',
        padding: '15px',
        cursor: 'pointer',
        display: 'flex',
        flexGrow: 1,
      }),
    })
  },
  Number: ({ value = '', change = () => {}, placeholder, decimals = true }) => {
    const [state, changeState] = useState<string>(String(value))
    useEffect(() => changeState(String(value)), [value])
    useEffect(() => change(decimals ? parseFloat(state) : parseInt(state)), [
      state,
    ])
    return create('input', {
      value: state,
      onChange: (event: ChangeEvent<HTMLInputElement>) => {
        if (event.target.value.length === 0) {
          changeState('')
        } else {
          const value = event.target.value
          const parsed = decimals ? parseFloat(value) : parseInt(value)
          console.log(parsed, !isNaN(parsed))
          if (!isNaN(parsed) && value !== state) {
            const update = `${parsed}${
              decimals && value.endsWith('.') ? '.' : ''
            }`
            changeState(update)
          }
        }
      },
      placeholder,
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
  Label: ({ name, description, children }) => {
    const theme = useContext(Theme)
    return create('div', {
      children: [
        name &&
          create('div', {
            key: 'name',
            children: name,
            className: css({
              color: theme.inputs.colorPrimary,
            }),
          }),
        description &&
          create('div', {
            key: 'description',
            children: description,
            className: css({
              color: theme.inputs.colorSecondary,
            }),
          }),
        children,
      ],
      className: css({
        all: 'unset',
        display: 'flex',
        flexDirection: 'column',
        '& > *, & > div': {
          marginBottom: '7px',
          '&:last-child': {
            marginBottom: 0,
          },
        },
      }),
    })
  },
}
