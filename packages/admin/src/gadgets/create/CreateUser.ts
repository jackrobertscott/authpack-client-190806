import { createElement as create, FC, useState, useEffect } from 'react'
import { Inputs, Button, Gadgets } from 'wga-theme'
import * as validator from 'yup'
import { useGraph } from '../../hooks/useGraph'

const schema = validator.object().shape({
  name: validator.string(),
  username: validator.string(),
  email: validator
    .string()
    .email('Please make sure you have used a valid email address')
    .required('Please provide your name'),
  password: validator.string().required('Please provide your email'),
})

export type ICreateUser = {
  change?: () => void
}

export const CreateUser: FC<ICreateUser> = ({ change }) => {
  const [value, valueChange] = useState({ ...schema.default() })
  const [issue, issueChange] = useState<Error>()
  const createUserGraph = useGraph<{
    user: {
      id: string
    }
  }>({
    api: true,
    query: `
      mutation CreateUser($options: CreateUserOptions!) {
        user: CreateUser(options: $options) {
          id
        }
      }
    `,
  })
  const submit = () => {
    schema
      .validate(value)
      .then(data =>
        createUserGraph.fetch({ options: data }, 'CreateUser')
      )
      .then(change)
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
    label: 'Create User',
    brand: 'Your App',
    children: create(Gadgets.Spacer, {
      children: [
        create(Inputs.Control, {
          key: 'name',
          label: 'Name',
          description: 'Please use their full name',
          change: patch('name'),
          input: props =>
            create(Inputs.String, {
              ...props,
              placeholder: 'Fred Blogs',
            }),
        }),
        create(Inputs.Control, {
          key: 'username',
          label: 'Username',
          description: 'Please use a valid username',
          change: patch('username'),
          input: props =>
            create(Inputs.String, {
              ...props,
              placeholder: 'fredblogs',
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
          key: 'password',
          label: 'Password',
          description: 'Please use more than 6 characters',
          change: patch('password'),
          input: props =>
            create(Inputs.String, {
              ...props,
              placeholder: '**********',
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
