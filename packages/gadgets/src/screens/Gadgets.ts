import { createElement as element, FC, useRef } from 'react'
import { Modal, Root } from '@authpack/theme'
import { useSetup } from '../hooks/useSetup'
import { useSettings } from '../hooks/useSettings'
import { RouterModalLoggedOut } from './RouterModalLoggedOut'
import { RouterModalLoggedIn } from './RouterModalLoggedIn'
import { SettingsStore } from '../utils/settings'
import { NoKey } from './NoKey'
import { Loading } from './Loading'
import { NoPayment } from './NoPayment'
import { config } from '../config'

export const Gadgets: FC = () => {
  useSetup()
  const settings = useSettings()
  const close = useRef(() => {
    SettingsStore.update({ open: false })
    setTimeout(() => {
      if (SettingsStore.current.options.prompt_plan) {
        SettingsStore.update({
          options: {
            ...SettingsStore.current.options,
            prompt_plan: undefined,
          },
        })
      }
    }, 200)
  })
  const large =
    settings.client &&
    settings.bearer &&
    settings.user &&
    !settings.options.prompt_plan
  if (!settings.cluster) return null
  const allowed = settings.domain
    ? settings.domain.startsWith('http://localhost') ||
      settings.domain.startsWith(config.admin)
    : false
  return element(Root, {
    theme: settings.options.theme_preset || settings.cluster.theme_preference,
    children: element(Modal, {
      close: close.current,
      visible: Boolean(settings.ready && settings.open),
      large: Boolean(large),
      children: !settings.ready
        ? element(Loading)
        : !settings.client
        ? element(NoKey, {
            key: 'nokey',
          })
        : !allowed && false
        ? element(NoPayment, {
            key: 'nopayment',
          })
        : settings.bearer && settings.user
        ? element(RouterModalLoggedIn, {
            key: 'onauthed',
            close: close.current,
          })
        : element(RouterModalLoggedOut, {
            key: 'unauthed',
            close: close.current,
          }),
    }),
  })
}
