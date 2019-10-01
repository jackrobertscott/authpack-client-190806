import { createElement as create, FC } from 'react'
import { Gadgets } from 'wga-theme'

export type ISwitchGroup = {}

export const SwitchGroup: FC<ISwitchGroup> = () => {
  return create(Gadgets.Container, {
    label: 'Switch Group',
    brand: 'Authenticator',
    children: create(Gadgets.Spacer, {
      children: null,
    }),
  })
}
