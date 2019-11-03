import { createElement as create, FC } from 'react'
import { useTheme } from '../contexts/Theme'
import { css } from 'emotion'
import { Icon } from './Icon'

export const SideBar: FC<{
  title: string
  footer: string
  options: Array<{
    label: string
    icon: string
    solid?: boolean
    click?: () => void
    focused?: boolean
  }>
}> = ({ title, footer, options }) => {
  const theme = useTheme()
  return create('div', {
    className: css({
      all: 'unset',
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'stretch',
      width: '20%',
      maxWidth: '280px',
      background: theme.sideBar.background,
      borderRight: theme.sideBar.border,
    }),
    children: [
      create(Title, {
        key: 'title',
        title,
      }),
      create(Options, {
        key: 'options',
        options,
      }),
      create(Footer, {
        key: 'footer',
        footer,
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
      fontSize: 25,
      padding: 25,
      marginBottom: 75,
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
      padding: 25,
      color: theme.sideBar.footer,
    }),
  })
}

const Options: FC<{
  options: Array<{
    label: string
    icon: string
    solid?: boolean
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
    }),
    children: options.map(({ label, icon, solid, click, focused }, index) => {
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
          '&:hover': {
            color: theme.sideBar.optionsHover,
            background: theme.sideBar.backgroundHover,
          },
        }),
        children: [
          create(Icon, {
            key: 'icon',
            icon,
            solid,
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
