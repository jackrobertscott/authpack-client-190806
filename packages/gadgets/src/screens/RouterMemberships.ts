import { createElement as create, FC, useState } from 'react'
import { RemoveMembership } from './RemoveMembership'
import { UpdateMembership } from './UpdateMembership'
import { ListMemberships } from './ListMemberships'

export const RouterMemberships: FC = () => {
  const [staged, stagedChange] = useState<string | undefined>()
  const [action, actionChange] = useState<'update' | 'remove' | undefined>()
  const close = () => {
    stagedChange(undefined)
    actionChange(undefined)
  }
  if (staged && action)
    switch (action) {
      case 'update':
        return create(UpdateMembership, {
          id: staged,
          close,
        })
      case 'remove':
        return create(RemoveMembership, {
          id: staged,
          change: close,
          close,
        })
    }
  return create(ListMemberships, {
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
