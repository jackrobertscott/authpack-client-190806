import { createElement as element, FC, ReactNode, Fragment } from 'react'
import { css } from 'emotion'
import { ThemeContext, ITheme } from '../contexts/Theme'
import { NightSky } from '../themes/NightSky'
import { SnowStorm } from '../themes/SnowStorm'
import { BlueHarvester } from '../themes/BlueHarvester'
import { Spinner } from './Spinner'

export const Root: FC<{
  theme?: string
  merge?: Partial<ITheme>
  children: ReactNode
}> = ({ theme, merge, children }) => {
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
  if (merge) {
    Object.assign(value, merge)
  }
  return element(Spinner, {
    children: element(ThemeContext.Provider, {
      value,
      children: element('div', {
        className: css({
          all: 'unset',
          display: 'flex',
          overflow: 'hidden',
          flexGrow: 1,
          fontWeight: value.global.thick,
          color: value.global.text,
          height: '100%',
          width: '100%',
          '*': {
            WebkitTextFillColor: 'initial !important',
            touchAction: 'auto',
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
