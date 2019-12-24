import { createElement as element, FC } from 'react'
import { useRouter, SideBar } from '@authpack/theme'
import { useUniversal } from '../hooks/useUniversal'
import { ListUsers } from './ListUsers'
import { ListProviders } from './ListProviders'
import { ListTeams } from './ListTeams'
import { ListWebhooks } from './ListWebhooks'
import { ListPlans } from './ListPlan'

export const RouterSideBarHome: FC = () => {
  const universal = useUniversal()
  const router = useRouter({
    base: '/app',
    nomatch: '/users',
    options: [
      { path: '/users', children: element(ListUsers) },
      { path: '/teams', children: element(ListTeams) },
      { path: '/plans', children: element(ListPlans) },
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
      {
        icon: 'donate',
        label: 'Plans',
        focused: !!router.current && router.current.path === '/plans',
        click: () => router.change('/plans'),
      },
      {
        icon: 'plug',
        label: 'Providers',
        focused: !!router.current && router.current.path === '/providers',
        click: () => router.change('/providers'),
      },
      {
        icon: 'sitemap',
        label: 'Webhooks',
        focused: !!router.current && router.current.path === '/webhooks',
        click: () => router.change('/webhooks'),
      },
    ],
  })
}
