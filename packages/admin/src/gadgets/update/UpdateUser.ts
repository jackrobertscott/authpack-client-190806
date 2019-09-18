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
})

export type IUpdateUser = {
  id: string
}

export const UpdateUser: FC<IUpdateUser> = ({ id }) => {
  const [value, valueChange] = useState({ ...schema.default() })
  const [issue, issueChange] = useState<Error>()
  const retrieveUserGraph = useGraph<{
    user: {
      id: string
      name: string
      username: string
      email: string
    }
  }>({
    api: true,
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
  useEffect(() => {
    retrieveUserGraph.fetch({ options: { id } }).then(data => {
      if (data.user)
        valueChange({
          name: data.user.name || undefined,
          username: data.user.username || undefined,
          email: data.user.email || undefined,
        })
    })
    // eslint-disable-next-line
  }, [id])
  const updateUserGraph = useGraph<{
    user: {
      id: string
    }
  }>({
    api: true,
    query: `
      mutation UpdateUser($options: UpdateUserOptions!) {
        user: UpdateUser(options: $options) {
          id
        }
      }
    `,
  })
  const submit = () => {
    schema.validate(value).then(data => {
      const options = { ...data, id }
      updateUserGraph.fetch({ options }, 'UpdateUser')
    })
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
    label: 'Update User',
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
              value: value.name,
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
              value: value.username,
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
              value: value.email,
              placeholder: 'fred.blogs@example.com',
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
