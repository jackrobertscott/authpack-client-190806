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
import { useSettings } from '../hooks/useSettings'
import { createUseServer } from '../hooks/useServer'

export const UpdateUser: FC<{
  change?: (id?: string) => void
}> = ({ change }) => {
  const settings = useSettings()
  const gqlGetUser = useGetUser()
  const gqlUpdateUser = useUpdateUser()
  const schema = useSchema({
    schema: SchemaUpdateUser,
    poller: input => {
      gqlUpdateUser
        .fetch({ input })
        .then(({ user }) => change && change(user.id))
    },
  })
  useEffect(() => {
    gqlGetUser.fetch().then(({ user }) => schema.set(user))
    // eslint-disable-next-line
  }, [])
  return element(Page, {
    title: 'Update',
    subtitle: settings.cluster && settings.cluster.name,
    children: element(Layout, {
      column: true,
      padding: true,
      divide: true,
      children: !gqlGetUser.data
        ? null
        : [
            element(Layout, {
              key: 'name',
              divide: true,
              media: true,
              children: [
                element(Control, {
                  key: 'name_given',
                  label: 'First Name',
                  error: schema.error('name_given'),
                  children: element(InputString, {
                    value: schema.value('name_given'),
                    change: schema.change('name_given'),
                    placeholder: 'Fred',
                  }),
                }),
                element(Control, {
                  key: 'name_family',
                  label: 'Last Name',
                  error: schema.error('name_family'),
                  children: element(InputString, {
                    value: schema.value('name_family'),
                    change: schema.change('name_family'),
                    placeholder: 'Blogs',
                  }),
                }),
              ],
            }),
            element(Control, {
              key: 'username',
              label: 'Username',
              error: schema.error('username'),
              children: element(InputString, {
                value: schema.value('username'),
                change: schema.change('username'),
                placeholder: 'example_username_123',
              }),
            }),
          ],
    }),
  })
}

const SchemaUpdateUser = yup.object().shape({
  name_given: yup.string(),
  name_family: yup.string(),
  username: yup
    .string()
    .test(
      'alphamun',
      'Please use only numbers, letters and underscores',
      testAlphanumeric
    ),
})

const useGetUser = createUseServer<{
  user: {
    name_given: string
    name_family: string
    username: string
  }
}>({
  query: `
    query GetUserClient {
      user: GetUserClient {
        name_given
        name_family
        username
      }
    }
  `,
})

const useUpdateUser = createUseServer<{
  user: {
    id: string
  }
}>({
  query: `
    mutation UpdateUserClient($input: UpdateUserInput!) {
      user: UpdateUserClient(input: $input) {
        id
      }
    }
  `,
})
