import * as validator from 'yup'
import { createElement as create, FC, useState, useEffect } from 'react'
import { Inputs, Button, Gadgets } from 'wga-theme'
import { createUseGraph } from '../hooks/useGraph'

export type IUpdateUser = {
  id: string
}

export const UpdateUser: FC<IUpdateUser> = ({ id }) => {
  // initialize the user form values and apply validators
  const [issue, issueChange] = useState<Error>()
  const [value, valueChange] = useState({ ...schemaUpdateUser.default() })
  const validateAndPatch = (path: string) => (data: any) => {
    const update = { ...value, [path]: data }
    valueChange(update)
    return schemaUpdateUser.validateAt(path, update)
  }
  useEffect(() => {
    schemaUpdateUser
      .validate(value)
      .then(() => issueChange(undefined))
      .catch(issueChange)
  }, [value])
  // load the user and set as default form values
  const retrieveUser = useRetrieveUser({
    options: { id },
  })
  useEffect(() => {
    if (retrieveUser.data)
      valueChange({
        name: retrieveUser.data.user.name,
        username: retrieveUser.data.user.username,
        email: retrieveUser.data.user.email,
      })
  }, [retrieveUser.data])
  // update the user when the form is submitted
  const updateUser = useUpdateUser()
  const submit = () => {
    schemaUpdateUser.validate(value).then(data => {
      const options = { ...data, id }
      updateUser.fetch({ options }, 'UpdateUser')
    })
  }
  return create(Gadgets.Container, {
    label: 'Update User',
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
        create(Button.Container, {
          key: 'submit',
          label: 'Update',
          click: submit,
          disable: !!issue,
        }),
      ],
    }),
  })
}

const useRetrieveUser = createUseGraph<{
  user: {
    id: string
    name: string
    username: string
    email: string
  }
}>({
  query: `
    query RetrieveUser($options: RetrieveUserOptions!) {
      user: RetrieveUser(options: $options) {
        id
        name
        username
        email
      }
    }
  `,
})

const useUpdateUser = createUseGraph<{
  user: {
    id: string
  }
}>({
  query: `
    mutation UpdateUser($options: UpdateUserOptions!) {
      user: UpdateUser(options: $options) {
        id
      }
    }
  `,
})

const schemaUpdateUser = validator.object().shape({
  name: validator.string(),
  username: validator.string(),
  email: validator
    .string()
    .email('Please make sure you have used a valid email address')
    .required('Please provide your name'),
})
