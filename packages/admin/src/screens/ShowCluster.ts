import { createElement as element, FC, useEffect } from 'react'
import { Layout, Snippet, Page } from '@authpack/theme'
import { format } from 'date-fns'
import { createUseServer } from '../hooks/useServer'

export const ShowCluster: FC<{
  id: string
}> = ({ id }) => {
  const gqlGetCluster = useGetCluster()
  useEffect(() => {
    gqlGetCluster.fetch({ id })
    // eslint-disable-next-line
  }, [id])
  const cluster = gqlGetCluster.data ? gqlGetCluster.data.cluster : undefined
  return element(Page, {
    title: 'Inspect',
    subtitle: 'See your current settings',
    children: !cluster
      ? null
      : element(Layout, {
          column: true,
          children: [
            element(Snippet, {
              key: 'id',
              icon: 'fingerprint',
              label: 'Id',
              value: cluster.id,
            }),
            element(Layout, {
              key: 'counts',
              grow: true,
              media: true,
              children: [
                element(Snippet, {
                  key: 'count_users',
                  icon: 'hashtag',
                  label: 'User Count',
                  value: `${cluster.count_users} Users`,
                }),
                element(Snippet, {
                  key: 'count_team',
                  icon: 'hashtag',
                  label: 'Team Count',
                  value: `${cluster.count_teams} Teams`,
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
                  icon: 'tags',
                  label: 'Name',
                  value: cluster.name,
                }),
                element(Snippet, {
                  key: 'theme',
                  icon: 'magic',
                  label: 'Preferenced Theme',
                  value: cluster.theme_preference || 'default',
                }),
              ],
            }),
            element(Layout, {
              key: 'team',
              grow: true,
              media: true,
              children: [
                element(Snippet, {
                  key: 'enable_team',
                  icon: 'users',
                  label: 'Teams',
                  value: cluster.enable_team ? 'Enabled' : 'Disabled',
                }),
                element(Snippet, {
                  key: 'prompt_verify',
                  icon: 'user-check',
                  label: 'Prompt Users to Verify Email',
                  value: cluster.prompt_verify ? 'Yes' : 'No',
                }),
              ],
            }),
            cluster.enable_team &&
              element(Layout, {
                key: 'team-options',
                grow: true,
                media: true,
                children: [
                  element(Snippet, {
                    key: 'signup_create_team',
                    icon: 'plus',
                    label: 'Create Team on Signup',
                    value: cluster.signup_create_team ? 'Yes' : 'No',
                  }),
                  element(Snippet, {
                    key: 'prompt_team',
                    icon: 'bullhorn',
                    label: 'Prompt Team',
                    value: cluster.prompt_team ? 'Yes' : 'No',
                  }),
                ],
              }),
            element(Layout, {
              key: 'hiders',
              grow: true,
              media: true,
              children: [
                element(Snippet, {
                  key: 'hide_signup',
                  icon: 'eye-slash',
                  label: 'Hide Signup',
                  value: cluster.hide_signup ? 'Yes' : 'No',
                }),
                element(Snippet, {
                  key: 'hide_sidebar_payments',
                  icon: 'eye-slash',
                  label: 'Hide Sidebar During Payment',
                  value: cluster.hide_sidebar_payments ? 'Yes' : 'No',
                }),
              ],
            }),
            element(Layout, {
              key: 'redirects',
              grow: true,
              media: true,
              children: [
                element(Snippet, {
                  key: 'login_redirect_uri',
                  icon: 'link',
                  label: 'Login Redirect Uri',
                  value: cluster.login_redirect_uri || '...',
                }),
                element(Snippet, {
                  key: 'logout_redirect_uri',
                  icon: 'link',
                  label: 'Logout Redirect Uri',
                  value: cluster.logout_redirect_uri || '...',
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
                    cluster.created &&
                    format(new Date(cluster.created), 'dd LLL yyyy @ h:mm a'),
                }),
                element(Snippet, {
                  key: 'updated',
                  icon: 'clock',
                  label: 'Updated',
                  value:
                    cluster.updated &&
                    format(new Date(cluster.updated), 'dd LLL yyyy @ h:mm a'),
                }),
              ],
            }),
          ],
        }),
  })
}

const useGetCluster = createUseServer<{
  cluster: {
    id: string
    created: string
    updated: string
    count_users: number
    count_teams: number
    name: string
    login_redirect_uri?: string
    logout_redirect_uri?: string
    theme_preference: string
    enable_team: boolean
    signup_create_team: boolean
    prompt_team: boolean
    prompt_verify: boolean
    hide_signup: boolean
    hide_sidebar_payments: boolean
  }
}>({
  query: `
    query GetCluster($id: String!) {
      cluster: GetCluster(id: $id) {
        id
        created
        updated
        count_users
        count_teams
        name
        login_redirect_uri
        logout_redirect_uri
        theme_preference
        enable_team
        signup_create_team
        prompt_team
        prompt_verify
        hide_signup
        hide_sidebar_payments
      }
    }
  `,
})
