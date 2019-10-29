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
  style?: ITheme['buttons']
}> = ({ label, click, icon, solid, minor, disabled, style }) => {
  const theme = useTheme({ buttons: style })
  return create('div', {
    onClick: disabled ? () => {} : click,
    className: `${disabled ? 'disabled' : ''} ${css({
      all: 'unset',
      display: 'flex',
      cursor: disabled ? 'default' : 'pointer',
      justifyContent: 'space-between',
      alignItems: 'center',
      padding: 15,
      flexGrow: 1,
      transition: '200ms',
      fontSize: theme.global.fonts,
      border: theme.buttons.border,
      borderRadius: theme.global.radius,
      background: disabled
        ? theme.buttons.backgroundDisabled
        : minor
        ? theme.buttons.backgroundMinor
        : theme.buttons.background,
      color: disabled ? theme.buttons.labelDisabled : theme.buttons.label,
      '&:hover:not(.disabled)': {
        background: theme.buttons.backgroundHover,
        boxShadow: '0 1px 7.5px rgba(0, 0, 0, 0.05)',
      },
      '&:active:not(.disabled)': {
        background: theme.buttons.background,
        boxShadow: 'none',
      },
    })}`,
    children: [
      create('div', {
        key: 'label',
        children: label,
      }),
      create(Icon, {
        key: 'icon',
        icon: icon ? icon : disabled ? 'times-circle' : 'check-circle',
        solid,
      }),
    ],
  })
}
