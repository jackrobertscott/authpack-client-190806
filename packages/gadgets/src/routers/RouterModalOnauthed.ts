import { createElement as create, FC } from 'react'
import { GadgetsIconbar } from '../templates/GadgetsIconbar'
import { RouterModal } from '../templates/RouterModal'
import { LogoutUser } from '../screens/LogoutUser'
import { useSettings } from '../hooks/useSettings'
import { UpdateUser } from '../screens/UpdateUser'
import { UpdateWorkspace } from '../screens/UpdateWorkspace'
import { UpdateUserPassword } from '../screens/UpdateUserPassword'
import { RemoveUser } from '../screens/RemoveUser'
import { RemoveWorkspace } from '../screens/RemoveWorkspace'
import { CreateWorkspace } from '../screens/CreateWorkspace'
import { ListProviders } from '../screens/ListProviders'
import { ListMemberships } from '../screens/ListMemberships'
import { SwitchWorkspace } from '../screens/SwitchWorkspace'
import { CreateMembership } from '../screens/CreateMembership'

export type IRouterModalOnauthed = {
  close?: () => void
}

export const RouterModalOnauthed: FC<IRouterModalOnauthed> = ({ close }) => {
  const [settings] = useSettings()
  return !settings.session
    ? null
    : create(RouterModal, {
        close,
        visible: settings.open,
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
                    id: settings.session.user.id,
                  }),
                },
                {
                  icon: 'key',
                  label: 'Change Password',
                  description: 'Update your login credentials',
                  children: create(UpdateUserPassword, {
                    id: settings.session.user.id,
                  }),
                },
                {
                  icon: 'handshake',
                  label: '3rd Party Apps',
                  description: 'Connect to other apps',
                  children: create(ListProviders),
                },
                {
                  icon: 'fire-alt',
                  label: 'Danger Zone',
                  description: 'Delete your account',
                  children: create(RemoveUser, {
                    id: settings.session.user.id,
                  }),
                },
              ],
            },
            {
              icon: 'users',
              label: 'Workspace Settings',
              submenu: settings.session.workspace
                ? [
                    {
                      icon: 'plus',
                      label: 'Create Workspace',
                      description: 'Make a new workspace',
                      children: create(CreateWorkspace),
                    },
                    {
                      icon: 'sync-alt',
                      label: 'Switch Workspace',
                      description: 'Change to another workspace',
                      children: create(SwitchWorkspace),
                    },
                    {
                      icon: 'cog',
                      label: 'Update Workspace',
                      description: 'Your workspace settings',
                      children: create(UpdateWorkspace, {
                        id: settings.session.workspace.id,
                      }),
                    },
                    {
                      icon: 'user-plus',
                      label: 'Add Member',
                      description: 'Add a new workspace member',
                      children: create(CreateMembership),
                    },
                    {
                      icon: 'user-plus',
                      label: 'See Members',
                      description: 'List all workspace members',
                      children: create(ListMemberships),
                    },
                    {
                      icon: 'fire-alt',
                      label: 'Danger Zone',
                      description: 'Remove this workspace',
                      children: create(RemoveWorkspace, {
                        id: settings.session.user.id,
                      }),
                    },
                  ]
                : [
                    {
                      icon: 'plus',
                      label: 'Create New Workspace',
                      description: 'Make a new workspace',
                      children: create(CreateWorkspace),
                    },
                    {
                      icon: 'sync-alt',
                      label: 'Switch Workspace',
                      description: 'Change to another workspace',
                      children: create(SwitchWorkspace),
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
