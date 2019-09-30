import * as validator from 'yup'
import { createElement as create, FC, useState, useEffect } from 'react'
import { Inputs, Button, Gadgets } from 'wga-theme'
import { createUseGraph } from '../hooks/useGraph'

export type IUpdateUserPassword = {
  id: string
}

export const UpdateUserPassword: FC<IUpdateUserPassword> = ({ id }) => {
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
        password: '',
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
    label: 'Update User Password',
    brand: 'Authenticator',
    children: create(Gadgets.Spacer, {
      children: [
        create(Inputs.Control, {
          key: 'password',
          label: 'Password',
          description: "This will replace the user's current password",
          change: validateAndPatch('password'),
          input: props =>
            create(Inputs.String, {
              ...props,
              value: value.password,
              password: true,
              placeholder: '************',
            }),
        }),
        create(Button.Container, {
          key: 'submit',
          label: 'Change Password',
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
  }
}>({
  query: `
    query RetrieveUser($options: RetrieveUserOptions!) {
      user: RetrieveUser(options: $options) {
        id
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
  password: validator.string().required(),
})
