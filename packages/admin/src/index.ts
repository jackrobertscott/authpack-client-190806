import '@fortawesome/fontawesome-free/css/all.min.css'
import * as Sentry from '@sentry/browser'
import * as serviceWorker from './serviceWorker'
import { createElement as create, FC, useState, useEffect } from 'react'
import { render } from 'react-dom'
import { BlueHarvester, Theme, IronMaiden } from 'wga-theme'
import { App } from './App'
import { UniversalStore } from './utils/universal'
import { Universal } from './contexts/Universal'
import { ErrorBoundary } from './screens/ErrorBoundary'
import { config } from './config'

Sentry.init({
  dsn: config.sentry_dsn,
  environment: config.environment,
})

export const Root: FC = () => {
  const [universal, universalChange] = useState(UniversalStore.current)
  useEffect(() => UniversalStore.listen(universalChange), [])
  return create(ErrorBoundary, {
    children: create(Universal.Provider, {
      value: universal,
      children: create(Theme.Provider, {
        value:
          universal.theme === 'blue_harvester' ? BlueHarvester : IronMaiden,
        children: create(App),
      }),
    }),
  })
}

render(create(Root), document.getElementById('root'))

/**
 * If you want your app to work offline and load faster, you can change
 * unregister() to register() below. Note this comes with some pitfalls.
 * Learn more about service workers: https://bit.ly/CRA-PWA
 */
serviceWorker.unregister()
