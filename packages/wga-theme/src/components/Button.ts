import { createElement as create, FC } from 'react'
import { css } from 'emotion'
import { useTheme } from '../hooks/useTheme'
import { Icon } from './Icon'

export const Button: FC<{
  label: string
  click: () => void
  icon?: string
  prefix?: string
  minor?: boolean
  disabled?: boolean
  loading?: boolean
  style?: any
}> = ({ label, click, icon, prefix, minor, disabled, loading, style = {} }) => {
  const theme = useTheme()
  return create('div', {
    onClick: disabled || loading ? () => {} : click,
    className: `${disabled || loading ? 'disabled' : ''} ${css({
      all: 'unset',
      display: 'flex',
      cursor: disabled ? undefined : 'pointer',
      justifyContent: 'space-between',
      alignItems: 'center',
      padding: 15,
      minWidth: 100,
      flexGrow: 1,
      transition: '200ms',
      border: theme.button.border,
      borderRadius: theme.global.radius,
      background:
        disabled || loading
          ? theme.button.backgroundDisabled
          : minor
          ? theme.button.backgroundMinor
          : theme.button.background,
      color:
        disabled || loading ? theme.button.labelDisabled : theme.button.label,
      '&:hover:not(.disabled)': {
        background: theme.button.backgroundHover,
        boxShadow: theme.button.shadow,
        color: theme.button.labelHover,
      },
      '&:active:not(.disabled)': {
        background: theme.button.background,
        boxShadow: 'none',
      },
      ...style,
    })}`,
    children: [
      create('div', {
        key: 'label',
        children: label,
        className: css({
          marginRight: 10,
        }),
      }),
      create(Icon, {
        key: 'icon',
        icon: loading
          ? 'sync-alt'
          : icon
          ? icon
          : disabled
          ? 'times-circle'
          : 'check-circle',
        prefix,
      }),
    ],
  })
}
