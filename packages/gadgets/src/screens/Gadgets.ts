import { createElement as create, FC } from 'react'
import { Modal } from 'wga-theme'
import { useSetup } from '../hooks/useSetup'
import { useSettings } from '../hooks/useSettings'
import { RouterModalUnauthed } from '../routers/RouterModalUnauthed'
import { RouterModalOnauthed } from '../routers/RouterModalOnauthed'
import { SettingsStore } from '../utils/settings'
import { NoKey } from './NoKey'
import { Loading } from './Loading'
import { Power } from './Power'

export const Gadgets: FC = () => {
  useSetup()
  const settings = useSettings()
  const close = () => SettingsStore.update({ open: false })
  return create(Modal, {
    close,
    visible: settings.open,
    children: !settings.ready
      ? create(Loading)
      : !settings.domain
      ? create(NoKey, {
          key: 'nokey',
          loading: !settings.ready,
        })
      : settings.cluster && !settings.cluster.power
      ? create(Power)
      : settings.bearer && settings.user
      ? create(RouterModalOnauthed, {
          key: 'onauthed',
          close,
        })
      : create(RouterModalUnauthed, {
          key: 'unauthed',
          close,
        }),
  })
}
