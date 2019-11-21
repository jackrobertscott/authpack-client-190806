import * as yup from 'yup'
import { createElement as create, FC, useEffect } from 'react'
import {
  Gadgets,
  useSchema,
  Layout,
  Control,
  InputString,
  testAlphanumeric,
} from 'wga-theme'
import { useUniversal } from '../hooks/useUniversal'
import { createUseServer } from '../hooks/useServer'

export const UpdatePermission: FC<{
  id: string
  change?: (id?: string) => void
}> = ({ id, change }) => {
  const universal = useUniversal()
  const gqlGetPermission = useGetPermission()
  const gqlUpdatePermission = useUpdatePermission()
  const schema = useSchema({
    schema: SchemaUpdatePermission,
    poller: value => {
      gqlUpdatePermission
        .fetch({ id, value })
        .then(({ permission }) => change && change(permission.id))
    },
  })
  useEffect(() => {
    gqlGetPermission
      .fetch({ id })
      .then(({ permission }) => schema.set(permission))
    // eslint-disable-next-line
  }, [id])
  return create(Gadgets, {
    title: 'Update Permission',
    subtitle: universal.cluster_name,
    loading: gqlUpdatePermission.loading,
    children: create(Layout, {
      column: true,
      padding: true,
      divide: true,
      children: !gqlGetPermission.data
        ? null
        : [
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
          ],
    }),
  })
}

const SchemaUpdatePermission = yup.object().shape({
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

const useGetPermission = createUseServer<{
  permission: {
    name: string
    tag: string
    description?: string
  }
}>({
  query: `
    query apiGetPermission($id: String!) {
      permission: apiGetPermission(id: $id) {
        name
        tag
        description
      }
    }
  `,
})

const useUpdatePermission = createUseServer<{
  permission: {
    id: string
  }
}>({
  query: `
    mutation apiUpdatePermission($id: String!, $value: UpdatePermissionValue!) {
      permission: apiUpdatePermission(id: $id, value: $value) {
        id
      }
    }
  `,
})
