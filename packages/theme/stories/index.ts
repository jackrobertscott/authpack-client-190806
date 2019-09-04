import { createElement as create } from 'react'
import { storiesOf } from '@storybook/react'
import { css } from 'emotion'
import { Button, Inputs, Gadget, Iconbar, Pointer, Header } from '../src/index'

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
    create(Gadget.Container, {
      children: [
        create(Iconbar.Container, {
          children: [
            create(Pointer.Container, {
              contents: 'Login',
              children: create(Iconbar.Icon, {
                name: 'home',
                click: () => console.log('hello'),
              }),
            }),
            create(Iconbar.Divider),
            create(Pointer.Container, {
              contents: 'Sign up',
              children: create(Iconbar.Icon, {
                name: 'bolt',
              }),
            }),
            create(Iconbar.Divider),
            create(Pointer.Container, {
              contents: 'Forgot password',
              children: create(Iconbar.Icon, {
                name: 'broom',
              }),
            }),
          ],
        }),
        create(Gadget.Contents, {
          children: [
            create(Header.Container, {
              children: [
                create(Header.Label, {
                  children: 'Login',
                }),
                create(Header.Brand, {
                  children: 'Your App',
                }),
              ],
            }),
            create(Gadget.Spacer, {
              children: [
                create(Inputs.Label, {
                  name: 'Name',
                  description: 'Full name please',
                  children: create(Inputs.Container, {
                    children: create(Inputs.String, {
                      value: 'memes',
                    }),
                  }),
                }),
                create(Inputs.Label, {
                  name: 'Age',
                  description: 'How old are you?',
                  children: create(Inputs.Container, {
                    children: create(Inputs.Number, {
                      placeholder: 35,
                    }),
                  }),
                }),

                create(Button.Container, {
                  label: 'Submit',
                  click: () => console.log(123),
                }),
              ],
            }),
          ],
        }),
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
