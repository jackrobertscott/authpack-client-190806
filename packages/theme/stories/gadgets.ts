import { createElement as create } from 'react'
import { storiesOf } from '@storybook/react'
import { css } from 'emotion'
import * as validator from 'yup'
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

const LoginScreen = () => {
  return create(Gadget.Spacer, {
    children: [
      create(Inputs.Control, {
        key: 'name',
        label: 'Name',
        description: 'Full name please',
        input: ({ change }) =>
          create(Inputs.String, {
            change,
            placeholder: 'Fred Blogs',
          }),
      }),
      create(Inputs.Control, {
        key: 'email',
        label: 'Email',
        description: 'Please use a valid email address',
        input: ({ change }) =>
          create(Inputs.String, {
            change,
            placeholder: 'fred.blogs@example.com',
          }),
      }),
      create(Inputs.Control, {
        key: 'age',
        label: 'Age',
        description: 'How old are you?',
        change: console.log,
        validate: value =>
          validator
            .number()
            .typeError('Please use a valid number')
            .validate(value),
        input: props =>
          create(Inputs.Number, {
            key: 'name',
            placeholder: '35',
            ...props,
          }),
      }),
      create(Button.Container, {
        key: 'submit',
        label: 'Submit',
        click: () => console.log(123),
      }),
    ],
  })
}

stories.add('Login', () => {
  return create(Gadget.Router, {
    brand: 'Your App',
    close: () => console.log('close'),
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
