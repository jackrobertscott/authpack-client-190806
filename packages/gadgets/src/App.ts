import { createElement as create, FC } from 'react'
import { useSetup } from './hooks/useSetup'
import { useSettings } from './hooks/useSettings'
import { RouterModalUnauthed } from './routers/RouterModalUnauthed'
import { RouterModalOnauthed } from './routers/RouterModalOnauthed'
import { Theme, Toaster } from 'wga-theme'

export const App: FC = () => {
  useSetup()
  const settings = useSettings()
  const close = () => settings.change(old => ({ ...old, open: false }))
  return create(Theme.Provider, {
    value: settings.state.theme,
    children: [
      settings.state.session
        ? create(RouterModalOnauthed, {
            key: 'router',
            close,
          })
        : create(RouterModalUnauthed, {
            key: 'router',
            close,
          }),
      create(Toaster, {
        key: 'toaster',
      }),
    ],
  })
}
