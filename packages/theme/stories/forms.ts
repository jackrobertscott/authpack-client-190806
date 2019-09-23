import { createElement as create } from 'react'
import { storiesOf } from '@storybook/react'
import { Modal, Layout, Iconbar, Gadgets, Inputs, Overview } from '../src/index'

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
  return create(Gadgets.Spacer, {
    children: ['One', 'Two', 'Three'].map(item =>
      create(Overview.Container, {
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

stories.add('Error Toaster', () => {
  return create(Gadgets.Spacer, {
    children: null, // todo...
  })
})

stories.add('String', () => {
  return create(Gadgets.Spacer, {
    children: create(Inputs.Control, {
      key: 'input',
      label: 'Name',
      description: 'Your full name please',
      input: props =>
        create(Inputs.String, {
          ...props,
          placeholder: 'Fred Blogs',
        }),
    }),
  })
})

stories.add('Large String', () => {
  return create(Gadgets.Spacer, {
    children: null, // todo...
  })
})

stories.add('String Array', () => {
  return create(Gadgets.Spacer, {
    children: null, // todo...
  })
})

stories.add('Search + Select', () => {
  return create(Gadgets.Spacer, {
    children: null, // todo...
  })
})

stories.add('Boolean', () => {
  return create(Gadgets.Spacer, {
    children: null, // todo...
  })
})

stories.add('Multiple Choice', () => {
  return create(Gadgets.Spacer, {
    children: null, // todo...
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
