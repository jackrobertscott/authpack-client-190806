import { createElement as create, FC, useState, useEffect } from 'react'
import { Inputs, Button, Gadgets } from 'wga-theme'
import * as validator from 'yup'

const schema = validator.object().shape({
  name: validator.string().required('Please provide your name'),
  email: validator
    .string()
    .email('Please make sure you are using a valid email address')
    .required('Please provide your email'),
  age: validator
    .number()
    .typeError('Please provide your age')
    .required('Please provide your age'),
})

export type IUnauthedLogin = {}

export const UnauthedLogin: FC<IUnauthedLogin> = () => {
  const [value, valueChange] = useState({ ...schema.default() })
  const [issue, issueChange] = useState<Error>()
  const submit = () => {
    schema
      .validate(value)
      .then(data => {
        console.log(data)
      })
      .catch(error => console.warn(error))
  }
  const patch = (path: string) => (data: any) => {
    const update = { ...value, [path]: data }
    valueChange(update)
    return schema.validateAt(path, update)
  }
  useEffect(() => {
    schema
      .validate(value)
      .then(() => issueChange(undefined))
      .catch(issueChange)
  }, [value])
  return create(Gadgets.Container, {
    label: 'Login',
    brand: 'Your App',
    children: create(Gadgets.Spacer, {
      children: [
        create(Inputs.Control, {
          key: 'name',
          label: 'Name',
          description: 'Full name please',
          change: patch('name'),
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
          change: patch('email'),
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
          change: patch('age'),
          input: props =>
            create(Inputs.Number, {
              ...props,
              placeholder: '35',
            }),
        }),
        create(Button.Container, {
          key: 'submit',
          label: 'Submit',
          click: submit,
          disable: !!issue,
        }),
      ],
    }),
  })
}
