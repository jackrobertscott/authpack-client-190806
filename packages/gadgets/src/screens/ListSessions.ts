import { createElement as create, FC } from 'react'
import { Gadgets } from 'wga-theme'

export type IListSessions = {}

export const ListSessions: FC<IListSessions> = () => {
  return create(Gadgets.Container, {
    label: 'Login History',
    brand: 'Authenticator',
    children: create(Gadgets.Spacer, {
      children: null,
    }),
  })
}
