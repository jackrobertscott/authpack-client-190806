import * as yup from 'yup'
import { createElement as create, FC, useEffect } from 'react'
import {
  Gadgets,
  useSchema,
  Button,
  Layout,
  Control,
  InputString,
} from 'wga-theme'
import { useGlobal } from '../hooks/useGlobal'
import { createUseServer } from '../hooks/useServer'

export const UpdateUser: FC<{
  id: string
  change?: (id?: string) => void
}> = ({ id, change }) => {
  const global = useGlobal()
  const gqlGetUser = useGetUser()
  const gqlUpdateUser = useUpdateUser()
  const schema = useSchema({
    schema: SchemaUpdateUser,
    submit: value => {
      gqlUpdateUser
        .fetch({ id, value })
        .then(({ user }) => change && change(user.id))
    },
  })
  useEffect(() => {
    gqlGetUser.fetch({ id }).then(({ user }) => schema.set(user))
    // eslint-disable-next-line
  }, [id])
  return create(Gadgets, {
    title: 'Update User',
    subtitle: global.appname,
    children: create(Layout, {
      column: true,
      padding: true,
      divide: true,
      children: [
        create(Layout, {
          key: 'name',
          divide: true,
          children: [
            create(Control, {
              key: 'given_name',
              label: 'First Name',
              error: schema.error('given_name'),
              children: create(InputString, {
                value: schema.value('given_name'),
                change: schema.change('given_name'),
                placeholder: 'Fred',
              }),
            }),
            create(Control, {
              key: 'family_name',
              label: 'Last Name',
              error: schema.error('family_name'),
              children: create(InputString, {
                value: schema.value('family_name'),
                change: schema.change('family_name'),
                placeholder: 'Blogs',
              }),
            }),
          ],
        }),
        create(Control, {
          key: 'username',
          label: 'Username',
          error: schema.error('username'),
          children: create(InputString, {
            value: schema.value('username'),
            change: schema.change('username'),
            placeholder: 'example-username-123',
          }),
        }),
        create(Control, {
          key: 'email',
          label: 'Email',
          error: schema.error('email'),
          children: create(InputString, {
            value: schema.value('email'),
            change: schema.change('email'),
            placeholder: 'example@email.com',
          }),
        }),
        create(Button, {
          key: 'submit',
          label: 'Update',
          disabled: !schema.valid,
          click: schema.submit,
        }),
      ],
    }),
  })
}

const SchemaUpdateUser = yup.object().shape({
  given_name: yup.string(),
  family_name: yup.string(),
  username: yup.string(),
  email: yup
    .string()
    .email('Please make sure you have used a valid email address'),
})

const useGetUser = createUseServer<{
  user: {
    given_name: string
    family_name: string
    username: string
    email: string
  }
}>({
  query: `
    query apiGetUser($id: String!) {
      user: apiGetUser(id: $id) {
        given_name
        family_name
        username
        email
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
    mutation apiUpdateUser($id: String!, $value: UpdateUserValue!) {
      user: apiUpdateUser(id: $id, value: $value) {
        id
      }
    }
  `,
})
