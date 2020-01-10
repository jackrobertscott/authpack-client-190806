import { createElement as element, FC, useEffect, useState } from 'react'
import { useLocalRouter, Modal, IconBar } from '@authpack/theme'
import { UpdateClusterClient } from './UpdateClusterClient'
import { ShowClusterClient } from './ShowClusterClient'
import { SwitchClusterClient } from './SwitchClusterClient'
import { ShowClusterKeysClient } from './ShowClusterKeysClient'
import { CreateClusterClient } from './CreateClusterClient'
import { UpdateClusterStripeClient } from './UpdateClusterStripeClient'
import { ListStripePlans } from './ListStripePlans'

export const RouterManagerClusterClient: FC<{
  visible?: boolean
  close: () => void
  goto?: string
}> = ({ close, visible, goto }) => {
  const [stripeProduct, stripeProductChange] = useState<string | undefined>()
  const router = useLocalRouter({
    nomatch: '/inspect',
    options: [
      {
        key: '/inspect',
        children: element(ShowClusterClient, {
          keys: () => router.change('/keys'),
        }),
      },
      {
        key: '/keys',
        children: element(ShowClusterKeysClient, {
          back: () => router.change('/inspect'),
        }),
      },
      { key: '/update', children: element(UpdateClusterClient) },
      {
        key: '/switch',
        children: element(SwitchClusterClient, {
          add: () => router.change('/create'),
        }),
      },
      {
        key: '/create',
        children: element(CreateClusterClient, {
          change: () => router.change('/inspect'),
        }),
      },
      {
        key: '/stripe',
        children: element(UpdateClusterStripeClient, {
          chooseProduct: id => stripeProductChange(id),
        }),
      },
      {
        key: '/stripe/plans',
        children: stripeProduct
          ? element(ListStripePlans, {
              stripe_product_id: stripeProduct,
            })
          : null,
      },
    ],
  })
  useEffect(() => {
    if (goto) router.change(goto)
    // eslint-disable-next-line
  }, [goto])
  useEffect(() => {
    if (stripeProduct) router.change('/stripe/plans')
    // eslint-disable-next-line
  }, [stripeProduct])
  const navigate = (go: string) => {
    if (stripeProduct) stripeProductChange(undefined)
    router.change(go)
  }
  return element(Modal, {
    close,
    visible,
    children: element(IconBar, {
      children: router.current && router.current.children,
      icons: [
        {
          icon: 'glasses',
          label: 'Inspect',
          focused: !!router.current && router.current.key === '/inspect',
          click: () => navigate('/inspect'),
        },
        {
          icon: 'sliders-h',
          label: 'Update',
          focused: !!router.current && router.current.key === '/update',
          click: () => navigate('/update'),
        },
        {
          icon: 'key',
          label: 'API Keys',
          focused: !!router.current && router.current.key === '/keys',
          click: () => navigate('/keys'),
        },
        {
          icon: 'piggy-bank',
          label: 'Accept Payments',
          focused: !!router.current && router.current.key.startsWith('/stripe'),
          click: () => navigate('/stripe'),
        },
        {
          icon: 'random',
          label: 'Switch',
          focused: !!router.current && router.current.key === '/switch',
          click: () => navigate('/switch'),
        },
        {
          icon: 'times-circle',
          label: 'Close',
          click: close,
          prefix: 'far',
          seperated: true,
        },
      ],
    }),
  })
}
