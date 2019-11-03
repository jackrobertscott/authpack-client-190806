import { createElement as create, FC, ReactNode } from 'react'
import { css } from 'emotion'
import { useTheme } from '../contexts/Theme'
import { Icon } from './Icon'

export const InputSelectMany: FC<{
  value?: string[]
  change?: (value: string[]) => void
  options?: Array<{
    value: string
    icon?: string
    solid?: boolean
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
  return create(Container, {
    children: create('div', {
      className: css({
        all: 'unset',
        display: 'flex',
        flexDirection: 'column',
        flexGrow: 1,
      }),
      children: options.map(option => {
        return create(Option, {
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
  solid?: boolean
  label: string
  helper?: string
  state?: boolean
  click?: () => void
}> = ({ icon, solid, label, helper, state, click }) => {
  const theme = useTheme()
  return create('div', {
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
      create('div', {
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
        children: create(Icon, {
          icon: state ? 'check' : 'times',
          size: 10,
        }),
      }),
      create('div', {
        key: 'text',
        className: css({
          display: 'flex',
          flexDirection: 'column',
          flexGrow: 1,
          marginLeft: 15,
          marginRight: icon ? 10 : 0,
        }),
        children: [
          create('div', {
            key: 'label',
            children: label,
          }),
          helper &&
            create('div', {
              key: 'helper',
              children: helper,
              className: css({
                marginTop: 5,
                color: theme.input.helper,
              }),
            }),
        ],
      }),
      icon &&
        create(Icon, {
          key: 'icon',
          icon,
          solid,
        }),
    ],
  })
}

export const Container: FC<{
  children: ReactNode
}> = ({ children }) => {
  const theme = useTheme()
  return create('div', {
    children,
    className: css({
      all: 'unset',
      display: 'flex',
      alignItems: 'center',
      transition: '200ms',
      position: 'relative',
      overflow: 'hidden',
      flexGrow: 1,
      fontSize: theme.global.fonts,
      borderRadius: theme.global.radius,
      background: theme.input.background,
      border: theme.input.border,
      color: theme.input.value,
    }),
  })
}
