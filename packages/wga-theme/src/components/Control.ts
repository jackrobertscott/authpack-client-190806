import { createElement as create, FC, ReactNode } from 'react'
import { css } from 'emotion'
import { useTheme } from '../hooks/useTheme'
import { Icon } from './Icon'
import { Pointer } from './Pointer'

export const Control: FC<{
  icon?: string
  prefix?: string
  label: string
  helper?: string
  children: ReactNode
  error?: Error
}> = ({ icon, prefix, label, helper, children, error }) => {
  const theme = useTheme()
  return create('div', {
    className: css({
      all: 'unset',
      display: 'flex',
      flexDirection: 'column',
      width: '100%',
      color: theme.input.label,
    }),
    children: [
      create('div', {
        key: 'label',
        className: css({
          all: 'unset',
          display: 'flex',
          color: theme.input.label,
        }),
        children: [
          create('div', {
            key: 'label',
            children: label,
            className: css({
              marginRight: 10,
            }),
          }),
          error &&
            create(Alert, {
              key: 'error',
              icon,
              prefix,
              error,
            }),
        ],
      }),
      create('div', {
        key: 'helper',
        children: helper,
        className: css({
          marginTop: 3,
          color: theme.input.helper,
          fontWeight: theme.global.thin,
        }),
      }),
      create('div', {
        key: 'input',
        children,
        className: css({
          marginTop: 7,
        }),
      }),
    ],
  })
}

const Alert: FC<{
  icon?: string
  prefix?: string
  error: Error
}> = ({ icon = 'flag', prefix, error }) => {
  return create('div', {
    className: css({
      all: 'unset',
      display: 'flex',
      position: 'relative',
      cursor: 'pointer',
      '&:hover > .alert': {
        opacity: 1,
      },
    }),
    children: [
      create(Icon, {
        key: 'icon',
        icon,
        prefix,
      }),
      create('div', {
        key: 'pointer',
        className: css({
          all: 'unset',
          display: 'flex',
          position: 'absolute',
          zIndex: 150,
          top: -15,
          right: -10,
          transform: 'translateX(100%)',
          pointerEvents: 'none',
          opacity: 0,
        }).concat(' alert'),
        children: create(Pointer, {
          icon,
          prefix,
          label: 'Error',
          helper: error.message,
        }),
      }),
    ],
  })
}
