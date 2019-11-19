import { createElement as create, FC, Fragment } from 'react'
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

export const RouterModalOnauthed: FC<{
  close: () => void
}> = ({ close }) => {
  const settings = useSettings()
  const router = useLocalRouter({
    nomatch:
      settings.app && settings.app.force_teams && !settings.team
        ? '/team/create'
        : '/user/update',
    options:
      settings.bearer && settings.team
        ? [
            { key: '/user/update', children: create(UpdateUser) },
            { key: '/user/password', children: create(UpdateUserPassword) },
            { key: '/user/apps', children: create(ListProviders) },
            { key: '/user/danger', children: create(RemoveUser) },
            { key: '/logout', children: create(LogoutUser) },
            { key: '/team/switch', children: create(SwitchTeam) },
            { key: '/team/update', children: create(UpdateTeam) },
            { key: '/team/members/create', children: create(CreateMembership) },
            { key: '/team/members', children: create(ListMemberships) },
            {
              key: '/team/create',
              children: create(CreateTeam, {
                change: () => router.change('/team/update'),
              }),
            },
            { key: '/team/danger', children: create(RemoveTeam) },
          ]
        : [
            { key: '/user/update', children: create(UpdateUser) },
            { key: '/user/password', children: create(UpdateUserPassword) },
            { key: '/user/apps', children: create(ListProviders) },
            { key: '/user/danger', children: create(RemoveUser) },
            { key: '/logout', children: create(LogoutUser) },
            {
              key: '/team/create',
              children: create(CreateTeam, {
                change: () => router.change('/team/update'),
              }),
            },
          ],
  })
  if (!settings.bearer) return null
  return create(Layout, {
    grow: true,
    children: [
      create(IconBar, {
        key: 'iconBar',
        icons: [
          {
            icon: 'user-circle',
            label: 'User',
            focused: router.current && router.current.key.startsWith('/user'),
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
            click: !settings.team
              ? () => router.change('/team/create')
              : undefined,
            focused: router.current && router.current.key.startsWith('/team'),
            options: !settings.team
              ? undefined
              : [
                  {
                    icon: 'sync-alt',
                    label: 'Switch Team',
                    helper: 'Change to another team',
                    click: () => router.change('/team/switch'),
                  },
                  {
                    icon: 'cog',
                    label: 'Update Team',
                    helper: 'Your team settings',
                    click: () => router.change('/team/update'),
                  },
                  {
                    icon: 'plus',
                    label: 'Create Team',
                    helper: 'Make a new team',
                    click: () => router.change('/team/create'),
                  },
                  {
                    icon: 'user-plus',
                    label: 'Add Member',
                    helper: 'Add a new team member',
                    click: () => router.change('/team/members/create'),
                  },
                  {
                    icon: 'user-friends',
                    label: 'See Members',
                    helper: 'List all team members',
                    click: () => router.change('/team/members'),
                  },
                  {
                    icon: 'fire-alt',
                    label: 'Danger Zone',
                    helper: 'Remove this team',
                    click: () => router.change('/team/danger'),
                  },
                ],
          },
          {
            icon: 'power-off',
            label: 'Logout',
            click: () => router.change('/logout'),
            focused: router.current && router.current.key === '/logout',
          },
          {
            icon: 'times-circle',
            label: 'Close',
            click: close,
            prefix: 'far',
            seperated: true,
          },
        ],
      }),
      router.current &&
        create(Fragment, {
          key: 'children',
          children: router.current.children,
        }),
    ],
  })
}
