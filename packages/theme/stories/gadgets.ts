import { createElement as create } from 'react'
import { storiesOf } from '@storybook/react'
import { css } from 'emotion'
import { Button, Inputs, Gadget } from '../src/index'

const stories = storiesOf('Gadgets', module).addDecorator(data => {
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

const LoginScreen = () =>
  create(Gadget.Spacer, {
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
  })

stories.add('Login', () => {
  return create(Gadget.Router, {
    brand: 'Your App',
    screens: [
      {
        icon: 'user-circle',
        label: 'Login',
        children: create(LoginScreen),
      },
      {
        icon: 'street-view',
        label: 'Sign Up',
        children: create(LoginScreen),
      },
      {
        icon: 'question-circle',
        label: 'Forgotten Password',
        children: create(LoginScreen),
      },
    ],
  })
})
