import { createElement as element, FC } from 'react'
import { useLocalRouter, Modal, IconBar } from '@authpack/theme'
import { UpdateCluster } from './UpdateCluster'
import { UpdatePayment } from './UpdatePayment'
import { useUniversal } from '../hooks/useUniversal'
import { RemovePayment } from './RemovePayment'
import { ShowCluster } from './ShowCluster'
import { SwitchCluster } from './SwitchCluster'
import { ShowClusterKeys } from './ShowClusterKeys'
import { CreateCluster } from './CreateCluster'

export const RouterManagerCluster: FC<{
  visible?: boolean
  close: () => void
}> = ({ close, visible }) => {
  const universal = useUniversal()
  const router = useLocalRouter({
    nomatch: !universal.subscribed ? '/payment' : '/inspect',
    options: [
      {
        key: '/inspect',
        children: element(ShowCluster, {
          keys: () => router.change('/keys'),
        }),
      },
      {
        key: '/keys',
        children: element(ShowClusterKeys, {
          back: () => router.change('/inspect'),
        }),
      },
      { key: '/update', children: element(UpdateCluster) },
      {
        key: '/switch',
        children: element(SwitchCluster, {
          add: () => router.change('/create'),
        }),
      },
      {
        key: '/create',
        children: element(CreateCluster, {
          change: () => router.change('/inspect'),
        }),
      },
      {
        key: '/payment',
        children: element(UpdatePayment, {
          change: () => router.change('/inspect'),
          cancel: () => router.change('/cancel'),
        }),
      },
      {
        key: '/cancel',
        children: element(RemovePayment, {
          change: () => router.change('/inspect'),
        }),
      },
    ],
  })
  return element(Modal, {
    close,
    visible,
    children: element(IconBar, {
      children: router.current && router.current.children,
      icons: [
        !universal.subscribed && {
          icon: 'bolt',
          label: 'Payment',
          focused: !!router.current && router.current.key === '/payment',
          click: () => router.change('/payment'),
        },
        {
          icon: 'glasses',
          label: 'Inspect',
          focused: !!router.current && router.current.key === '/inspect',
          click: () => router.change('/inspect'),
        },
        {
          icon: 'key',
          label: 'API Keys',
          focused: !!router.current && router.current.key === '/keys',
          click: () => router.change('/keys'),
        },
        {
          icon: 'sliders-h',
          label: 'Update',
          focused: !!router.current && router.current.key === '/update',
          click: () => router.change('/update'),
        },
        {
          icon: 'random',
          label: 'Switch',
          focused: !!router.current && router.current.key === '/switch',
          click: () => router.change('/switch'),
        },
        !!universal.subscribed && {
          icon: 'wallet',
          label: 'Payment',
          focused: !!router.current && router.current.key === '/payment',
          click: () => router.change('/payment'),
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
