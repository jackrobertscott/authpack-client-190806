import { createElement as element, FC, Fragment, useState } from 'react'
import { IconBar, useRouter } from '@authpack/theme'
import { RouterSideBarHome } from './RouterSideBarHome'
import { RouterManagerClusterClient } from './RouterManagerClusterClient'
import { Explorer } from './Explorer'
import { usePreferences } from '../utils/preferences'
import { authpack } from '../utils/authpack'

export const RouterCentral: FC = () => {
  const preferences = usePreferences()
  const [appear, appearChange] = useState<boolean>(false)
  const [goto, gotoChange] = useState<string | undefined>()
  const router = useRouter({
    nomatch: '/app',
    options: [
      {
        path: '/app',
        children: element(RouterSideBarHome, {
          openSettings: key => {
            gotoChange(key)
            appearChange(true)
          },
        }),
      },
      { path: '/explorer', children: element(Explorer) },
    ],
  })
  return element(IconBar, {
    children: [
      element(RouterManagerClusterClient, {
        key: 'cluster',
        visible: appear,
        close: () => appearChange(false),
        goto,
      }),
      router.current &&
        element(Fragment, {
          key: 'children',
          children: router.current.children,
        }),
    ],
    icons: [
      {
        icon: 'home',
        label: 'Home',
        helper: 'Users, Teams and Payments',
        focused: !!router.current && router.current.path.startsWith('/app'),
        click: () => router.change('/app'),
      },
      {
        icon: 'globe-asia',
        label: 'Explorer',
        helper: 'Explore the GraphQL API',
        focused: !!router.current && router.current.path === '/explorer',
        click: () => router.change('/explorer'),
        hidesmall: true,
      },
      {
        icon: preferences.theme === 'snow_storm' ? 'toggle-off' : 'toggle-on',
        label: 'Dark Mode',
        click: () =>
          preferences.update({
            theme:
              preferences.theme === 'snow_storm' ? 'night_sky' : 'snow_storm',
          }),
      },
      {
        icon: 'comment-alt',
        prefix: 'far',
        label: 'Feedback',
        helper: 'New Features and Bugs',
        seperated: true,
        click: () => {
          const go = 'https://github.com/jackrobertscott/authpack-client/issues'
          window.open(go)
        },
      },
      {
        icon: 'random',
        label: 'Switch',
        helper: 'Change the Database Cluster',
        click: () => appearChange(!appear),
      },
      {
        icon: 'user-circle',
        label: 'Account',
        click: () => authpack.open(),
      },
    ],
  })
}
