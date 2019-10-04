import * as validator from 'yup'
import { createElement as create, FC, useState, useEffect } from 'react'
import { Inputs, Button, Gadgets } from 'wga-theme'
import { createUseGraph } from '../hooks/useGraph'
import { settingsStore } from '../utils/settings'
import { useStore } from '../hooks/useStore'

export type ILoginUser = {}

export const LoginUser: FC<ILoginUser> = () => {
  // initialize the user form values and apply validators
  const [issue, issueChange] = useState<Error>()
  const [value, valueStore] = useStore('LoginUser', {
    ...schemaLogin.default(),
  })
  const validateAndPatch = (path: string) => (data: any) => {
    const update = { ...value, [path]: data }
    valueStore.change(update)
    return schemaLogin.validateAt(path, update)
  }
  useEffect(() => {
    let mounted = true
    schemaLogin
      .validate(value)
      .then(() => mounted && issueChange(undefined))
      .catch(error => mounted && issueChange(error))
    return () => {
      mounted = false
    }
  }, [value])
  // clean password when reload page
  useEffect(() => {
    valueStore.patch(store => ({ ...store, password: '' }))
  }, [valueStore])
  // login the user when the form is submitted
  const login = useLogin()
  const submit = () => {
    schemaLogin
      .validate(value)
      .then(data => login.fetch({ options: data }))
      .then(data => {
        valueStore.patch(store => ({ ...store, password: '' }))
        settingsStore.patch(settings => ({
          ...settings,
          session: data.session,
        }))
      })
  }
  return create(Gadgets.Container, {
    label: 'Login',
    brand: 'Authenticator',
    children: create(Gadgets.Spacer, {
      children: [
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
              password: true,
              value: value.password,
              placeholder: '************',
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

const schemaLogin = validator.object().shape({
  email: validator
    .string()
    .email('Please make sure you have used a valid email address')
    .required('Please provide your name'),
  password: validator.string().required('Please provide your email'),
})

const useLogin = createUseGraph<{
  session: {
    id: string
    token: string
    user: {
      id: string
      email: string
      username?: string
      avatar?: string
      name?: string
    }
    workspace?: {
      id: string
      name: string
      tag: string
      description?: string
    }
    permissions?: Array<{
      id: string
      name: string
      tag: string
      description?: string
    }>
  }
}>({
  query: `
    mutation Login($options: LoginUserOptions!) {
      session: LoginUser(options: $options) {
        id
        token
        user {
          id
          email
          username
          avatar
          name
        }
        workspace {
          id
          name
          tag
          description
        }
        permissions {
          id
          name
          tag
          description
        }
      }
    }
  `,
})
