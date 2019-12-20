import * as yup from 'yup'
import { createElement as element, FC, useEffect } from 'react'
import {
  useSchema,
  Layout,
  Control,
  InputString,
  testAlphanumeric,
  Page,
} from '@authpack/theme'
import { createUseServer } from '../hooks/useServer'

export const UpdateUpgrade: FC<{
  id: string
  change?: (id?: string) => void
}> = ({ id, change }) => {
  const gqlGetUpgrade = useGetUpgrade()
  const gqlUpdateUpgrade = useUpdateUpgrade()
  const schema = useSchema({
    schema: SchemaUpdateUpgrade,
    poller: value => {
      gqlUpdateUpgrade
        .fetch({ id, value })
        .then(({ upgrade }) => change && change(upgrade.id))
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
