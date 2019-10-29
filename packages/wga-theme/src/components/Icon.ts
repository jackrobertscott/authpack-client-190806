import { createElement as create, FC } from 'react'
import { css } from 'emotion'
import { useTheme } from '../contexts/Theme'

export const Icon: FC<{
  icon: string
  size?: number
  padding?: number
  solid?: boolean
  color?: string
}> = ({ icon, size, padding = 0, solid, color }) => {
  const theme = useTheme()
  return create('div', {
    className: css({
      all: 'unset',
      display: 'flex',
      justifyContent: 'center',
      alignContent: 'center',
      color,
      padding,
      width: size ? size : theme.global.fonts,
      height: size ? size : theme.global.fonts,
      fontSize: size ? size : theme.global.fonts,
    }),
    children: create('div', {
      className: `${solid ? 'fas' : 'far'} fa-${icon} ${css({
        textAlign: 'center',
      })}`,
    }),
  })
}
