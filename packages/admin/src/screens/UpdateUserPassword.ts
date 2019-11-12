import * as yup from 'yup'
import { createElement as create, FC, useEffect } from 'react'
import {
  Gadgets,
  useSchema,
  Button,
  Layout,
  Control,
  InputString,
  Poster,
} from 'wga-theme'
import { useGlobal } from '../hooks/useGlobal'
import { createUseServer } from '../hooks/useServer'

export const UpdateUserPassword: FC<{
  id: string
  change?: (id: string) => void
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
    title: 'Change Password',
    subtitle: global.appname,
    children: [
      create(Poster, {
        key: 'poster',
        icon: 'unlock',
        label: 'Password',
        helper: "Change this user's password",
      }),
      create(Layout, {
        key: 'layout',
        column: true,
        padding: true,
        divide: true,
        children: [
          create(Control, {
            key: 'password',
            label: 'Password',
            helper: 'Please use more than 6 characters',
            error: schema.error('password'),
            children: create(InputString, {
              value: schema.value('password'),
              change: schema.change('password'),
              placeholder: '* * * * * * * *',
              password: true,
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
    ],
  })
}

const SchemaUpdateUser = yup.object().shape({
  password: yup.string().min(6, 'Password must be more than 6 characters'),
})

const useGetUser = createUseServer<{
  user: {
    id: string
  }
}>({
  query: `
    query apiGetUser($id: String!) {
      user: apiGetUser(id: $id) {
        id
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
