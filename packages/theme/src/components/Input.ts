import {
  createElement as element,
  FC,
  ReactNode,
  useRef,
  useEffect,
} from 'react'
import { useTheme } from '../hooks/useTheme'
import { css } from 'emotion'
import { Icon } from './Icon'
import { ClickOutside } from './ClickOutside'

export const InputContainer: FC<{
  children: ReactNode
  disabled?: boolean
  nofocus?: boolean
}> = ({ children, disabled, nofocus = false }) => {
  const theme = useTheme()
  return element('div', {
    className: css({
      all: 'unset',
      display: 'flex',
      position: 'relative',
      flexGrow: 1,
    }),
    children: element('div', {
      children,
      className: css({
        all: 'unset',
        display: 'flex',
        alignItems: 'center',
        transition: '200ms',
        flexGrow: 1,
        borderRadius: theme.global.radius,
        background: disabled
          ? theme.input.backgroundDisabled
          : theme.input.background,
        border: theme.input.border,
        color: theme.input.value,
        pointerEvents: disabled ? 'none' : 'initial',
        'input::placeholder': {
          color: theme.input.placeholder,
        },
        '&:focus-within': !nofocus && {
          border: theme.input.borderFocused,
          background: theme.input.backgroundHover,
          boxShadow: theme.input.shadow,
          color: theme.input.valueHover,
        },
        [`&:hover${nofocus ? ':not(:focus-within)' : ''}`]: !disabled && {
          background: theme.input.backgroundHover,
          boxShadow: theme.input.shadow,
          color: theme.input.valueHover,
        },
      }),
    }),
  })
}

export const InputPopover: FC<{
  close: () => void
  children: ReactNode
}> = ({ close, children }) => {
  const theme = useTheme()
  const node = useRef()
  useEffect(() => {
    const input: any =
      node.current && (node.current as any).querySelector('input')
    if (input) input.focus()
  }, [])
  return element(ClickOutside, {
    click: close,
    children: element('div', {
      children,
      ref: node,
      className: css({
        all: 'unset',
        display: 'flex',
        flexDirection: 'column',
        position: 'absolute',
        flexGrow: 1,
        left: 0,
        right: 0,
        top: 0,
        zIndex: 100,
        marginBottom: 25,
        overflow: 'hidden',
        borderRadius: theme.global.radius,
        background: theme.input.background,
        boxShadow: theme.input.shadow,
        border: theme.input.borderFocused,
      }),
    }),
  })
}

export const InputOption: FC<{
  icon: string
  prefix?: string
  label: string
  helper?: string
  click: (value: string) => void
  reverse?: boolean
}> = ({ icon, prefix, label, helper, click, reverse }) => {
  const theme = useTheme()
  return element('div', {
    onClick: click,
    className: css({
      all: 'unset',
      display: 'flex',
      flexDirection: reverse ? 'row-reverse' : 'row',
      transition: '200ms',
      cursor: 'pointer',
      padding: 15,
      flexGrow: 1,
      color: theme.input.label,
      '&:not(:last-child)': {
        borderBottom: theme.input.border,
      },
      background: reverse
        ? theme.input.backgroundDisabled
        : theme.input.background,
      '&:hover': {
        background: theme.input.backgroundHover,
      },
    }),
    children: [
      element('div', {
        key: 'text',
        className: css({
          display: 'flex',
          flexDirection: 'column',
          flexGrow: 1,
          marginRight: reverse ? 0 : 10,
          marginLeft: reverse ? 10 : 0,
        }),
        children: [
          element('div', {
            key: 'label',
            children: label,
          }),
          helper &&
            element('div', {
              key: 'helper',
              children: helper,
              className: css({
                marginTop: 5,
                color: theme.input.helper,
                fontWeight: theme.global.thin,
                lineHeight: '1.5em',
              }),
            }),
        ],
      }),
      element(Icon, {
        key: 'icon',
        icon,
        prefix,
        padding: 1,
      }),
    ],
  })
}
