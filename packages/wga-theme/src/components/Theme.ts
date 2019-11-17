import { createElement as create, FC, ReactNode } from 'react'
import { ThemeContext } from '../contexts/Theme'
import { NightSky } from '../themes/NightSky'
import { SnowStorm } from '../themes/SnowStorm'

export const Theme: FC<{
  id?: string
  children: ReactNode
}> = ({ id, children }) => {
  let value
  switch (id) {
    case 'night_sky':
      value = NightSky
      break
    case 'snow_storm':
      value = SnowStorm
      break
    default:
      value = NightSky
      break
  }
  return create(ThemeContext.Provider, {
    value,
    children,
  })
}
