import { createElement as create, FC } from 'react'
import { GadgetsIconbar } from '../templates/GadgetsIconbar'
import { RouterModal } from '../templates/RouterModal'
import { CreateUser } from '../gadgets/create/CreateUser'
import { UpdateUser } from '../gadgets/update/UpdateUser'
import { RetrieveUser } from '../gadgets/retrieve/RetrieveUser'
import { RemoveUser } from '../gadgets/remove/RemoveUser'

export type IRouterManagerUsers = {
  id: string
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
              children: null,
            },
            {
              icon: 'project-diagram',
              label: 'Groups of User',
              children: null,
            },
            {
              icon: 'history',
              label: 'Sessions of User',
              children: null,
            },
            {
              icon: 'handshake',
              label: '3rd Party Apps',
              children: null,
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
              label: 'Create User',
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
