import { createElement as create, FC, Fragment } from 'react'
import { useRouter, SideBar } from 'wga-theme'
import { useUniversal } from '../hooks/useUniversal'
import { ListUsers } from './ListUsers'
import { ListProviders } from './ListProviders'

export const RouterSideBarUsers: FC = () => {
  const universal = useUniversal()
  const router = useRouter({
    base: '/users',
    nomatch: '/',
    options: [
      { path: '/', children: create(ListUsers) },
      { path: '/providers', children: create(ListProviders) },
    ],
  })
  return create(Fragment, {
    children: [
      create(SideBar, {
        key: 'sideBar',
        title: 'Users',
        footer: universal.cluster_name,
        options: [
          {
            icon: 'user-circle',
            label: 'See users',
            focused: !!router.current && router.current.path === '/',
            click: () => router.change('/'),
          },
          {
            icon: 'share-alt',
            label: 'See oauth providers',
            focused: !!router.current && router.current.path === '/providers',
            click: () => router.change('/providers'),
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
