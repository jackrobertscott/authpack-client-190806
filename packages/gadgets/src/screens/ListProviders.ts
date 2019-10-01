import { createElement as create, FC } from 'react'
import { Gadgets } from 'wga-theme'

export type IListProviders = {}

export const ListProviders: FC<IListProviders> = () => {
  return create(Gadgets.Container, {
    label: '3rd Party Apps',
    brand: 'Authenticator',
    children: create(Gadgets.Spacer, {
      children: null,
    }),
  })
}
