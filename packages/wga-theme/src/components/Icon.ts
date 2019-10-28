import { createElement as create, FC } from 'react'
import { css } from 'emotion'
import { useTheme } from '../contexts/Theme'

export const Icon: FC<{
  icon: string
  size?: number
  padding?: number
  solid?: boolean
  style?: {
    icon: string
    iconHover: string
    background: string
    backgroundHover: string
  }
}> = ({ icon, size, padding = 0, solid, style = {} }) => {
  const theme = useTheme()
  return create('div', {
    className: css({
      all: 'unset',
      display: 'flex',
      justifyContent: 'center',
      alignContent: 'center',
      padding,
      width: size ? size : theme.global.fonts,
      height: size ? size : theme.global.fonts,
      fontSize: size ? size : theme.global.fonts,
      color: style.icon,
      background: style.background,
      borderRadius: theme.global.radius,
      '&:hover': {
        color: style.iconHover,
        background: style.backgroundHover,
      },
    }),
    children: create('div', {
      className: `${solid ? 'fas' : 'far'} fa-${icon} ${css({
        textAlign: 'center',
      })}`,
    }),
  })
}
