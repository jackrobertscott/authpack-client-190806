import { createElement as create, FC } from 'react'
import { GadgetsIconbar } from '../templates/GadgetsIconbar'
import { RouterModal } from '../templates/RouterModal'
import { CreateSession } from '../screens/CreateSession'
import { RetrieveSession } from '../screens/RetrieveSession'
import { UpdateSession } from '../screens/UpdateSession'
import { RemoveSession } from '../screens/RemoveSession'

export type IRouterManagerSessions = {
  open: boolean
  id?: string
  close?: () => void
  change?: () => void
}

export const RouterManagerSessions: FC<IRouterManagerSessions> = ({
  open,
  id,
  close,
  change,
}) => {
  console.log(id)
  return create(RouterModal, {
    close,
    visible: open,
    children: id
      ? create(GadgetsIconbar, {
          close,
          screens: [
            {
              icon: 'history',
              label: 'Overview',
              children: create(RetrieveSession, {
                id,
              }),
            },
            {
              icon: 'cog',
              label: 'Update',
              children: create(UpdateSession, {
                id,
              }),
            },
            {
              icon: 'fire-alt',
              label: 'Danger Zone',
              children: create(RemoveSession, {
                id,
              }),
            },
          ],
        })
      : create(GadgetsIconbar, {
          close,
          screens: [
            {
              icon: 'plus',
              label: 'Create',
              children: create(CreateSession, {
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
