import { createElement as create, FC, useState } from 'react'
import { useLocalRouter, Layout, IconBar } from 'wga-theme'
import { useSettings } from '../hooks/useSettings'
import { UpdateUser } from '../screens/UpdateUser'
import { ListProviders } from '../screens/ListProviders'
import { RemoveUser } from '../screens/RemoveUser'
import { UpdateUserPassword } from '../screens/UpdateUserPassword'
import { CreateTeam } from '../screens/CreateTeam'
import { SwitchTeam } from '../screens/SwitchTeam'
import { UpdateTeam } from '../screens/UpdateTeam'
import { CreateMembership } from '../screens/CreateMembership'
import { ListMemberships } from '../screens/ListMemberships'
import { RemoveTeam } from '../screens/RemoveTeam'
import { LogoutUser } from '../screens/LogoutUser'
import { Devmode } from '../screens/Devmode'

export const RouterModalOnauthed: FC<{
  close: () => void
}> = ({ close }) => {
  const [devopen, devopenChange] = useState<boolean>(false)
  const settings = useSettings()
  const router = useLocalRouter({
    local: 'wga.RouterModalOnauthed',
    nomatch: '/user/update',
    options: [
      { key: '/user/update', children: create(UpdateUser) },
      { key: '/user/password', children: create(UpdateUserPassword) },
      { key: '/user/apps', children: create(ListProviders) },
      { key: '/user/danger', children: create(RemoveUser) },
      { key: '/logout', children: create(LogoutUser) },
      { key: '/team/create', children: create(CreateTeam) },
      { key: '/team/switch', children: create(SwitchTeam) },
    ].concat(
      settings.session && settings.session.team
        ? [
            { key: '/team/update', children: create(UpdateTeam) },
            { key: '/team/members/create', children: create(CreateMembership) },
            { key: '/team/members', children: create(ListMemberships) },
            { key: '/team/danger', children: create(RemoveTeam) },
          ]
        : []
    ),
  })
  if (!settings.session || !settings.bearer) return null
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
            options: [
              {
                icon: 'plus',
                label: 'Create New Workspace',
                helper: 'Make a new workspace',
                click: () => router.change('/team/create'),
              },
              {
                icon: 'sync-alt',
                label: 'Switch Workspace',
                helper: 'Change to another workspace',
                click: () => router.change('/team/switch'),
              },
            ].concat(
              settings.session.team
                ? [
                    {
                      icon: 'cog',
                      label: 'Update Workspace',
                      helper: 'Your workspace settings',
                      click: () => router.change('/team/update'),
                    },
                    {
                      icon: 'user-plus',
                      label: 'Add Member',
                      helper: 'Add a new workspace member',
                      click: () => router.change('/team/members/create'),
                    },
                    {
                      icon: 'user-plus',
                      label: 'See Members',
                      helper: 'List all workspace members',
                      click: () => router.change('/team/members'),
                    },
                    {
                      icon: 'fire-alt',
                      label: 'Danger Zone',
                      helper: 'Remove this workspace',
                      click: () => router.change('/team/danger'),
                    },
                  ]
                : []
            ),
          },
          {
            icon: 'power-off',
            label: 'Logout',
            click: () => router.change('/logout'),
          },
        ]
          .concat(
            settings.devmode
              ? [
                  {
                    icon: 'code',
                    label: 'Dev Mode Enabled',
                    click: () => devopenChange(true),
                    seperated: true,
                  } as any,
                ]
              : []
          )
          .concat([
            {
              icon: 'times-circle',
              label: 'Close',
              click: close,
              solid: false,
            } as any,
          ]),
      }),
      devopen
        ? create(Devmode, {
            key: 'devmode',
            close: () => devopenChange(false),
          })
        : router.current &&
          create((() => router.current.children) as FC, {
            key: 'children',
          }),
    ],
  })
}
