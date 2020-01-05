import { createElement as element, FC, Fragment, useState } from 'react'
import { IconBar, useRouter } from '@authpack/theme'
import { RouterSideBarHome } from './RouterSideBarHome'
import { RouterManagerClusterClient } from './RouterManagerClusterClient'
import { Explorer } from './Explorer'
import { usePreferences } from '../utils/preferences'
import { authpack, useAuthpackCurrent } from '../utils/authpack'

export const RouterCentral: FC = () => {
  const current = useAuthpackCurrent()
  const preferences = usePreferences()
  const [apper, apperChange] = useState<boolean>(false)
  const router = useRouter({
    nomatch: '/app',
    options: [
      { path: '/app', children: element(RouterSideBarHome) },
      { path: '/developers', children: element(Explorer) },
    ],
  })
  return element(IconBar, {
    children: [
      element(RouterManagerClusterClient, {
        key: 'cluster',
        visible: apper,
        close: () => apperChange(false),
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
        focused: !!router.current && router.current.path.startsWith('/app'),
        click: () => router.change('/app'),
      },
      !!current.membership &&
        !!current.membership.superadmin && {
          icon: 'code',
          label: 'Developers',
          focused: !!router.current && router.current.path === '/developers',
          click: () => router.change('/developers'),
          hidesmall: true,
        },
      {
        prefix: 'far',
        icon: 'question-circle',
        label: 'Help & Feedback',
        hidesmall: true,
        options: [
          {
            icon: 'book',
            label: 'Documents',
            helper: 'See installation instructions',
            click: () =>
              window.open(
                'https://github.com/jackrobertscott/authpack-client/wiki'
              ),
          },
          {
            icon: 'bug',
            label: 'Bug',
            helper: 'Report an problem',
            click: () =>
              window.open(
                'https://github.com/jackrobertscott/authpack-client/issues'
              ),
          },
          {
            icon: 'magic',
            label: 'Feedback',
            helper: 'Request a new feature',
            click: () =>
              window.open(
                'https://github.com/jackrobertscott/authpack-client/issues'
              ),
          },
        ],
      },
      {
        icon: preferences.theme === 'snow_storm' ? 'toggle-off' : 'toggle-on',
        label: 'Dark Mode',
        click: () =>
          preferences.update({
            theme:
              preferences.theme === 'snow_storm' ? 'night_sky' : 'snow_storm',
          }),
        seperated: true,
      },
      {
        icon: 'cog',
        label: 'Settings',
        click: () => apperChange(!apper),
      },
      {
        icon: 'user-circle',
        label: 'Account',
        click: () => authpack.plugin.show(),
      },
    ],
  })
}
