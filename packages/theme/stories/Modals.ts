import * as yup from 'yup'
import '@fortawesome/fontawesome-free/css/all.min.css'
import { createElement as element, FC, useState, ReactNode } from 'react'
import { storiesOf } from '@storybook/react'
import { css } from 'emotion'
import {
  Layout,
  IconBar,
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
  Page,
  SideBar,
} from '../src/index'

console.clear()

const stories = storiesOf('Modals', module).addDecorator(data => {
  return element(Root, {
    theme: 'night_sky',
    children: element('div', {
      children: data(),
      className: css({
        display: 'flex',
        flexGrow: 1,
      }),
    }),
  })
})

stories.add('Form', () => {
  return element(Modal, {
    children: element(Layout, {
      grow: true,
      children: element(SimpleIconBar, {
        children: element(Page, {
          title: 'Create',
          subtitle: 'Authpack',
          children: element(SimpleForm),
        }),
      }),
    }),
  })
})

stories.add('Buttons & Poster', () => {
  return element(Modal, {
    children: element(Layout, {
      grow: true,
      children: element(SimpleIconBar, {
        children: element(Page, {
          key: 'Gadgets',
          title: 'Buttons',
          subtitle: 'Authpack',
          children: element(SimpleButtons),
        }),
      }),
    }),
  })
})

stories.add('Snippets', () => {
  return element(Modal, {
    children: element(Layout, {
      grow: true,
      children: element(SimpleIconBar, {
        children: element(SimpleSideBar, {
          children: element(Page, {
            key: 'Gadgets',
            title: 'Users',
            subtitle: 'Authpack',
            children: element(SimpleSnippets),
          }),
        }),
      }),
    }),
  })
})

const SimpleIconBar: FC<{ children: ReactNode }> = ({ children }) => {
  return element(IconBar, {
    children,
    icons: [
      {
        icon: 'home',
        label: 'Home',
        focused: true,
        options: [
          {
            icon: 'home',
            label: 'Home',
          },
          {
            icon: 'sliders-h',
            label: 'Preferences',
          },
          {
            icon: 'code',
            label: 'Developers',
          },
        ],
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
        icon: 'times-circle',
        label: 'Close',
        seperated: true,
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
  return element(Layout, {
    column: true,
    padding: true,
    divide: true,
    children: [
      element(Control, {
        key: 'name',
        label: 'Name',
        helper: 'Please use your full name',
        error: schema.error('name'),
        children: element(InputString, {
          value: schema.value('name'),
          change: schema.change('name'),
          placeholder: 'E.g. Fred Blogs',
        }),
      }),
      element(Control, {
        key: 'age',
        label: 'Age',
        helper: 'Please present your age',
        error: schema.error('age'),
        children: element(InputNumber, {
          value: schema.value('age'),
          change: schema.change('age'),
          placeholder: 'E.g. 33',
          integer: true,
        }),
      }),
      element(Control, {
        key: 'dogs',
        label: 'Dogs vs Cats',
        helper: 'Do you prefer dogs over cats',
        error: schema.error('dogs'),
        children: element(InputBoolean, {
          value: schema.value('dogs'),
          change: schema.change('dogs'),
        }),
      }),
      element(Control, {
        key: 'select',
        label: 'Favourite Food',
        error: schema.error('food'),
        children: element(InputSelect, {
          value: schema.value('food'),
          change: schema.change('food'),
          filter: changeFoodFilter,
          options: Foods.filter(food => food.label.includes(foodFilter)),
        }),
      }),
      element(Control, {
        key: 'extras',
        label: 'Extras',
        error: schema.error('extras'),
        children: element(InputSelectMany, {
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
      element(Control, {
        key: 'array',
        label: 'Emails',
        error: schema.error('emails'),
        children: element(InputStringArray, {
          value: schema.value('emails'),
          change: schema.change('emails'),
          placeholder: 'Add email...',
        }),
      }),
      element(Button, {
        key: 'Regular',
        label: 'Regular',
        disabled: !schema.valid,
        click: () => console.log('Regular'),
      }),
    ],
  })
}

const SimpleButtons: FC = () => {
  return element(Layout, {
    column: true,
    children: [
      element(Poster, {
        key: 'Poster',
        icon: 'magic',
        label: 'Buttons',
        helper:
          'Lots of pretty buttons and this is a really long sentence to see what it looks like',
      }),
      element(Layout, {
        key: 'Layout',
        column: true,
        padding: true,
        divide: true,
        children: [
          element(Button, {
            key: 'Regular',
            label: 'Regular',
            click: () => console.log('Regular'),
          }),
          element(Button, {
            key: 'Minor',
            label: 'Minor',
            click: () => console.log('Minor'),
            icon: 'bolt',
            minor: true,
          }),
          element(Button, {
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
  return element(Layout, {
    column: true,
    children: [
      element(Snippet, {
        key: 'Awesome',
        icon: 'bookmark',
        label: 'Awesome Team',
        click: () => console.log('Awesome'),
        options: [
          { icon: 'sliders-h', label: 'Update', helper: 'Change "em up' },
          { icon: 'trash-alt', label: 'Remove', helper: 'Get rid of them!' },
        ],
      }),
      element(Snippet, {
        key: 'Pancake',
        icon: 'bookmark',
        label: 'Pancake Team',
        value: 'This is a nice value',
        click: () => console.log('Pancake'),
      }),
      element(Snippet, {
        key: 'Seagul',
        icon: 'bookmark',
        label: 'Seagul Team',
        click: () => console.log('Seagul'),
      }),
    ],
  })
}

const SimpleSideBar: FC<{ children: ReactNode }> = ({ children }) => {
  return element(SideBar, {
    title: 'Hello',
    footer: 'Jack Scott',
    children,
    options: [
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
    ],
  })
}
