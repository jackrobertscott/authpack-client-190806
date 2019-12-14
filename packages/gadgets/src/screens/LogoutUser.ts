import { createElement as element, FC } from 'react'
import { Layout, Button, Focus } from '@authpack/theme'
import { SettingsStore } from '../utils/settings'
import { createUseServer } from '../hooks/useServer'

export const LogoutUser: FC = () => {
  const gqlLogoutUser = useLogoutUser()
  const logout = () =>
    gqlLogoutUser
      .fetch()
      .finally(() => SettingsStore.update({ bearer: undefined }))
  return element(Layout, {
    grow: true,
    children: [
      element(Focus, {
        key: 'poster',
        icon: 'power-off',
        label: 'Logout',
        helper: 'Sign out of your account',
        children: element(Button, {
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
