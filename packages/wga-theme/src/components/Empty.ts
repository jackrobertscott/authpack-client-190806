import { createElement as create, FC, ReactNode } from 'react'
import { useTheme } from '../contexts/Theme'
import { css } from 'emotion'
import { Icon } from './Icon'

export const Empty: FC<{
  icon: string
  solid?: boolean
  label: string
  helper?: string
  children?: ReactNode
}> = ({ icon, solid, label, helper, children }) => {
  const theme = useTheme()
  return create('div', {
    className: css({
      all: 'unset',
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'center',
      position: 'absolute',
      left: 0,
      right: 0,
      top: 0,
      bottom: 0,
      zIndex: 1000,
      transition: '200ms',
      background: theme.empty.cover,
    }),
    children: create('div', {
      className: css({
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        textAlign: 'center',
        width: 300,
        padding: 40,
        maxWidth: '100%',
        color: theme.empty.label,
        border: theme.empty.border,
        background: theme.empty.background,
        boxShadow: theme.empty.shadow,
        borderRadius: theme.global.radius,
      }),
      children: [
        create(Icon, {
          key: 'icon',
          icon,
          solid,
          size: 25,
        }),
        create('div', {
          key: 'label',
          children: label,
          className: css({
            color: theme.empty.label,
            fontSize: 25,
            lineHeight: '1em',
            marginTop: 15,
          }),
        }),
        helper &&
          create('div', {
            key: 'helper',
            children: helper,
            className: css({
              color: theme.empty.helper,
              marginTop: 5,
            }),
          }),
        create('div', {
          key: 'children',
          children,
          className: css({
            marginTop: 20,
            width: '100%',
          }),
        }),
      ],
    }),
  })
}
