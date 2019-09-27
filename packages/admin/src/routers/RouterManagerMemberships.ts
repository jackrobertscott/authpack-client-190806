import { createElement as create, FC } from 'react'
import { GadgetsIconbar } from '../templates/GadgetsIconbar'
import { RouterModal } from '../templates/RouterModal'
import { RetrieveMembership } from '../screens/RetrieveMembership'
import { UpdateMembership } from '../screens/UpdateMembership'
import { RemoveMembership } from '../screens/RemoveMembership'
import { CreateMembership } from '../screens/CreateMembership'

export type IRouterManagerMemberships = {
  id: string
  close?: () => void
  change?: () => void
}

export const RouterManagerMemberships: FC<IRouterManagerMemberships> = ({
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
              icon: 'user-tag',
              label: 'Overview',
              children: create(RetrieveMembership, {
                id,
              }),
            },
            {
              icon: 'cog',
              label: 'Update',
              children: create(UpdateMembership, {
                id,
              }),
            },
            {
              icon: 'fire-alt',
              label: 'Danger Zone',
              children: create(RemoveMembership, {
                id,
              }),
            },
          ]
        : [
            {
              icon: 'plus',
              label: 'Create',
              children: create(CreateMembership, {
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
