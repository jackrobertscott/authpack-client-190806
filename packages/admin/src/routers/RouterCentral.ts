import { createElement as create, FC, Fragment, useState } from 'react'
import { Layout, IconBar, useRouter } from 'wga-theme'
import { RouterSideBarHome } from './RouterSideBarHome'
import { RouterSideBarCustomize } from './RouterSideBarCustomize'
import { RouterSideBarDeveloper } from './RouterSideBarDeveloper'
import { wga } from '../utils/gadgets'
import { Power } from '../screens/Power'

export const RouterCentral: FC = () => {
  const [open, openChange] = useState<boolean>(false)
  const router = useRouter({
    nomatch: '/app',
    options: [
      { path: '/app', children: create(RouterSideBarHome) },
      { path: '/customize', children: create(RouterSideBarCustomize) },
      { path: '/developer', children: create(RouterSideBarDeveloper) },
    ],
  })
  return create(Layout, {
    grow: true,
    children: [
      create(IconBar, {
        key: 'iconBar',
        icons: [
          {
            icon: 'home',
            label: 'Home',
            click: () => router.change('/app'),
          },
          {
            icon: 'sliders-h',
            label: 'Customize',
            click: () => router.change('/customize'),
          },
          {
            icon: 'code',
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
            icon: 'cog',
            label: 'Settings',
            click: () => openChange(!open),
          },
          {
            icon: 'user-circle',
            label: 'Account',
            click: () => wga.show(),
          },
        ].map(({ click, ...rest }) => ({
          ...rest,
          click: () => {
            openChange(false)
            click()
          },
        })),
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
