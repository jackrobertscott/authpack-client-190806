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

export const CreateRole: FC<{
  change?: (id?: string) => void
}> = ({ change }) => {
  const gqlCreateRole = useCreateRole()
  const schema = useSchema({
    schema: SchemaCreateRole,
    submit: value => {
      gqlCreateRole
        .fetch({ value })
        .then(({ role }) => change && change(role.id))
    },
  })
  return element(Page, {
    title: 'New',
    subtitle: 'Role',
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
                placeholder: 'Editor',
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
                placeholder: 'editor',
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
            placeholder: 'User can edit...',
          }),
        }),
        element(Button, {
          key: 'submit',
          label: 'Create',
          loading: gqlCreateRole.loading,
          disabled: !schema.valid,
          click: schema.submit,
        }),
      ],
    }),
  })
}

const SchemaCreateRole = yup.object().shape({
  name: yup.string().required('Please provide the role name'),
  tag: yup
    .string()
    .test(
      'alphamun',
      'Please use only numbers, letters and underscores',
      testAlphanumeric
    )
    .required('Please provide the role tag'),
  description: yup.string(),
})

const useCreateRole = createUseServer<{
  role: {
    id: string
  }
}>({
  query: `
    mutation CreateRole($value: CreateRoleValue!) {
      role: CreateRole(value: $value) {
        id
      }
    }
  `,
})
