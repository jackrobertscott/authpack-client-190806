import { createElement as create, FC } from 'react'
import { Gadgets } from 'wga-theme'

export type ICreateMembership = {}

export const CreateMembership: FC<ICreateMembership> = () => {
  return create(Gadgets.Container, {
    label: 'Add New Member',
    brand: 'Authenticator',
    children: create(Gadgets.Spacer, {
      children: null,
    }),
  })
}
