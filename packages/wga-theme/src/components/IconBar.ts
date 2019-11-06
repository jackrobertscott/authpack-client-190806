import { createElement as create, FC, ReactNode, useState } from 'react'
import { css } from 'emotion'
import { useTheme } from '../contexts/Theme'
import { Icon } from './Icon'
import { Pointer } from './Pointer'
import { Menu } from './Menu'
import { ClickOutside } from './ClickOutside'

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
      borderRight: theme.iconBar.border,
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
      padding: 20,
      flexGrow: 1,
      '& > div:not(:last-child)': {
        marginBottom: 15,
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
  const [open, openChange] = useState<boolean>(false)
  return create('div', {
    onClick: () => options.length && openChange(!open),
    className: css({
      all: 'unset',
      display: 'flex',
      position: 'relative',
      marginTop: seperated ? 'auto' : 0,
      '&:hover .toggle': {
        opacity: 1,
      },
      '& .toggle': open && {
        opacity: 1,
        pointerEvents: 'all',
      },
    }),
    children: [
      create('div', {
        key: 'icon',
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
          padding: 8,
          solid,
        }),
      }),
      create('div', {
        key: 'pointer',
        className: css({
          all: 'unset',
          display: 'flex',
          minWidth: '290px',
          position: 'absolute',
          transition: '200ms',
          pointerEvents: 'none',
          opacity: 0,
          zIndex: 200,
          left: '100%',
          top: -5,
          paddingLeft: 7.5,
        }).concat(' toggle'),
        children: create(ClickOutside, {
          click: () => open && openChange(false),
          children: create(Pointer, {
            icon,
            label,
            solid,
            children:
              open &&
              !!options.length &&
              create(Menu, {
                key: 'menu',
                options,
              }),
          }),
        }),
      }),
    ],
  })
}
