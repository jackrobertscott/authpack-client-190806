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
        element(Control, {
          key: 'name',
          label: 'Name',
          error: schema.error('name'),
          children: element(InputString, {
            value: schema.value('name'),
            change: schema.change('name'),
            placeholder: 'Admin Editor',
          }),
        }),
        element(Control, {
          key: 'tag',
          label: 'Tag',
          helper: 'A unique identifier for the upgrade',
          error: schema.error('tag'),
          children: element(InputString, {
            value: schema.value('tag'),
            change: schema.change('tag'),
            placeholder: 'admin_editor',
          }),
        }),
        element(Control, {
          key: 'description',
          label: 'Description',
          error: schema.error('description'),
          children: element(InputString, {
            value: schema.value('description'),
            change: schema.change('description'),
            placeholder: 'User can...',
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
