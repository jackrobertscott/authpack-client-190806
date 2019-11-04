import { createElement as create, FC, Fragment } from 'react'
import { useRouter, SideBar } from 'wga-theme'
import { useApp } from '../hooks/useApp'

export const RouterSideBarDeveloper: FC = () => {
  const app = useApp()
  const router = useRouter({
    base: '/developer',
    nomatch: '/explorer',
    options: [{ path: '/explorer', children: null }],
  })
  return create(Fragment, {
    children: [
      create(SideBar, {
        key: 'sideBar',
        title: 'Developer',
        footer: app.state && app.state.appname,
        options: [
          {
            icon: 'globe-americas',
            label: 'Explorer',
            click: () => router.change('/explorer'),
          },
        ],
      }),
      router.current &&
        create((() => router.current.children) as FC, {
          key: 'children',
        }),
    ],
  })
}
