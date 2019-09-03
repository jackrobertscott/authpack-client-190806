import { createElement as create, FC, useContext } from 'react'
import { css } from 'emotion'
import { Theme } from './Theme'

export const Button: FC<{
  click: () => any
  label: string
}> = ({ click, label }) => {
  const theme = useContext(Theme)
  return create('div', {
    children: label,
    onClick: click,
    className: css({
      all: 'unset',
      cursor: 'pointer',
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
}
