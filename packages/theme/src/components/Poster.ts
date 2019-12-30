import { createElement as element, FC, ReactNode } from 'react'
import { useTheme } from '../hooks/useTheme'
import { css } from 'emotion'
import { Icon } from './Icon'

export const Poster: FC<{
  icon: string
  prefix?: string
  label: string
  helper?: string
  children?: ReactNode
}> = ({ icon, prefix, label, helper, children }) => {
  const theme = useTheme()
  return element('div', {
    className: css({
      all: 'unset',
      display: 'flex',
      justifyContent: 'center',
      background: theme.poster.background,
      borderBottom: theme.poster.border,
      color: theme.poster.label,
    }),
    children: element('div', {
      className: css({
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        textAlign: 'center',
        padding: 35,
        maxWidth: 300,
      }),
      children: [
        element(Icon, {
          key: 'icon',
          icon,
          prefix,
          size: 25,
        }),
        element('div', {
          key: 'label',
          children: label,
          className: css({
            color: theme.poster.label,
            fontSize: '1.5rem',
            lineHeight: '1em',
            marginTop: 15,
          }),
        }),
        helper &&
          element('div', {
            key: 'helper',
            children: helper,
            className: css({
              color: theme.poster.helper,
              fontWeight: theme.global.thin,
              lineHeight: '1.5em',
              marginTop: 10,
            }),
          }),
        children &&
          element('div', {
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
