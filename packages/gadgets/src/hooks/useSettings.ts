import { useEffect, useState, useMemo } from 'react'
import { settingsStore, ISettings } from '../utils/settings'

export const useSettings = (): [
  ISettings,
  (settings: Partial<ISettings>) => void
] => {
  const [state, stateChange] = useState<ISettings>(settingsStore.state)
  useEffect(() => {
    return settingsStore.listen(data => stateChange(data))
  }, [])
  return useMemo(
    () => [
      state,
      (data: Partial<ISettings>) =>
        settingsStore.patch(settings => ({ ...settings, ...data })),
    ],
    [state]
  )
}
