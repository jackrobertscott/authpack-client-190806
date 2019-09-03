import { createElement as create, FC, useContext } from 'react'
import { css } from 'emotion'
import { Theme } from './Theme'

export interface IButton {
  Container: FC<{
    click: () => any
    label: string
    icon?: string
  }>
}

export const Button: IButton = {
  Container: ({ click, label, icon = 'check-circle' }) => {
    const theme = useContext(Theme)
    return create('div', {
      onClick: click,
      children: [
        create('div', {
          children: label,
        }),
        create('div', {
          className: `far fa-${icon} ${css({
            verticalAlign: '10%',
          })}`,
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
        backgroundColor: theme.buttons.background,
        border: theme.buttons.border,
        color: theme.inputs.color,
        '&:hover': {
          boxShadow: '0 1px 5px rgba(0, 0, 0, 0.15)',
        },
      }),
    })
  },
}
