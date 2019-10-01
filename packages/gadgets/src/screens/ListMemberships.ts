import { createElement as create, FC } from 'react'
import { Gadgets } from 'wga-theme'

export type IListMemberships = {}

export const ListMemberships: FC<IListMemberships> = () => {
  return create(Gadgets.Container, {
    label: 'Group Members',
    brand: 'Authenticator',
    children: create(Gadgets.Spacer, {
      children: null,
    }),
  })
}
