import { createElement as create, FC, Fragment } from 'react'
import { useRouter, SideBar } from 'wga-theme'
import { useGlobal } from '../hooks/useGlobal'

export const RouterSideBarDeveloper: FC = () => {
  const config = useGlobal()
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
        footer: config.appname,
        options: [
          {
            icon: 'globe-americas',
            label: 'Explorer',
            click: () => router.change('/explorer'),
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
