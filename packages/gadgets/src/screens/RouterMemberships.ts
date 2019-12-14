import { createElement as element, FC, useState } from 'react'
import { RemoveMembership } from './RemoveMembership'
import { UpdateMembership } from './UpdateMembership'
import { ListMemberships } from './ListMemberships'
import { CreateMembership } from './CreateMembership'

export const RouterMemberships: FC = () => {
  const [staged, stagedChange] = useState<string | undefined>()
  const [action, actionChange] = useState<
    'add' | 'update' | 'remove' | undefined
  >()
  const close = () => {
    stagedChange(undefined)
    actionChange(undefined)
  }
  if (action)
    switch (action) {
      case 'add':
        return element(CreateMembership, {
          close,
        })
      case 'update':
        if (!staged) break
        return element(UpdateMembership, {
          id: staged,
          close,
        })
      case 'remove':
        if (!staged) break
        return element(RemoveMembership, {
          id: staged,
          change: close,
          close,
        })
    }
  return element(ListMemberships, {
    add: () => {
      stagedChange(undefined)
      actionChange('add')
    },
    update: id => {
      stagedChange(id)
      actionChange('update')
    },
    remove: id => {
      stagedChange(id)
      actionChange('remove')
    },
  })
}
