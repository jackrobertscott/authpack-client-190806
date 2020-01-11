import { createElement as element, FC, ReactNode, useState } from 'react'
import { css } from 'emotion'
import { useTheme } from '../hooks/useTheme'
import { Icon } from './Icon'
import { Pointer } from './Pointer'

export const Control: FC<{
  icon?: string
  prefix?: string
  label?: string
  helper?: string
  children: ReactNode
  error?: Error
}> = ({ icon, prefix, label, helper, children, error }) => {
  const theme = useTheme()
  return element('div', {
    className: css({
      all: 'unset',
      display: 'flex',
      flexDirection: 'column',
      position: 'relative',
      width: '100%',
      color: theme.input.label,
    }),
    children: [
      label &&
        element('div', {
          key: 'label',
          className: css({
            all: 'unset',
            display: 'flex',
            color: theme.input.label,
          }),
          children: [
            element('div', {
              key: 'label',
              children: label,
              className: css({
                marginRight: 10,
              }),
            }),
            error &&
              element(Alert, {
                key: 'error',
                icon,
                prefix,
                error,
              }),
          ],
        }),
      helper &&
        element('div', {
          key: 'helper',
          children: helper,
          className: css({
            marginTop: 3,
            color: theme.input.helper,
            fontWeight: theme.global.thin,
            lineHeight: '1.5em',
          }),
        }),
      element('div', {
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
  const bp = `@media (max-width: ${525 + 50}px)`
  const theme = useTheme()
  const [open, openChange] = useState<boolean>(false)
  return element('div', {
    className: css({
      all: 'unset',
      display: 'flex',
      position: 'initial',
      cursor: 'pointer',
      '&:hover > .alert': {
        opacity: 1,
      },
    }),
    children: [
      element('div', {
        key: 'icon',
        onClick: () => openChange(!open),
        className: css({
          padding: 5,
          margin: -5,
          color: theme.input.error,
        }),
        children: element(Icon, {
          icon,
          prefix,
        }),
      }),
      element('div', {
        key: 'pointer',
        className: css({
          all: 'unset',
          display: 'flex',
          position: 'absolute',
          zIndex: 150,
          top: 25,
          right: 0,
          left: -10,
          pointerEvents: 'none',
          opacity: open ? 1 : 0,
        }).concat(' alert'),
        children: element(Pointer, {
          icon,
          prefix,
          label: 'Error',
          helper: error.message,
        }),
      }),
    ],
  })
}
