import * as yup from 'yup'
import { createElement as element, FC } from 'react'
import {
  useSchema,
  Button,
  Layout,
  Control,
  InputString,
  testAlphanumeric,
  Page,
} from '@authpack/theme'
import { createUseServer } from '../hooks/useServer'

export const CreateUpgrade: FC<{
  change?: (id?: string) => void
}> = ({ change }) => {
  const gqlCreateUpgrade = useCreateUpgrade()
  const schema = useSchema({
    schema: SchemaCreateUpgrade,
    submit: value => {
      gqlCreateUpgrade
        .fetch({ value })
        .then(({ upgrade }) => change && change(upgrade.id))
    },
  })
  return element(Page, {
    title: 'New',
    subtitle: 'Upgrade',
    children: element(Layout, {
      column: true,
      padding: true,
      divide: true,
      children: [
        element(Layout, {
          key: 'name',
          divide: true,
          media: true,
          children: [
            element(Control, {
              key: 'name',
              label: 'Name',
              helper: 'Human friendly name',
              error: schema.error('name'),
              children: element(InputString, {
                value: schema.value('name'),
                change: schema.change('name'),
                placeholder: 'Premium',
              }),
            }),
            element(Control, {
              key: 'tag',
              label: 'Tag',
              helper: 'Unique identifier',
              error: schema.error('tag'),
              children: element(InputString, {
                value: schema.value('tag'),
                change: schema.change('tag'),
                placeholder: 'premium',
              }),
            }),
          ],
        }),
        element(Control, {
          key: 'description',
          label: 'Description',
          error: schema.error('description'),
          children: element(InputString, {
            value: schema.value('description'),
            change: schema.change('description'),
            placeholder: 'Users gains access to...',
          }),
        }),
        element(Button, {
          key: 'submit',
          label: 'Create',
          loading: gqlCreateUpgrade.loading,
          disabled: !schema.valid,
          click: schema.submit,
        }),
      ],
    }),
  })
}

const SchemaCreateUpgrade = yup.object().shape({
  name: yup.string().required('Please provide the upgrade name'),
  tag: yup
    .string()
    .test(
      'alphamun',
      'Please use only numbers, letters and underscores',
      testAlphanumeric
    )
    .required('Please provide the upgrade tag'),
  description: yup.string(),
})

const useCreateUpgrade = createUseServer<{
  upgrade: {
    id: string
  }
}>({
  query: `
    mutation CreateUpgrade($value: CreateUpgradeValue!) {
      upgrade: CreateUpgrade(value: $value) {
        id
      }
    }
  `,
})
