import '@fortawesome/fontawesome-free/css/all.min.css'
import { createElement as create, FC } from 'react'
import { RouterModalUnauthed } from './routers/RouterModalUnauthed'
import { useSettingsSetup } from './hooks/useSettingsSetup'
import { useSettings } from './hooks/useSettings'
import { RouterModalOnauthed } from './routers/RouterModalOnauthed'

export const App: FC<{}> = () => {
  useSettingsSetup()
  const [settings, changeSettings] = useSettings()
  return create('div', {
    children: settings.current
      ? create(RouterModalOnauthed, {
          close: () => changeSettings({ open: false }),
        })
      : create(RouterModalUnauthed, {
          close: () => changeSettings({ open: false }),
        }),
  })
}
