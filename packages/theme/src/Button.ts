import { createElement as create, FC, useContext } from 'react'
import { css } from 'emotion'
import { Theme } from './Theme'

export interface IButton {
  Container: FC<{
    click: () => any
    label: string
    icon?: string
  }>
  Icon: FC<{
    name?: string
  }>
}

export const Button: IButton = {
  Container: ({ click, label, icon }) => {
    const theme = useContext(Theme)
    return create('div', {
      onClick: click,
      children: [
        create('div', {
          children: label,
        }),
        create(Button.Icon, {
          name: icon,
        }),
      ],
      className: css({
        all: 'unset',
        cursor: 'pointer',
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        padding: '15px',
        fontSize: theme.global.fonts,
        borderRadius: theme.global.radius,
        background: theme.buttons.background,
        border: theme.buttons.border,
        color: theme.buttons.color,
        '&:hover': {
          boxShadow: '0 1px 10px rgba(0, 0, 0, 0.15)',
        },
        '&:active': {
          boxShadow: 'none',
        },
      }),
    })
  },
  Icon: ({ name = 'check-circle' }) => {
    return create('div', {
      className: `far fa-${name} ${css({
        textAlign: 'center',
        lineHeight: '1.2em',
      })}`,
    })
  },
}
