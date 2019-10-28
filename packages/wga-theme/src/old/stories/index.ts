import { createElement as create } from 'react'
import { storiesOf } from '@storybook/react'
import { css } from 'emotion'
import { Button, Inputs, Search, List } from '../index'

console.clear()

const stories = storiesOf('Components', module).addDecorator(data => {
  return create('div', {
    children: data(),
    className: css({
      padding: '50px',
      '& > *, & > div': {
        marginBottom: '20px',
      },
    }),
  })
})

stories.add('Buttons', () => {
  return [
    create(Inputs.Container, {
      children: create(Inputs.String, {
        value: 'memes',
      }),
    }),
    create(Inputs.Container, {
      children: create(Inputs.Number, {
        value: 3,
      }),
    }),
    create(Button.Container, {
      label: 'Hello',
      click: () => console.log(123),
    }),
    create(Button.Container, {
      label: 'Hello',
      click: () => console.log(123),
    }),
  ]
})

stories.add('List', () => {
  const items = ['bell', 'bolt', 'carrot', 'cat']
  return create(List.Container, {
    children: items.map(row =>
      create(List.Row, {
        key: row,
        click: () => console.log(row),
        children: items.map(icon =>
          create(List.Cell, {
            key: icon,
            icon,
            label: 'Hello',
            value: '12345',
          })
        ),
      })
    ),
  })
})

stories.add('Search', () => {
  return create(Search.Container, {
    children: [
      create(Search.Input, {
        key: 'search',
        icon: 'search',
        change: console.log,
        placeholder: 'Search...',
      }),
      create(Search.Group, {
        key: 'results',
        icon: 'stream',
        label: '25 of 1,543 Results',
        click: () => console.log('results'),
      }),
      create(Search.Group, {
        key: 'previous',
        icon: 'angle-double-left',
        label: 'Previous',
        click: () => console.log('prev'),
      }),
      create(Search.Group, {
        key: 'next',
        icon: 'angle-double-right',
        label: 'Next',
        click: () => console.log('next'),
      }),
    ],
  })
})
