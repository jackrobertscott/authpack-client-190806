import { createElement as create, FC, Fragment } from 'react'
import { useRouter, SideBar } from 'wga-theme'
import { useUniversal } from '../hooks/useUniversal'
import { ListUsers } from '../screens/ListUsers'
import { ListTeams } from '../screens/ListTeams'
import { ListSessions } from '../screens/ListSessions'

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
        footer: config.appname,
        options: [
          {
            icon: 'user-circle',
            label: 'Users',
            click: () => router.change('/users'),
          },
          {
            icon: 'users',
            label: 'Teams',
            click: () => router.change('/teams'),
          },
          {
            icon: 'history',
            label: 'Sessions',
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
