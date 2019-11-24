import * as yup from 'yup'
import { createElement as create, FC, useEffect, useState } from 'react'
import {
  Gadgets,
  useSchema,
  Layout,
  Control,
  InputString,
  Button,
  testAlphanumeric,
  useMounted,
} from 'wga-theme'
import { useSettings } from '../hooks/useSettings'
import { SettingsStore } from '../utils/settings'
import { createUseServer } from '../hooks/useServer'
import { useOauthCode } from '../hooks/useOauthCode'
import { Loading } from './Loading'
import { presetColors } from '../utils/presets'
import { ReconcileUser } from './ReconcileUser'

export const SignupUser: FC = () => {
  const mounted = useMounted()
  const settings = useSettings()
  const oauthCode = useOauthCode()
  const gqlSignupUser = useSignupUser()
  const gqlListProviders = useListProviders()
  const gqlSignupUserOauth = useSignupUserOauth()
  const [current, currentChange] = useState<string | undefined>()
  const [email, emailChange] = useState<string | undefined>()
  const schema = useSchema({
    schema: SchemaSignupUser,
    submit: input => {
      gqlSignupUser.fetch({ input }).then(({ session }) => {
        schema.change('password')('')
        SettingsStore.update({
          open: false,
          bearer: `Bearer ${session.token}`,
        })
      })
    },
  })
  useEffect(() => {
    gqlListProviders.fetch()
    // eslint-disable-next-line
  }, [])
  useEffect(() => {
    if (current && oauthCode.code) {
      gqlSignupUserOauth
        .fetch({
          provider_id: current,
          code: oauthCode.code,
        })
        .then(({ session }) => {
          SettingsStore.update({
            open: false,
            bearer: `Bearer ${session.token}`,
          })
        })
        .finally(() => {
          if (!mounted.current) return
          currentChange(undefined)
          oauthCode.clearCode()
        })
    }
    // eslint-disable-next-line
  }, [oauthCode.code])
  return create(Gadgets, {
    title: 'Sign Up',
    subtitle: settings.cluster && settings.cluster.name,
    loading:
      gqlListProviders.loading ||
      gqlSignupUser.loading ||
      gqlSignupUserOauth.loading,
    children: current
      ? create(Loading, {
          helper: 'Checking your credentials',
        })
      : email
      ? create(ReconcileUser, {
          email,
        })
      : !gqlListProviders.data
      ? null
      : [
          !!gqlListProviders.data.providers.length &&
            create(Layout, {
              key: 'oauth',
              column: true,
              padding: true,
              divide: true,
              styled: true,
              children: gqlListProviders.data.providers.map(provider => {
                return create(Button, {
                  key: provider.id,
                  icon: provider.preset,
                  label: provider.name || provider.preset,
                  prefix: 'fab',
                  style: presetColors(provider.preset),
                  click: () => {
                    currentChange(provider.id)
                    oauthCode.openUrl(provider.url)
                  },
                })
              }),
            }),
          create(Layout, {
            key: 'form',
            column: true,
            padding: true,
            divide: true,
            children: [
              create(Layout, {
                key: 'name',
                divide: true,
                media: true,
                children: [
                  create(Control, {
                    key: 'name_given',
                    label: 'First Name',
                    error: schema.error('name_given'),
                    children: create(InputString, {
                      value: schema.value('name_given'),
                      change: schema.change('name_given'),
                      placeholder: 'Fred',
                    }),
                  }),
                  create(Control, {
                    key: 'name_family',
                    label: 'Last Name',
                    error: schema.error('name_family'),
                    children: create(InputString, {
                      value: schema.value('name_family'),
                      change: schema.change('name_family'),
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
                  placeholder: 'example_username_123',
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
              create(Control, {
                key: 'password',
                label: 'Password',
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
                label: 'Sign Up',
                disabled:
                  !schema.valid ||
                  gqlSignupUser.loading ||
                  gqlSignupUserOauth.loading,
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
  username: yup
    .string()
    .test(
      'alphamun',
      'Please use only numbers, letters and underscores',
      testAlphanumeric
    )
    .required('Please provide your username'),
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
