import { createElement as create } from 'react'
import { storiesOf } from '@storybook/react'
import { RouterCentral } from '../src/routers/RouterCentral'
import { RouterModalUnauthed } from '../src/routers/RouterModalUnauthed'
import { RouterModalAuthed } from '../src/routers/RouterModalAuthed'
import { RouterModalWorkspace } from '../src/routers/RouterModalWorkspace'
import { RouterManagerAccounts } from '../src/routers/RouterManagerAccounts'
import { RouterManagerGroups } from '../src/routers/RouterManagerGroups'
import { RouterManagerMemberships } from '../src/routers/RouterManagerMemberships'
import { RouterManagerPermissions } from '../src/routers/RouterManagerPermissions'
import { RouterManagerSessions } from '../src/routers/RouterManagerSessions'

console.clear()

const storiesPageRouters = storiesOf('Page Routers', module)

storiesPageRouters.add('Central', () => {
  return create(RouterCentral)
})

const storiesGadgetsRouters = storiesOf('Gadgets Routers', module)

storiesGadgetsRouters.add('Unauthed', () => {
  return create(RouterModalUnauthed)
})

storiesGadgetsRouters.add('Authed', () => {
  return create(RouterModalAuthed)
})

storiesGadgetsRouters.add('Workspace', () => {
  return create(RouterModalWorkspace)
})

storiesGadgetsRouters.add('Accounts Manager', () => {
  return create(RouterManagerAccounts)
})

storiesGadgetsRouters.add('Groups Manager', () => {
  return create(RouterManagerGroups)
})

storiesGadgetsRouters.add('Memberships Manager', () => {
  return create(RouterManagerMemberships)
})

storiesGadgetsRouters.add('Permissions Manager', () => {
  return create(RouterManagerPermissions)
})

storiesGadgetsRouters.add('Sessions Manager', () => {
  return create(RouterManagerSessions)
})
