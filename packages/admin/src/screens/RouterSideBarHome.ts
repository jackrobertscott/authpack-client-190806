import { createElement as element, FC } from 'react'
import { useRouter, SideBar } from '@authpack/theme'
import { useUniversal } from '../hooks/useUniversal'
import { ListUsers } from './ListUsers'
import { ListProviders } from './ListProviders'
import { ListPermissions } from './ListPermissions'
import { ListTeams } from './ListTeams'

export const RouterSideBarHome: FC = () => {
  const universal = useUniversal()
  const router = useRouter({
    base: '/app',
    nomatch: '/users',
    options: [
      { path: '/users', children: element(ListUsers) },
      { path: '/teams', children: element(ListTeams) },
      { path: '/permissions', children: element(ListPermissions) },
      { path: '/providers', children: element(ListProviders) },
    ],
  })
  return element(SideBar, {
    key: 'sideBar',
    title: 'Home',
    footer: universal.cluster_name,
    children: router.current && router.current.children,
    options: [
      {
        icon: 'user-circle',
        label: 'Users',
        focused: !!router.current && router.current.path === '/users',
        click: () => router.change('/users'),
      },
      {
        icon: 'users',
        label: 'Teams',
        focused: !!router.current && router.current.path === '/teams',
        click: () => router.change('/teams'),
      },
      {
        icon: 'shield-alt',
        label: 'Permissions',
        focused: !!router.current && router.current.path === '/permissions',
        click: () => router.change('/permissions'),
      },
      {
        icon: 'plug',
        label: 'Providers',
        focused: !!router.current && router.current.path === '/providers',
        click: () => router.change('/providers'),
      },
    ],
  })
}
