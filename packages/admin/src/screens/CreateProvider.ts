import * as yup from 'yup'
import { createElement as create, FC } from 'react'
import {
  Gadgets,
  useSchema,
  Button,
  Layout,
  Control,
  InputString,
} from 'wga-theme'
import { useUniversal } from '../hooks/useUniversal'
import { createUseServer } from '../hooks/useServer'

export const CreateProvider: FC<{
  change?: (id?: string) => void
}> = ({ change }) => {
  const universal = useUniversal()
  const gqlCreateProvider = useCreateProvider()
  const schema = useSchema({
    schema: SchemaCreateProvider,
    submit: value => {
      gqlCreateProvider
        .fetch({ value })
        .then(({ provider }) => change && change(provider.id))
    },
  })
  return create(Gadgets, {
    title: 'Create Provider',
    subtitle: universal.appname,
    children: create(Layout, {
      column: true,
      padding: true,
      divide: true,
      children: [
        create(Control, {
          key: 'name',
          label: 'Name',
          error: schema.error('name'),
          children: create(InputString, {
            value: schema.value('name'),
            change: schema.change('name'),
            placeholder: 'Awesome People',
          }),
        }),
        create(Control, {
          key: 'tag',
          label: 'Tag',
          helper: 'A unique identifier for the provider',
          error: schema.error('tag'),
          children: create(InputString, {
            value: schema.value('tag'),
            change: schema.change('tag'),
            placeholder: 'awesome-people',
          }),
        }),
        create(Control, {
          key: 'description',
          label: 'Description',
          error: schema.error('description'),
          children: create(InputString, {
            value: schema.value('description'),
            change: schema.change('description'),
            placeholder: 'We do...',
          }),
        }),
        create(Button, {
          key: 'submit',
          label: 'Create',
          disabled: !schema.valid,
          click: schema.submit,
        }),
      ],
    }),
  })
}

const SchemaCreateProvider = yup.object().shape({
  name: yup.string().required('Please provide the provider name'),
  tag: yup.string().required('Please provide the provider tag'),
  description: yup.string(),
})

const useCreateProvider = createUseServer<{
  provider: {
    id: string
  }
}>({
  query: `
    mutation apiCreateProvider($value: CreateProviderValue!) {
      provider: apiCreateProvider(value: $value) {
        id
      }
    }
  `,
})
