import * as yup from 'yup'
import '@fortawesome/fontawesome-free/css/all.min.css'
import { createElement as create, FC, useState } from 'react'
import { storiesOf } from '@storybook/react'
import { css } from 'emotion'
import {
  Layout,
  IconBar,
  Gadgets,
  Modal,
  InputString,
  Button,
  Poster,
  Snippet,
  useSchema,
  Control,
  InputNumber,
  InputSelectMany,
  InputSelect,
  InputBoolean,
  InputStringArray,
  Root,
} from '../src/index'

console.clear()

const stories = storiesOf('Modals', module).addDecorator(data => {
  return create(Root, {
    theme: 'snow_storm',
    children: create('div', {
      children: data(),
      className: css({
        display: 'flex',
        flexGrow: 1,
      }),
    }),
  })
})

stories.add('Form', () => {
  return create(Modal, {
    children: create(Layout, {
      grow: true,
      children: [
        create(SimpleIconBar, { key: 'SimpleIconBar' }),
        create(Gadgets, {
          title: 'Create',
          subtitle: 'Window Gadgets',
          children: create(SimpleForm),
        }),
      ],
    }),
  })
})

stories.add('Buttons & Poster', () => {
  return create(Modal, {
    children: create(Layout, {
      grow: true,
      children: [
        create(SimpleIconBar, { key: 'SimpleIconBar' }),
        create(Gadgets, {
          key: 'Gadgets',
          title: 'Buttons',
          subtitle: 'Window Gadgets',
          children: create(SimpleButtons),
        }),
      ],
    }),
  })
})

stories.add('Snippets', () => {
  return create(Modal, {
    children: create(Layout, {
      grow: true,
      children: [
        create(SimpleIconBar, { key: 'SimpleIconBar' }),
        create(Gadgets, {
          key: 'Gadgets',
          title: 'Users',
          subtitle: 'Window Gadgets',
          children: create(SimpleSnippets),
        }),
      ],
    }),
  })
})

const SimpleIconBar: FC = () => {
  return create(IconBar, {
    icons: [
      {
        icon: 'home',
        label: 'Home',
        focused: true,
      },
      {
        icon: 'sliders-h',
        label: 'Preferences',
      },
      {
        icon: 'code',
        label: 'Developers',
      },
      {
        icon: 'cog',
        label: 'Settings',
        seperated: true,
      },
      {
        icon: 'user-circle',
        label: 'Account',
      },
    ],
  })
}

const Foods = [
  { value: 'Banana', label: 'Banana' },
  { value: 'Apple', label: 'Apple' },
  {
    value: 'Icecream',
    label: 'Icecream',
    helper: 'This is bad for you',
  },
  { value: 'Mango', label: 'Mango' },
]

const SimpleForm: FC = () => {
  const [foodFilter, changeFoodFilter] = useState<string>('')
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
          options: Foods.filter(food => food.label.includes(foodFilter)),
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
}

const SimpleButtons: FC = () => {
  return create(Layout, {
    column: true,
    children: [
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
    ],
  })
}

const SimpleSnippets: FC = () => {
  return create(Layout, {
    column: true,
    children: [
      create(Snippet, {
        key: 'Awesome',
        icon: 'bookmark',
        label: 'Awesome Team',
        click: () => console.log('Awesome'),
        options: [
          { icon: 'sliders-h', label: 'Update', helper: 'Change "em up' },
          { icon: 'trash-alt', label: 'Remove', helper: 'Get rid of them!' },
        ],
      }),
      create(Snippet, {
        key: 'Pancake',
        icon: 'bookmark',
        label: 'Pancake Team',
        value: 'This is a nice value',
        click: () => console.log('Pancake'),
      }),
      create(Snippet, {
        key: 'Seagul',
        icon: 'bookmark',
        label: 'Seagul Team',
        click: () => console.log('Seagul'),
      }),
    ],
  })
}
