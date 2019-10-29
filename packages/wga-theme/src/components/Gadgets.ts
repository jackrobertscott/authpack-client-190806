import { createElement as create, FC, ReactNode } from 'react'
import { css } from 'emotion'
import { useTheme } from '../contexts/Theme'

export const Gadgets: FC<{
  title: string
  subtitle: string
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
    children: [
      create(Header, {
        key: 'header',
        title,
        subtitle,
      }),
      create(Scroller, {
        key: 'scroller',
        children,
      }),
      create(Branding, {
        key: 'branding',
        text: 'Authenticator',
        url: 'https://authenticator.windowgadgets.io',
      }),
    ],
  })
}

const Header: FC<{
  title: string
  subtitle: string
}> = ({ title, subtitle }) => {
  const theme = useTheme()
  return create('div', {
    className: css({
      all: 'unset',
      display: 'flex',
      padding: '25px',
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
  text: string
  url: string
}> = ({ text, url }) => {
  const theme = useTheme()
  return create('a', {
    href: url,
    target: '_blank',
    children: text,
    className: css({
      all: 'unset',
      textAlign: 'right',
      whiteSpace: 'pre',
      cursor: 'pointer',
      display: 'flex',
      transition: '200ms',
      filter: 'contrast(70%)',
      margin: '25px',
      marginLeft: 'auto',
      color: theme.gadgets.branding,
      '&:hover': {
        filter: 'contrast(30%)',
      },
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
        boxShadow: `inset 0 0 0 5px ${theme.gadgets.background}`,
        background: theme.gadgets.scrollbar,
      },
    }),
  })
}
