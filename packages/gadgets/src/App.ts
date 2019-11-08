import { createElement as create, FC } from 'react'
import { useSetup } from './hooks/useSetup'
import { useSettings } from './hooks/useSettings'
import { RouterModalUnauthed } from './routers/RouterModalUnauthed'
import { RouterModalOnauthed } from './routers/RouterModalOnauthed'
import { NoKey } from './screens/NoKey'
import { Toaster, Modal } from 'wga-theme'
import { SettingsStore } from './utils/settings'

export const App: FC = () => {
  useSetup()
  const settings = useSettings()
  return create(Modal, {
    visible: settings.open,
    children: [
      settings.domain
        ? settings.bearer
          ? create(RouterModalOnauthed, {
              key: 'onauthed',
              close: () => SettingsStore.update({ open: false }),
            })
          : create(RouterModalUnauthed, {
              key: 'unauthed',
              close: () => SettingsStore.update({ open: false }),
            })
        : create(NoKey, {
            key: 'nokey',
            loading: !settings.ready,
          }),
      create(Toaster, {
        key: 'toaster',
      }),
    ],
  })
}
