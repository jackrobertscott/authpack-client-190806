import { createElement as create, FC, Fragment } from 'react'
import { useRouter, SideBar } from 'wga-theme'
import { useUniversal } from '../hooks/useUniversal'
import { ListPermissions } from './ListPermissions'
import { ListProviders } from './ListProviders'

export const RouterSideBarCustomize: FC = () => {
  const config = useUniversal()
  const router = useRouter({
    base: '/customize',
    nomatch: '/providers',
    options: [
      { path: '/providers', children: create(ListProviders) },
      { path: '/permissions', children: create(ListPermissions) },
    ],
  })
  return create(Fragment, {
    children: [
      create(SideBar, {
        key: 'sideBar',
        title: 'Customize',
        footer: config.cluster_name,
        options: [
          {
            icon: 'handshake',
            label: 'Providers',
            focused: !!router.current && router.current.path === '/providers',
            click: () => router.change('/providers'),
          },
          {
            icon: 'user-shield',
            label: 'Permissions',
            focused: !!router.current && router.current.path === '/permissions',
            click: () => router.change('/permissions'),
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
