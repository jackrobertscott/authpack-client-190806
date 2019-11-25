import { createElement as create, FC, Fragment } from 'react'
import { useLocalRouter, Modal, Layout, IconBar } from 'wga-theme'
import { CreateUser } from './CreateUser'
import { UpdateUser } from './UpdateUser'
import { RemoveUser } from './RemoveUser'
import { UpdateUserPassword } from './UpdateUserPassword'
import { ShowUser } from './ShowUser'
import { ListSessions } from './ListSessions'
import { ListMembershipsOfUser } from './ListMembershipsOfUser'

export const RouterManagerUser: FC<{
  id?: string
  change?: (id?: string) => void
  visible?: boolean
  close: () => void
}> = ({ id, change, close, visible }) => {
  const router = useLocalRouter({
    nomatch: id ? '/inspect' : '/create',
    options: id
      ? [
          { key: '/inspect', children: create(ShowUser, { id }) },
          { key: '/update', children: create(UpdateUser, { id, change }) },
          {
            key: '/update/password',
            children: create(UpdateUserPassword, { id, change }),
          },
          {
            key: '/memberships',
            children: create(ListMembershipsOfUser, { user_id: id }),
          },
          { key: '/sessions', children: create(ListSessions, { user_id: id }) },
          { key: '/remove', children: create(RemoveUser, { id, change }) },
        ]
      : [{ key: '/create', children: create(CreateUser, { change }) }],
  })
  return create(Modal, {
    close,
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
                  icon: 'unlock',
                  label: 'Change Password',
                  focused:
                    !!router.current &&
                    router.current.key === '/update/password',
                  click: () => router.change('/update/password'),
                },
                {
                  icon: 'user-tag',
                  label: 'Memberships',
                  focused:
                    !!router.current && router.current.key === '/memberships',
                  click: () => router.change('/memberships'),
                },
                {
                  icon: 'history',
                  label: 'Sessions',
                  focused:
                    !!router.current && router.current.key === '/sessions',
                  click: () => router.change('/sessions'),
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
        router.current &&
          create(Fragment, {
            key: 'children',
            children: router.current.children,
          }),
      ],
    }),
  })
}
