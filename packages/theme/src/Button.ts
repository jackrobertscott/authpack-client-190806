import { createElement as create, FC, useContext } from 'react'
import { css } from 'emotion'
import { Theme } from './Theme'

export interface IButton {
  Container: FC<{
    click: () => void
    label: string
    disable?: boolean
    icon?: string
  }>
  Icon: FC<{
    name?: string
  }>
}

export const Button: IButton = {
  Container: ({ click, label, disable, icon }) => {
    const theme = useContext(Theme)
    return create('div', {
      onClick: click,
      children: [
        create('div', {
          key: 'label',
          children: label,
        }),
        create(Button.Icon, {
          key: 'icon',
          name: icon || disable ? 'times-circle' : 'check-circle',
        }),
      ],
      className: `${disable ? 'disable' : ''} ${css({
        all: 'unset',
        cursor: disable ? 'default' : 'pointer',
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        padding: '15px',
        transition: '200ms',
        fontSize: theme.global.fonts,
        border: theme.buttons.border,
        borderRadius: theme.global.radius,
        background: disable
          ? theme.buttons.backgroundDisable
          : theme.buttons.background,
        color: disable ? theme.buttons.colorDisable : theme.buttons.color,
        '&:hover:not(.disable)': {
          background: theme.buttons.backgroundHover,
          boxShadow: '0 1px 7.5px rgba(0, 0, 0, 0.05)',
        },
        '&:active:not(.disable)': {
          background: theme.buttons.background,
          boxShadow: 'none',
        },
      })}`,
    })
  },
  Icon: ({ name }) => {
    return create('div', {
      className: `far fa-${name} ${css({
        textAlign: 'center',
        lineHeight: '1.5em',
      })}`,
    })
  },
}
