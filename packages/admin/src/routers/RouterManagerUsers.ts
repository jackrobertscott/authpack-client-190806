import { createElement as create, FC } from 'react'
import { GadgetsIconbar } from '../templates/GadgetsIconbar'
import { RouterModal } from '../templates/RouterModal'
import { CreateUser } from '../screens/CreateUser'
import { UpdateUser } from '../screens/UpdateUser'
import { RetrieveUser } from '../screens/RetrieveUser'
import { RemoveUser } from '../screens/RemoveUser'
import { UpdateUserPassword } from '../screens/UpdateUserPassword'

export type IRouterManagerUsers = {
  id?: string
  close?: () => void
  change?: () => void
}

export const RouterManagerUsers: FC<IRouterManagerUsers> = ({
  id,
  close,
  change,
}) => {
  return create(RouterModal, {
    close,
    visible: typeof id === 'string',
    children: create(GadgetsIconbar, {
      close,
      screens: id
        ? [
            {
              icon: 'address-book',
              label: 'Overview',
              children: create(RetrieveUser, {
                id,
              }),
            },
            {
              icon: 'user-cog',
              label: 'Update',
              children: create(UpdateUser, {
                id,
              }),
            },
            {
              icon: 'unlock',
              label: 'Change Password',
              children: create(UpdateUserPassword, {
                id,
              }),
            },
            {
              icon: 'project-diagram',
              label: 'Workspaces of User',
              children: null,
              skip: true,
            },
            {
              icon: 'history',
              label: 'Sessions of User',
              children: null,
              skip: true,
            },
            {
              icon: 'handshake',
              label: '3rd Party Apps',
              children: null,
              skip: true,
            },
            {
              icon: 'fire-alt',
              label: 'Danger Zone',
              children: create(RemoveUser, {
                id,
              }),
            },
          ]
        : [
            {
              icon: 'plus',
              label: 'Create',
              children: create(CreateUser, {
                change: () => {
                  if (close) close()
                  if (change) change()
                },
              }),
            },
          ],
    }),
  })
}
