import { createElement as element, FC, ReactNode, Fragment } from 'react'
import { css } from 'emotion'
import { ThemeContext } from '../contexts/Theme'
import { NightSky } from '../themes/NightSky'
import { SnowStorm } from '../themes/SnowStorm'
import { BlueHarvester } from '../themes/BlueHarvester'
import { Spinner } from './Spinner'

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
    case 'blue_harvester':
      value = BlueHarvester
      break
    default:
      value = NightSky
      break
  }
  return element(Spinner, {
    children: element(ThemeContext.Provider, {
      value,
      children: element('div', {
        className: css({
          all: 'unset',
          display: 'flex',
          flexGrow: 1,
          fontWeight: value.global.thick,
          '*': {
            WebkitTextFillColor: 'initial !important',
          },
        }),
        children: [
          element(Fragment, {
            key: 'children',
            children,
          }),
          element('div', {
            key: 'portals',
            id: 'portals',
          }),
        ],
      }),
    }),
  })
}
