import '@fortawesome/fontawesome-free/css/all.min.css'
import * as Sentry from '@sentry/browser'
import * as serviceWorker from './serviceWorker'
import { createElement as create, FC, useState, useEffect } from 'react'
import { render } from 'react-dom'
import { BlueHarvester, Theme, IronMaiden } from 'wga-theme'
import { App } from './App'
import { GlobalStore } from './utils/global'
import { Global } from './contexts/Global'
import { ErrorBoundary } from './screens/ErrorBoundary'
import { config } from './config'

Sentry.init({
  dsn: config.sentryDSN,
  environment: config.environment,
})

export const Root: FC = () => {
  const [global, globalChange] = useState(GlobalStore.current)
  useEffect(() => GlobalStore.listen(globalChange), [])
  return create(ErrorBoundary, {
    children: create(Global.Provider, {
      value: global,
      children: create(Theme.Provider, {
        value: global.theme === 'blue_harvester' ? BlueHarvester : IronMaiden,
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
