import { createElement as element, FC } from 'react'
import { useLocalRouter, Modal, IconBar } from '@authpack/theme'
import { CreateUser } from './CreateUser'
import { UpdateUser } from './UpdateUser'
import { RemoveUser } from './RemoveUser'
import { UpdateUserPassword } from './UpdateUserPassword'
import { ShowUser } from './ShowUser'
import { ListSessions } from './ListSessions'
import { ListMemberships } from './ListMemberships'
import { UpdateUserEmail } from './UpdateUserEmail'
import { ListCredentials } from './ListCredentials'

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
          { key: '/inspect', children: element(ShowUser, { id }) },
          { key: '/update', children: element(UpdateUser, { id, change }) },
          { key: '/remove', children: element(RemoveUser, { id, change }) },
          {
            key: '/update/password',
            children: element(UpdateUserPassword, { id, change }),
          },
          {
            key: '/update/email',
            children: element(UpdateUserEmail, { id, change }),
          },
          {
            key: '/memberships',
            children: element(ListMemberships, { user_id: id }),
          },
          {
            key: '/sessions',
            children: element(ListSessions, { user_id: id }),
          },
          {
            key: '/credentials',
            children: element(ListCredentials, { user_id: id }),
          },
        ]
      : [{ key: '/create', children: element(CreateUser, { change }) }],
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
              icon: 'unlock',
              label: 'Change Password',
              focused:
                !!router.current && router.current.key === '/update/password',
              click: () => router.change('/update/password'),
            },
            {
              icon: 'at',
              label: 'Change Email',
              focused:
                !!router.current && router.current.key === '/update/email',
              click: () => router.change('/update/email'),
            },
            {
              icon: 'user-tag',
              label: 'Memberships',
              focused:
                !!router.current && router.current.key === '/memberships',
              click: () => router.change('/memberships'),
              hidesmall: true,
            },
            {
              icon: 'history',
              label: 'Sessions',
              focused: !!router.current && router.current.key === '/sessions',
              click: () => router.change('/sessions'),
              hidesmall: true,
            },
            {
              icon: 'share-alt',
              label: 'Credentials',
              focused:
                !!router.current && router.current.key === '/credentials',
              click: () => router.change('/credentials'),
              hidesmall: true,
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
