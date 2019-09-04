import { createElement as create } from 'react'
import { storiesOf } from '@storybook/react'
import { css } from 'emotion'
import { Button, Inputs, Gadget, Iconbar, Header } from '../src/index'

const stories = storiesOf('Authenticator', module)

stories
  .addDecorator(data =>
    create('div', {
      children: data(),
      className: css({
        padding: '50px',
        '& > *, & > div': {
          marginBottom: '20px',
        },
      }),
    })
  )
  .add('Gadgets', () =>
    create(Gadget.Router, {
      brand: 'Your App',
      screens: [
        {
          icon: 'user',
          label: 'Login',
          children: create(Gadget.Spacer, {
            children: [
              create(Inputs.Label, {
                name: 'Name',
                description: 'Full name please',
                children: create(Inputs.Container, {
                  children: [
                    create(Inputs.String, {
                      placeholder: 'Fred Blogs',
                    }),
                    create(Inputs.Pointer, {
                      label: 'This field is required',
                      children: create(Inputs.Icon, {
                        name: 'bell',
                      }),
                    }),
                  ],
                }),
              }),
              create(Inputs.Label, {
                name: 'Age',
                description: 'How old are you?',
                children: create(Inputs.Container, {
                  children: [
                    create(Inputs.Number, {
                      placeholder: '35',
                    }),
                  ],
                }),
              }),
              create(Button.Container, {
                label: 'Submit',
                click: () => console.log(123),
              }),
            ],
          }),
        },
        {
          icon: 'user',
          label: 'Login',
          children: 'Hello',
        },
        {
          icon: 'user',
          label: 'Login',
          children: 'Hello',
        },
      ],
    })
  )
  .add('Buttons', () => [
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
  ])
