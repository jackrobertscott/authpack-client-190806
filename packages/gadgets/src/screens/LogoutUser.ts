import { createElement as create, FC } from 'react'
import { Gadgets, Poster, Layout, Button } from 'wga-theme'
import { useSettings } from '../hooks/useSettings'
import { SettingsStore } from '../utils/settings'
import { createUseServer } from '../hooks/useServer'

export const LogoutUser: FC = () => {
  const settings = useSettings()
  const gqlLogoutUser = useLogoutUser()
  const logout = () =>
    gqlLogoutUser
      .fetch()
      .catch(() => Promise.resolve())
      .then(() => {
        SettingsStore.update({
          bearer: undefined,
        })
      })
  return create(Gadgets, {
    title: 'Logout',
    subtitle: settings.appname,
    children: [
      create(Poster, {
        key: 'poster',
        icon: 'power-off',
        label: 'Logout',
        helper: 'See you later!',
      }),
      create(Layout, {
        key: 'logout',
        padding: true,
        column: true,
        children: create(Button, {
          icon: 'power-off',
          label: 'Logout',
          click: logout,
        }),
      }),
    ],
  })
}

const useLogoutUser = createUseServer<{
  session: {
    id: string
  }
}>({
  name: 'LogoutUser',
  query: `
    mutation LogoutUser {
      session: LogoutUser {
        id
      }
    }
  `,
})
