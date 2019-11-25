import faker from 'faker'
import { createElement as create, FC, useState, useEffect, useRef } from 'react'
import { Page, Table, Empty, Button, drip } from 'wga-theme'
import { format } from 'date-fns'
import { RouterManagerMembership } from './RouterManagerMembership'
import { TemplateSearchBar } from '../templates/TemplateSearchBar'
import { createUseServer } from '../hooks/useServer'

export const ListMembershipsOfTeam: FC<{ team_id: string }> = ({ team_id }) => {
  const gqlListMemberships = useListMemberships()
  const [build, buildChange] = useState<boolean>(false)
  const [idcurrent, idcurrentChange] = useState<string | undefined>()
  const [variables, variablesChange] = useState<{
    where: { team_id: string }
    options: { [key: string]: any }
  }>({ where: { team_id }, options: { sort: 'created' } })
  const queryListMemberships = useRef(drip(1000, gqlListMemberships.fetch))
  useEffect(() => {
    if (variables.where.team_id && variables.options.limit)
      queryListMemberships.current(variables)
    // eslint-disable-next-line
  }, [variables])
  const list =
    gqlListMemberships.data && gqlListMemberships.data.count
      ? gqlListMemberships.data.memberships
      : Boolean(gqlListMemberships.data && !gqlListMemberships.data.memberships)
      ? []
      : FakeMemberships
  return create(Page, {
    title: 'Memberships',
    subtitle: 'Team',
    hidden: !gqlListMemberships.data || !gqlListMemberships.data.count,
    corner: {
      icon: 'plus',
      label: 'New Membership',
      click: () => {
        buildChange(true)
        setTimeout(() => idcurrentChange(undefined), 200) // animation
      },
    },
    noscroll: create(TemplateSearchBar, {
      count: gqlListMemberships.data && gqlListMemberships.data.count,
      current:
        gqlListMemberships.data && gqlListMemberships.data.memberships.length,
      input: false,
      change: (_, limit, skip) =>
        variablesChange({
          ...variables,
          options: { ...variables.options, limit, skip },
        }),
    }),
    children: [
      create(RouterManagerMembership, {
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
      gqlListMemberships.data &&
        !gqlListMemberships.data.count &&
        create(Empty, {
          key: 'empty',
          icon: 'users',
          label: 'Memberships',
          helper:
            'Create a membership manually or by using the Authenticator API',
          children: create(Button, {
            key: 'Regular',
            label: 'See API',
            click: () => window.open('https://windowgadgets.io'),
          }),
        }),
      gqlListMemberships.data &&
        create(Table, {
          key: 'table',
          header: [
            { key: 'user_id', label: 'User' },
            { key: 'team_id', label: 'Team' },
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
                icon: 'user',
                value: data.user.summary,
              },
              {
                icon: 'users',
                value: data.team ? data.team.summary : '...',
              },
              {
                icon: 'clock',
                value: format(new Date(data.created), 'dd LLL yyyy @ h:mm a'),
              },
            ],
          })),
        }),
    ],
  })
}

const useListMemberships = createUseServer<{
  count: number
  memberships: Array<{
    id: string
    created: string
    user: {
      summary: string
    }
    team?: {
      summary: string
    }
  }>
}>({
  query: `
    query ListMemberships($where: WhereMemberships, $options: WhereOptions) {
      count: CountMemberships
      memberships: ListMemberships(where: $where, options: $options) {
        id
        created
        user {
          summary
        }
        team {
          summary
        }
      }
    }
  `,
})

const FakeMemberships: Array<{
  id: string
  created: string
  user: {
    summary: string
  }
  team?: {
    summary: string
  }
}> = Array.from(Array(20).keys()).map(() => ({
  id: faker.random.uuid(),
  created: faker.date.recent(100).toDateString(),
  user: {
    summary: faker.name.findName(),
  },
  team: {
    summary: faker.random.words(2),
  },
}))
