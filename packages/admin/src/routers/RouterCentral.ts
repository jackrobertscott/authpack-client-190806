import { createElement as create, FC, Fragment, useState } from 'react'
import { Layout, IconBar, useRouter } from 'wga-theme'
import { RouterSideBarHome } from './RouterSideBarHome'
import { RouterSideBarSettings } from './RouterSideBarSettings'
import { RouterSideBarDeveloper } from './RouterSideBarDeveloper'
import { wga } from '../utils/gadgets'
import { Power } from '../screens/Power'

export const RouterCentral: FC = () => {
  const [open, openChange] = useState<boolean>(false)
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
            icon: 'search',
            label: 'Developer',
            click: () => router.change('/developer'),
          },
          {
            seperated: true,
            icon: 'power-off',
            label: 'Power',
            click: () => openChange(!open),
          },
          {
            icon: 'user-circle',
            label: 'Personal Settings',
            click: () => wga.show(),
          },
        ],
      }),
      open
        ? create(Power, {
            key: 'power',
            close: () => openChange(false),
          })
        : router.current &&
          create(Fragment, {
            key: 'children',
            children: router.current.children,
          }),
    ],
  })
}
