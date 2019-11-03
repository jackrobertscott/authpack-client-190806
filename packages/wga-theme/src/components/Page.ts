import { createElement as create, FC, ReactNode, Children } from 'react'
import { useTheme } from '../contexts/Theme'
import { css } from 'emotion'
import { Icon } from './Icon'

export const Page: FC<{
  title: string
  subtitle: string
  noscroll?: ReactNode
  children: ReactNode
  corner?: {
    icon: string
    solid?: boolean
    label: string
    click: () => void
  }
}> = ({ title, subtitle, noscroll, children, corner }) => {
  const theme = useTheme()
  return create('div', {
    className: css({
      all: 'unset',
      display: 'flex',
      flexDirection: 'column',
      justifyContent: 'stretch',
      position: 'relative',
      maxHeight: '100vh',
      flexGrow: 1,
      background: theme.page.background,
    }),
    children: [
      noscroll &&
        create((() => noscroll) as FC, {
          key: 'noscroll',
        }),
      create(Scroller, {
        key: 'scroller',
        children: [
          create(Branding, {
            key: 'branding',
            url: 'https://windowgadgets.io',
            text: `Made by Window Gadgets`,
          }),
          create(Header, {
            key: 'header',
            title,
            subtitle,
            corner,
          }),
          ...Children.toArray(children),
        ],
      }),
    ],
  })
}

const Header: FC<{
  title: string
  subtitle: string
  corner?: {
    icon: string
    solid?: boolean
    label: string
    click: () => void
  }
}> = ({ title, subtitle, corner }) => {
  const theme = useTheme()
  return create('div', {
    className: css({
      all: 'unset',
      display: 'flex',
      justifyContent: 'space-between',
      background: theme.page.header,
      borderBottom: theme.page.border,
    }),
    children: [
      create('div', {
        key: 'text',
        className: css({
          all: 'unset',
          display: 'flex',
          flexDirection: 'column',
          padding: '25px',
        }),
        children: [
          create('div', {
            key: 'title',
            children: title,
            className: css({
              fontSize: 25,
              lineHeight: '1em',
              color: theme.page.title,
            }),
          }),
          create('div', {
            key: 'subtitle',
            children: subtitle,
            className: css({
              marginTop: 7.5,
              color: theme.page.subtitle,
            }),
          }),
        ],
      }),
      corner &&
        create(Corner, {
          key: 'corner',
          ...corner,
        }),
    ],
  })
}

const Corner: FC<{
  icon: string
  solid?: boolean
  label: string
  click: () => void
}> = ({ icon, solid, label, click }) => {
  const theme = useTheme()
  return create('div', {
    onClick: click,
    className: css({
      all: 'unset',
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'flex-end',
      padding: '25px',
      cursor: 'pointer',
      transition: '200ms',
      color: theme.page.label,
      background: theme.page.header,
      '&:hover': {
        color: theme.page.labelHover,
        background: theme.page.headerHover,
      },
    }),
    children: [
      create(Icon, {
        key: 'icon',
        icon,
        solid,
        size: 25,
      }),
      create('div', {
        key: 'label',
        children: label,
        className: css({
          marginTop: 7.5,
        }),
      }),
    ],
  })
}

const Branding: FC<{
  url: string
  text: string
}> = ({ url, text }) => {
  const theme = useTheme()
  return create('div', {
    className: css({
      all: 'unset',
      padding: '25px',
      position: 'absolute',
      bottom: 0,
      right: 0,
    }),
    children: create('a', {
      href: url,
      target: '_blank',
      children: text,
      className: css({
        all: 'unset',
        textAlign: 'right',
        whiteSpace: 'pre',
        cursor: 'pointer',
        transition: '200ms',
        color: theme.page.branding,
        '&:hover': {
          color: theme.page.brandingHover,
        },
      }),
    }),
  })
}

const Scroller: FC<{
  children: ReactNode
}> = ({ children }) => {
  const theme = useTheme()
  return create('div', {
    children,
    className: css({
      all: 'unset',
      display: 'flex',
      position: 'relative',
      flexDirection: 'column',
      overflow: 'auto',
      flexGrow: 1,
      '&::-webkit-scrollbar': {
        width: '20px',
        display: 'initial',
        backgroundColor: 'hsla(0, 0, 0, 0)',
      },
      '&::-webkit-scrollbar-track': {
        backgroundColor: 'hsla(0, 0, 0, 0)',
      },
      '&::-webkit-scrollbar-thumb': {
        cursor: 'pointer',
        transition: '200ms',
        borderRadius: '100px',
        boxShadow: `inset 0 0 0 5px ${theme.page.background}`,
        background: theme.page.scrollbar,
      },
    }),
  })
}
