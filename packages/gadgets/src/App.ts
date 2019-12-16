import { createElement as element, FC, useEffect, useState } from 'react'
import { Toaster } from '@authpack/theme'
import { RouterCentral } from './screens/RouterCentral'
import { SettingsStore } from './utils/settings'
import { SettingsContext } from './contexts/Settings'
import { ErrorBoundary } from './screens/ErrorBoundary'

export const App: FC = () => {
  const [settings, settingsChange] = useState(SettingsStore.current)
  useEffect(() => SettingsStore.listen(settingsChange), [])
  return element(ErrorBoundary, {
    children: element(Toaster, {
      children: element(SettingsContext.Provider, {
        children: element(RouterCentral),
        value: settings,
      }),
    }),
  })
}
