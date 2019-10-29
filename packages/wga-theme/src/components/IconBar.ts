import { createElement as create, FC, ReactNode } from 'react'
import { css } from 'emotion'
import { useTheme } from '../contexts/Theme'
import { Icon } from './Icon'
import { Pointer } from './Pointer'

export const IconBar: FC<{
  icons: Array<{
    icon: string
    label: string
    solid?: boolean
    focused?: boolean
    click?: () => void
    options?: Array<{
      label: string
      helper?: string
      icon: string
      solid?: boolean
      click?: () => void
    }>
  }>
  close?: () => void
}> = ({ icons, close }) => {
  const theme = useTheme()
  return create('div', {
    className: css({
      all: 'unset',
      display: 'flex',
      flexDirection: 'column',
      justifyContent: 'space-between',
      alignItems: 'center',
      flexShrink: 0,
      background: theme.iconBars.background,
    }),
    children: [
      icons.map((data, index) => {
        return create(IconPointer, {
          key: `icon-${index}`,
          ...data,
        })
      }),
      create(IconPointer, {
        icon: 'times-circle',
        label: 'Close',
        click: close,
      }),
    ].map((children, index) => {
      return create(IconSpacer, {
        key: `icon-${index}`,
        children,
      })
    }),
  })
}

const IconPointer: FC<{
  icon: string
  label: string
  solid?: boolean
  focused?: boolean
  click?: () => void
  options?: Array<{
    label: string
    helper?: string
    icon: string
    solid?: boolean
    click?: () => void
  }>
}> = ({ icon, label, solid, focused, click, options }) => {
  const theme = useTheme()
  return create(TogglePointer, {
    children: create('div', {
      onClick: click,
      className: css({
        color: focused ? theme.iconBars.iconFocused : theme.iconBars.icon,
        background: theme.iconBars.iconBackground,
        borderRadius: theme.global.radius,
        transition: '200ms',
        cursor: 'pointer',
        '&:hover': {
          color: theme.iconBars.iconHover,
          background: theme.iconBars.iconBackgroundHover,
        },
      }),
      children: create(Icon, {
        icon,
        size: 25,
        padding: 10,
        solid,
      }),
    }),
    pointer: create(Pointer, {
      icon,
      label,
      solid,
      options,
    }),
  })
}

const IconSpacer: FC<{
  children: ReactNode
}> = ({ children }) => {
  return create('div', {
    children,
    className: css({
      all: 'unset',
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      padding: 15,
      '& > *, & > div': {
        marginBottom: 5,
        '&:last-child': {
          marginBottom: 0,
        },
      },
    }),
  })
}

const TogglePointer: FC<{
  children: ReactNode
  pointer: ReactNode
}> = ({ children, pointer }) => {
  return create('div', {
    className: css({
      all: 'unset',
      display: 'flex',
      position: 'relative',
      '&:hover > .toggle': {
        display: 'flex',
      },
    }),
    children: [
      create((() => children) as FC, {
        key: 'children',
      }),
      create('div', {
        key: 'pointer',
        children: pointer,
        className: css({
          all: 'unset',
          display: 'none',
          minWidth: '290px',
          position: 'absolute',
          zIndex: 100,
          left: '100%',
          top: 0,
          paddingLeft: '7.5px',
        }).concat(' toggle'),
      }),
    ],
  })
}
