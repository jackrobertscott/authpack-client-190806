import { createElement as create } from 'react'
import { storiesOf } from '@storybook/react'
import { Modal } from 'wga-theme'
import { RouterCentral } from '../src/routers/RouterCentral'
import { RouterModalUnauthed } from '../src/routers/RouterModalUnauthed'

console.clear()

const storiesPageRouters = storiesOf('Page Routers', module)

storiesPageRouters.add('Central', () => {
  return create(RouterCentral)
})

const storiesGadgetsRouters = storiesOf('Gadgets Routers', module)

storiesGadgetsRouters.add('Unauthed', () => {
  return create(Modal.Container, {
    children: create(RouterModalUnauthed),
  })
})

storiesGadgetsRouters.add('Authed', () => {
  return create(Modal.Container, {
    children: create(RouterModalUnauthed),
  })
})

storiesGadgetsRouters.add('Workspace', () => {
  return create(Modal.Container, {
    children: create(RouterModalUnauthed),
  })
})

storiesGadgetsRouters.add('Accounts Manager', () => {
  return create(Modal.Container, {
    children: create(RouterModalUnauthed),
  })
})

storiesGadgetsRouters.add('Groups Manager', () => {
  return create(Modal.Container, {
    children: create(RouterModalUnauthed),
  })
})

storiesGadgetsRouters.add('Memberships Manager', () => {
  return create(Modal.Container, {
    children: create(RouterModalUnauthed),
  })
})

storiesGadgetsRouters.add('Permissions Manager', () => {
  return create(Modal.Container, {
    children: create(RouterModalUnauthed),
  })
})

storiesGadgetsRouters.add('Sessions Manager', () => {
  return create(Modal.Container, {
    children: create(RouterModalUnauthed),
  })
})
