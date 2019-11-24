import { createElement as create, FC, Fragment } from 'react'
import { useLocalRouter, Modal, Layout, IconBar } from 'wga-theme'
import { UpdateCluster } from './UpdateCluster'
import { UpdatePayment } from './UpdatePayment'
import { useUniversal } from '../hooks/useUniversal'
import { RemovePayment } from './RemovePayment'
import { ShowCluster } from './ShowCluster'

export const RouterManagerCluster: FC<{
  visible?: boolean
  close: () => void
}> = ({ close, visible }) => {
  const universal = useUniversal()
  const router = useLocalRouter({
    nomatch: universal.subscribed ? '/inspect' : '/payment',
    options: [
      { key: '/inspect', children: create(ShowCluster) },
      { key: '/update', children: create(UpdateCluster) },
      {
        key: '/payment',
        children: create(UpdatePayment, {
          change: () => router.change('/inspect'),
        }),
      },
      {
        key: '/cancel',
        children: create(RemovePayment, {
          change: () => router.change('/inspect'),
        }),
      },
    ],
  })
  return create(Modal, {
    close,
    visible,
    children: create(Layout, {
      grow: true,
      children: [
        create(IconBar, {
          key: 'iconBar',
          icons: universal.subscribed
            ? [
                {
                  icon: 'glasses',
                  label: 'Inspect',
                  focused:
                    !!router.current && router.current.key === '/inspect',
                  click: () => router.change('/inspect'),
                },
                {
                  icon: 'sliders-h',
                  label: 'Update',
                  focused: !!router.current && router.current.key === '/update',
                  click: () => router.change('/update'),
                },
                {
                  icon: 'piggy-bank',
                  label: 'Payment',
                  focused:
                    !!router.current && router.current.key === '/payment',
                  click: () => router.change('/payment'),
                },
                {
                  icon: 'fire-alt',
                  label: 'Danger',
                  focused: !!router.current && router.current.key === '/cancel',
                  click: () => router.change('/cancel'),
                },
                {
                  icon: 'times-circle',
                  label: 'Close',
                  click: close,
                  prefix: 'far',
                  seperated: true,
                },
              ]
            : [
                {
                  icon: 'glasses',
                  label: 'Inspect',
                  focused:
                    !!router.current && router.current.key === '/inspect',
                  click: () => router.change('/inspect'),
                },
                {
                  icon: 'sliders-h',
                  label: 'Update',
                  focused: !!router.current && router.current.key === '/update',
                  click: () => router.change('/update'),
                },
                {
                  icon: 'wallet',
                  label: 'Payment',
                  focused:
                    !!router.current && router.current.key === '/payment',
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
        router.current &&
          create(Fragment, {
            key: 'children',
            children: router.current.children,
          }),
      ],
    }),
  })
}
