import { createElement as element } from 'react'
import { storiesOf } from '@storybook/react'
import { RouterCentral } from '../src/routers/RouterCentral'
import { RouterManagerUsers } from '../src/routers/RouterManagerUsers'
import { RouterManagerWorkspaces } from '../src/routers/RouterManagerWorkspaces'
import { RouterManagerMemberships } from '../src/routers/RouterManagerMemberships'
import { RouterManagerSessions } from '../src/routers/RouterManagerSessions'

console.clear()

const storiesPageRouters = storiesOf('Page Routers', module)

storiesPageRouters.add('Central', () => {
  return element(RouterCentral)
})

const storiesGadgetsRouters = storiesOf('Gadgets Routers', module)

storiesGadgetsRouters.add('Users Manager', () => {
  return element(RouterManagerUsers)
})

storiesGadgetsRouters.add('Workspaces Manager', () => {
  return element(RouterManagerWorkspaces)
})

storiesGadgetsRouters.add('Memberships Manager', () => {
  return element(RouterManagerMemberships)
})

storiesGadgetsRouters.add('Sessions Manager', () => {
  return element(RouterManagerSessions)
})
