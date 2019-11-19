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
import { useUniversal } from '../hooks/useUniversal'
import { createUseServer } from '../hooks/useServer'

export const UpdateTeam: FC<{
  id: string
  change?: (id?: string) => void
}> = ({ id, change }) => {
  const universal = useUniversal()
  const gqlGetTeam = useGetTeam()
  const gqlUpdateTeam = useUpdateTeam()
  const schema = useSchema({
    schema: SchemaUpdateTeam,
    poller: value => {
      gqlUpdateTeam
        .fetch({ id, value })
        .then(({ team }) => change && change(team.id))
    },
  })
  useEffect(() => {
    gqlGetTeam.fetch({ id }).then(({ team }) => schema.set(team))
    // eslint-disable-next-line
  }, [id])
  return create(Gadgets, {
    title: 'Update Team',
    subtitle: universal.app_name,
    loading: gqlUpdateTeam.loading,
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
    query apiGetTeam($id: String!) {
      team: apiGetTeam(id: $id) {
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
    mutation apiUpdateTeam($id: String!, $value: UpdateTeamValue!) {
      team: apiUpdateTeam(id: $id, value: $value) {
        id
      }
    }
  `,
})
