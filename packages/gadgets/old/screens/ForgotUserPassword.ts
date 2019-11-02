import * as validator from 'yup'
import { createElement as create, FC, useEffect, useState } from 'react'
import { Inputs, Button, Gadgets } from 'wga-theme'
import { useStore } from '../hooks/useStore'
import { createUseGraph } from '../hooks/useGraph'

export type IForgotUserPassword = {}

export const ForgotUserPassword: FC<IForgotUserPassword> = () => {
  // initialize the user form values and apply validators
  const [done, doneChange] = useState<boolean>(false)
  const [issue, issueChange] = useState<Error>()
  const [value, valueStore] = useStore('ForgotUserPassword', {
    ...schemaForgot.default(),
  })
  const validateAndPatch = (path: string) => (data: any) => {
    const update = { ...value, [path]: data }
    valueStore.change(update)
    return schemaForgot.validateAt(path, update)
  }
  useEffect(() => {
    let mounted = true
    schemaForgot
      .validate(value)
      .then(() => mounted && issueChange(undefined))
      .catch(error => mounted && issueChange(error))
    return () => {
      mounted = false
    }
  }, [value])
  // login the user when the form is submitted
  const login = useForgot()
  const submit = () => {
    doneChange(false)
    schemaForgot
      .validate(value)
      .then(data => login.fetch({ options: data }))
      .then(data => doneChange(data.done))
  }
  return create(Gadgets.Container, {
    label: 'Forgot Password',
    brand: 'Authenticator',
    children: create(Gadgets.Spacer, {
      children: [
        create(Inputs.Control, {
          key: 'email',
          label: 'Email',
          description: "Must match your user's email",
          change: validateAndPatch('email'),
          input: props =>
            create(Inputs.String, {
              ...props,
              value: value.email,
              placeholder: 'fred@example.com',
            }),
        }),
        create(Button.Container, {
          key: 'submit',
          label: done ? 'Try Again' : 'Send',
          click: submit,
          disable: !!issue,
        }),
      ],
    }),
  })
}

const schemaForgot = validator.object().shape({
  email: validator
    .string()
    .email('Please make sure you have used a valid email address')
    .required('Please provide your name'),
})

const useForgot = createUseGraph<{
  done: boolean
}>({
  name: 'ForgotUserPassword',
  query: `
    mutation ForgotUserPassword($options: ForgotUserPasswordOptions!) {
      done: ForgotUserPassword(options: $options)
    }
  `,
})
