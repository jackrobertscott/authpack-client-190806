import { createElement as create, FC, Fragment, useEffect } from 'react'
import { useRouter, SideBar } from 'wga-theme'
import { useApp } from '../hooks/useApp'

export const RouterSideBarHome: FC = () => {
  const app = useApp()
  const router = useRouter(({ pathname }) => ({
    nomatch: `${pathname}/explorer`,
    options: [{ path: `${pathname}/explorer`, children: null }],
  }))
  return create(Fragment, {
    children: [
      create(SideBar, {
        title: 'Developer',
        footer: app.state && app.state.appname,
        options: [
          {
            icon: 'globe-americas',
            label: 'Explorer',
            click: () => router.change(`${router.location.pathname}/explorer`),
          },
        ],
      }),
      router.current && router.current.children,
    ],
  })
}
