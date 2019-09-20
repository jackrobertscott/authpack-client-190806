import * as validator from 'yup'
import { createElement as create, FC, useState, useEffect } from 'react'
import { Inputs, Button, Gadgets } from 'wga-theme'
import { createUseGraph } from '../../hooks/useGraph'

export type IUpdateProvider = {
  id: string
}

export const UpdateProvider: FC<IUpdateProvider> = ({ id }) => {
  // initialize the provider form values and apply validators
  const [issue, issueChange] = useState<Error>()
  const [value, valueChange] = useState({ ...schemaUpdateProvider.default() })
  const validateAndPatch = (path: string) => (data: any) => {
    const update = { ...value, [path]: data }
    valueChange(update)
    return schemaUpdateProvider.validateAt(path, update)
  }
  useEffect(() => {
    schemaUpdateProvider
      .validate(value)
      .then(() => issueChange(undefined))
      .catch(issueChange)
  }, [value])
  // load the provider and set as default form values
  const retrieveProvider = useRetrieveProvider({
    options: { id },
  })
  useEffect(() => {
    if (retrieveProvider.data)
      valueChange({
        name: retrieveProvider.data.provider.name,
        tag: retrieveProvider.data.provider.tag,
      })
  }, [retrieveProvider.data])
  // update the provider when the form is submitted
  const updateProvider = useUpdateProvider()
  const submit = () => {
    schemaUpdateProvider.validate(value).then(data => {
      const options = { ...data, id }
      updateProvider.fetch({ options }, 'UpdateProvider')
    })
  }
  return create(Gadgets.Container, {
    label: 'Update Provider',
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
              value: value.name,
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
              value: value.tag,
              placeholder: 'awesome123',
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

const useRetrieveProvider = createUseGraph<{
  provider: {
    id: string
    name: string
    tag: string
  }
}>({
  api: true,
  query: `
    query RetrieveProvider($options: RetrieveProviderOptions!) {
      provider: RetrieveProvider(options: $options) {
        id
        name
        tag
      }
    }
  `,
})

const useUpdateProvider = createUseGraph<{
  provider: {
    id: string
  }
}>({
  api: true,
  query: `
    mutation UpdateProvider($options: UpdateProviderOptions!) {
      provider: UpdateProvider(options: $options) {
        id
      }
    }
  `,
})

const schemaUpdateProvider = validator.object().shape({
  name: validator.string(),
  tag: validator.string(),
})
