import { createElement as create, FC } from 'react'
import { GadgetsIconbar } from '../templates/GadgetsIconbar'
import { RouterModal } from '../templates/RouterModal'
import { LogoutUser } from '../screens/LogoutUser'
import { useSettings } from '../hooks/useSettings'
import { UpdateUser } from '../screens/UpdateUser'
import { UpdateGroup } from '../screens/UpdateGroup'
import { UpdateUserPassword } from '../screens/UpdateUserPassword'
import { RemoveUser } from '../screens/RemoveUser'
import { RemoveGroup } from '../screens/RemoveGroup'
import { CreateGroup } from '../screens/CreateGroup'
import { ListProviders } from '../screens/ListProviders'
import { ListSessions } from '../screens/ListSessions'

export type IRouterModalOnauthed = {
  close?: () => void
}

export const RouterModalOnauthed: FC<IRouterModalOnauthed> = ({ close }) => {
  const [settings] = useSettings()
  if (!settings.current) {
    return null
  }
  return create(RouterModal, {
    close,
    children: create(GadgetsIconbar, {
      close,
      screens: [
        {
          icon: 'user-circle',
          label: 'User Settings',
          submenu: [
            {
              icon: 'user-cog',
              label: 'Update User',
              description: 'Update your account details',
              children: create(UpdateUser, {
                id: settings.current.user.id,
              }),
            },
            {
              icon: 'key',
              label: 'Change Password',
              description: 'Update your login credentials',
              children: create(UpdateUserPassword, {
                id: settings.current.user.id,
              }),
            },
            {
              icon: 'handshake',
              label: '3rd Party Apps',
              description: 'Connect to other apps',
              children: create(ListProviders),
            },
            {
              icon: 'history',
              label: 'Login History',
              description: 'See when you last logged in',
              children: create(ListSessions),
            },
            {
              icon: 'fire-alt',
              label: 'Danger Zone',
              description: 'Delete your account',
              children: create(RemoveUser, {
                id: settings.current.user.id,
              }),
            },
          ],
        },
        {
          icon: 'users',
          label: 'Group Settings',
          submenu: settings.current.group
            ? [
                {
                  icon: 'cog',
                  label: 'Update Group',
                  description: 'Your group settings',
                  children: create(UpdateGroup, {
                    id: settings.current.group.id,
                  }),
                },
                {
                  icon: 'sync-alt',
                  label: 'Switch Group',
                  description: 'Change to another group',
                },
                {
                  icon: 'plus',
                  label: 'Create New Group',
                  description: 'Make a new group',
                },
                {
                  icon: 'user-plus',
                  label: 'Add Member',
                  description: 'Add a new group member',
                },
                {
                  icon: 'user-plus',
                  label: 'See Members',
                  description: 'List all group members',
                },
                {
                  icon: 'fire-alt',
                  label: 'Danger Zone',
                  description: 'Remove this group',
                  children: create(RemoveGroup, {
                    id: settings.current.user.id,
                  }),
                },
              ]
            : [
                {
                  icon: 'sync-alt',
                  label: 'Switch Group',
                  description: 'Change to another group',
                },
                {
                  icon: 'plus',
                  label: 'Create New Group',
                  description: 'Make a new group',
                  children: create(CreateGroup),
                },
              ],
        },
        {
          icon: 'power-off',
          label: 'Logout',
          children: create(LogoutUser),
        },
      ],
    }),
  })
}
