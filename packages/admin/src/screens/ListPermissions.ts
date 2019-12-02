import faker from 'faker'
import { createElement as create, FC, useState, useEffect, useRef } from 'react'
import { Page, Table, Empty, Button, drip } from 'wga-theme'
import { format } from 'date-fns'
import { RouterManagerPermission } from './RouterManagerPermission'
import { TemplateSearchBar } from '../templates/TemplateSearchBar'
import { createUseServer } from '../hooks/useServer'

export const ListPermissions: FC = () => {
  const gqlListPermissions = useListPermissions()
  const [build, buildChange] = useState<boolean>(false)
  const [idcurrent, idcurrentChange] = useState<string | undefined>()
  const [variables, variablesChange] = useState<{
    options: { [key: string]: any }
    phrase?: string
  }>({ options: { sort: 'created' } })
  const queryListPermissions = useRef(drip(1000, gqlListPermissions.fetch))
  useEffect(() => {
    if (variables.options.limit) queryListPermissions.current(variables)
    // eslint-disable-next-line
  }, [variables])
  const list =
    gqlListPermissions.data && gqlListPermissions.data.count
      ? gqlListPermissions.data.permissions
      : variables.phrase ||
        Boolean(gqlListPermissions.data && !gqlListPermissions.data.permissions)
      ? []
      : FakePermissions
  return create(Page, {
    title: 'Permissions',
    subtitle: 'Restrict team member abilities',
    hidden: !gqlListPermissions.data || !gqlListPermissions.data.count,
    corner: {
      icon: 'plus',
      label: 'New Permission',
      click: () => {
        buildChange(true)
        setTimeout(() => idcurrentChange(undefined), 200) // animation
      },
    },
    noscroll: create(TemplateSearchBar, {
      count: gqlListPermissions.data && gqlListPermissions.data.count,
      current:
        gqlListPermissions.data && gqlListPermissions.data.permissions.length,
      change: (phrase, limit, skip) => {
        variablesChange({
          ...variables,
          options: { ...variables.options, limit, skip },
          phrase,
        })
      },
    }),
    children: [
      create(RouterManagerPermission, {
        key: 'router',
        id: idcurrent,
        visible: build,
        change: id => {
          variablesChange({ ...variables })
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
      gqlListPermissions.data &&
        !gqlListPermissions.data.count &&
        create(Empty, {
          key: 'empty',
          icon: 'user-shield',
          label: 'Permissions',
          helper:
            'Create a permission manually or by using the Authpack API',
          children: create(Button, {
            key: 'Regular',
            label: 'See API',
            click: () => window.open('https://authpack.io'),
          }),
        }),
      gqlListPermissions.data &&
        create(Table, {
          key: 'table',
          header: [
            { key: 'name', label: 'Name' },
            { key: 'tag', label: 'Tag' },
            { key: 'description', label: 'Description' },
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
              { icon: 'users', value: data.name },
              { icon: 'fingerprint', value: data.tag || '...' },
              { icon: 'book', value: data.description || '...' },
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

const useListPermissions = createUseServer<{
  count: number
  permissions: Array<{
    id: string
    updated: string
    name: string
    tag: string
    description?: string
  }>
}>({
  query: `
    query ListPermissions($phrase: String, $options: WhereOptions) {
      count: CountPermissions(phrase: $phrase)
      permissions: ListPermissions(phrase: $phrase, options: $options) {
        id
        updated
        name
        tag
        description
      }
    }
  `,
})

const FakePermissions: Array<{
  id: string
  updated: string
  name: string
  tag: string
  description?: string
}> = Array.from(Array(8).keys()).map(() => ({
  id: faker.random.uuid(),
  updated: faker.date.recent(100).toDateString(),
  name: faker.random.words(2),
  tag: faker.internet.userName(),
  description: faker.random.words(5),
}))
