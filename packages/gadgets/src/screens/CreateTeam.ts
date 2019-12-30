import * as yup from 'yup'
import { createElement as element, FC } from 'react'
import {
  useSchema,
  Layout,
  Control,
  InputString,
  Button,
  testAlphanumeric,
  Page,
} from '@authpack/theme'
import { useSettings } from '../hooks/useSettings'
import { createUseServer } from '../hooks/useServer'
import { SettingsStore } from '../utils/settings'

export const CreateTeam: FC<{
  change: (id: string) => void
}> = ({ change }) => {
  const settings = useSettings()
  const gqlCreateTeam = useCreateTeam()
  const gqlSwitchTeam = useSwitchTeam()
  const schema = useSchema({
    schema: SchemaCreateTeam,
    submit: input => {
      gqlCreateTeam
        .fetch({ input })
        .then(({ team }) => gqlSwitchTeam.fetch({ id: team.id }))
        .then(({ session }) => {
          SettingsStore.update({ bearer: `Bearer ${session.token}` })
          change(session.team_id)
        })
    },
  })
  return element(Page, {
    title: 'Create',
    subtitle: settings.cluster && settings.cluster.name,
    children: [
      element(Layout, {
        key: 'layout',
        column: true,
        padding: true,
        divide: true,
        children: [
          element(Layout, {
            key: 'name',
            divide: true,
            media: true,
            children: [
              element(Control, {
                key: 'name',
                label: 'Name',
                helper: "Your team's name",
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
            label: 'Create',
            loading: gqlCreateTeam.loading || gqlSwitchTeam.loading,
            disabled: !schema.valid,
            click: schema.submit,
          }),
        ],
      }),
    ],
  })
}

const SchemaCreateTeam = yup.object().shape({
  name: yup.string().required('Please provide a team name'),
  tag: yup
    .string()
    .test(
      'alphamun',
      'Please use only numbers, letters and underscores',
      testAlphanumeric
    ),
  description: yup.string(),
})

const useCreateTeam = createUseServer<{
  team: {
    id: string
  }
}>({
  query: `
    mutation CreateTeamClient($input: CreateTeamInput!) {
      team: CreateTeamClient(input: $input) {
        id
      }
    }
  `,
})

const useSwitchTeam = createUseServer<{
  session: {
    token: string
    team_id: string
  }
}>({
  query: `
    mutation SwitchTeamClient($id: String!) {
      session: SwitchTeamClient(id: $id) {
        token
        team_id
      }
    }
  `,
})
