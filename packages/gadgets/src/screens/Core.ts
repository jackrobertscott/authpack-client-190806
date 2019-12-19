import { createElement as element, FC, useState, useEffect } from 'react'
import { Gadgets } from './Gadgets'
import { SettingsContext } from '../contexts/Settings'
import { SettingsStore } from '../utils/settings'

export const Core: FC = () => {
  const [settings, settingsChange] = useState(SettingsStore.current)
  useEffect(() => SettingsStore.listen(settingsChange), [])
  return element(SettingsContext.Provider, {
    children: element(Gadgets),
    value: settings,
  })
}
