import { createElement as element, FC } from 'react'
import { css } from 'emotion'
import { spinning } from '../utils/animation'

export const Icon: FC<{
  icon: string
  size?: number
  padding?: number
  prefix?: string
  color?: string
  spin?: boolean
}> = ({ icon, size, padding = 0, prefix = 'fas', color, spin }) => {
  return element('div', {
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
      animation:
        spin || icon === 'sync-alt'
          ? `${spinning} 3s linear infinite`
          : undefined,
    }),
    children: element('div', {
      className: `${prefix} fa-${icon} ${css({
        textAlign: 'center',
      })}`,
    }),
  })
}
