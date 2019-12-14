import { createElement as element, FC, ReactNode } from 'react'
import { css } from 'emotion'
import { useTheme } from '../hooks/useTheme'
import { Icon } from './Icon'

export const InputSelectMany: FC<{
  value?: string[]
  change?: (value: string[]) => void
  options?: Array<{
    value: string
    icon?: string
    prefix?: string
    label: string
    helper?: string
  }>
}> = ({ value = [], change, options = [] }) => {
  const toggle = (option: string) => {
    if (change) {
      const update = value.includes(option)
        ? value.filter(a => option !== a)
        : [...value, option]
      change(update)
    }
  }
  return element(Container, {
    children: element('div', {
      className: css({
        all: 'unset',
        display: 'flex',
        flexDirection: 'column',
        flexGrow: 1,
      }),
      children: options.map(option => {
        return element(Option, {
          key: option.value,
          click: () => toggle(option.value),
          state: value.includes(option.value),
          ...option,
        })
      }),
    }),
  })
}

const Option: FC<{
  icon?: string
  prefix?: string
  label: string
  helper?: string
  state?: boolean
  click?: () => void
}> = ({ icon, prefix, label, helper, state, click }) => {
  const theme = useTheme()
  return element('div', {
    key: label,
    onClick: click,
    className: css({
      all: 'unset',
      display: 'flex',
      alignItems: 'flex-start',
      transition: '200ms',
      cursor: 'pointer',
      padding: 15,
      flexGrow: 1,
      '&:hover, &:focus-within': {
        background: theme.input.backgroundHover,
        color: theme.input.valueHover,
      },
      '&:not(:last-child)': {
        borderBottom: theme.input.border,
      },
    }),
    children: [
      element('div', {
        key: 'toggle',
        className: css({
          all: 'unset',
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
          transition: '200ms',
          width: 18,
          height: 18,
          borderRadius: theme.global.radius,
          color: state ? theme.input.valueHover : theme.input.value,
          background: state ? theme.input.on : theme.input.off,
        }),
        children: element(Icon, {
          icon: state ? 'check' : 'times',
          size: 10,
        }),
      }),
      element('div', {
        key: 'text',
        className: css({
          display: 'flex',
          flexDirection: 'column',
          flexGrow: 1,
          marginLeft: 10,
          marginRight: icon ? 10 : 0,
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
                fontWeight: theme.global.thin,
                color: theme.input.helper,
              }),
            }),
        ],
      }),
      icon &&
        element(Icon, {
          key: 'icon',
          icon,
          prefix,
        }),
    ],
  })
}

export const Container: FC<{
  children: ReactNode
}> = ({ children }) => {
  const theme = useTheme()
  return element('div', {
    children,
    className: css({
      all: 'unset',
      display: 'flex',
      alignItems: 'center',
      transition: '200ms',
      position: 'relative',
      overflow: 'hidden',
      flexGrow: 1,
      borderRadius: theme.global.radius,
      background: theme.input.background,
      border: theme.input.border,
      color: theme.input.value,
    }),
  })
}
