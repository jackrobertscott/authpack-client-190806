import { createElement as create, FC } from 'react'
import { Poster, Layout, Button, Page } from 'wga-theme'
import { useSettings } from '../hooks/useSettings'
import { SettingsStore } from '../utils/settings'
import { createUseServer } from '../hooks/useServer'

export const LogoutUser: FC = () => {
  const settings = useSettings()
  const gqlLogoutUser = useLogoutUser()
  const logout = () =>
    gqlLogoutUser
      .fetch()
      .finally(() => SettingsStore.update({ bearer: undefined }))
  return create(Page, {
    title: 'Logout',
    subtitle: settings.cluster && settings.cluster.name,
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
          loading: gqlLogoutUser.loading,
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
  query: `
    mutation LogoutUserClient {
      session: LogoutUserClient {
        id
      }
    }
  `,
})
