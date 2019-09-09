import { createElement as create } from 'react'
import { storiesOf } from '@storybook/react'
import { RouterCentral } from '../src/routers/RouterCentral'
import { RouterModalUnauthed } from '../src/routers/RouterModalUnauthed'

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
  return create(RouterModalUnauthed)
})

storiesGadgetsRouters.add('Workspace', () => {
  return create(RouterModalUnauthed)
})

storiesGadgetsRouters.add('Accounts Manager', () => {
  return create(RouterModalUnauthed)
})

storiesGadgetsRouters.add('Groups Manager', () => {
  return create(RouterModalUnauthed)
})

storiesGadgetsRouters.add('Memberships Manager', () => {
  return create(RouterModalUnauthed)
})

storiesGadgetsRouters.add('Permissions Manager', () => {
  return create(RouterModalUnauthed)
})

storiesGadgetsRouters.add('Sessions Manager', () => {
  return create(RouterModalUnauthed)
})
