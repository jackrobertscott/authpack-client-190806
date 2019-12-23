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

export const UpdateRole: FC<{
  id: string
  change?: (id?: string) => void
}> = ({ id, change }) => {
  const toaster = useToaster()
  const gqlGetRole = useGetRole()
  const gqlUpdateRole = useUpdateRole()
  const schema = useSchema({
    schema: SchemaUpdateRole,
    submit: value => {
      gqlUpdateRole.fetch({ id, value }).then(({ role }) => {
        if (change) change(role.id)
        toaster.add({ icon: 'check-circle', label: 'Success' })
      })
    },
  })
  useEffect(() => {
    gqlGetRole.fetch({ id }).then(({ role }) => schema.set(role))
    // eslint-disable-next-line
  }, [id])
  return element(Page, {
    title: 'Update',
    subtitle: 'Role',
    children: element(Layout, {
      column: true,
      padding: true,
      divide: true,
      children: !gqlGetRole.data
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
              loading: gqlGetRole.loading || gqlUpdateRole.loading,
              disabled: !schema.valid,
              click: schema.submit,
            }),
          ],
    }),
  })
}

const SchemaUpdateRole = yup.object().shape({
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

const useGetRole = createUseServer<{
  role: {
    name: string
    tag: string
    description?: string
  }
}>({
  query: `
    query GetRole($id: String!) {
      role: GetRole(id: $id) {
        name
        tag
        description
      }
    }
  `,
})

const useUpdateRole = createUseServer<{
  role: {
    id: string
  }
}>({
  query: `
    mutation UpdateRole($id: String!, $value: UpdateRoleValue!) {
      role: UpdateRole(id: $id, value: $value) {
        id
      }
    }
  `,
})
