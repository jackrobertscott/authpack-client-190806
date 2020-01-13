import { createElement as element, FC } from 'react'
import { useRouter, SideBar } from '@authpack/theme'
import { useAuthpack } from '@authpack/react'
import { useUniversal } from '../hooks/useUniversal'
import { ListUsers } from './ListUsers'
import { ListProviders } from './ListProviders'
import { ListTeams } from './ListTeams'
import { ListWebhooks } from './ListWebhooks'
import { ListClusters } from './ListClusters'

export const RouterSideBarHome: FC<{
  openSettings: (key: string) => void
}> = ({ openSettings }) => {
  const auth = useAuthpack()
  const universal = useUniversal()
  const router = useRouter({
    base: '/app',
    nomatch: '/users',
    options: [
      {
        path: '/clusters',
        children:
          auth.membership && auth.membership.superadmin
            ? element(ListClusters)
            : null,
      },
      { path: '/users', children: element(ListUsers) },
      { path: '/teams', children: element(ListTeams) },
      { path: '/providers', children: element(ListProviders) },
      { path: '/webhooks', children: element(ListWebhooks) },
    ],
  })
  return element(SideBar, {
    key: 'sideBar',
    title: 'Home',
    footer: universal.cluster_name,
    children: router.current && router.current.children,
    options: [
      {
        label: 'Menu',
        heading: true,
      },
      {
        icon: 'user-circle',
        label: 'Users',
        focused: !!router.current && router.current.path === '/users',
        click: () => router.change('/users'),
      },
      {
        icon: 'users',
        label: 'Teams',
        focused: !!router.current && router.current.path === '/teams',
        click: () => router.change('/teams'),
      },
      !!auth.membership &&
        !!auth.membership.superadmin && {
          icon: 'server',
          label: 'Clusters',
          focused: !!router.current && router.current.path === '/clusters',
          click: () => router.change('/clusters'),
        },
      {
        icon: 'sliders-h',
        label: 'Settings',
        heading: true,
        click: () => openSettings('/update'),
      },
      {
        icon: 'key',
        label: 'API Keys',
        click: () => openSettings('/keys'),
      },
      {
        icon: universal.cluster_stripe_pending ? 'plus' : 'donate',
        label: 'Payments',
        click: () => openSettings('/stripe'),
      },
      {
        icon: 'sitemap',
        label: 'Webhooks',
        focused: !!router.current && router.current.path === '/webhooks',
        click: () => router.change('/webhooks'),
      },
      {
        icon: 'plug',
        label: 'Providers',
        focused: !!router.current && router.current.path === '/providers',
        click: () => router.change('/providers'),
      },
    ],
  })
}
