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
          children: null,
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
          children: null,
          submenu: [
            {
              icon: 'cog',
              label: 'Update Workspace',
              description: 'Your workspace settings',
            },
            {
              icon: 'sync-alt',
              label: 'Switch Workspace',
              description: 'Change to another workspace',
            },
            {
              icon: 'plus',
              label: 'Create New Workspace',
              description: 'Make a new workspace',
            },
            {
              icon: 'user-plus',
              label: 'Add Member',
              description: 'Add a new workspace member',
            },
            {
              icon: 'user-plus',
              label: 'See Members',
              description: 'List all workspace members',
            },
            {
              icon: 'fire-alt',
              label: 'Danger Zone',
              description: 'Remove this workspace',
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
