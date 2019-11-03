import { createElement as create, FC, Fragment, useEffect } from 'react'
import { useRouter, SideBar } from 'wga-theme'
import { useApp } from '../hooks/useApp'
import { ListPermissions } from '../screens/ListPermissions'
import { ListProviders } from '../screens/ListProviders'

export const RouterSideBarHome: FC = () => {
  const app = useApp()
  const router = useRouter(({ pathname }) => ({
    nomatch: `${pathname}/providers`,
    options: [
      { path: `${pathname}/providers`, children: ListProviders },
      { path: `${pathname}/permissions`, children: ListPermissions },
    ],
  }))
  return create(Fragment, {
    children: [
      create(SideBar, {
        title: 'Settings',
        footer: app.state && app.state.appname,
        options: [
          {
            icon: 'handshake',
            label: 'Providers',
            click: () => router.change(`${router.location.pathname}/providers`),
          },
          {
            icon: 'user-shield',
            label: 'Permissions',
            click: () =>
              router.change(`${router.location.pathname}/permissions`),
          },
        ],
      }),
      router.current && router.current.children,
    ],
  })
}
