import * as yup from 'yup'
import { createElement as element, FC, useEffect } from 'react'
import {
  useSchema,
  Layout,
  Control,
  InputString,
  testAlphanumeric,
  Page,
  Button,
  useToaster,
} from '@authpack/theme'
import { createUseServer } from '../hooks/useServer'

export const UpdateUpgrade: FC<{
  id: string
  change?: (id?: string) => void
}> = ({ id, change }) => {
  const toaster = useToaster()
  const gqlGetUpgrade = useGetUpgrade()
  const gqlUpdateUpgrade = useUpdateUpgrade()
  const schema = useSchema({
    schema: SchemaUpdateUpgrade,
    submit: value => {
      gqlUpdateUpgrade.fetch({ id, value }).then(({ upgrade }) => {
        if (change) change(upgrade.id)
        toaster.add({ icon: 'check-circle', label: 'Success' })
      })
    },
  })
  useEffect(() => {
    gqlGetUpgrade.fetch({ id }).then(({ upgrade }) => schema.set(upgrade))
    // eslint-disable-next-line
  }, [id])
  return element(Page, {
    title: 'Update',
    subtitle: 'Upgrade',
    children: element(Layout, {
      column: true,
      padding: true,
      divide: true,
      children: !gqlGetUpgrade.data
        ? null
        : [
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
              label: 'Save',
              loading: gqlGetUpgrade.loading || gqlUpdateUpgrade.loading,
              disabled: !schema.valid,
              click: schema.submit,
            }),
          ],
    }),
  })
}

const SchemaUpdateUpgrade = yup.object().shape({
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

const useGetUpgrade = createUseServer<{
  upgrade: {
    name: string
    tag: string
    description?: string
  }
}>({
  query: `
    query GetUpgrade($id: String!) {
      upgrade: GetUpgrade(id: $id) {
        name
        tag
        description
      }
    }
  `,
})

const useUpdateUpgrade = createUseServer<{
  upgrade: {
    id: string
  }
}>({
  query: `
    mutation UpdateUpgrade($id: String!, $value: UpdateUpgradeValue!) {
      upgrade: UpdateUpgrade(id: $id, value: $value) {
        id
      }
    }
  `,
})
