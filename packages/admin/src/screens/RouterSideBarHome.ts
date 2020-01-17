import {
  createElement as element,
  FC,
  useState,
  useEffect,
  Fragment,
} from 'react'
import { useRouter, SideBar } from '@authpack/theme'
import { useAuthpack } from '@authpack/react'
import { useUniversal } from '../hooks/useUniversal'
import { ListUsers } from './ListUsers'
import { ListProviders } from './ListProviders'
import { ListTeams } from './ListTeams'
import { ListWebhooks } from './ListWebhooks'
import { ListClusters } from './ListClusters'
import { UpdateClusterStripeClient } from './UpdateClusterStripeClient'
import { ListStripePlans } from './ListStripePlans'
import { UpdateClusterClient } from './UpdateClusterClient'
import { ShowClusterKeysClient } from './ShowClusterKeysClient'
import { RouterWizard } from '../wizard/RouterWizard'

export const RouterSideBarHome: FC<{
  openSettings: (key: string) => void
}> = ({ openSettings }) => {
  const auth = useAuthpack()
  const universal = useUniversal()
  const [wizard, wizardChange] = useState<boolean>(false)
  const [stripeProduct, stripeProductChange] = useState<
    { id: string; name?: string } | undefined
  >()
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
      { path: '/update', children: element(UpdateClusterClient) },
      {
        path: '/stripe',
        children: element(UpdateClusterStripeClient, {
          chooseProduct: (id, name) => stripeProductChange({ id, name }),
        }),
      },
      {
        path: '/stripe/plans',
        children: stripeProduct
          ? element(ListStripePlans, {
              stripe_product_id: stripeProduct.id,
              name: stripeProduct.name,
            })
          : null,
      },
      {
        path: '/keys',
        children: element(ShowClusterKeysClient),
      },
    ],
  })
  useEffect(() => {
    if (stripeProduct) router.change('/stripe/plans')
    // eslint-disable-next-line
  }, [stripeProduct])
  const navigate = (go: string) => {
    if (stripeProduct) stripeProductChange(undefined)
    router.change(go)
  }
  return element(SideBar, {
    key: 'sideBar',
    title: 'Home',
    footer: universal.cluster_name,
    children: [
      element(RouterWizard, {
        key: 'wizard',
        visible: wizard,
        close: () => wizardChange(false),
      }),
      router.current &&
        element(Fragment, {
          key: 'children',
          children: router.current.children,
        }),
    ],
    options: [
      {
        label: 'Menu',
        heading: true,
      },
      {
        icon: 'user-circle',
        label: 'Users',
        focused: !!router.current && router.current.path === '/users',
        click: () => navigate('/users'),
      },
      {
        icon: universal.cluster_stripe_pending ? 'plus' : 'donate',
        label: 'Payments',
        focused: !!router.current && router.current.path.startsWith('/stripe'),
        click: () => navigate('/stripe'),
      },
      {
        icon: 'users',
        label: 'Teams',
        focused: !!router.current && router.current.path === '/teams',
        click: () => navigate('/teams'),
      },
      !!auth.membership &&
        !!auth.membership.superadmin && {
          icon: 'server',
          label: 'Clusters',
          focused: !!router.current && router.current.path === '/clusters',
          click: () => navigate('/clusters'),
        },
      {
        label: 'More',
        heading: true,
      },
      {
        icon: 'sliders-h',
        label: 'Settings',
        focused: !!router.current && router.current.path === '/update',
        click: () => navigate('/update'),
      },
      {
        icon: 'key',
        label: 'API Keys',
        focused: !!router.current && router.current.path === '/keys',
        click: () => navigate('/keys'),
      },
      {
        icon: 'facebook',
        prefix: 'fab',
        label: 'Social Providers',
        focused: !!router.current && router.current.path === '/providers',
        click: () => navigate('/providers'),
      },
      {
        icon: 'sitemap',
        label: 'Webhooks',
        focused: !!router.current && router.current.path === '/webhooks',
        click: () => navigate('/webhooks'),
      },
      {
        icon: 'hat-wizard',
        label: 'Wizard',
        click: () => wizardChange(!wizard),
      },
    ],
  })
}
