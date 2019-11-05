import { createElement as create, FC } from 'react'
import { Layout, IconBar, useRouter } from 'wga-theme'
import { RouterSideBarHome } from './RouterSideBarHome'
import { RouterSideBarSettings } from './RouterSideBarSettings'
import { RouterSideBarDeveloper } from './RouterSideBarDeveloper'
import { useConfig } from '../hooks/useConfig'
import { wga } from '../utils/wga'

export const RouterCentral: FC = () => {
  const config = useConfig()
  const router = useRouter({
    nomatch: '/home',
    options: [
      { path: '/home', children: create(RouterSideBarHome) },
      { path: '/settings', children: create(RouterSideBarSettings) },
      { path: '/developer', children: create(RouterSideBarDeveloper) },
    ],
  })
  return create(Layout, {
    children: [
      create(IconBar, {
        key: 'iconBar',
        icons: [
          {
            icon: 'home',
            label: 'Home',
            click: () => router.change('/home'),
          },
          {
            icon: 'cog',
            label: 'Settings',
            click: () => router.change('/settings'),
          },
          {
            icon: 'code',
            label: 'Developer',
            click: () => router.change('/developer'),
          },
          {
            seperated: true,
            icon: 'bolt',
            label: 'Dev Mode',
            click: () =>
              config.change((old: any) => ({
                ...old,
                devmode: !config.state.devmode,
              })),
          },
          {
            icon: 'user-circle',
            label: 'Personal Settings',
            click: () => wga.open(),
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
