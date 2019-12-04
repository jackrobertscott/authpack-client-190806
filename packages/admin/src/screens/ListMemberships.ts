import faker from 'faker'
import { createElement as create, FC, useState, useEffect, useRef } from 'react'
import { Page, Table, Empty, drip } from 'wga-theme'
import { format } from 'date-fns'
import { RouterManagerMembership } from './RouterManagerMembership'
import { TemplateSearchBar } from '../templates/TemplateSearchBar'
import { createUseServer } from '../hooks/useServer'

export const ListMemberships: FC<{
  user_id?: string
  team_id?: string
}> = ({ user_id, team_id }) => {
  const gqlListMemberships = useListMemberships()
  const [build, buildChange] = useState<boolean>(false)
  const [idcurrent, idcurrentChange] = useState<string | undefined>()
  const [variables, variablesChange] = useState<{
    where: { user_id?: string; team_id?: string }
    options: { [key: string]: any }
  }>({ where: { user_id, team_id }, options: { sort: 'created' } })
  const queryListMemberships = useRef(drip(1000, gqlListMemberships.fetch))
  useEffect(() => {
    if (variables.options.limit) queryListMemberships.current(variables)
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
        user_id,
        team_id,
        change: id => {
          queryListMemberships.current(variables)
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
          icon: 'user-tag',
          label: 'Memberships',
          helper:
            'Memberships are created when a user becomes a member of a team',
        }),
      gqlListMemberships.data &&
        create(Table, {
          key: 'table',
          header: (user_id
            ? [
                { key: 'team_id', label: 'Team' },
                { key: 'created', label: 'Created' },
              ]
            : [
                { key: 'user_id', label: 'User' },
                { key: 'created', label: 'Created' },
              ]
          ).map(({ key, label }) => ({
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
            cells: user_id
              ? [
                  {
                    icon: 'users',
                    value: data.team ? data.team.summary : '...',
                  },
                  {
                    icon: 'clock',
                    value: format(new Date(data.created), 'dd LLL yy @ h:mm a'),
                  },
                ]
              : [
                  {
                    icon: 'user',
                    value: data.user
                      ? data.user.summary
                      : data.user_email || '...',
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

const useListMemberships = createUseServer<{
  count: number
  memberships: Array<{
    id: string
    created: string
    user_email?: string
    user?: {
      summary: string
    }
    team?: {
      summary: string
    }
  }>
}>({
  query: `
    query ListMemberships($where: WhereMemberships, $options: WhereOptions) {
      count: CountMemberships(where: $where)
      memberships: ListMemberships(where: $where, options: $options) {
        id
        created
        user_email
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
  user_email?: string
  user: {
    summary: string
  }
  team?: {
    summary: string
  }
}> = Array.from(Array(5).keys()).map(() => ({
  id: faker.random.uuid(),
  created: faker.date.recent(100).toDateString(),
  user_email: faker.internet.email(),
  user: {
    summary: faker.name.findName(),
  },
  team: {
    summary: faker.random.words(2),
  },
}))
