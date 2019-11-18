import { createElement as create, FC, ReactNode, Fragment } from 'react'
import { css } from 'emotion'
import { ThemeContext } from '../contexts/Theme'
import { NightSky } from '../themes/NightSky'
import { SnowStorm } from '../themes/SnowStorm'

export const Root: FC<{
  theme?: string
  children: ReactNode
}> = ({ theme, children }) => {
  let value
  switch (theme) {
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
    children: create('div', {
      className: css({
        all: 'unset',
        display: 'flex',
        flexGrow: 1,
        fontWeight: value.global.thick,
      }),
      children: [
        create(Fragment, {
          children,
        }),
        create('div', {
          id: 'portals',
        }),
      ],
    }),
  })
}
