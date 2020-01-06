import * as yup from 'yup'
import { createElement as element, FC, useEffect } from 'react'
import {
  useSchema,
  Layout,
  Control,
  InputString,
  Button,
  useMounted,
  Page,
  Focus,
  useOauthCode,
} from '@authpack/theme'
import { useSettings } from '../hooks/useSettings'
import { SettingsStore } from '../utils/settings'
import { createUseServer } from '../hooks/useServer'
import { presetColors } from '../utils/presets'

export const SignupUser: FC = () => {
  const mounted = useMounted()
  const settings = useSettings()
  const oauthCode = useOauthCode()
  const gqlSignupUser = useSignupUser()
  const gqlListProviders = useListProviders()
  const gqlSignupUserOauth = useSignupUserOauth()
  const schema = useSchema({
    schema: SchemaSignupUser,
    submit: input => {
      gqlSignupUser.fetch({ input }).then(({ session }) => {
        SettingsStore.update({
          bearer: `Bearer ${session.token}`,
          open: false,
        })
      })
    },
  })
  useEffect(() => {
    gqlListProviders.fetch()
    // eslint-disable-next-line
  }, [])
  useEffect(() => {
    if (oauthCode.current && oauthCode.code) {
      gqlSignupUserOauth
        .fetch({
          provider_id: oauthCode.current,
          code: oauthCode.code,
        })
        .then(({ session }) => {
          SettingsStore.update({
            bearer: `Bearer ${session.token}`,
            open: false,
          })
        })
        .finally(() => {
          if (!mounted.current) return
          oauthCode.clear()
        })
    }
    // eslint-disable-next-line
  }, [oauthCode.current, oauthCode.code])
  return element(Page, {
    title: 'Signup',
    subtitle: settings.cluster && settings.cluster.name,
    children: oauthCode.current
      ? element(Focus, {
          icon: 'sync-alt',
          label: 'Pending',
          helper: 'Waiting for login with external app',
          children: element(Button, {
            icon: 'times-circle',
            label: 'Cancel',
            click: () => oauthCode.clear(),
          }),
        })
      : !gqlListProviders.data
      ? null
      : [
          !!gqlListProviders.data.providers.length &&
            element(Layout, {
              key: 'oauth',
              column: true,
              padding: true,
              divide: true,
              styled: true,
              children: gqlListProviders.data.providers.map(provider => {
                return element(Button, {
                  key: provider.id,
                  icon: provider.preset,
                  label: provider.name || provider.preset,
                  prefix: 'fab',
                  style: presetColors(provider.preset),
                  click: () => oauthCode.open(provider.id, provider.url),
                })
              }),
            }),
          element(Layout, {
            key: 'form',
            column: true,
            padding: true,
            divide: true,
            children: [
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
                key: 'email',
                label: 'Email',
                error: schema.error('email'),
                children: element(InputString, {
                  value: schema.value('email'),
                  change: schema.change('email'),
                  placeholder: 'example@email.com',
                }),
              }),
              element(Control, {
                key: 'password',
                label: 'Password',
                error: schema.error('password'),
                children: element(InputString, {
                  value: schema.value('password'),
                  change: schema.change('password'),
                  placeholder: '* * * * * * * *',
                  password: true,
                }),
              }),
              element(Button, {
                key: 'submit',
                label: 'Submit',
                loading: gqlSignupUser.loading || gqlSignupUserOauth.loading,
                disabled: !schema.valid,
                click: schema.submit,
              }),
            ],
          }),
        ],
  })
}

const SchemaSignupUser = yup.object().shape({
  name_given: yup.string(),
  name_family: yup.string(),
  email: yup
    .string()
    .email('Please make sure you have used a valid email address')
    .required('Please provide your email'),
  password: yup
    .string()
    .min(6, 'Password must be more than 6 characters')
    .required('Please provide your password'),
})

const useSignupUser = createUseServer<{
  session: {
    token: string
  }
}>({
  query: `
    mutation SignupUserClient($input: SignupUserInput!) {
      session: SignupUserClient(input: $input) {
        token
      }
    }
  `,
})

const useSignupUserOauth = createUseServer<{
  session: {
    token: string
  }
}>({
  query: `
    mutation SignupUserOauthClient($provider_id: String!, $code: String!) {
      session: SignupUserOauthClient(provider_id: $provider_id, code: $code) {
        token
      }
    }
  `,
})

const useListProviders = createUseServer<{
  providers: Array<{
    id: string
    preset: string
    name?: string
    url: string
  }>
}>({
  query: `
    query ListProvidersClient {
      providers: ListProvidersClient {
        id
        preset
        name
        url
      }
    }
  `,
})
