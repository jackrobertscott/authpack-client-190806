import { createElement as create, FC, ReactNode, useState } from 'react'
import { css } from 'emotion'
import { useTheme } from '../hooks/useTheme'
import { Icon } from './Icon'
import { Pointer } from './Pointer'
import { Menu } from './Menu'
import { ClickOutside } from './ClickOutside'
import { useMounted } from '../hooks/useMounted'

export const IconBar: FC<{
  children: ReactNode
  horizontal?: boolean
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
}> = ({ icons, children, horizontal = false }) => {
  const theme = useTheme()
  return create('div', {
    className: css({
      all: 'unset',
      display: 'flex',
      flexGrow: 1,
      flexDirection: horizontal ? 'column-reverse' : 'row',
    }),
    children: [
      create('div', {
        key: 'iconBar',
        className: css({
          all: 'unset',
          display: 'flex',
          flexDirection: horizontal ? 'row' : 'column',
          justifyContent: 'flex-start',
          position: 'relative',
          alignItems: 'center',
          flexShrink: 0,
          background: theme.iconBar.background,
          borderTop: horizontal ? theme.iconBar.border : undefined,
          borderRight: !horizontal ? theme.iconBar.border : undefined,
        }),
        children: create(IconSpacer, {
          horizontal,
          children: icons.filter(Boolean).map((data: any, index) => {
            return create(IconPointer, {
              key: `icon-${index}`,
              horizontal,
              ...data,
            })
          }),
        }),
      }),
      create('div', {
        key: 'children',
        children,
        className: css({
          all: 'unset',
          display: 'flex',
          flexDirection: 'column',
          flexGrow: 1,
          position: 'relative',
          overflow: 'hidden',
        }),
      }),
    ],
  })
}

const IconSpacer: FC<{
  children: ReactNode
  horizontal?: boolean
}> = ({ children, horizontal }) => {
  return create('div', {
    children,
    className: css({
      all: 'unset',
      display: 'flex',
      flexDirection: horizontal ? 'row-reverse' : 'column',
      alignItems: 'center',
      padding: horizontal ? '15px 20px' : 20,
      flexGrow: 1,
      '& > div:not(:last-child)': {
        margin: horizontal ? '0 0 0 15px' : '0 0 15px 0',
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
  horizontal?: boolean
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
  horizontal,
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
      position: horizontal ? undefined : 'relative',
      marginTop: seperated && !horizontal ? 'auto !important' : undefined,
      marginRight: seperated && horizontal ? 'auto !important' : undefined,
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
      !horizontal &&
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
