import OutsideClickHandler from 'react-outside-click-handler'
import { createElement as create, FC, ReactNode } from 'react'
import { css } from 'emotion'
import { useTheme } from '../contexts/Theme'
import { Icon } from './Icon'

export const Pointer: FC<{
  icon: string
  solid?: boolean
  label: string
  helper?: string
  close?: () => void
  children?: ReactNode
}> = ({ icon, solid, label, close, helper, children }) => {
  const theme = useTheme()
  return create(OutsideClickHandler, {
    onOutsideClick: () => close && close(),
    children: create('div', {
      className: css({
        all: 'unset',
        display: 'flex',
        flexDirection: 'column',
        transition: '200ms',
        overflow: 'hidden',
        width: 280,
        fontSize: theme.global.fonts,
        borderRadius: theme.global.radius,
        boxShadow: theme.pointer.shadow,
        background: theme.pointer.background,
        border: theme.pointer.border,
        color: theme.pointer.label,
      }),
      children: [
        create(Header, {
          key: 'header',
          icon,
          solid,
          label,
          helper,
        }),
        children &&
          create((() => children) as FC, {
            key: 'children',
          }),
      ],
    }),
  })
}

const Header: FC<{
  icon: string
  solid?: boolean
  label: string
  helper?: string
}> = ({ icon, solid, label, helper }) => {
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
              }),
            }),
        ],
      }),
      create(Icon, {
        key: 'icon',
        icon,
        solid,
      }),
    ],
  })
}
