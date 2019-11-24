import { createElement as create, FC, Fragment } from 'react'
import { useRouter, SideBar } from 'wga-theme'
import { useUniversal } from '../hooks/useUniversal'
import { ListUsers } from './ListUsers'
import { ListTeams } from './ListTeams'
import { ListSessions } from './ListSessions'

export const RouterSideBarHome: FC = () => {
  const config = useUniversal()
  const router = useRouter({
    base: '/app',
    nomatch: '/users',
    options: [
      { path: '/users', children: create(ListUsers) },
      { path: '/sessions', children: create(ListSessions) },
      { path: '/teams', children: create(ListTeams) },
    ],
  })
  return create(Fragment, {
    children: [
      create(SideBar, {
        key: 'sideBar',
        title: 'Home',
        footer: config.cluster_name,
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
            icon: 'history',
            label: 'Sessions',
            focused: !!router.current && router.current.path === '/sessions',
            click: () => router.change('/sessions'),
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