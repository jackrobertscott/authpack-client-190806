import OutsideClickHandler from 'react-outside-click-handler'
import { createElement as create, FC } from 'react'
import { useTheme } from '../contexts/Theme'
import { css } from 'emotion'
import { Icon } from './Icon'

export const Pointer: FC<{
  icon: string
  solid?: boolean
  label: string
  close?: () => void
  options?: Array<{
    label: string
    helper?: string
    icon: string
    solid?: boolean
    click?: () => void
  }>
}> = ({ icon, solid, label, close, options = [] }) => {
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
        fontSize: theme.global.fonts,
        borderRadius: theme.global.radius,
        boxShadow: theme.pointer.shadow,
        background: theme.pointer.background,
        border: theme.pointer.border,
        color: theme.pointer.label,
        width: theme.pointer.width,
      }),
      children: [
        create(Header, {
          key: 'header',
          icon,
          solid,
          label,
        }),
        !!options.length &&
          create(Menu, {
            key: 'menu',
            options,
          }),
      ],
    }),
  })
}

const Header: FC<{
  icon: string
  solid?: boolean
  label: string
}> = ({ icon, solid, label }) => {
  return create('div', {
    key: 'header',
    className: css({
      all: 'unset',
      display: 'flex',
      justifyContent: 'space-between',
      alignItems: 'center',
      padding: 15,
      flexGrow: 1,
    }),
    children: [
      create('div', {
        key: 'label',
        children: label,
      }),
      create(Icon, {
        key: 'icon',
        icon,
        solid,
      }),
    ],
  })
}

const Menu: FC<{
  options: Array<{
    label: string
    helper?: string
    icon: string
    solid?: boolean
    click?: () => void
  }>
}> = ({ options }) => {
  const theme = useTheme()
  return create('div', {
    className: css({
      all: 'unset',
      display: 'flex',
      flexDirection: 'column',
    }),
    children: options.map(({ label, helper, icon, solid, click }) => {
      return create('div', {
        key: label,
        onClick: click,
        className: css({
          all: 'unset',
          display: 'flex',
          transition: '200ms',
          cursor: 'pointer',
          padding: 15,
          flexGrow: 1,
          color: theme.pointer.label,
          borderTop: theme.pointer.lining,
          background: theme.pointer.background,
          '&:hover': {
            background: theme.pointer.backgroundHover,
          },
        }),
        children: [
          create(Icon, {
            key: 'icon',
            icon,
            solid,
          }),
          create('div', {
            key: 'text',
            className: css({
              display: 'flex',
              flexDirection: 'column',
              flexGrow: 1,
              marginLeft: 10,
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
        ],
      })
    }),
  })
}
