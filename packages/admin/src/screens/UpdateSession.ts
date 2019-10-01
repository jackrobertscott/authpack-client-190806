import * as validator from 'yup'
import { createElement as create, FC, useState, useEffect } from 'react'
import { Button, Gadgets } from 'wga-theme'
import { createUseGraph } from '../hooks/useGraph'

export type IUpdateSession = {
  id: string
}

export const UpdateSession: FC<IUpdateSession> = ({ id }) => {
  // initialize the session form values and apply validators
  const [issue, issueChange] = useState<Error>()
  const [value, valueChange] = useState({ ...schemaUpdateSession.default() })
  // const validateAndPatch = (path: string) => (data: any) => {
  //   const update = { ...value, [path]: data }
  //   valueChange(update)
  //   return schemaUpdateSession.validateAt(path, update)
  // }
  useEffect(() => {
    let mounted = true
    schemaUpdateSession
      .validate(value)
      .then(() => mounted && issueChange(undefined))
      .catch(error => mounted && issueChange(error))
    return () => {
      mounted = false
    }
  }, [value])
  // load the session and set as default form values
  const retrieveSession = useRetrieveSession({
    options: { id },
  })
  useEffect(() => {
    if (retrieveSession.data)
      valueChange({
        // todo...
      })
  }, [retrieveSession.data])
  // update the session when the form is submitted
  const updateSession = useUpdateSession()
  const submit = () => {
    schemaUpdateSession.validate(value).then(data => {
      const options = { ...data, id }
      updateSession.fetch({ options }, 'UpdateSession')
    })
  }
  return create(Gadgets.Container, {
    label: 'Update Session',
    brand: 'Authenticator',
    children: create(Gadgets.Spacer, {
      children: [
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

const useRetrieveSession = createUseGraph<{
  session: {
    id: string
    name: string
    tag: string
    description: string
  }
}>({
  query: `
    query RetrieveSession($options: RetrieveSessionOptions!) {
      session: RetrieveSession(options: $options) {
        id
      }
    }
  `,
})

const useUpdateSession = createUseGraph<{
  session: {
    id: string
  }
}>({
  query: `
    mutation UpdateSession($options: UpdateSessionOptions!) {
      session: UpdateSession(options: $options) {
        id
      }
    }
  `,
})

const schemaUpdateSession = validator.object().shape({
  // todo...
})
