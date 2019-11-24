import { createElement as create, FC, useEffect } from 'react'
import { Layout, Snippet, Page } from 'wga-theme'
import { format } from 'date-fns'
import { createUseServer } from '../hooks/useServer'

export const ShowUser: FC<{
  id: string
}> = ({ id }) => {
  const gqlGetUser = useGetUser()
  useEffect(() => {
    gqlGetUser.fetch({ id })
    // eslint-disable-next-line
  }, [])
  const user = gqlGetUser.data ? gqlGetUser.data.user : ({} as any)
  return create(Page, {
    title: 'Inspect',
    subtitle: 'User',
    children: create(Layout, {
      column: true,
      children: [
        create(Snippet, {
          key: 'id',
          icon: 'fingerprint',
          label: 'Id',
          value: user.id,
        }),
        create(Snippet, {
          key: 'email',
          icon: 'at',
          label: 'Email',
          value: user.email,
        }),
        create(Snippet, {
          key: 'name',
          icon: 'user',
          label: 'Name',
          value: user.name || '...',
        }),
        create(Snippet, {
          key: 'username',
          icon: 'tags',
          label: 'Username',
          value: user.username || '...',
        }),
        create(Snippet, {
          key: 'created',
          icon: 'clock',
          label: 'Created',
          value:
            user.created &&
            format(new Date(user.created), 'dd LLL yyyy @ h:mm a'),
        }),
        create(Snippet, {
          key: 'updated',
          icon: 'clock',
          label: 'Updated',
          value:
            user.updated &&
            format(new Date(user.updated), 'dd LLL yyyy @ h:mm a'),
        }),
      ],
    }),
  })
}

const useGetUser = createUseServer<{
  user: {
    id: string
    created: string
    updated: string
    email: string
    name?: string
    username?: string
  }
}>({
  query: `
    query GetUser($id: String!) {
      user: GetUser(id: $id) {
        id
        created
        updated
        email
        name
        username
      }
    }
  `,
})
