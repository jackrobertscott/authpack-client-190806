import {
  createElement as create,
  FC,
  Fragment,
  useEffect,
  useState,
} from 'react'
import { Root, Toaster } from 'wga-theme'
import { RouterCentral } from './routers/RouterCentral'
import { SettingsStore } from './utils/settings'
import { Settings } from './contexts/Settings'
import { ErrorBoundary } from './screens/ErrorBoundary'

export const App: FC = () => {
  const [settings, settingsChange] = useState(SettingsStore.current)
  useEffect(() => SettingsStore.listen(settingsChange), [])
  return create(ErrorBoundary, {
    children: create(Settings.Provider, {
      value: settings,
      children: create(Root, {
        theme: settings.cluster && settings.cluster.theme,
        children: create(Fragment, {
          children: create(Toaster, {
            children: create(RouterCentral),
          }),
        }),
      }),
    }),
  })
}
