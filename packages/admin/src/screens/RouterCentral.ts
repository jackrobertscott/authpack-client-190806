import { createElement as create, FC, Fragment, useState } from 'react'
import { IconBar, useRouter } from 'wga-theme'
import { wga } from '../utils/wga'
import { RouterSideBarHome } from './RouterSideBarHome'
import { RouterManagerCluster } from './RouterManagerCluster'
import { Explorer } from './Explorer'
import { useUniversal } from '../hooks/useUniversal'

export const RouterCentral: FC = () => {
  const universal = useUniversal()
  const [apper, apperChange] = useState<boolean>(false)
  const router = useRouter({
    nomatch: '/app',
    options: [
      { path: '/app', children: create(RouterSideBarHome) },
      { path: '/developers', children: create(Explorer) },
    ],
  })
  return create(IconBar, {
    children: [
      create(RouterManagerCluster, {
        key: 'cluster',
        visible: apper,
        close: () => apperChange(false),
      }),
      router.current &&
        create(Fragment, {
          key: 'children',
          children: router.current.children,
        }),
    ],
    icons: [
      {
        icon: 'home',
        label: 'Home',
        focused: !!router.current && router.current.path === '/users',
        click: () => router.change('/users'),
      },
      {
        icon: 'code',
        label: 'Developers',
        focused: !!router.current && router.current.path === '/developers',
        click: () => router.change('/developers'),
      },
      !universal.subscribed && {
        icon: 'exclamation-circle',
        label: 'Limited Usage',
        helper:
          'Limited to a maximum of 50 users - add payment card to remove all limits',
        click: () => apperChange(!apper),
      },
      {
        icon: 'cog',
        label: 'Settings',
        click: () => apperChange(!apper),
        seperated: true,
      },
      {
        icon: 'user-circle',
        label: 'Account',
        click: () => wga.show(),
      },
    ],
  })
}
