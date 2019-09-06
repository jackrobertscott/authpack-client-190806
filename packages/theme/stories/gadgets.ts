import { createElement as create, useState } from 'react'
import { storiesOf } from '@storybook/react'
import { css } from 'emotion'
import * as validator from 'yup'
import { Button, Inputs, Gadget, Modal } from '../src/index'

console.clear()

const stories = storiesOf('Gadgets', module).addDecorator(data => {
  return create('div', {
    children: data(),
    className: css({
      /* styles */
    }),
  })
})

const LoginScreen = () => {
  const schema = validator.object().shape({
    name: validator.string().typeError('Please provide your name'),
    email: validator
      .string()
      .email('Please make sure you are using a valid email address')
      .typeError('Please provide your name'),
    age: validator.number().typeError('Please use a valid number'),
  })
  const [form, changeForm] = useState(schema.default())
  return create(Gadget.Contents, {
    key: 'contents',
    label: 'Login',
    brand: 'Your App',
    children: create(Gadget.Spacer, {
      children: [
        create(Inputs.Control, {
          key: 'name',
          label: 'Name',
          description: 'Full name please',
          input: props =>
            create(Inputs.String, {
              ...props,
              placeholder: 'Fred Blogs',
            }),
        }),
        create(Inputs.Control, {
          key: 'email',
          label: 'Email',
          description: 'Please use a valid email address',
          input: props =>
            create(Inputs.String, {
              ...props,
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
              ...props,
              placeholder: '35',
            }),
        }),
        create(Button.Container, {
          key: 'submit',
          label: 'Submit',
          click: () => console.log(123),
        }),
      ],
    }),
  })
}

stories.add('Login', () => {
  return create(Modal.Container, {
    children: create(Gadget.Router, {
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
    }),
  })
})
