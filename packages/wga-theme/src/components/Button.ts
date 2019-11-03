import { createElement as create, FC } from 'react'
import { css } from 'emotion'
import { useTheme, ITheme } from '../contexts/Theme'
import { Icon } from './Icon'

export const Button: FC<{
  label: string
  click: () => void
  icon?: string
  solid?: boolean
  minor?: boolean
  disabled?: boolean
  style?: ITheme['button']
}> = ({ label, click, icon, solid, minor, disabled, style }) => {
  const theme = useTheme({ button: style })
  return create('div', {
    onClick: disabled ? () => {} : click,
    className: `${disabled ? 'disabled' : ''} ${css({
      all: 'unset',
      display: 'flex',
      cursor: disabled ? undefined : 'pointer',
      justifyContent: 'space-between',
      alignItems: 'center',
      padding: 15,
      transition: '200ms',
      fontSize: theme.global.fonts,
      border: theme.button.border,
      borderRadius: theme.global.radius,
      background: disabled
        ? theme.button.backgroundDisabled
        : minor
        ? theme.button.backgroundMinor
        : theme.button.background,
      color: disabled ? theme.button.labelDisabled : theme.button.label,
      '&:hover:not(.disabled)': {
        background: theme.button.backgroundHover,
        boxShadow: theme.button.shadow,
        color: theme.button.labelHover,
      },
      '&:active:not(.disabled)': {
        background: theme.button.background,
        boxShadow: 'none',
      },
    })}`,
    children: [
      create('div', {
        key: 'label',
        children: label,
        className: css({
          marginRight: 15,
        }),
      }),
      create(Icon, {
        key: 'icon',
        icon: icon ? icon : disabled ? 'times-circle' : 'check-circle',
        solid,
      }),
    ],
  })
}
