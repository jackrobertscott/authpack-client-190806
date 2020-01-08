import { createElement as element, FC, useState, ReactNode } from 'react'
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
  value?: number | string
  children?: ReactNode
  click?: () => void
  options?: Array<{
    label: string
    helper?: string
    icon: string
    prefix?: string
    click?: () => void
  }>
}> = ({ icon, prefix, label, value, children, click, options = [] }) => {
  const theme = useTheme()
  const mounted = useMounted()
  const [open, openChange] = useState<boolean>(false)
  return element('div', {
    onClick: click,
    className: css({
      all: 'unset',
      display: 'flex',
      justifyContent: 'space-between',
      alignItems: 'flex-start',
      transition: '200ms',
      cursor: click && 'pointer',
      padding: '20px 25px',
      flexBasis: 0,
      color: theme.snippet.label,
      background: theme.snippet.background,
      borderBottom: theme.snippet.border,
      '&:hover:not(:active)': click && {
        background: theme.snippet.backgroundHover,
      },
    }),
    children: [
      element(Icon, {
        key: 'icon',
        icon,
        prefix,
      }),
      element('div', {
        key: 'text',
        className: css({
          display: 'flex',
          flexDirection: 'column',
          overflow: 'auto',
          flexGrow: 1,
          marginLeft: 10,
          marginRight: 10,
        }),
        children: [
          element('div', {
            key: 'label',
            children: label,
          }),
          value &&
            element('div', {
              key: 'helper',
              children: value,
              className: css({
                marginTop: 3,
                color: theme.snippet.value,
                fontWeight: theme.global.thin,
                lineHeight: '1.5em',
              }),
            }),
          children &&
            element('div', {
              key: 'children',
              children,
              className: css({
                marginTop: 7,
              }),
            }),
        ],
      }),
      !!options.length
        ? element('div', {
            key: 'arrow',
            onClick: () => options.length && openChange(true),
            className: css({
              padding: 7.5,
              margin: -7.5,
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
            children: !options.length
              ? null
              : [
                  element(Icon, {
                    key: 'icon',
                    icon: options.length ? 'bars' : 'minus',
                  }),
                  element(Dropdown, {
                    key: 'dropdown',
                    options,
                    close: () => mounted.current && openChange(false),
                    open,
                  }),
                ],
          })
        : click &&
          element(Icon, {
            key: 'click',
            icon: 'angle-right',
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
  return element('div', {
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
    children: element(ClickOutside, {
      click: close,
      disabled: !open,
      children: element(Menu, {
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
