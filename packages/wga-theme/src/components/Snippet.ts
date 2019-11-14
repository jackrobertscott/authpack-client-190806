import { createElement as create, FC } from 'react'
import { useTheme } from '../contexts/Theme'
import { css } from 'emotion'
import { Icon } from './Icon'

export const Snippet: FC<{
  icon: string
  prefix?: string
  label: string
  value?: string
  click?: () => void
}> = ({ icon, prefix, label, value, click }) => {
  const theme = useTheme()
  return create('div', {
    className: css({
      all: 'unset',
      display: 'flex',
      justifyContent: 'space-between',
      transition: '200ms',
      cursor: click && 'pointer',
      padding: 25,
      color: theme.snippet.label,
      background: theme.snippet.background,
      borderBottom: theme.snippet.border,
      '&:hover:not(:active)': click && {
        background: theme.snippet.backgroundHover,
      },
      '&:not(:last-child)': {
        borderBottom: theme.snippet.border,
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
          marginLeft: '15px',
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
              }),
            }),
        ],
      }),
      click &&
        create('div', {
          key: 'arrow',
          className: css({
            marginLeft: '15px',
            color: theme.snippet.arrow,
          }),
          children: create(Icon, {
            key: 'icon',
            icon: 'chevron-right',
            prefix,
          }),
        }),
    ],
  })
}
