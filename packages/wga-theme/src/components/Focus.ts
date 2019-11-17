import { createElement as create, FC, ReactNode } from 'react'
import { useTheme } from '../contexts/Theme'
import { css } from 'emotion'
import { Icon } from './Icon'
import { Portal } from './Portal'

export const Focus: FC<{
  icon: string
  prefix?: string
  label: string
  helper?: string
  visible?: boolean
  portal?: boolean
  children?: ReactNode
}> = ({ icon, prefix, label, helper, visible = true, portal, children }) => {
  const theme = useTheme()
  const nodes = create('div', {
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
      zIndex: 250,
      transition: '200ms',
      pointerEvents: visible ? 'all' : 'none',
      opacity: visible ? 1 : 0,
      background: theme.focus.background,
      color: theme.focus.label,
    }),
    children: create('div', {
      className: css({
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        textAlign: 'center',
        width: 300,
        padding: '20px 25px',
        maxWidth: '100%',
      }),
      children: [
        create(Icon, {
          key: 'icon',
          icon,
          prefix,
          size: 25,
        }),
        create('div', {
          key: 'label',
          children: label,
          className: css({
            color: theme.focus.label,
            fontSize: '1.5rem',
            lineHeight: '1em',
            marginTop: 15,
          }),
        }),
        helper &&
          create('div', {
            key: 'helper',
            children: helper,
            className: css({
              color: theme.focus.helper,
              marginTop: 5,
            }),
          }),
        children &&
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
  return portal
    ? create(Portal, {
        children: nodes,
      })
    : nodes
}
