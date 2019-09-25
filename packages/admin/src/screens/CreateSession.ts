import * as validator from 'yup'
import { createElement as create, FC, useState, useEffect } from 'react'
import { Inputs, Button, Gadgets } from 'wga-theme'
import { createUseGraph } from '../hooks/useGraph'

export type ICreateSession = {
  change?: () => void
}

export const CreateSession: FC<ICreateSession> = ({ change }) => {
  // initialize the session form values and apply validators
  const [issue, issueChange] = useState<Error>()
  const [value, valueChange] = useState({ ...schemaCreateSession.default() })
  const validateAndPatch = (path: string) => (data: any) => {
    const update = { ...value, [path]: data }
    valueChange(update)
    return schemaCreateSession.validateAt(path, update)
  }
  useEffect(() => {
    schemaCreateSession
      .validate(value)
      .then(() => issueChange(undefined))
      .catch(issueChange)
  }, [value])
  // create the session when the form is submitted
  const createSession = useCreateSession()
  const submit = () => {
    schemaCreateSession
      .validate(value)
      .then(data => createSession.fetch({ options: data }))
      .then(change)
  }
  return create(Gadgets.Container, {
    label: 'Create Session',
    brand: 'Authenticator',
    children: create(Gadgets.Spacer, {
      children: [
        create(Inputs.Control, {
          key: 'user',
          label: 'User',
          description: "Please provide the user's id",
          change: validateAndPatch('user'),
          input: props =>
            create(Inputs.String, {
              ...props,
              value: value.user,
              placeholder: '5d82f23f07a5ffda65850000',
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

const useCreateSession = createUseGraph<{
  session: {
    id: string
  }
}>({
  api: true,
  query: `
    mutation CreateSession($options: CreateSessionOptions!) {
      session: CreateSession(options: $options) {
        id
      }
    }
  `,
})

const schemaCreateSession = validator.object().shape({
  user: validator.string().required('Please provide a valid user id'),
})
