import * as yup from 'yup'
import { createElement as create, FC, useEffect } from 'react'
import {
  Gadgets,
  useSchema,
  Layout,
  Control,
  InputString,
  testAlphanumeric,
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
  return create(Gadgets, {
    title: 'Update Team',
    subtitle: settings.app && settings.app.name,
    loading: gqlGetTeam.loading || gqlUpdateTeam.loading,
    children: create(Layout, {
      column: true,
      padding: true,
      divide: true,
      children: !gqlGetTeam.data
        ? null
        : [
            create(Control, {
              key: 'name',
              label: 'Name',
              error: schema.error('name'),
              children: create(InputString, {
                value: schema.value('name'),
                change: schema.change('name'),
                placeholder: 'Awesome People',
              }),
            }),
            create(Control, {
              key: 'tag',
              label: 'Tag',
              helper: 'A unique identifier for the team',
              error: schema.error('tag'),
              children: create(InputString, {
                value: schema.value('tag'),
                change: schema.change('tag'),
                placeholder: 'awesome_people',
              }),
            }),
            create(Control, {
              key: 'description',
              label: 'Description',
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
    query wgaGetCurrentTeam {
      team: wgaGetCurrentTeam {
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
    mutation wgaUpdateCurrentTeam($input: UpdateCurrentTeamInput!) {
      team: wgaUpdateCurrentTeam(input: $input) {
        id
      }
    }
  `,
})
