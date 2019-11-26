import { createElement as create, FC, Fragment } from 'react'
import { useRouter, SideBar } from 'wga-theme'
import { useUniversal } from '../hooks/useUniversal'
import { Explorer } from './Explorer'

export const RouterSideBarDevelopers: FC = () => {
  const universal = useUniversal()
  const router = useRouter({
    base: '/developers',
    nomatch: '/explorer',
    options: [{ path: '/explorer', children: create(Explorer) }],
  })
  return create(Fragment, {
    children: [
      create(SideBar, {
        key: 'sideBar',
        title: 'Developers',
        footer: universal.cluster_name,
        options: [
          {
            icon: 'globe-americas',
            label: 'Explorer',
            focused: !!router.current && router.current.path === '/explorer',
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
