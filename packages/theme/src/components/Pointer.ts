import { createElement as create, FC, ReactNode, Fragment } from 'react'
import { css } from 'emotion'
import { useTheme } from '../hooks/useTheme'
import { Icon } from './Icon'

export const Pointer: FC<{
  icon: string
  prefix?: string
  label: string
  helper?: string
  children?: ReactNode
}> = ({ icon, prefix, label, helper, children }) => {
  const theme = useTheme()
  return create('div', {
    className: css({
      all: 'unset',
      display: 'flex',
      flexDirection: 'column',
      transition: '200ms',
      overflow: 'hidden',
      position: 'relative',
      zIndex: 200,
      width: 300,
      maxWidth: '100%',
      borderRadius: theme.global.radius,
      border: theme.pointer.border,
      boxShadow: theme.pointer.shadow,
      background: theme.pointer.background,
      color: theme.pointer.label,
    }),
    children: [
      create(Header, {
        key: 'header',
        icon,
        prefix,
        label,
        helper,
      }),
      children &&
        create(Fragment, {
          key: 'children',
          children,
        }),
    ],
  })
}

const Header: FC<{
  icon: string
  prefix?: string
  label: string
  helper?: string
}> = ({ icon, prefix, label, helper }) => {
  const theme = useTheme()
  return create('div', {
    key: 'header',
    className: css({
      all: 'unset',
      display: 'flex',
      justifyContent: 'space-between',
      padding: 15,
      flexGrow: 1,
    }),
    children: [
      create('div', {
        key: 'text',
        className: css({
          display: 'flex',
          flexDirection: 'column',
          flexGrow: 1,
          marginRight: 10,
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
                color: theme.pointer.helper,
                fontWeight: theme.global.thin,
              }),
            }),
        ],
      }),
      create(Icon, {
        key: 'icon',
        icon,
        prefix,
      }),
    ],
  })
}
