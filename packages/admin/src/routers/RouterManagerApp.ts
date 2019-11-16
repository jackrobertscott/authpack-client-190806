import { createElement as create, FC, Fragment } from 'react'
import { useLocalRouter, Modal, Layout, IconBar } from 'wga-theme'
import { UpdateApp } from '../screens/UpdateApp'
import { UpdatePayment } from '../screens/UpdatePayment'
import { useUniversal } from '../hooks/useUniversal'
import { RemovePayment } from '../screens/RemovePayment'
import { ShowApp } from '../screens/ShowApp'

export const RouterManagerApp: FC<{
  visible?: boolean
  close: () => void
}> = ({ close, visible }) => {
  const universal = useUniversal()
  const router = useLocalRouter({
    nomatch: '/inspect',
    options: [
      { key: '/inspect', children: create(ShowApp) },
      { key: '/update', children: create(UpdateApp) },
      { key: '/payment', children: create(UpdatePayment) },
      { key: '/cancel', children: create(RemovePayment) },
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
                  click: () => router.change('/inspect'),
                },
                {
                  icon: 'sliders-h',
                  label: 'Update',
                  click: () => router.change('/update'),
                },
                {
                  icon: 'piggy-bank',
                  label: 'Payment',
                  click: () => router.change('/payment'),
                },
                {
                  icon: 'fire-alt',
                  label: 'Danger Zone',
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
                  click: () => router.change('/inspect'),
                },
                {
                  icon: 'sliders-h',
                  label: 'Update',
                  click: () => router.change('/update'),
                },
                {
                  icon: 'piggy-bank',
                  label: 'Payment',
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
