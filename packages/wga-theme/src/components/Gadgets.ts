import { createElement as create, FC, ReactNode } from 'react'
import { css } from 'emotion'
import { useTheme } from '../contexts/Theme'

export const Gadgets: FC<{
  title: string
  subtitle?: string
  children: ReactNode
}> = ({ title, subtitle, children }) => {
  const theme = useTheme()
  return create('div', {
    className: css({
      all: 'unset',
      display: 'flex',
      flexDirection: 'column',
      flexGrow: 1,
      position: 'relative',
      background: theme.gadgets.background,
    }),
    children: create(Scroller, {
      children: [
        create(Header, {
          key: 'header',
          title,
          subtitle,
        }),
        create('div', {
          key: 'children',
          children,
          className: css({
            display: 'flex',
            flexDirection: 'column',
            flexGrow: 1,
          }),
        }),
        create(Branding, {
          key: 'branding',
          text: 'Authenticator',
          url: 'https://authenticator.windowgadgets.io',
        }),
      ],
    }),
  })
}

const Header: FC<{
  title: string
  subtitle?: string
}> = ({ title, subtitle }) => {
  const theme = useTheme()
  return create('div', {
    className: css({
      all: 'unset',
      display: 'flex',
      padding: '30px 25px 25px',
      justifyContent: 'space-between',
      alignItems: 'flex-start',
      background: theme.gadgets.header,
      borderBottom: theme.gadgets.border,
    }),
    children: [
      create('div', {
        key: 'title',
        children: title,
        className: css({
          all: 'unset',
          color: theme.gadgets.title,
        }),
      }),
      subtitle &&
        create('div', {
          key: 'subtitle',
          children: subtitle,
          className: css({
            all: 'unset',
            color: theme.gadgets.subtitle,
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
      display: 'flex',
      justifyContent: 'flex-end',
      padding: '25px 25px 30px',
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
        color: theme.gadgets.branding,
        '&:hover': {
          color: theme.gadgets.brandingHover,
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
        width: '25px',
        cursor: 'pointer',
        display: 'initial',
        backgroundColor: 'hsla(0, 0, 0, 0)',
        borderLeft: theme.page.border,
      },
      '&::-webkit-scrollbar-track': {
        backgroundColor: 'hsla(0, 0, 0, 0)',
      },
      '&::-webkit-scrollbar-thumb': {
        cursor: 'pointer',
        transition: '200ms',
        borderLeft: theme.page.border,
        background: theme.page.scrollbar,
      },
    }),
  })
}
