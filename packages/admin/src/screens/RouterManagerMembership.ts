import { createElement as element, FC } from 'react'
import { useLocalRouter, Modal, IconBar } from '@authpack/theme'
import { CreateMembership } from './CreateMembership'
import { UpdateMembership } from './UpdateMembership'
import { RemoveMembership } from './RemoveMembership'
import { ShowMembership } from './ShowMembership'

export const RouterManagerMembership: FC<{
  id?: string
  change?: (id?: string) => void
  visible?: boolean
  close: () => void
  user_id?: string
  team_id?: string
}> = ({ id, change, close, visible, user_id, team_id }) => {
  const router = useLocalRouter({
    nomatch: id ? '/update' : '/create',
    options: id
      ? [
          { key: '/inspect', children: element(ShowMembership, { id }) },
          {
            key: '/update',
            children: element(UpdateMembership, { id, change }),
          },
          {
            key: '/remove',
            children: element(RemoveMembership, { id, change }),
          },
        ]
      : [
          {
            key: '/create',
            children: element(CreateMembership, {
              user_id,
              team_id,
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
              icon: 'arrow-alt-circle-left',
              label: 'Close',
              click: close,
              prefix: 'far',
              seperated: true,
            },
          ]
        : [
            {
              icon: 'arrow-alt-circle-left',
              label: 'Close',
              click: close,
              prefix: 'far',
              seperated: true,
            },
          ],
    }),
  })
}
