import { createElement as create, FC, useRef } from 'react'
import { Modal } from '@authpack/theme'
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
  const close = useRef(() => SettingsStore.update({ open: false }))
  return create(Modal, {
    close: close.current,
    visible: settings.open,
    large: Boolean(settings.client && settings.bearer && settings.user),
    children: !settings.ready
      ? create(Loading)
      : !settings.client
      ? create(NoKey, {
          key: 'nokey',
        })
      : settings.bearer && settings.user
      ? create(RouterModalOnauthed, {
          key: 'onauthed',
          close: close.current,
        })
      : create(RouterModalUnauthed, {
          key: 'unauthed',
          close: close.current,
        }),
  })
}
