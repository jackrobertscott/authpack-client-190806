import * as validator from 'yup'
import { createElement as create, FC, useState, useEffect } from 'react'
import { Inputs, Button, Gadgets } from 'wga-theme'
import { createUseGraph } from '../hooks/useGraph'
import { useStore } from '../hooks/useStore'
import { settingsStore } from '../utils/settings'

export type ISignUpUser = {
  change?: () => void
}

export const SignUpUser: FC<ISignUpUser> = ({ change }) => {
  // initialize the user form values and apply validators
  const [issue, issueChange] = useState<Error>()
  const [value, valueStore] = useStore('SignUpUser', {
    ...schemaSignUpUser.default(),
  })
  const validateAndPatch = (path: string) => (data: any) => {
    const update = { ...value, [path]: data }
    valueStore.change(update)
    return schemaSignUpUser.validateAt(path, update)
  }
  useEffect(() => {
    let mounted = true
    schemaSignUpUser
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
  // create the user when the form is submitted
  const createUser = useSignUpUser()
  const submit = () => {
    schemaSignUpUser
      .validate(value)
      .then(data => createUser.fetch({ options: data }))
      .then(data => {
        valueStore.patch(store => ({ ...store, password: '' }))
        settingsStore.patch(settings => ({
          ...settings,
          current: data.current,
        }))
      })
  }
  return create(Gadgets.Container, {
    label: 'Sign Up',
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
              value: value.password,
              password: true,
              placeholder: '**********',
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

const useSignUpUser = createUseGraph<{
  current: {
    token: string
    session: {
      id: string
      token: string
    }
    user: {
      id: string
      name: string
      email: string
    }
  }
}>({
  query: `
    mutation SignUpUser($options: SignUpUserOptions!) {
      current: SignUpUser(options: $options) {
        token
        session {
          id
          token
        }
        user {
          id
          name
          email
        }
      }
    }
  `,
})

const schemaSignUpUser = validator.object().shape({
  name: validator.string(),
  username: validator.string(),
  email: validator
    .string()
    .email('Please make sure you have used a valid email address')
    .required('Please provide your name'),
  password: validator.string().required('Please provide your email'),
})
