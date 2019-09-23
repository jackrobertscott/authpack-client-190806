import * as validator from 'yup'
import { createElement as create, FC, useState, useEffect } from 'react'
import { Inputs, Button, Gadgets } from 'wga-theme'
import { createUseGraph } from '../../hooks/useGraph'

export type ICreateUser = {
  change?: () => void
}

export const CreateUser: FC<ICreateUser> = ({ change }) => {
  // initialize the user form values and apply validators
  const [issue, issueChange] = useState<Error>()
  const [value, valueChange] = useState({ ...schemaCreateUser.default() })
  const validateAndPatch = (path: string) => (data: any) => {
    const update = { ...value, [path]: data }
    valueChange(update)
    return schemaCreateUser.validateAt(path, update)
  }
  useEffect(() => {
    schemaCreateUser
      .validate(value)
      .then(() => issueChange(undefined))
      .catch(issueChange)
  }, [value])
  // create the user when the form is submitted
  const createUser = useCreateUser()
  const submit = () => {
    schemaCreateUser
      .validate(value)
      .then(data => createUser.fetch({ options: data }))
      .then(change)
  }
  return create(Gadgets.Container, {
    label: 'Create User',
    brand: 'Authenticator',
    children: create(Gadgets.Spacer, {
      children: [
        create(Inputs.Control, {
          key: 'name',
          label: 'Name',
          description: 'Please use their full name',
          change: validateAndPatch('name'),
          input: props =>
            create(Inputs.String, {
              ...props,
              value: value.name,
              placeholder: 'Fred Blogs',
            }),
        }),
        create(Inputs.Control, {
          key: 'username',
          label: 'Username',
          description: 'Please use a valid username',
          change: validateAndPatch('username'),
          input: props =>
            create(Inputs.String, {
              ...props,
              value: value.username,
              placeholder: 'fredblogs',
            }),
        }),
        create(Inputs.Control, {
          key: 'email',
          label: 'Email',
          description: 'Please use a valid email address',
          change: validateAndPatch('email'),
          input: props =>
            create(Inputs.String, {
              ...props,
              value: value.email,
              placeholder: 'fred.blogs@example.com',
            }),
        }),
        create(Inputs.Control, {
          key: 'password',
          label: 'Password',
          description: 'Please use more than 6 characters',
          change: validateAndPatch('password'),
          input: props =>
            create(Inputs.String, {
              ...props,
              value: value.password,
              placeholder: '**********',
            }),
        }),
        create(Button.Container, {
          key: 'submit',
          label: 'Create',
          click: submit,
          disable: !!issue,
        }),
      ],
    }),
  })
}

const useCreateUser = createUseGraph<{
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

const schemaCreateUser = validator.object().shape({
  name: validator.string(),
  username: validator.string(),
  email: validator
    .string()
    .email('Please make sure you have used a valid email address')
    .required('Please provide your name'),
  password: validator.string().required('Please provide your email'),
})
