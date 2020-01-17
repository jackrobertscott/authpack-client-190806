import * as yup from 'yup'
import { createElement as element, FC, useEffect } from 'react'
import {
  useSchema,
  Layout,
  Control,
  InputString,
  InputStringArray,
  InputSelect,
  Page,
  Button,
  useToaster,
  InputBoolean,
} from '@authpack/theme'
import { useUniversal } from '../hooks/useUniversal'
import { createUseServer } from '../hooks/useServer'
import { UniversalStore } from '../utils/universal'

export const UpdateClusterClient: FC<{
  change?: (id?: string) => void
}> = ({ change }) => {
  const toaster = useToaster()
  const universal = useUniversal()
  const gqlGetCluster = useGetCluster()
  const gqlUpdateCluster = useUpdateCluster()
  const schema = useSchema({
    schema: SchemaUpdateCluster,
    submit: input => {
      gqlUpdateCluster
        .fetch({ input, id: universal.cluster_id })
        .then(({ cluster }) => {
          if (change) change(cluster.id)
          UniversalStore.update({ cluster_name: cluster.name })
          toaster.add({ icon: 'check-circle', label: 'Success' })
        })
    },
  })
  useEffect(() => {
    gqlGetCluster
      .fetch({ id: universal.cluster_id })
      .then(({ cluster }) => schema.set(cluster))
    // eslint-disable-next-line
  }, [universal.cluster_id])
  return element(Page, {
    title: 'Settings',
    subtitle: 'Refine your login system',
    children: element(Layout, {
      column: true,
      padding: true,
      divide: true,
      children: !gqlGetCluster.data
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
                  error: schema.error('name'),
                  children: element(InputString, {
                    value: schema.value('name'),
                    change: schema.change('name'),
                    placeholder: 'Cluster',
                  }),
                }),
                element(Control, {
                  key: 'theme_preference',
                  label: 'Theme',
                  error: schema.error('theme_preference'),
                  children: element(InputSelect, {
                    value: schema.value('theme_preference'),
                    change: schema.change('theme_preference'),
                    options: [
                      {
                        value: 'night_sky',
                        label: 'Night Sky',
                        helper: 'Dark theme',
                      },
                      {
                        value: 'snow_storm',
                        label: 'Snow Storm',
                        helper: 'Light theme',
                      },
                      {
                        value: 'blue_harvester',
                        label: 'Blue Harvester',
                        helper: 'Eye Friendly',
                      },
                    ],
                  }),
                }),
              ],
            }),
            element(Control, {
              key: 'domains',
              label: 'Whitelisted Domains',
              helper: 'Domains allowed to make authorized requests',
              error: schema.error('domains'),
              children: element(InputStringArray, {
                value: schema.value('domains'),
                change: schema.change('domains'),
                placeholder: '...',
              }),
            }),
            element(Control, {
              key: 'redirect_uri',
              label: 'Login Redirect Url',
              helper: 'Where does the user go when they sign in?',
              error: schema.error('redirect_uri'),
              children: element(InputString, {
                value: schema.value('redirect_uri'),
                change: schema.change('redirect_uri'),
                placeholder: '...',
              }),
            }),
            element(Layout, {
              key: 'teams',
              divide: true,
              media: true,
              children: [
                element(Control, {
                  key: 'enable_team',
                  label: 'Enable Teams',
                  helper: "User's will be able to create a team once logged in",
                  error: schema.error('enable_team'),
                  children: element(InputBoolean, {
                    value: schema.value('enable_team'),
                    change: schema.change('enable_team'),
                  }),
                }),
                element(Control, {
                  key: 'hide_signup',
                  label: 'Hide Signup Page',
                  helper: 'Good for invite only apps',
                  error: schema.error('hide_signup'),
                  children: element(InputBoolean, {
                    value: schema.value('hide_signup'),
                    change: schema.change('hide_signup'),
                  }),
                }),
              ],
            }),
            schema.state.enable_team &&
              element(Layout, {
                key: 'hide',
                divide: true,
                media: true,
                children: [
                  element(Control, {
                    key: 'signup_create_team',
                    label: 'Create Team on Signup',
                    helper: 'Team will be created for all new users on signup',
                    error: schema.error('signup_create_team'),
                    children: element(InputBoolean, {
                      value: schema.value('signup_create_team'),
                      change: schema.change('signup_create_team'),
                    }),
                  }),
                  element(Control, {
                    key: 'prompt_team',
                    label: 'Prompt Teams',
                    helper:
                      'Users without a team will be prompted to create one',
                    error: schema.error('prompt_team'),
                    children: element(InputBoolean, {
                      value: schema.value('prompt_team'),
                      change: schema.change('prompt_team'),
                    }),
                  }),
                ],
              }),
            element(Layout, {
              key: 'verify',
              divide: true,
              media: true,
              children: [
                element(Control, {
                  key: 'prompt_verify',
                  label: 'Prompt Verify',
                  helper: 'Prompt the user to verify their email',
                  error: schema.error('prompt_verify'),
                  children: element(InputBoolean, {
                    value: schema.value('prompt_verify'),
                    change: schema.change('prompt_verify'),
                  }),
                }),
                element(Control, {
                  key: 'hide_sidebar_payments',
                  label: 'Hide Sidebar During Payment',
                  helper: 'Keep the user focused on the payment',
                  error: schema.error('hide_sidebar_payments'),
                  children: element(InputBoolean, {
                    value: schema.value('hide_sidebar_payments'),
                    change: schema.change('hide_sidebar_payments'),
                  }),
                }),
              ],
            }),
            element(Button, {
              key: 'submit',
              label: 'Save',
              loading: gqlGetCluster.loading || gqlUpdateCluster.loading,
              disabled: !schema.valid,
              click: schema.submit,
            }),
          ],
    }),
  })
}

const SchemaUpdateCluster = yup.object().shape({
  name: yup.string().required('Please provide the cluster name'),
  domains: yup
    .array()
    .of(yup.string().required())
    .default([]),
  theme_preference: yup
    .string()
    .default('snow_storm')
    .required('Please select a theme'),
  redirect_uri: yup
    .string()
    .trim()
    .required('Please provide a login redirect url'),
  enable_team: yup.boolean().default(false),
  signup_create_team: yup.boolean().default(false),
  prompt_team: yup.boolean().default(false),
  prompt_verify: yup.boolean().default(false),
  hide_signup: yup.boolean().default(false),
  hide_sidebar_payments: yup.boolean().default(false),
})

const useGetCluster = createUseServer<{
  cluster: {
    name: string
    domains: string[]
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
    query GetClusterClient($id: String!) {
      cluster: GetClusterClient(id: $id) {
        name
        domains
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

const useUpdateCluster = createUseServer<{
  cluster: {
    id: string
    name: string
    theme_preference: string
  }
}>({
  query: `
    mutation UpdateClusterClient($id: String!, $input: UpdateClusterInput!) {
      cluster: UpdateClusterClient(id: $id, input: $input) {
        id
        name
        theme_preference
      }
    }
  `,
})
