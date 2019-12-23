import { createElement as element, FC } from 'react'
import { useLocalRouter, Modal, IconBar } from '@authpack/theme'
import { CreateRole } from './CreateRole'
import { UpdateRole } from './UpdateRole'
import { RemoveRole } from './RemoveRole'
import { ShowRole } from './ShowRole'

export const RouterManagerRole: FC<{
  id?: string
  change?: (id?: string) => void
  visible?: boolean
  close: () => void
}> = ({ id, change, close, visible }) => {
  const router = useLocalRouter({
    nomatch: id ? '/inspect' : '/create',
    options: id
      ? [
          { key: '/inspect', children: element(ShowRole, { id }) },
          {
            key: '/update',
            children: element(UpdateRole, { id, change }),
          },
          {
            key: '/remove',
            children: element(RemoveRole, { id, change }),
          },
        ]
      : [{ key: '/create', children: element(CreateRole, { change }) }],
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
              icon: 'plus',
              label: 'Create',
              focused: !!router.current && router.current.key === '/create',
              click: () => router.change('/create'),
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
