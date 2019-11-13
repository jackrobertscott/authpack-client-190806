import { createElement as create, FC, Fragment } from 'react'
import { useLocalRouter, Modal, Layout, IconBar } from 'wga-theme'
import { CreateTeam } from '../screens/CreateTeam'
import { UpdateTeam } from '../screens/UpdateTeam'
import { RemoveTeam } from '../screens/RemoveTeam'

export const RouterManagerTeam: FC<{
  id?: string
  change?: (id?: string) => void
  visible?: boolean
  close: () => void
}> = ({ id, change, close, visible }) => {
  const router = useLocalRouter({
    nomatch: id ? '/update' : '/create',
    options: id
      ? [
          { key: '/update', children: create(UpdateTeam, { id, change }) },
          { key: '/remove', children: create(RemoveTeam, { id, change }) },
        ]
      : [{ key: '/create', children: create(CreateTeam, { change }) }],
  })
  return create(Modal, {
    visible,
    children: create(Layout, {
      grow: true,
      children: [
        create(IconBar, {
          key: 'iconBar',
          icons: id
            ? [
                {
                  icon: 'sliders-h',
                  label: 'Update',
                  click: () => router.change('/update'),
                },
                {
                  icon: 'fire-alt',
                  label: 'Remove',
                  click: () => router.change('/remove'),
                },
                {
                  icon: 'times-circle',
                  label: 'Close',
                  click: close,
                  solid: false,
                  seperated: true,
                },
              ]
            : [
                {
                  icon: 'plus',
                  label: 'Create',
                  click: () => router.change('/create'),
                },
                {
                  icon: 'times-circle',
                  label: 'Close',
                  click: close,
                  solid: false,
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
