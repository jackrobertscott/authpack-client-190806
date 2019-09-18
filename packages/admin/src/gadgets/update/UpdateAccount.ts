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

export type IUpdateAccount = {
  id: string
}

export const UpdateAccount: FC<IUpdateAccount> = ({ id }) => {
  const [value, valueChange] = useState({ ...schema.default() })
  const [issue, issueChange] = useState<Error>()
  const retrieveAccountGraph = useGraph<{
    account: {
      id: string
      name: string
      username: string
      email: string
    }
  }>({
    api: true,
    query: `
      query RetrieveAccount($options: RetrieveAccountOptions!) {
        account: RetrieveAccount(options: $options) {
          id
          name
          username
          email
        }
      }
    `,
  })
  useEffect(() => {
    retrieveAccountGraph.fetch({ options: { id } }).then(data => {
      if (data.account)
        valueChange({
          name: data.account.name || undefined,
          username: data.account.username || undefined,
          email: data.account.email || undefined,
        })
    })
    // eslint-disable-next-line
  }, [id])
  const updateAccountGraph = useGraph<{
    account: {
      id: string
    }
  }>({
    api: true,
    query: `
      mutation UpdateAccount($options: UpdateAccountOptions!) {
        account: UpdateAccount(options: $options) {
          id
        }
      }
    `,
  })
  const submit = () => {
    schema.validate(value).then(data => {
      const options = { ...data, id }
      updateAccountGraph.fetch({ options }, 'UpdateAccount')
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
    label: 'Update Account',
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
