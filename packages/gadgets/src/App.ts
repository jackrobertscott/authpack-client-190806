import { createElement as create, FC, useEffect, useState } from 'react'
import { Toaster } from '@authpack/theme'
import { RouterCentral } from './screens/RouterCentral'
import { SettingsStore } from './utils/settings'
import { SettingsContext } from './contexts/Settings'
import { ErrorBoundary } from './screens/ErrorBoundary'

export const App: FC = () => {
  const [settings, settingsChange] = useState(SettingsStore.current)
  useEffect(() => SettingsStore.listen(settingsChange), [])
  return create(ErrorBoundary, {
    children: create(Toaster, {
      children: create(SettingsContext.Provider, {
        children: create(RouterCentral),
        value: settings,
      }),
    }),
  })
}
