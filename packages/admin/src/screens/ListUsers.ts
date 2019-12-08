import faker from 'faker'
import { createElement as create, FC, useState, useEffect, useRef } from 'react'
import { Page, Table, Empty, Button, drip } from '@authpack/theme'
import { format } from 'date-fns'
import { RouterManagerUser } from './RouterManagerUser'
import { TemplateSearchBar } from '../templates/TemplateSearchBar'
import { createUseServer } from '../hooks/useServer'
import { useUniversal } from '../hooks/useUniversal'

export const ListUsers: FC = () => {
  const universal = useUniversal()
  const gqlListUsers = useListUsers()
  const [build, buildChange] = useState<boolean>(false)
  const [idcurrent, idcurrentChange] = useState<string | undefined>()
  const [variables, variablesChange] = useState<{
    options: { [key: string]: any }
    phrase?: string
  }>({
    options: { sort: 'created' },
  })
  const queryListUsers = useRef(drip(1000, gqlListUsers.fetch))
  useEffect(() => {
    if (variables.options.limit) queryListUsers.current(variables)
    // eslint-disable-next-line
  }, [variables])
  const list =
    gqlListUsers.data && gqlListUsers.data.count
      ? gqlListUsers.data.users
      : variables.phrase ||
        Boolean(gqlListUsers.data && !gqlListUsers.data.users)
      ? []
      : FakeUsers
  return create(Page, {
    title: 'Users',
    subtitle: `Accounts created on ${universal.cluster_name}`,
    hidden: !gqlListUsers.data || !gqlListUsers.data.count,
    corner: {
      icon: 'plus',
      label: 'New User',
      click: () => {
        buildChange(true)
        setTimeout(() => idcurrentChange(undefined), 200) // animation
      },
    },
    noscroll: create(TemplateSearchBar, {
      count: gqlListUsers.data && gqlListUsers.data.count,
      current: gqlListUsers.data && gqlListUsers.data.users.length,
      change: (phrase, limit, skip) => {
        variablesChange({
          ...variables,
          options: { ...variables.options, limit, skip },
          phrase,
        })
      },
    }),
    children: [
      create(RouterManagerUser, {
        key: 'router',
        id: idcurrent,
        visible: build,
        change: id => {
          queryListUsers.current(variables)
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
      gqlListUsers.data &&
        !gqlListUsers.data.count &&
        create(Empty, {
          key: 'empty',
          icon: 'user',
          label: 'Users',
          helper:
            'Create a user manually, with our gadgets, or by using our API',
          children: create(Button, {
            key: 'Regular',
            icon: 'book',
            label: 'See Documents',
            click: () =>
              window.open(
                'https://github.com/jackrobertscott/authpack/blob/master/readme.md'
              ),
          }),
        }),
      gqlListUsers.data &&
        create(Table, {
          key: 'table',
          header: [
            { key: 'email', label: 'Email' },
            { key: 'name_given', label: 'Name' },
            { key: 'username', label: 'Username' },
            { key: 'updated', label: 'Updated' },
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
              { icon: 'at', value: data.email },
              { icon: 'user', value: data.name || '...' },
              { icon: 'tags', value: data.username || '...' },
              {
                icon: 'clock',
                value: format(new Date(data.updated), 'dd LLL yyyy @ h:mm a'),
              },
            ],
          })),
        }),
    ],
  })
}

const useListUsers = createUseServer<{
  count: number
  users: Array<{
    id: string
    updated: string
    email: string
    username?: string
    name?: string
  }>
}>({
  query: `
    query ListUsers($phrase: String, $options: WhereOptions) {
      count: CountUsers(phrase: $phrase)
      users: ListUsers(phrase: $phrase, options: $options) {
        id
        updated
        email
        username
        name
      }
    }
  `,
})

const FakeUsers: Array<{
  id: string
  updated: string
  email: string
  username?: string
  name?: string
}> = Array.from(Array(8).keys()).map(() => ({
  id: faker.random.uuid(),
  updated: faker.date.recent(100).toDateString(),
  email: faker.internet.email(),
  username: faker.internet.userName(),
  name: faker.name.findName(),
}))
