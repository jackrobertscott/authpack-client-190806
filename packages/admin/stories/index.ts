import { createElement as create } from 'react'
import { storiesOf } from '@storybook/react'
import { Modal } from 'wga-theme'
import { RouterModalUnauthed } from '../src/routers/RouterModalUnauthed'

console.clear()

const stories = storiesOf('Routers', module)

stories.add('Unauthed', () => {
  return create(Modal.Container, {
    children: create(RouterModalUnauthed),
  })
})

stories.add('Authed', () => {
  return create(Modal.Container, {
    children: create(RouterModalUnauthed),
  })
})

stories.add('Workspace', () => {
  return create(Modal.Container, {
    children: create(RouterModalUnauthed),
  })
})

stories.add('Accounts Manager', () => {
  return create(Modal.Container, {
    children: create(RouterModalUnauthed),
  })
})

stories.add('Groups Manager', () => {
  return create(Modal.Container, {
    children: create(RouterModalUnauthed),
  })
})

stories.add('Memberships Manager', () => {
  return create(Modal.Container, {
    children: create(RouterModalUnauthed),
  })
})

stories.add('Permissions Manager', () => {
  return create(Modal.Container, {
    children: create(RouterModalUnauthed),
  })
})

stories.add('Sessions Manager', () => {
  return create(Modal.Container, {
    children: create(RouterModalUnauthed),
  })
})
