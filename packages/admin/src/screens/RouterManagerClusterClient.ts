import { createElement as element, FC, useEffect } from 'react'
import { useLocalRouter, Modal, IconBar } from '@authpack/theme'
import { UpdateClusterClient } from './UpdateClusterClient'
import { ShowClusterClient } from './ShowClusterClient'
import { SwitchClusterClient } from './SwitchClusterClient'
import { ShowClusterKeysClient } from './ShowClusterKeysClient'
import { CreateClusterClient } from './CreateClusterClient'
import { UpdateClusterStripeClient } from './UpdateClusterStripeClient'

export const RouterManagerClusterClient: FC<{
  visible?: boolean
  close: () => void
  goto?: string
}> = ({ close, visible, goto }) => {
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
        children: element(UpdateClusterStripeClient),
      },
    ],
  })
  useEffect(() => {
    if (goto) {
      console.log(goto)
      router.change(goto)
    }
    // eslint-disable-next-line
  }, [goto])
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
          click: () => router.change('/inspect'),
        },
        {
          icon: 'sliders-h',
          label: 'Update',
          focused: !!router.current && router.current.key === '/update',
          click: () => router.change('/update'),
        },
        {
          icon: 'key',
          label: 'API Keys',
          focused: !!router.current && router.current.key === '/keys',
          click: () => router.change('/keys'),
        },
        {
          icon: 'piggy-bank',
          label: 'Accept Payments',
          focused: !!router.current && router.current.key === '/stripe',
          click: () => router.change('/stripe'),
        },
        {
          icon: 'random',
          label: 'Switch',
          focused: !!router.current && router.current.key === '/switch',
          click: () => router.change('/switch'),
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
