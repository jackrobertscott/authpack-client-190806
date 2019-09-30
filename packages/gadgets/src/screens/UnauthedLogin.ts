import * as validator from 'yup'
import { createElement as create, FC, useState, useEffect } from 'react'
import { Inputs, Button, Gadgets } from 'wga-theme'
import { createUseGraph } from '../hooks/useGraph'
import { settingsStore } from '../utils/settings'

export type IUnauthedLogin = {}

export const UnauthedLogin: FC<IUnauthedLogin> = () => {
  // initialize the user form values and apply validators
  const [value, valueChange] = useState({ ...schemaLogin.default() })
  const [issue, issueChange] = useState<Error>()
  const validateAndPatch = (path: string) => (data: any) => {
    const update = { ...value, [path]: data }
    valueChange(update)
    return schemaLogin.validateAt(path, update)
  }
  useEffect(() => {
    schemaLogin
      .validate(value)
      .then(() => issueChange(undefined))
      .catch(issueChange)
  }, [value])
  // login the user when the form is submitted
  const login = useLogin()
  const submit = () => {
    schemaLogin
      .validate(value)
      .then(data => login.fetch({ options: data }, 'Login'))
      .then(data => {
        settingsStore.patch(settings => ({
          ...settings,
          current: data.status,
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
  status: {
    user: {
      id: string
      name: string
      email: string
    }
    session: {
      id: string
      token: string
    }
  }
}>({
  query: `
    mutation Login($options: LoginUserOptions!) {
      status: LoginUser(options: $options) {
        user {
          id
          name
          email
        }
        session {
          id
          token
        }
      }
    }
  `,
})
