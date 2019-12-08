import faker from 'faker'
import { createElement as create, FC, useState, useEffect, useRef } from 'react'
import { Page, Table, Empty, drip } from '@authpack/theme'
import { format } from 'date-fns'
import { RouterManagerCredential } from './RouterManagerCredential'
import { createUseServer } from '../hooks/useServer'
import { TemplateSearchBar } from '../templates/TemplateSearchBar'

export const ListCredentials: FC<{ user_id?: string }> = ({ user_id }) => {
  const gqlListCredentials = useListCredentials()
  const [build, buildChange] = useState<boolean>(false)
  const [idcurrent, idcurrentChange] = useState<string | undefined>()
  const [variables, variablesChange] = useState<{
    where: { user_id?: string }
    options: { [key: string]: any }
  }>({ where: { user_id }, options: { sort: 'created' } })
  const queryListCredentials = useRef(drip(1000, gqlListCredentials.fetch))
  useEffect(() => {
    if (variables.options.limit) queryListCredentials.current(variables)
    // eslint-disable-next-line
  }, [variables])
  const list =
    gqlListCredentials.data && gqlListCredentials.data.count
      ? gqlListCredentials.data.credentials
      : Boolean(gqlListCredentials.data && !gqlListCredentials.data.credentials)
      ? []
      : FakeCredentials
  return create(Page, {
    title: 'Credentials',
    subtitle: 'User',
    hidden: !gqlListCredentials.data || !gqlListCredentials.data.count,
    noscroll: create(TemplateSearchBar, {
      input: false,
      count: gqlListCredentials.data && gqlListCredentials.data.count,
      current:
        gqlListCredentials.data && gqlListCredentials.data.credentials.length,
      change: (_, limit, skip) =>
        variablesChange({
          ...variables,
          options: { ...variables.options, limit, skip },
        }),
    }),
    children: [
      create(RouterManagerCredential, {
        key: 'router',
        id: idcurrent,
        visible: build,
        change: id => {
          queryListCredentials.current(variables)
          if (id) {
            idcurrentChange(id)
          } else {
            buildChange(false)
            setTimeout(() => idcurrentChange(undefined), 200) // animation
          }
        },
        close: () => {
          buildChange(false)
          setTimeout(() => idcurrentChange(undefined), 200) // animation
        },
      }),
      gqlListCredentials.data &&
        !gqlListCredentials.data.count &&
        create(Empty, {
          key: 'empty',
          icon: 'history',
          label: 'Credentials',
          helper:
            'Credentials are created when a user logins in with a oauth provider',
        }),
      gqlListCredentials.data &&
        create(Table, {
          key: 'table',
          header: [
            { key: 'provider_id', label: 'Provider' },
            { key: 'created', label: 'Created' },
          ].map(({ key, label }) => ({
            label,
            icon:
              variables.options && variables.options.sort === key
                ? variables.options.reverse
                  ? 'chevron-down'
                  : 'chevron-up'
                : 'equals',
            click: () =>
              variablesChange({
                ...variables,
                options: {
                  ...variables.options,
                  sort: key,
                  reverse: !variables.options.reverse,
                },
              }),
          })),
          rows: list.map(data => ({
            id: data.id,
            click: () => {
              idcurrentChange(data.id)
              buildChange(true)
            },
            cells: [
              {
                icon: 'users',
                value: data.provider ? data.provider.name : '...',
              },
              {
                icon: 'clock',
                value: format(new Date(data.created), 'dd LLL yy @ h:mm a'),
              },
            ],
          })),
        }),
    ],
  })
}

const useListCredentials = createUseServer<{
  count: number
  credentials: Array<{
    id: string
    created: string
    provider?: {
      name: string
    }
  }>
}>({
  query: `
    query ListCredentials($where: WhereCredentials!, $options: WhereOptions) {
      count: CountCredentials(where: $where)
      credentials: ListCredentials(where: $where, options: $options) {
        id
        created
        provider {
          name
        }
      }
    }
  `,
})

const FakeCredentials: Array<{
  id: string
  created: string
  provider?: {
    name: string
  }
}> = Array.from(Array(5).keys()).map(() => ({
  id: faker.random.uuid(),
  created: faker.date.recent(100).toDateString(),
  provider: {
    name: faker.random.words(1),
  },
}))
