import '@fortawesome/fontawesome-free/css/all.min.css'
import { createElement as create, FC, useRef } from 'react'
import { RouterModalUnauthed } from './routers/RouterModalUnauthed'
import { useSettingsSetup } from './hooks/useSettingsSetup'
import { useSettings } from './hooks/useSettings'
import { RouterModalOnauthed } from './routers/RouterModalOnauthed'

export const App: FC<{}> = () => {
  useSettingsSetup()
  const [settings, changeSettings] = useSettings()
  const close = useRef(() => changeSettings({ open: false }))
  return create('div', {
    children: settings.session
      ? create(RouterModalOnauthed, { close: close.current })
      : create(RouterModalUnauthed, { close: close.current }),
  })
}
