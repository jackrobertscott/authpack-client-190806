import { createElement as element, FC, useEffect } from 'react'
import { Layout, Snippet, Page } from '@authpack/theme'
import { format } from 'date-fns'
import { createUseServer } from '../hooks/useServer'

export const ShowUser: FC<{
  id: string
}> = ({ id }) => {
  const gqlGetUser = useGetUser()
  useEffect(() => {
    gqlGetUser.fetch({ id })
    // eslint-disable-next-line
  }, [id])
  const user = gqlGetUser.data ? gqlGetUser.data.user : undefined
  return element(Page, {
    title: 'Inspect',
    subtitle: 'User',
    children: !user
      ? null
      : element(Layout, {
          column: true,
          children: [
            element(Snippet, {
              key: 'id',
              icon: 'fingerprint',
              label: 'Id',
              value: user.id,
            }),
            element(Layout, {
              key: 'verified',
              grow: true,
              media: true,
              children: [
                element(Snippet, {
                  key: 'email',
                  icon: 'at',
                  label: 'Email',
                  value: user.email,
                }),
                element(Snippet, {
                  key: 'verified',
                  icon: 'flag-checkered',
                  label: 'Verified',
                  value: String(user.verified),
                }),
              ],
            }),
            element(Layout, {
              key: 'name',
              grow: true,
              media: true,
              children: [
                element(Snippet, {
                  key: 'name',
                  icon: 'user',
                  label: 'Name',
                  value: user.name || '...',
                }),
                element(Snippet, {
                  key: 'username',
                  icon: 'tags',
                  label: 'Username',
                  value: user.username || '...',
                }),
              ],
            }),
            element(Layout, {
              key: 'plan',
              grow: true,
              media: true,
              children: [
                element(Snippet, {
                  key: 'name',
                  icon: 'donate',
                  label: 'Plan',
                  value: user.plan ? user.plan.summary : '...',
                }),
                element(Snippet, {
                  key: 'tag',
                  icon: 'tags',
                  label: 'Id',
                  value: user.plan ? user.plan.id : '...',
                }),
              ],
            }),
            element(Layout, {
              key: 'dates',
              grow: true,
              media: true,
              children: [
                element(Snippet, {
                  key: 'created',
                  icon: 'clock',
                  label: 'Created',
                  value:
                    user.created &&
                    format(new Date(user.created), 'dd LLL yyyy @ h:mm a'),
                }),
                element(Snippet, {
                  key: 'updated',
                  icon: 'clock',
                  label: 'Updated',
                  value:
                    user.updated &&
                    format(new Date(user.updated), 'dd LLL yyyy @ h:mm a'),
                }),
              ],
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
    verified: string
    plan?: {
      id: string
      summary: string
    }
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
        verified
        plan {
          id
          summary
        }
      }
    }
  `,
})
