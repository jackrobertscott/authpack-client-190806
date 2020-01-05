import { createElement as element, FC } from 'react'
import { useRouter, SideBar } from '@authpack/theme'
import { useUniversal } from '../hooks/useUniversal'
import { ListUsers } from './ListUsers'
import { ListProviders } from './ListProviders'
import { ListTeams } from './ListTeams'
import { ListWebhooks } from './ListWebhooks'
import { ListPlans } from './ListPlan'
import { ListSubscriptions } from './ListSubscriptions'
import { ListCoupons } from './ListCoupons'
import { ListClusters } from './ListClusters'
import { useAuthpackCurrent } from '../utils/authpack'

export const RouterSideBarHome: FC = () => {
  const current = useAuthpackCurrent()
  const universal = useUniversal()
  const router = useRouter({
    base: '/app',
    nomatch: '/users',
    options: [
      {
        path: '/clusters',
        children:
          current.membership && current.membership.superadmin
            ? element(ListClusters)
            : null,
      },
      { path: '/users', children: element(ListUsers) },
      { path: '/teams', children: element(ListTeams) },
      { path: '/plans', children: element(ListPlans) },
      { path: '/subscriptions', children: element(ListSubscriptions) },
      { path: '/coupons', children: element(ListCoupons) },
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
      !!current.membership &&
        !!current.membership.superadmin && {
          icon: 'server',
          label: 'Clusters',
          focused: !!router.current && router.current.path === '/clusters',
          click: () => router.change('/clusters'),
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
      {
        icon: 'donate',
        label: 'Plans',
        focused: !!router.current && router.current.path === '/plans',
        click: () => router.change('/plans'),
      },
      {
        icon: 'user-tag',
        label: 'Subscriptions',
        focused: !!router.current && router.current.path === '/subscriptions',
        click: () => router.change('/subscriptions'),
      },
      {
        icon: 'tags',
        label: 'Coupons',
        focused: !!router.current && router.current.path === '/coupons',
        click: () => router.change('/coupons'),
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
