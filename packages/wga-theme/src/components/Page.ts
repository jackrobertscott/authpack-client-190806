import { createElement as create, FC, ReactNode, Fragment } from 'react'
import { useTheme } from '../hooks/useTheme'
import { css } from 'emotion'
import { Icon } from './Icon'
import { Scroller } from './Scroller'
import { useSpinner } from '../hooks/useSpinner'

export const Page: FC<{
  title: string
  subtitle?: string
  children: ReactNode
  noscroll?: ReactNode
  hidden?: boolean
  corner?: {
    icon: string
    prefix?: string
    label: string
    click: () => void
  }
}> = ({ title, subtitle, children, noscroll = null, hidden, corner }) => {
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
      create(Scroller, {
        key: 'scroller',
        disable: hidden,
        children: [
          create(Header, {
            key: 'header',
            title,
            subtitle,
            corner,
          }),
          create('div', {
            key: 'children',
            children: [
              create(Fragment, {
                key: 'children',
                children,
              }),
              create(Branding, {
                key: 'branding',
                url: 'https://windowgadgets.io',
                text: `Window Gadgets`,
              }),
            ],
            className: css({
              display: 'flex',
              flexDirection: 'column',
              position: 'relative',
              flexGrow: 1,
            }),
          }),
        ],
      }),
      create('div', {
        key: 'noscroll',
        children: noscroll,
        className: css({
          display: 'flex',
          flexDirection: 'column',
        }),
      }),
    ],
  })
}

const Header: FC<{
  title: string
  subtitle?: string
  corner?: {
    icon: string
    prefix?: string
    label: string
    click: () => void
  }
}> = ({ title, subtitle, corner }) => {
  const theme = useTheme()
  const spinner = useSpinner()
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
          padding: '25px 25px 20px',
        }),
        children: [
          create('div', {
            key: 'title',
            className: css({
              all: 'unset',
              display: 'flex',
              alignItems: 'center',
              color: theme.page.title,
            }),
            children: [
              create('div', {
                key: 'title',
                children: title,
                className: css({
                  fontSize: '1.5rem',
                  lineHeight: '1em',
                }),
              }),
              create('div', {
                key: 'icon',
                className: css({
                  transition: '200ms',
                  opacity: spinner.loading ? 1 : 0,
                  marginLeft: 10,
                }),
                children: create(Icon, {
                  icon: 'sync-alt',
                }),
              }),
            ],
          }),
          subtitle &&
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
  prefix?: string
  label: string
  click: () => void
}> = ({ icon, prefix, label, click }) => {
  const theme = useTheme()
  return create('div', {
    onClick: click,
    className: css({
      all: 'unset',
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'flex-end',
      padding: '25px 25px 20px',
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
        prefix,
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
      display: 'flex',
      justifyContent: 'flex-end',
      padding: '20px 25px 25px',
      marginTop: 'auto',
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
