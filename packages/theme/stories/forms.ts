import { createElement as create, useState } from 'react'
import { storiesOf } from '@storybook/react'
import {
  Modal,
  Layout,
  Iconbar,
  Gadgets,
  Inputs,
  Overview,
  Button,
  useToaster,
  Toaster,
} from '../src/index'

console.clear()

const stories = storiesOf('Forms', module).addDecorator(data => {
  return create(Modal.Container, {
    children: create(Layout.Container, {
      children: [
        create(Iconbar.Container, {
          key: 'iconbar',
          top: create(Iconbar.Pointer, {
            label: 'Forms',
            children: create(Iconbar.Icon, {
              name: 'bars',
              click: () => console.log('noop'),
            }),
          }),
          bottom: create(Iconbar.Pointer, {
            label: 'Close',
            children: create(Iconbar.Icon, {
              name: 'times-circle',
              click: () => console.log('close'),
            }),
          }),
        }),
        create(Gadgets.Container, {
          key: 'children',
          label: 'Forms',
          brand: 'Authenticator',
          children: data(),
        }),
      ],
    }),
  })
})

stories.add('List', () => {
  return create(Overview.Spacer, {
    children: ['One', 'Two', 'Three'].map(item =>
      create(Overview.Container, {
        key: item,
        icon: 'users',
        label: 'Label',
        value: item,
        options: [
          {
            icon: 'users',
            label: 'Say Hello',
            description: '12345',
            click: () => console.log('clicked'),
          },
          {
            icon: 'users',
            label: 'Say Goodbye',
            description: '12345',
            click: () => console.log('clicked'),
          },
        ],
      })
    ),
  })
})

stories.add('Strings', () => {
  return create(Gadgets.Spacer, {
    children: [
      create(Inputs.Control, {
        key: 'input',
        label: 'Name',
        description: 'Your full name please',
        input: props =>
          create(Inputs.String, {
            ...props,
            placeholder: 'Fred Blogs',
          }),
      }),
      create(Inputs.Control, {
        key: 'description',
        label: 'Description',
        description: 'Provide an enjoyable summary',
        input: props =>
          create(Inputs.String, {
            ...props,
            large: true,
            placeholder: 'This is a description...',
          }),
      }),
    ],
  })
})

stories.add('String Array', () => {
  return create(Gadgets.Spacer, {
    children: create(Inputs.Control, {
      key: 'input',
      label: 'Domains',
      description: 'Provide your whitelist domains',
      input: props =>
        create(Inputs.StringArray, {
          ...props,
          placeholder: 'E.g. https://helloworld.com',
        }),
    }),
  })
})

stories.add('Search + Select', () => {
  const options = [
    {
      value: '1234567890',
      label: 'Jack Scott',
      description: 'jack@example.com',
    },
    {
      value: '234567890',
      label: 'Fred Blogs',
      description: 'fred@example.com',
    },
    {
      value: '34567890',
      label: 'Sussie Pots',
      description: 'sussie@example.com',
    },
  ]
  return create(Gadgets.Spacer, {
    children: create(() => {
      const [search, changeSearch] = useState<string>('')
      return create(Inputs.Control, {
        key: 'input',
        label: 'User',
        description: 'Choose the user you wish to add',
        input: props =>
          create(Inputs.Select, {
            ...props,
            search: changeSearch,
            options: options.filter(i => i.label.includes(search)),
          }),
      })
    }),
  })
})

stories.add('Boolean', () => {
  return create(Gadgets.Spacer, {
    children: create(Inputs.Control, {
      key: 'input',
      label: '2 Factor Auth',
      description: 'Improve your account security',
      input: props =>
        create(Inputs.Boolean, {
          ...props,
          label: '2FA',
          description: 'Enable and improve your auth',
        }),
    }),
  })
})

stories.add('Multiple Choice', () => {
  const options = [
    {
      value: '1234567890',
      label: 'Jack Scott',
      description: 'jack@example.com',
    },
    {
      value: '234567890',
      label: 'Fred Blogs',
      description: 'fred@example.com',
    },
    {
      value: '34567890',
      label: 'Sussie Pots',
      description: 'sussie@example.com',
    },
  ]
  return create(Gadgets.Spacer, {
    children: create(() => {
      return create(Inputs.Control, {
        key: 'input',
        label: 'User',
        description: 'Choose the user you wish to add',
        input: props =>
          create(Inputs.StringMulti, {
            ...props,
            options,
          }),
      })
    }),
  })
})

stories.add('Error Toaster', () => {
  return create(() => {
    const toaster = useToaster()
    return create(Gadgets.Spacer, {
      children: [
        create(Button.Container, {
          key: 'button',
          label: 'Show Toaster',
          click: () =>
            toaster.add({
              label: 'Error',
              description:
                Math.random() > 0.5
                  ? 'Something went really really really wrong mate.. okay not that wrong but ya know'
                  : 'Nah jokes',
            }),
        }),
        create(Toaster.Container, {
          key: 'toaster',
        }),
      ],
    })
  })
})

stories.add('Stripe Payments', () => {
  return create(Gadgets.Spacer, {
    children: null, // todo...
  })
})

stories.add('QR Code', () => {
  return create(Gadgets.Spacer, {
    children: null, // todo...
  })
})

stories.add('Avatar Upload', () => {
  return create(Gadgets.Spacer, {
    children: null, // todo...
  })
})
