import * as yup from 'yup'
import { createElement as create, FC, useEffect } from 'react'
import {
  useSchema,
  Layout,
  Control,
  InputString,
  testAlphanumeric,
  Page,
} from 'wga-theme'
import { useSettings } from '../hooks/useSettings'
import { createUseServer } from '../hooks/useServer'

export const UpdateTeam: FC<{
  change?: (id?: string) => void
}> = ({ change }) => {
  const settings = useSettings()
  const gqlGetTeam = useGetTeam()
  const gqlUpdateTeam = useUpdateTeam()
  const schema = useSchema({
    schema: SchemaUpdateTeam,
    poller: input => {
      gqlUpdateTeam
        .fetch({ input })
        .then(({ team }) => change && change(team.id))
    },
  })
  useEffect(() => {
    gqlGetTeam.fetch().then(({ team }) => schema.set(team))
    // eslint-disable-next-line
  }, [])
  return create(Page, {
    title: 'Update',
    subtitle: settings.cluster && settings.cluster.name,
    children: create(Layout, {
      column: true,
      padding: true,
      divide: true,
      children: !gqlGetTeam.data
        ? null
        : [
            create(Layout, {
              key: 'name',
              divide: true,
              media: true,
              children: [
                create(Control, {
                  key: 'name',
                  label: 'Name',
                  helper: "Your team's name",
                  error: schema.error('name'),
                  children: create(InputString, {
                    value: schema.value('name'),
                    change: schema.change('name'),
                    placeholder: 'My Team',
                  }),
                }),
                create(Control, {
                  key: 'tag',
                  label: 'Tag',
                  helper: "Claim your team's unique id tag",
                  error: schema.error('tag'),
                  children: create(InputString, {
                    value: schema.value('tag'),
                    change: schema.change('tag'),
                    placeholder: 'my_team_123',
                  }),
                }),
              ],
            }),
            create(Control, {
              key: 'description',
              label: 'Description',
              helper: 'Optionally describe what your team does',
              error: schema.error('description'),
              children: create(InputString, {
                value: schema.value('description'),
                change: schema.change('description'),
                placeholder: 'We do...',
              }),
            }),
          ],
    }),
  })
}

const SchemaUpdateTeam = yup.object().shape({
  name: yup.string().required('Please provide the team name'),
  tag: yup
    .string()
    .test(
      'alphamun',
      'Please use only numbers, letters and underscores',
      testAlphanumeric
    )
    .required('Please provide the team tag'),
  description: yup.string(),
})

const useGetTeam = createUseServer<{
  team: {
    name: string
    tag: string
    description?: string
  }
}>({
  query: `
    query GetTeamClient {
      team: GetTeamClient {
        name
        tag
        description
      }
    }
  `,
})

const useUpdateTeam = createUseServer<{
  team: {
    id: string
  }
}>({
  query: `
    mutation UpdateTeamClient($input: UpdateTeamInput!) {
      team: UpdateTeamClient(input: $input) {
        id
      }
    }
  `,
})
