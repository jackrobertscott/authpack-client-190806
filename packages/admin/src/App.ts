import '@fortawesome/fontawesome-free/css/all.min.css'
import { createElement as create, FC } from 'react'
import { Theme, BlueHarvester } from 'wga-theme'
import { RouterCentral } from './routers/RouterCentral'

export const App: FC<{}> = () => {
  return create(Theme.Provider, {
    value: BlueHarvester,
    children: create(RouterCentral),
  })
}
