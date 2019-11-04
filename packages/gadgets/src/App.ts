import { createElement as create, FC, useRef } from 'react'
import { useSetup } from './hooks/useSetup'
import { useSettings } from './hooks/useSettings'
import { RouterModalUnauthed } from './routers/RouterModalUnauthed'
import { RouterModalOnauthed } from './routers/RouterModalOnauthed'
import { Theme, Toaster, Modal } from 'wga-theme'

export const App: FC = () => {
  useSetup()
  const settings = useSettings()
  const close = useRef(() => settings.change(old => ({ ...old, open: false })))
  return create(Theme.Provider, {
    value: settings.state.theme,
    children: create(Modal, {
      visible: settings.state.open,
      children: [
        settings.state.session
          ? create(RouterModalOnauthed, {
              key: 'router',
              close: close.current,
            })
          : create(RouterModalUnauthed, {
              key: 'router',
              close: close.current,
            }),
        create(Toaster, {
          key: 'toaster',
        }),
      ],
    }),
  })
}
