import * as yup from 'yup'
import { createElement as create, FC } from 'react'
import {
  Gadgets,
  useSchema,
  Button,
  Layout,
  Control,
  InputString,
  testAlphanumeric,
} from 'wga-theme'
import { useUniversal } from '../hooks/useUniversal'
import { createUseServer } from '../hooks/useServer'

export const CreatePermission: FC<{
  change?: (id?: string) => void
}> = ({ change }) => {
  const universal = useUniversal()
  const gqlCreatePermission = useCreatePermission()
  const schema = useSchema({
    schema: SchemaCreatePermission,
    submit: value => {
      gqlCreatePermission
        .fetch({ value })
        .then(({ permission }) => change && change(permission.id))
    },
  })
  return create(Gadgets, {
    title: 'Create Permission',
    subtitle: universal.cluster_name,
    loading: gqlCreatePermission.loading,
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
            placeholder: 'Admin Editor',
          }),
        }),
        create(Control, {
          key: 'tag',
          label: 'Tag',
          helper: 'A unique identifier for the permission',
          error: schema.error('tag'),
          children: create(InputString, {
            value: schema.value('tag'),
            change: schema.change('tag'),
            placeholder: 'admin_editor',
          }),
        }),
        create(Control, {
          key: 'description',
          label: 'Description',
          error: schema.error('description'),
          children: create(InputString, {
            value: schema.value('description'),
            change: schema.change('description'),
            placeholder: 'User can...',
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

const SchemaCreatePermission = yup.object().shape({
  name: yup.string().required('Please provide the permission name'),
  tag: yup
    .string()
    .test(
      'alphamun',
      'Please use only numbers, letters and underscores',
      testAlphanumeric
    )
    .required('Please provide the permission tag'),
  description: yup.string(),
})

const useCreatePermission = createUseServer<{
  permission: {
    id: string
  }
}>({
  query: `
    mutation apiCreatePermission($value: CreatePermissionValue!) {
      permission: apiCreatePermission(value: $value) {
        id
      }
    }
  `,
})
