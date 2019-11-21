import faker from 'faker'
import { createElement as create, FC, useState, useEffect, useRef } from 'react'
import { Page, Table, Empty, Button, drip } from 'wga-theme'
import { format } from 'date-fns'
import { RouterManagerUser } from '../routers/RouterManagerUser'
import { TemplateSearchBar } from '../templates/TemplateSearchBar'
import { createUseServer } from '../hooks/useServer'
import { useUniversal } from '../hooks/useUniversal'

export const ListUsers: FC = () => {
  const universal = useUniversal()
  const apiListUsers = useListUsers()
  const [build, buildChange] = useState<boolean>(false)
  const [idcurrent, idcurrentChange] = useState<string | undefined>()
  const [variables, variablesChange] = useState<{ [key: string]: any }>({
    options: { sort: 'created' },
  })
  const queryListUsers = useRef(drip(1000, apiListUsers.fetch))
  useEffect(() => {
    if (variables) queryListUsers.current(variables)
    // eslint-disable-next-line
  }, [variables])
  const list =
    apiListUsers.data && apiListUsers.data.count
      ? apiListUsers.data.users
      : apiListUsers.loading || variables.phrase
      ? []
      : FakeUsers
  return create(Page, {
    title: 'Users',
    subtitle: `Accounts created on ${universal.cluster_name}`,
    hidden: !apiListUsers.data || !apiListUsers.data.count,
    corner: {
      icon: 'plus',
      label: 'Create User',
      click: () => {
        buildChange(true)
        setTimeout(() => idcurrentChange(undefined), 200) // animation
      },
    },
    noscroll: create(TemplateSearchBar, {
      count: apiListUsers.data && apiListUsers.data.count,
      current: apiListUsers.data && apiListUsers.data.users.length,
      change: (search, limit, skip) => {
        variablesChange({
          phrase: search,
          options: { ...(variables.options || {}), limit, skip },
        })
      },
    }),
    children: [
      create(RouterManagerUser, {
        key: 'router',
        id: idcurrent,
        change: id => {
          if (variables) queryListUsers.current(variables)
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
        visible: build,
      }),
      apiListUsers.data &&
        !apiListUsers.data.count &&
        create(Empty, {
          key: 'empty',
          icon: 'user',
          label: 'Users',
          helper: 'Create a user manually or by using the Authenticator API',
          children: create(Button, {
            key: 'Regular',
            label: 'See API',
            click: () => window.open('https://windowgadgets.io'),
          }),
        }),
      apiListUsers.data &&
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
              variablesChange(({ options = {}, ...data }) => ({
                ...data,
                options: { ...options, sort: key, reverse: !options.reverse },
              })),
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
    query apiListUsers($phrase: String, $options: WhereOptions) {
      count: apiCountUsers(phrase: $phrase)
      users: apiListUsers(phrase: $phrase, options: $options) {
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
