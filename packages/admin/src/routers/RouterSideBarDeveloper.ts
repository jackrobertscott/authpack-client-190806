import { createElement as create, FC, Fragment } from 'react'
import { useRouter, SideBar } from 'wga-theme'
import { useConfig } from '../hooks/useConfig'

export const RouterSideBarDeveloper: FC = () => {
  const config = useConfig()
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
        footer: config.state.appname,
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
