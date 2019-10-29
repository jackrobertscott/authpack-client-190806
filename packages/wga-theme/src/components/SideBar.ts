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
      maxWidth: '220px',
      padding: '31px 25px',
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
    className: css({
      fontSize: 25,
      marginBottom: 75,
      color: theme.sideBar.title,
    }),
    children: title,
  })
}

const Footer: FC<{
  footer: string
}> = ({ footer }) => {
  const theme = useTheme()
  return create('div', {
    className: css({
      whiteSpace: 'pre',
      transition: '200ms',
      filter: 'contrast(70%)',
      marginTop: 'auto',
      color: theme.sideBar.footer,
    }),
    children: footer,
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
    children: options.map(({ label, icon, solid, click, focused }, index) => {
      return create('div', {
        key: `option-${index}`,
        onClick: click,
        className: css({
          all: 'unset',
          display: 'flex',
          cursor: 'pointer',
          transition: '200ms',
          color: focused ? theme.sideBar.optionsFocused : theme.sideBar.options,
          '&:hover': !focused && {
            color: theme.sideBar.optionsHover,
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
    className: css({
      all: 'unset',
      display: 'flex',
      flexDirection: 'column',
      '& > *, & > div': {
        marginBottom: 15,
        '&:last-child': {
          marginBottom: 0,
        },
      },
    }),
  })
}
