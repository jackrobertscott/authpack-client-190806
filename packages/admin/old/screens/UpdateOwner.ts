import * as validator from 'yup'
import { createElement as create, FC, useState, useEffect } from 'react'
import { Inputs, Button, Gadgets } from 'wga-theme'
import { createUseGraph } from '../hooks/useGraph'

export type IUpdateOwner = {
  id: string
}

export const UpdateOwner: FC<IUpdateOwner> = ({ id }) => {
  // initialize the owner form values and apply validators
  const [issue, issueChange] = useState<Error>()
  const [value, valueChange] = useState({ ...schemaUpdateOwner.default() })
  const validateAndPatch = (path: string) => (data: any) => {
    const update = { ...value, [path]: data }
    valueChange(update)
    return schemaUpdateOwner.validateAt(path, update)
  }
  useEffect(() => {
    let mounted = true
    schemaUpdateOwner
      .validate(value)
      .then(() => mounted && issueChange(undefined))
      .catch(error => mounted && issueChange(error))
    return () => {
      mounted = false
    }
  }, [value])
  // load the owner and set as default form values
  const retrieveOwner = useRetrieveOwner({
    options: { id },
  })
  useEffect(() => {
    if (retrieveOwner.data)
      valueChange({
        domains: retrieveOwner.data.owner.domains,
      })
  }, [retrieveOwner.data])
  // update the owner when the form is submitted
  const updateOwner = useUpdateOwner()
  const submit = () => {
    schemaUpdateOwner.validate(value).then(data => {
      const options = { ...data, id }
      updateOwner.fetch({ options }, 'UpdateOwner')
    })
  }
  return create(Gadgets.Container, {
    label: 'Update Owner',
    brand: 'Authenticator',
    children: create(Gadgets.Spacer, {
      children: [
        create(Inputs.Control, {
          key: 'domains',
          label: 'Domains',
          description: 'The whitelisted domains of your app',
          change: validateAndPatch('domains'),
          input: props =>
            create(Inputs.StringArray, {
              ...props,
              value: value.domains,
              placeholder: 'E.g. https://www.yourapp.com',
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

const useRetrieveOwner = createUseGraph<{
  owner: {
    id: string
    domains: string[]
  }
}>({
  name: 'RetrieveOwner',
  query: `
    query RetrieveOwner {
      owner: RetrieveOwner {
        id
        domains
        keys {
          secret
          domain
        }
      }
    }
  `,
})

const useUpdateOwner = createUseGraph<{
  owner: {
    id: string
  }
}>({
  name: 'UpdateOwner',
  query: `
    mutation UpdateOwner($options: UpdateOwnerOptions!) {
      owner: UpdateOwner(options: $options) {
        id
      }
    }
  `,
})

const schemaUpdateOwner = validator.object().shape({
  domains: validator.array().of(
    validator
      .string()
      .url('Please make sure you use valid urls such as "https://example.com"')
      .required()
  ),
})
