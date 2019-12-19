import { createElement as element, FC, ReactNode, useState } from 'react'
import { css } from 'emotion'
import { useTheme } from '../hooks/useTheme'
import { Icon } from './Icon'
import { Pointer } from './Pointer'
import { Menu } from './Menu'
import { ClickOutside } from './ClickOutside'
import { useMounted } from '../hooks/useMounted'

export const IconBar: FC<{
  children: ReactNode
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
}> = ({ icons, children }) => {
  const theme = useTheme()
  const bp = `@media (max-width: ${515 + 50}px)`
  return element('div', {
    className: css({
      all: 'unset',
      display: 'flex',
      flexGrow: 1,
      flexDirection: 'row',
      overflow: 'hidden',
      [bp]: {
        flexDirection: 'column-reverse',
      },
    }),
    children: [
      element('div', {
        key: 'iconBar',
        className: css({
          all: 'unset',
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'flex-start',
          position: 'relative',
          alignItems: 'center',
          flexShrink: 0,
          background: theme.iconBar.background,
          borderRight: theme.iconBar.border,
          [bp]: {
            flexDirection: 'row',
            borderTop: theme.page.border,
            background: theme.page.background,
            borderRight: 'none',
          },
        }),
        children: element(IconSpacer, {
          bp,
          children: icons.filter(Boolean).map((data: any, index) => {
            return element(IconPointer, {
              key: `icon-${index}`,
              bp,
              ...data,
            })
          }),
        }),
      }),
      element('div', {
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
  bp: string
  children: ReactNode
}> = ({ children, bp }) => {
  return element('div', {
    children,
    className: css({
      all: 'unset',
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      padding: 20,
      flexGrow: 1,
      '& > div:not(:last-child)': {
        margin: '0 0 15px 0',
      },
      [bp]: {
        padding: '15px 20px',
        flexDirection: 'row',
        justifyContent: 'flex-start',
        '& > div:not(:last-child)': {
          margin: '0 15px 0 0',
        },
      },
    }),
  })
}

const IconPointer: FC<{
  bp: string
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
  bp,
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
  return element('div', {
    onClick: () => options.length && !open && openChange(true),
    className: css({
      all: 'unset',
      display: 'flex',
      position: 'relative',
      marginTop: seperated ? 'auto !important' : undefined,
      [bp]: {
        marginTop: seperated ? '0' : undefined,
      },
      '&:hover .toggle': {
        opacity: 1,
      },
      '& .toggle': open && {
        opacity: 1,
        pointerEvents: 'all',
      },
    }),
    children: [
      element('div', {
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
          [bp]: {
            background: theme.page.background,
          },
        }),
        children: element(Icon, {
          icon,
          size: 22,
          padding: 8,
          prefix,
        }),
      }),
      element('div', {
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
          [bp]: {
            display: 'none',
          },
        }).concat(' toggle'),
        children: element(ClickOutside, {
          disabled: !open,
          click: () => openChange(false),
          children: element(Pointer, {
            icon,
            label,
            helper,
            prefix,
            children:
              open &&
              !!options.length &&
              element(Menu, {
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
