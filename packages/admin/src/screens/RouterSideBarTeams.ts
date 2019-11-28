import { createElement as create, FC, Fragment } from 'react'
import { useRouter, SideBar } from 'wga-theme'
import { useUniversal } from '../hooks/useUniversal'
import { ListPermissions } from './ListPermissions'
import { ListTeams } from './ListTeams'
import { EnableTeams } from './EnableTeams'

export const RouterSideBarTeams: FC = () => {
  const universal = useUniversal()
  const router = useRouter({
    base: '/teams',
    nomatch: '/',
    options: [
      { path: '/', children: create(ListTeams) },
      { path: '/permissions', children: create(ListPermissions) },
    ],
  })
  return create(Fragment, {
    children: [
      create(SideBar, {
        key: 'sideBar',
        title: 'Teams',
        footer: universal.cluster_name,
        options: [
          {
            icon: 'users',
            label: 'See teams',
            focused: !!router.current && router.current.path === '/',
            click: () => router.change('/'),
          },
          {
            icon: 'user-shield',
            label: 'See permissions',
            focused: !!router.current && router.current.path === '/permissions',
            click: () => router.change('/permissions'),
          },
        ],
      }),
      !universal.teams_enabled
        ? create(EnableTeams, {
            key: 'enable',
          })
        : router.current &&
          create(Fragment, {
            key: 'children',
            children: router.current.children,
          }),
    ],
  })
}
