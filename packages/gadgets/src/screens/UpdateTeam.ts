import * as yup from 'yup'
import { createElement as element, FC, useEffect } from 'react'
import {
  useSchema,
  Layout,
  Control,
  InputString,
  testAlphanumeric,
  Page,
  Button,
  useToaster,
} from '@authpack/theme'
import { useSettings } from '../hooks/useSettings'
import { createUseServer } from '../hooks/useServer'
import { SettingsStore } from '../utils/settings'

export const UpdateTeam: FC<{
  change?: (id?: string) => void
}> = ({ change }) => {
  const toaster = useToaster()
  const settings = useSettings()
  const gqlGetTeam = useGetTeam()
  const gqlUpdateTeam = useUpdateTeam()
  const schema = useSchema({
    schema: SchemaUpdateTeam,
    submit: input => {
      gqlUpdateTeam.fetch({ input }).then(({ team }) => {
        if (change) change(team.id)
        SettingsStore.update({
          team: {
            ...SettingsStore.current.team!,
            updated: team.updated,
          },
        })
        toaster.add({ icon: 'check-circle', label: 'Success' })
      })
    },
  })
  useEffect(() => {
    gqlGetTeam.fetch().then(({ team }) => schema.set(team))
    // eslint-disable-next-line
  }, [])
  return element(Page, {
    title: 'Update',
    subtitle: settings.cluster && settings.cluster.name,
    children: element(Layout, {
      column: true,
      padding: true,
      divide: true,
      children: !gqlGetTeam.data
        ? null
        : [
            element(Layout, {
              key: 'name',
              divide: true,
              media: true,
              children: [
                element(Control, {
                  key: 'name',
                  label: 'Name',
                  helper: 'Human friendly name',
                  error: schema.error('name'),
                  children: element(InputString, {
                    value: schema.value('name'),
                    change: schema.change('name'),
                    placeholder: 'Super Squad',
                  }),
                }),
                element(Control, {
                  key: 'tag',
                  label: 'Tag',
                  helper: "Claim your team's unique id tag",
                  error: schema.error('tag'),
                  children: element(InputString, {
                    value: schema.value('tag'),
                    change: schema.change('tag'),
                    placeholder: 'super_squad',
                  }),
                }),
              ],
            }),
            element(Control, {
              key: 'description',
              label: 'Description',
              helper: 'Optionally describe what your team does',
              error: schema.error('description'),
              children: element(InputString, {
                value: schema.value('description'),
                change: schema.change('description'),
                placeholder: 'We do...',
              }),
            }),
            element(Button, {
              key: 'submit',
              label: 'Save',
              loading: gqlGetTeam.loading || gqlUpdateTeam.loading,
              disabled: !schema.valid,
              click: schema.submit,
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
    updated: string
  }
}>({
  query: `
    mutation UpdateTeamClient($input: UpdateTeamInput!) {
      team: UpdateTeamClient(input: $input) {
        id
        updated
      }
    }
  `,
})
