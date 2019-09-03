import { createElement as create, FC } from 'react'
import { css } from 'emotion'

export interface IButtonProps {
  click: () => any
  label: string
  padding?: number
  radius?: number
  color?: string
}

export const Button: FC<IButtonProps> = ({
  click,
  label,
  padding = 10,
  radius = 3,
  color = '#777',
}) =>
  create('div', {
    children: label,
    onClick: click,
    className: css({
      padding: `${padding}px`,
      borderRadius: `${radius}px`,
      backgroundColor: color,
      cursor: 'pointer',
      '&:hover': {
        boxShadow: '0 1px 5px rgba(0, 0, 0, 0.15)',
      },
    }),
  })
