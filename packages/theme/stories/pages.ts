import { createElement as create } from 'react'
import { storiesOf } from '@storybook/react'
import { css } from 'emotion'
import { Page } from '../src/index'

console.clear()

const stories = storiesOf('Pages', module).addDecorator(data => {
  return create('div', {
    children: data(),
    className: css({
      /* styles */
    }),
  })
})

stories.add('Users', () => {
  return create(Page.Container, {
    children: 'Hello',
  })
})
