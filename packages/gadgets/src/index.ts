import '@fortawesome/fontawesome-free/css/all.min.css'
import * as Sentry from '@sentry/browser'
import * as serviceWorker from './serviceWorker'
import { createElement as create } from 'react'
import { render } from 'react-dom'
import { config } from './config'
import { App } from './App'

Sentry.init({
  dsn: config.sentryDSN,
  environment: config.environment,
})

render(create(App), document.getElementById('root'))

/**
 * If you want your app to work offline and load faster, you can change
 * unregister() to register() below. Note this comes with some pitfalls.
 * Learn more about service workers: https://bit.ly/CRA-PWA
 */
serviceWorker.unregister()
