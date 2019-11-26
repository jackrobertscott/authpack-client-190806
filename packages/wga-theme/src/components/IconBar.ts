import { createElement as create, FC, ReactNode, useState } from 'react'
import { css } from 'emotion'
import { useTheme } from '../hooks/useTheme'
import { Icon } from './Icon'
import { Pointer } from './Pointer'
import { Menu } from './Menu'
import { ClickOutside } from './ClickOutside'
import { useMounted } from '../hooks/useMounted'

export const IconBar: FC<{
  icons: Array<
    | {
        icon: string
        label: string
        helper?: string
        prefix?: string
        focused?: boolean
        seperated?: boolean
        click?: () => void
        options?: Array<{
          label: string
          helper?: string
          icon: string
          prefix?: string
          click?: () => void
        }>
      }
    | false
  >
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
      children: icons.filter(Boolean).map((data: any, index) => {
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
  helper?: string
  prefix?: string
  focused?: boolean
  seperated?: boolean
  click?: () => void
  options?: Array<{
    label: string
    helper?: string
    icon: string
    prefix?: string
    click?: () => void
  }>
}> = ({
  icon,
  label,
  helper,
  prefix,
  focused,
  seperated,
  click,
  options = [],
}) => {
  const theme = useTheme()
  const mounted = useMounted()
  const [open, openChange] = useState<boolean>(false)
  return create('div', {
    onClick: () => options.length && !open && openChange(true),
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
          prefix,
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
          zIndex: 300,
          left: '100%',
          top: -5,
          paddingLeft: 7.5,
        }).concat(' toggle'),
        children: create(ClickOutside, {
          disabled: !open,
          click: () => openChange(false),
          children: create(Pointer, {
            icon,
            label,
            helper,
            prefix,
            children:
              open &&
              !!options.length &&
              create(Menu, {
                key: 'menu',
                options: options.map(option => ({
                  ...option,
                  click: () => {
                    if (option.click) option.click()
                    if (mounted.current) openChange(false)
                  },
                })),
              }),
          }),
        }),
      }),
    ],
  })
}
