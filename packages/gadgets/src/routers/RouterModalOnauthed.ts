import { createElement as create, FC } from 'react'
import { GadgetsIconbar } from '../templates/GadgetsIconbar'
import { RouterModal } from '../templates/RouterModal'
import { LogoutUser } from '../screens/LogoutUser'

export type IRouterModalOnauthed = {
  id: string
  close?: () => void
}

export const RouterModalOnauthed: FC<IRouterModalOnauthed> = ({
  id,
  close,
}) => {
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
            },
            {
              icon: 'key',
              label: 'Change Password',
              description: 'Update your login credentials',
            },
            {
              icon: 'handshake',
              label: '3rd Party Apps',
              description: 'Connect to other apps',
            },
            {
              icon: 'history',
              label: 'Login History',
              description: 'See when you last logged in',
            },
            {
              icon: 'fire-alt',
              label: 'Danger Zone',
              description: 'Delete your account',
            },
          ],
        },
        {
          icon: 'users',
          label: 'Group Settings',
          submenu: [
            {
              icon: 'cog',
              label: 'Update Group',
              description: 'Your group settings',
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
