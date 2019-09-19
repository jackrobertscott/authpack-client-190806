import * as validator from 'yup'
import { createElement as create, FC, useState, useEffect } from 'react'
import { Inputs, Button, Gadgets } from 'wga-theme'
import { createUseGraph } from '../../hooks/useGraph'

export type ICreateProvider = {
  change?: () => void
}

export const CreateProvider: FC<ICreateProvider> = ({ change }) => {
  // initialize the provider form values and apply validators
  const [issue, issueChange] = useState<Error>()
  const [value, valueChange] = useState({ ...schemaCreateProvider.default() })
  const validateAndPatch = (path: string) => (data: any) => {
    const update = { ...value, [path]: data }
    valueChange(update)
    return schemaCreateProvider.validateAt(path, update)
  }
  useEffect(() => {
    schemaCreateProvider
      .validate(value)
      .then(() => issueChange(undefined))
      .catch(issueChange)
  }, [value])
  // create the provider when the form is submitted
  const createProvider = useCreateProvider()
  const submit = () => {
    schemaCreateProvider
      .validate(value)
      .then(data => createProvider.fetch({ options: data }))
      .then(change)
  }
  return create(Gadgets.Container, {
    label: 'Create Provider',
    brand: 'Your App',
    children: create(Gadgets.Spacer, {
      children: [
        create(Inputs.Control, {
          key: 'name',
          label: 'Name',
          description: 'Give the provider a name',
          change: validateAndPatch('name'),
          input: props =>
            create(Inputs.String, {
              ...props,
              placeholder: 'Awesome Team',
            }),
        }),
        create(Inputs.Control, {
          key: 'tag',
          label: 'Tag',
          description: 'A unique identifier for your provider',
          change: validateAndPatch('tag'),
          input: props =>
            create(Inputs.String, {
              ...props,
              placeholder: 'awesome123',
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

const useCreateProvider = createUseGraph<{
  provider: {
    id: string
  }
}>({
  api: true,
  query: `
    mutation CreateProvider($options: CreateProviderOptions!) {
      provider: CreateProvider(options: $options) {
        id
      }
    }
  `,
})

const schemaCreateProvider = validator.object().shape({
  name: validator.string().required('Please provide a provider name'),
  tag: validator.string().required('Please provide a unique provider tag'),
})
