import { createElement as create, FC } from 'react'
import { GadgetsIconbar } from '../templates/GadgetsIconbar'
import { RouterModal } from '../templates/RouterModal'
import { RetrieveGroup } from '../screens/retrieve/RetrieveGroup'
import { UpdateGroup } from '../screens/update/UpdateGroup'
import { RemoveGroup } from '../screens/remove/RemoveGroup'
import { CreateGroup } from '../screens/create/CreateGroup'
import { ListMembershipsOfGroup } from '../screens/list/ListMembershipsOfGroup'

export type IRouterManagerGroups = {
  id: string
  close?: () => void
  change?: () => void
}

export const RouterManagerGroups: FC<IRouterManagerGroups> = ({
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
              icon: 'project-diagram',
              label: 'Overview',
              children: create(RetrieveGroup, {
                id,
              }),
            },
            {
              icon: 'cog',
              label: 'Update',
              children: create(UpdateGroup, {
                id,
              }),
            },
            {
              icon: 'users',
              label: 'Members of Group',
              children: create(ListMembershipsOfGroup, {
                id,
              }),
            },
            {
              icon: 'paper-plane',
              label: 'Add New Member',
              children: null,
            },
            {
              icon: 'fire-alt',
              label: 'Danger Zone',
              children: create(RemoveGroup, {
                id,
              }),
            },
          ]
        : [
            {
              icon: 'plus',
              label: 'Create',
              children: create(CreateGroup, {
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
