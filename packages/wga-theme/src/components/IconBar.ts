import { createElement as create, FC, ReactNode } from 'react'
import { css } from 'emotion'
import { useTheme } from '../contexts/Theme'
import { Icon } from './Icon'
import { Pointer } from './Pointer'
import { Menu } from './Menu'

export const IconBar: FC<{
  icons: Array<{
    icon: string
    label: string
    solid?: boolean
    focused?: boolean
    seperated?: boolean
    click?: () => void
    options?: Array<{
      label: string
      helper?: string
      icon: string
      solid?: boolean
      click?: () => void
    }>
  }>
}> = ({ icons }) => {
  const theme = useTheme()
  return create('div', {
    className: css({
      all: 'unset',
      display: 'flex',
      flexDirection: 'column',
      justifyContent: 'flex-start',
      alignItems: 'center',
      flexShrink: 0,
      background: theme.iconBar.background,
    }),
    children: create(IconSpacer, {
      children: icons.map((data, index) => {
        return create(IconPointer, {
          key: `icon-${index}`,
          ...data,
        })
      }),
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
      flexGrow: 1,
      '& > div:not(:last-child)': {
        marginBottom: 5,
      },
    }),
  })
}

const IconPointer: FC<{
  icon: string
  label: string
  solid?: boolean
  focused?: boolean
  seperated?: boolean
  click?: () => void
  options?: Array<{
    label: string
    helper?: string
    icon: string
    solid?: boolean
    click?: () => void
  }>
}> = ({ icon, label, solid, focused, seperated, click, options = [] }) => {
  const theme = useTheme()
  return create(TogglePointer, {
    seperated,
    children: create('div', {
      onClick: click,
      className: css({
        color: focused ? theme.iconBar.iconFocused : theme.iconBar.icon,
        background: theme.iconBar.iconBackground,
        borderRadius: theme.global.radius,
        transition: '200ms',
        cursor: 'pointer',
        '&:hover': {
          color: theme.iconBar.iconHover,
          background: theme.iconBar.iconBackgroundHover,
        },
      }),
      children: create(Icon, {
        icon,
        size: 22,
        padding: 13,
        solid,
      }),
    }),
    pointer: create(Pointer, {
      icon,
      label,
      solid,
      children:
        !!options.length &&
        create(Menu, {
          key: 'menu',
          options,
        }),
    }),
  })
}

const TogglePointer: FC<{
  children: ReactNode
  pointer: ReactNode
  seperated?: boolean
}> = ({ children, pointer, seperated }) => {
  return create('div', {
    className: css({
      all: 'unset',
      display: 'flex',
      position: 'relative',
      marginTop: seperated ? 'auto' : 0,
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
