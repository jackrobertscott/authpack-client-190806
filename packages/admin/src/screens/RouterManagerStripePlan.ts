import { createElement as element, FC } from 'react'
import { useLocalRouter, Modal, IconBar } from '@authpack/theme'
import { CreateStripePlan } from './CreateStripePlan'
import { UpdateStripePlan } from './UpdateStripePlan'
import { RemoveStripePlan } from './RemoveStripePlan'
import { ShowStripePlan } from './ShowStripePlan'

export const RouterManagerStripePlan: FC<{
  id?: string
  change?: (id?: string) => void
  visible?: boolean
  close: () => void
  stripe_product_id: string
}> = ({ id, change, close, visible, stripe_product_id }) => {
  const router = useLocalRouter({
    nomatch: id ? '/inspect' : '/create',
    options: id
      ? [
          { key: '/inspect', children: element(ShowStripePlan, { id }) },
          {
            key: '/update',
            children: element(UpdateStripePlan, { id, change }),
          },
          {
            key: '/remove',
            children: element(RemoveStripePlan, { id, change }),
          },
        ]
      : [
          {
            key: '/create',
            children: element(CreateStripePlan, {
              stripe_product_id,
              change,
            }),
          },
        ],
  })
  return element(Modal, {
    close,
    visible,
    children: element(IconBar, {
      children: router.current && router.current.children,
      icons: id
        ? [
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
              icon: 'trash-alt',
              label: 'Remove',
              focused: !!router.current && router.current.key === '/remove',
              click: () => router.change('/remove'),
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
