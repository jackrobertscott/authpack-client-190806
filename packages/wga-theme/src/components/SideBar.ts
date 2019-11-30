import { createElement as create, FC, ReactNode, Fragment } from 'react'
import { useTheme } from '../hooks/useTheme'
import { css } from 'emotion'
import { Icon } from './Icon'
import { Scroller } from './Scroller'

export const SideBar: FC<{
  title: string
  footer?: string
  children: ReactNode
  horizontal?: boolean
  options: Array<{
    label: string
    icon: string
    prefix?: string
    click?: () => void
    focused?: boolean
  }>
}> = ({ title, footer, children, options, horizontal }) => {
  const theme = useTheme()
  return create('div', {
    className: css({
      all: 'unset',
      display: 'flex',
      flexGrow: 1,
      flexDirection: horizontal ? 'column-reverse' : 'row-reverse',
    }),
    children: [
      create(Fragment, {
        key: 'children',
        children,
      }),
      create('div', {
        key: 'sideBar',
        className: css({
          all: 'unset',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'stretch',
          position: horizontal ? 'absolute' : 'relative',
          left: 0,
          right: 0,
          bottom: 0,
          width: horizontal ? '100%' : '260px',
          minWidth: horizontal ? '100%' : '260px',
          background: theme.sideBar.background,
          borderTop: horizontal ? theme.sideBar.border : undefined,
          borderRight: !horizontal ? theme.sideBar.border : undefined,
        }),
        children: create(Scroller, {
          maxheight: horizontal ? 320 : undefined,
          children: [
            create(Title, {
              key: 'title',
              title,
            }),
            create(Options, {
              key: 'options',
              options,
            }),
            footer &&
              !horizontal &&
              create(Footer, {
                key: 'footer',
                footer,
              }),
          ],
        }),
      }),
    ],
  })
}

const Title: FC<{
  title: string
}> = ({ title }) => {
  const theme = useTheme()
  return create('div', {
    children: title,
    className: css({
      lineHeight: '1em',
      fontSize: '1.5rem',
      padding: '25px 25px 20px',
      marginBottom: 40,
      color: theme.sideBar.title,
    }),
  })
}

const Footer: FC<{
  footer: string
}> = ({ footer }) => {
  const theme = useTheme()
  return create('div', {
    children: footer,
    className: css({
      whiteSpace: 'pre',
      transition: '200ms',
      marginTop: 'auto',
      padding: '20px 25px 25px',
      color: theme.sideBar.footer,
    }),
  })
}

const Options: FC<{
  options: Array<{
    label: string
    icon: string
    prefix?: string
    click?: () => void
    focused?: boolean
  }>
}> = ({ options }) => {
  const theme = useTheme()
  return create('div', {
    key: 'options',
    className: css({
      all: 'unset',
      display: 'flex',
      flexDirection: 'column',
      marginBottom: 40,
    }),
    children: options.map(({ label, icon, prefix, click, focused }, index) => {
      return create('div', {
        key: `option-${index}`,
        onClick: click,
        className: css({
          all: 'unset',
          display: 'flex',
          cursor: 'pointer',
          transition: '200ms',
          padding: '15px 25px',
          color: focused ? theme.sideBar.optionsFocused : theme.sideBar.options,
          background: focused ? theme.sideBar.backgroundFocused : undefined,
          '&:hover': {
            color: theme.sideBar.optionsHover,
            background: theme.sideBar.backgroundHover,
          },
        }),
        children: [
          create(Icon, {
            key: 'icon',
            icon,
            prefix,
          }),
          create('div', {
            key: 'label',
            children: label,
            className: css({
              marginLeft: 10,
            }),
          }),
        ],
      })
    }),
  })
}
