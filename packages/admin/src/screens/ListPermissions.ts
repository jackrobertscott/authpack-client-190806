import faker from 'faker'
import { createElement as create, FC, useState, useEffect, useRef } from 'react'
import { Page, Table, Empty, Button, Focus, drip } from 'wga-theme'
import { format } from 'date-fns'
import { RouterManagerPermission } from '../routers/RouterManagerPermission'
import { TemplateSearchBar } from '../templates/TemplateSearchBar'
import { createUseServer } from '../hooks/useServer'

export const ListPermissions: FC = () => {
  const apiListPermissions = useListPermissions()
  const [build, buildChange] = useState<boolean>(false)
  const [idcurrent, idcurrentChange] = useState<string | undefined>()
  const [variables, variablesChange] = useState<{ [key: string]: any }>({})
  const queryListPermissions = useRef(drip(1000, apiListPermissions.fetch))
  useEffect(() => {
    if (variables) queryListPermissions.current(variables)
    // eslint-disable-next-line
  }, [variables])
  const list =
    apiListPermissions.data && apiListPermissions.data.count
      ? apiListPermissions.data.permissions
      : FakePermissions
  return create(Page, {
    title: 'Permissions',
    subtitle: 'See all permissions of your app',
    hidden: !apiListPermissions.data || !apiListPermissions.data.count,
    corner: {
      icon: 'plus',
      label: 'Create Permission',
      click: () => {
        buildChange(true)
        setTimeout(() => idcurrentChange(undefined), 200) // animation
      },
    },
    noscroll: create(TemplateSearchBar, {
      count: apiListPermissions.data && apiListPermissions.data.count,
      current:
        apiListPermissions.data && apiListPermissions.data.permissions.length,
      change: (search, limit, skip) => {
        variablesChange({
          phrase: search,
          options: { ...(variables.options || {}), limit, skip },
        })
      },
    }),
    children: [
      create(RouterManagerPermission, {
        key: 'router',
        id: idcurrent,
        change: id => {
          if (variables) queryListPermissions.current(variables)
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
      !apiListPermissions.data
        ? create(Focus, {
            key: 'loading',
            icon: 'sync-alt',
            label: 'Loading',
          })
        : !apiListPermissions.data.count &&
          create(Empty, {
            key: 'empty',
            icon: 'user-shield',
            label: 'Permissions',
            helper:
              'Create a permission manually or by using the Authenticator API',
            children: create(Button, {
              key: 'Regular',
              label: 'See API',
              click: () => window.open('https://windowgadgets.io'),
            }),
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
    query apiListPermissions($phrase: String, $options: WhereOptions) {
      count: apiCountPermissions(phrase: $phrase)
      permissions: apiListPermissions(phrase: $phrase, options: $options) {
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
}> = Array.from(Array(10).keys()).map(() => ({
  id: faker.random.uuid(),
  updated: faker.date.recent(100).toDateString(),
  name: faker.random.words(2),
  tag: faker.internet.userName(),
  description: faker.random.words(5),
}))
