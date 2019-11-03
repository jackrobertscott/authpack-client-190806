import { createElement as create, FC, Fragment, useEffect } from 'react'
import { useRouter, SideBar } from 'wga-theme'
import { useApp } from '../hooks/useApp'
import { ListUsers } from '../screens/ListUsers'
import { ListTeams } from '../screens/ListTeams'
import { ListSessions } from '../screens/ListSessions'

export const RouterSideBarHome: FC = () => {
  const app = useApp()
  const router = useRouter(({ pathname }) => ({
    nomatch: `${pathname}/users`,
    options: [
      { path: `${pathname}/users`, children: ListUsers },
      { path: `${pathname}/sessions`, children: ListSessions },
      { path: `${pathname}/teams`, children: ListTeams },
    ],
  }))
  useEffect(() => {
    if (!router.current) router.change('/users')
  }, [router.current])
  return create(Fragment, {
    children: [
      create(SideBar, {
        title: 'Home',
        footer: app.state && app.state.appname,
        options: [
          {
            icon: 'user-circle',
            label: 'Users',
            click: () => router.change(`${router.location.pathname}/users`),
          },
          {
            icon: 'history',
            label: 'Sessions',
            click: () => router.change(`${router.location.pathname}/sessions`),
          },
          {
            icon: 'users',
            label: 'Teams',
            click: () => router.change(`${router.location.pathname}/teams`),
          },
        ],
      }),
      router.current && router.current.children,
    ],
  })
}
