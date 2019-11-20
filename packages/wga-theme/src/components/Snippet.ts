import { createElement as create, FC, useState } from 'react'
import { useTheme } from '../hooks/useTheme'
import { css } from 'emotion'
import { Icon } from './Icon'
import { ClickOutside } from './ClickOutside'
import { Menu } from './Menu'
import { useMounted } from '../hooks/useMounted'

export const Snippet: FC<{
  icon: string
  prefix?: string
  label: string
  value?: string
  click?: () => void
  options?: Array<{
    label: string
    helper?: string
    icon: string
    prefix?: string
    click?: () => void
  }>
}> = ({ icon, prefix, label, value, click, options = [] }) => {
  const theme = useTheme()
  const mounted = useMounted()
  const [open, openChange] = useState<boolean>(false)
  return create('div', {
    onClick: click,
    className: css({
      all: 'unset',
      display: 'flex',
      justifyContent: 'space-between',
      alignItems: 'flex-start',
      transition: '200ms',
      cursor: click && 'pointer',
      padding: '20px 25px',
      color: theme.snippet.label,
      background: theme.snippet.background,
      borderBottom: theme.snippet.border,
      '&:hover:not(:active)': click &&
        !options.length && {
          background: theme.snippet.backgroundHover,
        },
    }),
    children: [
      create(Icon, {
        key: 'icon',
        icon,
        prefix,
      }),
      create('div', {
        key: 'text',
        className: css({
          display: 'flex',
          flexDirection: 'column',
          flexGrow: 1,
          marginLeft: 10,
          marginRight: 10,
        }),
        children: [
          create('div', {
            key: 'label',
            children: label,
          }),
          value &&
            create('div', {
              key: 'helper',
              children: value,
              className: css({
                marginTop: 5,
                color: theme.snippet.value,
                fontWeight: theme.global.thin,
              }),
            }),
        ],
      }),
      Boolean(options.length || click) &&
        create('div', {
          key: 'arrow',
          onClick: () => options.length && openChange(true),
          className: css({
            padding: 5,
            margin: -5,
            position: 'relative',
            color: theme.snippet.arrow,
            borderRadius: theme.global.radius,
            cursor: options.length ? 'pointer' : undefined,
            '&:hover:not(:active)': options.length && {
              background: theme.snippet.backgroundHover,
            },
            '&:hover .toggle': {
              opacity: 1,
            },
          }),
          children: [
            create(Icon, {
              key: 'icon',
              icon: options.length ? 'bars' : 'hand-pointer',
            }),
            !!options.length &&
              create(Dropdown, {
                key: 'dropdown',
                options,
                close: () => mounted.current && openChange(false),
                open,
              }),
          ],
        }),
    ],
  })
}

export const Dropdown: FC<{
  open: boolean
  close: () => void
  options: Array<{
    label: string
    helper?: string
    icon: string
    prefix?: string
    click?: () => void
  }>
}> = ({ open, close, options }) => {
  return create('div', {
    className: css({
      all: 'unset',
      display: 'flex',
      minWidth: '290px',
      position: 'absolute',
      transition: '200ms',
      pointerEvents: open ? 'all' : 'none',
      opacity: open ? 1 : 0,
      zIndex: 300,
      right: -5,
      top: 0,
      '& > div': {
        flexGrow: 1,
      },
    }),
    children: create(ClickOutside, {
      click: close,
      disabled: !open,
      children: create(Menu, {
        isolated: true,
        options: options.map(option => ({
          ...option,
          click: () => {
            if (option.click) option.click()
            setTimeout(() => close())
          },
        })),
      }),
    }),
  })
}
