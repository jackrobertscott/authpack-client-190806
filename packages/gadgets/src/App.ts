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
  const close = () => SettingsStore.update({ open: false })
  return create(Modal, {
    close,
    visible: settings.open,
    children: !settings.ready
      ? null
      : [
          settings.domain
            ? settings.bearer && settings.user
              ? create(RouterModalOnauthed, {
                  key: 'onauthed',
                  close,
                })
              : create(RouterModalUnauthed, {
                  key: 'unauthed',
                  close,
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
