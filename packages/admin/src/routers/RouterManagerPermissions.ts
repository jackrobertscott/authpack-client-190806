import { createElement as create, FC } from 'react'
import { GadgetsIconbar } from '../templates/GadgetsIconbar'
import { RouterModal } from '../templates/RouterModal'
import { CreatePermission } from '../screens/CreatePermission'
import { RetrievePermission } from '../screens/RetrievePermission'
import { UpdatePermission } from '../screens/UpdatePermission'
import { RemovePermission } from '../screens/RemovePermission'

export type IRouterManagerPermissions = {
  id: string
  close?: () => void
  change?: () => void
}

export const RouterManagerPermissions: FC<IRouterManagerPermissions> = ({
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
              icon: 'tags',
              label: 'Overview',
              children: create(RetrievePermission, {
                id,
              }),
            },
            {
              icon: 'cog',
              label: 'Update',
              children: create(UpdatePermission, {
                id,
              }),
            },
            {
              icon: 'fire-alt',
              label: 'Danger Zone',
              children: create(RemovePermission, {
                id,
              }),
            },
          ]
        : [
            {
              icon: 'plus',
              label: 'Create',
              children: create(CreatePermission, {
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
