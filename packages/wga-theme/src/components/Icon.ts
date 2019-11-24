import { createElement as create, FC } from 'react'
import { css } from 'emotion'

export const Icon: FC<{
  icon: string
  size?: number
  padding?: number
  prefix?: string
  color?: string
}> = ({ icon, size, padding = 0, prefix = 'fas', color }) => {
  return create('div', {
    className: css({
      all: 'unset',
      display: 'flex',
      justifyContent: 'center',
      alignContent: 'center',
      color,
      padding,
      width: size ? size : '1rem',
      height: size ? size : '1rem',
      fontSize: size ? size : '1rem',
    }),
    children: create('div', {
      className: `${prefix} fa-${icon} ${css({
        textAlign: 'center',
      })}`,
    }),
  })
}
