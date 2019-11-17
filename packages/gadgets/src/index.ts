import '@fortawesome/fontawesome-free/css/all.min.css'
import * as Sentry from '@sentry/browser'
import * as serviceWorker from './serviceWorker'
import { createElement as create, FC, useState, useEffect } from 'react'
import { render } from 'react-dom'
import { Theme } from 'wga-theme'
import { SettingsStore } from './utils/settings'
import { Settings } from './contexts/Settings'
import { App } from './App'
import { ErrorBoundary } from './screens/ErrorBoundary'
import { config } from './config'

Sentry.init({
  dsn: config.sentryDSN,
  environment: config.environment,
})

export const Root: FC = () => {
  const [settings, settingsChange] = useState(SettingsStore.current)
  useEffect(() => SettingsStore.listen(settingsChange), [])
  return create(ErrorBoundary, {
    children: create(Settings.Provider, {
      value: settings,
      children: create(Theme, {
        id: settings.app && settings.app.theme,
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
