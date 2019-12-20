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

export const UpdatePermission: FC<{
  id: string
  change?: (id?: string) => void
}> = ({ id, change }) => {
  const toaster = useToaster()
  const gqlGetPermission = useGetPermission()
  const gqlUpdatePermission = useUpdatePermission()
  const schema = useSchema({
    schema: SchemaUpdatePermission,
    submit: value => {
      gqlUpdatePermission.fetch({ id, value }).then(({ permission }) => {
        if (change) change(permission.id)
        toaster.add({ icon: 'check-circle', label: 'Success' })
      })
    },
  })
  useEffect(() => {
    gqlGetPermission
      .fetch({ id })
      .then(({ permission }) => schema.set(permission))
    // eslint-disable-next-line
  }, [id])
  return element(Page, {
    title: 'Update',
    subtitle: 'Permission',
    children: element(Layout, {
      column: true,
      padding: true,
      divide: true,
      children: !gqlGetPermission.data
        ? null
        : [
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
              label: 'Save',
              loading: gqlGetPermission.loading || gqlUpdatePermission.loading,
              disabled: !schema.valid,
              click: schema.submit,
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
    query GetPermission($id: String!) {
      permission: GetPermission(id: $id) {
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
    mutation UpdatePermission($id: String!, $value: UpdatePermissionValue!) {
      permission: UpdatePermission(id: $id, value: $value) {
        id
      }
    }
  `,
})
