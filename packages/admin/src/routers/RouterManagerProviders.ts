import { createElement as create, FC } from 'react'
import { GadgetsIconbar } from '../templates/GadgetsIconbar'
import { RouterModal } from '../templates/RouterModal'
import { CreateProvider } from '../screens/CreateProvider'
import { RetrieveProvider } from '../screens/RetrieveProvider'
import { UpdateProvider } from '../screens/UpdateProvider'
import { RemoveProvider } from '../screens/RemoveProvider'

export type IRouterManagerProviders = {
  id?: string
  close?: () => void
  change?: () => void
}

export const RouterManagerProviders: FC<IRouterManagerProviders> = ({
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
              icon: 'tags',
              label: 'Overview',
              children: create(RetrieveProvider, {
                id,
              }),
            },
            {
              icon: 'cog',
              label: 'Update',
              children: create(UpdateProvider, {
                id,
              }),
            },
            {
              icon: 'fire-alt',
              label: 'Danger Zone',
              children: create(RemoveProvider, {
                id,
              }),
            },
          ]
        : [
            {
              icon: 'plus',
              label: 'Create',
              children: create(CreateProvider, {
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
