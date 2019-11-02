import { createElement as create, FC } from 'react'
import { GadgetsIconbar } from '../templates/GadgetsIconbar'
import { RouterModal } from '../templates/RouterModal'
import { RetrieveWorkspace } from '../screens/RetrieveWorkspace'
import { UpdateWorkspace } from '../screens/UpdateWorkspace'
import { RemoveWorkspace } from '../screens/RemoveWorkspace'
import { CreateWorkspace } from '../screens/CreateWorkspace'
import { ListMembershipsOfWorkspace } from '../screens/ListMembershipsOfWorkspace'

export type IRouterManagerWorkspaces = {
  id?: string
  close?: () => void
  change?: () => void
}

export const RouterManagerWorkspaces: FC<IRouterManagerWorkspaces> = ({
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
              icon: 'project-diagram',
              label: 'Overview',
              children: create(RetrieveWorkspace, {
                id,
              }),
            },
            {
              icon: 'cog',
              label: 'Update',
              children: create(UpdateWorkspace, {
                id,
              }),
            },
            {
              icon: 'users',
              label: 'Members of Workspace',
              children: create(ListMembershipsOfWorkspace, {
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
              children: create(RemoveWorkspace, {
                id,
              }),
            },
          ]
        : [
            {
              icon: 'plus',
              label: 'Create',
              children: create(CreateWorkspace, {
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
