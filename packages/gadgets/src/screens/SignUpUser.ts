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

export const SignupUser: FC = () => {
  const mounted = useMounted()
  const settings = useSettings()
  const oauthCode = useOauthCode()
  const gqlSignupUser = useSignupUser()
  const gqlListProviders = useListProviders()
  const gqlSignupUserOauth = useSignupUserOauth()
  const [current, currentChange] = useState<string | undefined>()
  const schema = useSchema({
    schema: SchemaSignupUser,
    submit: value => {
      gqlSignupUser.fetch(value).then(({ session }) => {
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
          currentChange(undefined)
          oauthCode.clearCode()
        })
    }
    // eslint-disable-next-line
  }, [oauthCode.code])
  return create(Gadgets, {
    title: 'Sign Up',
    subtitle: settings.app && settings.app.name,
    loading:
      gqlListProviders.loading ||
      gqlSignupUser.loading ||
      gqlSignupUserOauth.loading,
    children: current
      ? create(Loading, {
          helper: 'Checking your credentials',
        })
      : !gqlListProviders.data
      ? null
      : create(Layout, {
          column: true,
          padding: true,
          divide: true,
          children: [
            gqlListProviders.data.providers.map(provider => {
              return create(Button, {
                key: provider.id,
                icon: provider.preset,
                label: provider.name || provider.preset,
                prefix: 'fab',
                click: () => {
                  if (!mounted.current) return
                  currentChange(provider.id)
                  oauthCode.openUrl(provider.url)
                },
              })
            }),
            create(Layout, {
              key: 'name',
              divide: true,
              media: true,
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
              label: 'Login',
              disabled: !schema.valid,
              click: schema.submit,
            }),
          ],
        }),
  })
}

const SchemaSignupUser = yup.object().shape({
  given_name: yup.string(),
  family_name: yup.string(),
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
    id: string
    token: string
  }
}>({
  query: `
    mutation wgaSignupUser($email: String!, $password: String!, $username: String, $given_name: String, $family_name: String) {
      session: wgaSignupUser(email: $email, password: $password, username: $username, given_name: $given_name, family_name: $family_name) {
        id
        token
      }
    }
  `,
})

const useSignupUserOauth = createUseServer<{
  session: {
    id: string
    token: string
  }
}>({
  query: `
    mutation wgaSignupUserOauth($provider_id: String!, $code: String!) {
      session: wgaSignupUserOauth(provider_id: $provider_id, code: $code) {
        id
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
    query wgaListProviders {
      providers: wgaListProviders {
        id
        preset
        name
        url
      }
    }
  `,
})
