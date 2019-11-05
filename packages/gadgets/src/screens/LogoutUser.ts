import { createElement as create, FC } from 'react'
import { Gadgets, Poster, Layout, Button } from 'wga-theme'
import { useSettings } from '../hooks/useSettings'
import { useLogoutUser } from '../graphql/useLogoutUser'
import { SettingsStore } from '../utils/settings'

export const LogoutUser: FC = () => {
  const settings = useSettings()
  const gql = useLogoutUser()
  const logout = () => gql.fetch().then(() => SettingsStore.reset())
  return create(Gadgets, {
    title: 'Logout',
    subtitle: settings.state.appname,
    children: [
      create(Poster, {
        key: 'poster',
        icon: 'power-off',
        label: 'Logout',
        helper: 'See you later!',
      }),
      create(Layout, {
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
