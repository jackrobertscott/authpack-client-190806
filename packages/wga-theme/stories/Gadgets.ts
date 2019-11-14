import * as yup from 'yup'
import { createElement as create, useState } from 'react'
import { storiesOf } from '@storybook/react'
import {
  Button,
  InputCode,
  Modal,
  Gadgets,
  IconBar,
  Layout,
  Snippet,
  Poster,
  Focus,
  Control,
  InputString,
  InputNumber,
  InputBoolean,
  InputSelect,
  InputStringArray,
  InputSelectMany,
  Theme,
} from '../src/index'
import { useSchema } from '../src/hooks/useSchema'
import { BlueHarvester } from '../src/themes/BlueHarvester'

console.clear()

const stories = storiesOf('Gadgets', module).addDecorator(data => {
  return create(Theme.Provider, {
    value: BlueHarvester,
    children: create(Modal, {
      children: create(Layout, {
        children: [
          create(IconBar, {
            key: 'iconBar',
            icons: [
              {
                icon: 'home',
                label: 'Home',
              },
              {
                seperated: true,
                icon: 'times-circle',
                prefix: 'far',
                label: 'Close',
                click: close,
              },
            ],
          }),
          create(Gadgets, {
            key: 'gadgets',
            title: 'Hello',
            subtitle: 'Window Gadgets',
            children: data(),
          }),
        ],
      }),
    }),
  })
})

stories.add('Buttons', () => {
  return [
    create(Poster, {
      key: 'Poster',
      icon: 'magic',
      label: 'Buttons',
      helper:
        'Lots of pretty buttons and this is a really long sentence to see what it looks like',
    }),
    create(Layout, {
      key: 'Layout',
      column: true,
      padding: true,
      divide: true,
      children: [
        create(Button, {
          key: 'Regular',
          label: 'Regular',
          click: () => console.log('Regular'),
        }),
        create(Button, {
          key: 'Minor',
          label: 'Minor',
          click: () => console.log('Minor'),
          icon: 'bolt',
          minor: true,
        }),
        create(Button, {
          key: 'Disabled',
          label: 'Disabled',
          click: () => console.log('Disabled'),
          disabled: true,
        }),
      ],
    }),
  ]
})

stories.add('Form', () => {
  return create(() => {
    const schema = useSchema({
      change: console.log,
      schema: yup.object().shape({
        name: yup
          .string()
          .default('')
          .required('This is a required field')
          .min(5, 'Must be at least 5 characters long'),
        age: yup.string().required('This is a required field'),
        dogs: yup.boolean().required('This is a required field'),
        food: yup.string().required('Tell me your fav food!'),
        extras: yup.array().of(yup.string()),
        emails: yup
          .array()
          .of(yup.string().email('Please verify your emails are valid')),
      }),
    })
    const [foodFilter, changeFoodFilter] = useState<string>('')
    const foods = [
      { value: 'Banana', label: 'Banana' },
      { value: 'Apple', label: 'Apple' },
      {
        value: 'Icecream',
        label: 'Icecream',
        helper: 'This is bad for you',
      },
      { value: 'Mango', label: 'Mango' },
    ]
    return create(Layout, {
      column: true,
      padding: true,
      divide: true,
      children: [
        create(Control, {
          key: 'name',
          label: 'Name',
          helper: 'Please use your full name',
          error: schema.error('name'),
          children: create(InputString, {
            value: schema.value('name'),
            change: schema.change('name'),
            placeholder: 'E.g. Fred Blogs',
          }),
        }),
        create(Control, {
          key: 'age',
          label: 'Age',
          helper: 'Please present your age',
          error: schema.error('age'),
          children: create(InputNumber, {
            value: schema.value('age'),
            change: schema.change('age'),
            placeholder: 'E.g. 33',
            integer: true,
          }),
        }),
        create(Control, {
          key: 'dogs',
          label: 'Dogs vs Cats',
          helper: 'Do you prefer dogs over cats',
          error: schema.error('dogs'),
          children: create(InputBoolean, {
            value: schema.value('dogs'),
            change: schema.change('dogs'),
          }),
        }),
        create(Control, {
          key: 'select',
          label: 'Favourite Food',
          error: schema.error('food'),
          children: create(InputSelect, {
            value: schema.value('food'),
            change: schema.change('food'),
            filter: changeFoodFilter,
            options: foods.filter(food => food.label.includes(foodFilter)),
          }),
        }),
        create(Control, {
          key: 'extras',
          label: 'Extras',
          error: schema.error('extras'),
          children: create(InputSelectMany, {
            value: schema.value('extras'),
            change: schema.change('extras'),
            options: [
              {
                value: 'Coffee',
                label: 'Coffee',
                helper: 'Tastes nice.',
              },
              {
                value: 'Tea',
                label: 'Tea',
                helper: 'Smooth to drink.',
              },
              {
                value: 'Orange Juice',
                label: 'Orange Juice',
              },
            ],
          }),
        }),
        create(Control, {
          key: 'array',
          label: 'Emails',
          error: schema.error('emails'),
          children: create(InputStringArray, {
            value: schema.value('emails'),
            change: schema.change('emails'),
            placeholder: 'Add email...',
          }),
        }),
        create(Button, {
          key: 'Regular',
          label: 'Regular',
          disabled: !schema.valid,
          click: () => console.log('Regular'),
        }),
      ],
    })
  })
})

stories.add('Snippets', () => {
  return create('div', {
    children: [
      create(Snippet, {
        key: 'Snippet',
        icon: 'at',
        label: 'Email',
        value: 'jack@example.com',
        click: () => console.log('Snippet'),
      }),
      create(Snippet, {
        key: 'Snippet2',
        icon: 'at',
        label: 'Email',
        value: 'jack@example.com',
      }),
    ],
  })
})

stories.add('Editor', () => {
  const examples = {
    email: 'fred@example.com',
    username: 'Fred',
    age: 32,
    fruits: ['banana', 'apple', 'blue berry'],
  }
  const code = JSON.stringify(examples, null, 2)
  return create(Layout, {
    column: true,
    padding: true,
    divide: true,
    children: create(() => {
      const [value, valueChange] = useState<string>(code)
      return create(InputCode, {
        value,
        language: 'json',
        change: valueChange,
      })
    }),
  })
})

stories.add('Focus', () => {
  return create(() => {
    const [on, toggle] = useState<boolean>(false)
    return create('div', {
      children: [
        create(Layout, {
          key: 'Regular',
          column: true,
          padding: true,
          divide: true,
          children: create(Button, {
            label: 'Turn On',
            click: () => toggle(true),
          }),
        }),
        create(Focus, {
          key: 'Focus',
          icon: 'at',
          label: 'Email',
          helper: 'Please add your email',
          visible: on,
          children: create(Button, {
            label: 'Turn Off',
            click: () => toggle(false),
          }),
        }),
      ],
    })
  })
})
