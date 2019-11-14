import { createElement as create, FC, Fragment } from 'react'
import { useLocalRouter, Modal, Layout, IconBar } from 'wga-theme'
import { CreateSession } from '../screens/CreateSession'
import { UpdateSession } from '../screens/UpdateSession'
import { RemoveSession } from '../screens/RemoveSession'
import { ShowSession } from '../screens/ShowSession'

export const RouterManagerSession: FC<{
  id?: string
  change?: (id?: string) => void
  visible?: boolean
  close: () => void
}> = ({ id, change, close, visible }) => {
  const router = useLocalRouter({
    nomatch: id ? '/inspect' : '/create',
    options: id
      ? [
          { key: '/inspect', children: create(ShowSession, { id }) },
          { key: '/update', children: create(UpdateSession, { id, change }) },
          { key: '/remove', children: create(RemoveSession, { id, change }) },
        ]
      : [{ key: '/create', children: create(CreateSession, { change }) }],
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
                  icon: 'fire-alt',
                  label: 'Remove',
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
        router.current &&
          create(Fragment, {
            key: 'children',
            children: router.current.children,
          }),
      ],
    }),
  })
}
