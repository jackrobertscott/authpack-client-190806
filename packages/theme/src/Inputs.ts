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
    change?: (value: string) => void
    placeholder?: string
  }>
  Number: FC<{
    value?: number
    change?: (value: number) => void
    placeholder?: string | number
    decimals?: boolean
  }>
  Icon: FC<{
    name?: string
  }>
  Control: FC<{
    label?: string
    description?: string
    value?: any
    change?: (data: any) => Promise<any>
    input: FC<{
      key: string
      change: (data: any) => void
    }>
  }>
  Pointer: FC<{
    children: ReactNode
    label: string
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
        alignItems: 'center',
        transition: '200ms',
        cursor: 'pointer',
        borderRadius: theme.global.radius,
        background: theme.inputs.background,
        fontSize: theme.global.fonts,
        border: theme.inputs.border,
        color: theme.inputs.color,
        '&:hover, &:focus-within': {
          background: theme.inputs.backgroundHover,
          boxShadow: '0 1px 7.5px rgba(0, 0, 0, 0.15)',
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
  Number: ({
    value = '',
    change = () => {},
    placeholder,
    decimals = false,
  }) => {
    const [state, changeState] = useState<string>(String(value))
    useEffect(() => changeState(String(value)), [value])
    useEffect(
      () => change(decimals ? parseFloat(state) : parseInt(state, 10)),
      [state]
    )
    return create('input', {
      value: state,
      onChange: (event: ChangeEvent<HTMLInputElement>) => {
        if (event.target.value.length === 0) {
          changeState('')
        } else {
          const input = event.target.value
          const parsed = decimals ? parseFloat(input) : parseInt(input, 10)
          if (!isNaN(parsed) && input !== state) {
            const update = `${parsed}${
              decimals && input.endsWith('.') ? '.' : ''
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
    const theme = useContext(Theme)
    return create('div', {
      className: `far fa-${name} ${css({
        textAlign: 'center',
        lineHeight: '1.5em',
        padding: '15px',
        color: theme.inputs.error,
      })}`,
    })
  },
  Control: ({ label, description, change, input }) => {
    const theme = useContext(Theme)
    const [error, changeError] = useState<Error | undefined>()
    return create('div', {
      children: [
        label &&
          create('div', {
            key: 'name',
            children: label,
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
        (label || description) &&
          create('div', {
            key: 'spacer',
            className: css({
              height: '3.725px',
            }),
          }),
        create(Inputs.Container, {
          key: 'container',
          children: [
            input({
              key: 'input',
              change: data => {
                if (change)
                  change(data)
                    .then(() => changeError(undefined))
                    .catch(changeError)
              },
            }),
            error &&
              create(Inputs.Pointer, {
                key: 'icon',
                label: error.message,
                children: create(Inputs.Icon, {
                  name: 'bell',
                }),
              }),
          ],
        }),
      ],
      className: css({
        all: 'unset',
        display: 'flex',
        flexDirection: 'column',
      }),
    })
  },
  Pointer: ({ children, label }) => {
    const theme = useContext(Theme)
    return create('div', {
      children: [
        create((() => children) as FC, {
          key: 'children',
        }),
        create('div', {
          key: 'pointer',
          children: create('div', {
            children: label,
            className: css({
              all: 'unset',
              display: 'flex',
              padding: '15px',
              fontSize: theme.global.fonts,
              borderRadius: theme.global.radius,
              background: theme.pointers.background,
              border: theme.pointers.border,
              color: theme.pointers.color,
              boxShadow: '0 1px 5px rgba(0, 0, 0, 0.15)',
            }),
          }),
          className: `toggle-pointer ${css({
            all: 'unset',
            width: '300px',
            position: 'absolute',
            right: '10px',
            bottom: '100%',
            marginBottom: '-10px',
            display: 'none',
            justifyContent: 'flex-end',
            '&:hover': {
              display: 'flex',
            },
          })}`,
        }),
      ],
      className: css({
        all: 'unset',
        display: 'flex',
        position: 'relative',
        '&:hover .toggle-pointer': {
          display: 'flex',
        },
      }),
    })
  },
}
