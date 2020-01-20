import { createElement as element, FC } from 'react'
import { useLocalRouter, Modal, IconBar } from '@authpack/theme'
import { CreateTeam } from './CreateTeam'
import { UpdateTeam } from './UpdateTeam'
import { RemoveTeam } from './RemoveTeam'
import { ShowTeam } from './ShowTeam'
import { ListMemberships } from './ListMemberships'

export const RouterManagerTeam: FC<{
  id?: string
  change?: (id?: string) => void
  visible?: boolean
  close: () => void
}> = ({ id, change, close, visible }) => {
  const router = useLocalRouter({
    nomatch: id ? '/inspect' : '/create',
    options: id
      ? [
          { key: '/inspect', children: element(ShowTeam, { id }) },
          { key: '/update', children: element(UpdateTeam, { id, change }) },
          { key: '/remove', children: element(RemoveTeam, { id, change }) },
          {
            key: '/memberships',
            children: element(ListMemberships, { team_id: id }),
          },
        ]
      : [{ key: '/create', children: element(CreateTeam, { change }) }],
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
              icon: 'user-tag',
              label: 'Memberships',
              focused:
                !!router.current && router.current.key === '/memberships',
              click: () => router.change('/memberships'),
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
