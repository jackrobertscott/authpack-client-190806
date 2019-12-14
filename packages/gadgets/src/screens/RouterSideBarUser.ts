import { createElement as element, FC } from 'react'
import { useLocalRouter, SideBar } from '@authpack/theme'
import { useSettings } from '../hooks/useSettings'
import { UpdateUser } from './UpdateUser'
import { ListProviders } from './ListProviders'
import { RemoveUser } from './RemoveUser'
import { UpdateUserPassword } from './UpdateUserPassword'
import { ListSessions } from './ListSessions'
import { UpdateUserEmail } from './UpdateUserEmail'

export const RouterSideBarUser: FC = () => {
  const settings = useSettings()
  const router = useLocalRouter({
    name: 'user',
    nomatch: '/user/update',
    options: [
      { key: '/user/update', children: element(UpdateUser) },
      { key: '/user/email', children: element(UpdateUserEmail) },
      { key: '/user/password', children: element(UpdateUserPassword) },
      { key: '/user/apps', children: element(ListProviders) },
      { key: '/user/sessions', children: element(ListSessions) },
      { key: '/user/danger', children: element(RemoveUser), nosave: true },
    ],
  })
  if (!settings.bearer) return null
  return element(SideBar, {
    key: 'sideBar',
    title: 'User',
    footer: settings.user && settings.user.name,
    children: router.current && router.current.children,
    options: [
      {
        icon: 'user-cog',
        label: 'Update',
        focused: router.current && router.current.key === '/user/update',
        click: () => router.change('/user/update'),
      },
      {
        icon: 'at',
        label: 'Email',
        focused: router.current && router.current.key === '/user/email',
        click: () => router.change('/user/email'),
      },
      {
        icon: 'key',
        label: 'Password',
        focused: router.current && router.current.key === '/user/password',
        click: () => router.change('/user/password'),
      },
      {
        icon: 'share-alt',
        label: 'Apps',
        focused: router.current && router.current.key === '/user/apps',
        click: () => router.change('/user/apps'),
      },
      {
        icon: 'history',
        label: 'Sessions',
        focused: router.current && router.current.key === '/user/sessions',
        click: () => router.change('/user/sessions'),
      },
      {
        icon: 'trash-alt',
        label: 'Remove',
        focused: router.current && router.current.key === '/user/danger',
        click: () => router.change('/user/danger'),
      },
    ],
  })
}
