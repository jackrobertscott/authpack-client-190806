import { createElement as create, FC } from 'react'
import { Layout, IconBar, useRouter } from 'wga-theme'
import { RouterSideBarHome } from './RouterSideBarHome'
import { RouterSideBarSettings } from './RouterSideBarSettings'
import { RouterSideBarDeveloper } from './RouterSideBarDeveloper'
import { GlobalStore } from '../utils/global'
import { useGlobal } from '../hooks/useGlobal'
import { wga } from '../utils/gadgets'

export const RouterCentral: FC = () => {
  const global = useGlobal()
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
            icon: 'code',
            label: 'Dev Mode',
            click: () =>
              GlobalStore.change((old: any) => ({
                ...old,
                devmode: !global.devmode,
              })),
          },
          {
            icon: 'user-circle',
            label: 'Personal Settings',
            click: () => wga.show(),
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
