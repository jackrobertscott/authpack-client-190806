import { createElement as create, FC, Fragment, useState } from 'react'
import { Layout, IconBar, useRouter } from 'wga-theme'
import { RouterSideBarHome } from './RouterSideBarHome'
import { RouterSideBarCustomize } from './RouterSideBarCustomize'
import { RouterSideBarDeveloper } from './RouterSideBarDeveloper'
import { wga } from '../utils/wga'
import { Power } from '../screens/Power'
import { RouterManagerApp } from './RouterManagerApp'

export const RouterCentral: FC = () => {
  const [apper, apperChange] = useState<boolean>(false)
  const [power, powerChange] = useState<boolean>(false)
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
            focused: !!router.current && router.current.path === '/app',
            click: () => router.change('/app'),
          },
          {
            icon: 'sliders-h',
            label: 'Customize',
            focused: !!router.current && router.current.path === '/customize',
            click: () => router.change('/customize'),
          },
          {
            icon: 'code',
            label: 'Developer',
            focused: !!router.current && router.current.path === '/developer',
            click: () => router.change('/developer'),
          },
          {
            seperated: true,
            icon: 'bolt',
            label: 'Power',
            click: () => powerChange(!power),
          },
          {
            icon: 'cog',
            label: 'Settings',
            click: () => apperChange(!apper),
          },
          {
            icon: 'user-circle',
            label: 'Account',
            click: () => wga.show(),
          },
        ].map(({ click, ...rest }) => ({
          ...rest,
          click: () => {
            powerChange(false)
            click()
          },
        })),
      }),
      create(RouterManagerApp, {
        key: 'settings',
        visible: apper,
        close: () => apperChange(false),
      }),
      power
        ? create(Power, {
            key: 'power',
            close: () => powerChange(false),
          })
        : router.current &&
          create(Fragment, {
            key: 'children',
            children: router.current.children,
          }),
    ],
  })
}
