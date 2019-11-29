import { createElement as create, FC } from 'react'
import { Modal } from 'wga-theme'
import { useSetup } from '../hooks/useSetup'
import { useSettings } from '../hooks/useSettings'
import { RouterModalUnauthed } from './RouterModalUnauthed'
import { RouterModalOnauthed } from './RouterModalOnauthed'
import { SettingsStore } from '../utils/settings'
import { NoKey } from './NoKey'
import { Loading } from './Loading'

export const Gadgets: FC = () => {
  useSetup()
  const settings = useSettings()
  const close = () => SettingsStore.update({ open: false })
  return create(Modal, {
    close,
    visible: settings.open,
    large: Boolean(settings.client && settings.bearer && settings.user),
    children: !settings.ready
      ? create(Loading)
      : !settings.client
      ? create(NoKey, {
          key: 'nokey',
          loading: !settings.ready,
        })
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
