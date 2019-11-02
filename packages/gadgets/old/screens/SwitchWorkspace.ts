import { createElement as create, FC } from 'react'
import { Gadgets } from 'wga-theme'

export type ISwitchWorkspace = {}

export const SwitchWorkspace: FC<ISwitchWorkspace> = () => {
  return create(Gadgets.Container, {
    label: 'Switch Workspace',
    brand: 'Authenticator',
    children: create(Gadgets.Spacer, {
      children: null,
    }),
  })
}
