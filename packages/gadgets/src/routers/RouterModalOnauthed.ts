import { createElement as create, FC } from 'react'
import { useLocalRouter, Layout, IconBar } from 'wga-theme'
import { useSettings } from '../hooks/useSettings'
import { UpdateUser } from '../screens/UpdateUser'
import { ListProviders } from '../screens/ListProviders'
import { RemoveUser } from '../screens/RemoveUser'
import { UpdateUserPassword } from '../screens/UpdateUserPassword'

export const RouterModalOnauthed: FC<{
  close: () => void
}> = ({ close }) => {
  const settings = useSettings()
  const router = useLocalRouter({
    local: 'wga.RouterModalOnauthed',
    nomatch: '/user/update',
    options: [
      { key: '/user/update', children: create(UpdateUser) },
      { key: '/user/password', children: create(UpdateUserPassword) },
      { key: '/user/apps', children: create(ListProviders) },
      { key: '/user/danger', children: create(RemoveUser) },
    ],
  })
  if (!settings.state.session) return null
  return create(Layout, {
    children: [
      create(IconBar, {
        key: 'iconBar',
        icons: [
          {
            icon: 'user-circle',
            label: 'User',
            options: [
              {
                icon: 'user-cog',
                label: 'Update User',
                helper: 'Update your account details',
                click: () => router.change('/user/update'),
              },
              {
                icon: 'key',
                label: 'Change Password',
                helper: 'Update your login credentials',
                click: () => router.change('/user/password'),
              },
              {
                icon: 'handshake',
                label: '3rd Party Apps',
                helper: 'Connect to other apps',
                click: () => router.change('/user/apps'),
              },
              {
                icon: 'fire-alt',
                label: 'Danger Zone',
                helper: 'Delete your account',
                click: () => router.change('/user/danger'),
              },
            ],
          },
          {
            icon: 'users',
            label: 'Team',
            options: settings.state.session.team ? [] : [],
          },
          {
            icon: 'times-circle',
            label: 'Close',
            click: close,
            solid: false,
            seperated: true,
          },
        ],
      }),
      router.current &&
        create((() => router.current.children) as FC, {
          key: 'children',
        }),
    ],
  })
}
