import { createElement as element, FC } from 'react'
import { Page } from '@authpack/theme'
import { createUseServer } from '../hooks/useServer'
import { ConfirmRemove } from '../templates/ConfirmRemove'

export const RemoveTeam: FC<{
  id: string
  change?: (id?: string) => void
}> = ({ id, change }) => {
  const gqlRemoveTeam = useRemoveTeam()
  return element(Page, {
    title: 'Remove',
    subtitle: 'Team',
    children: element(ConfirmRemove, {
      helper: 'Remove this team',
      alert: 'Please confirm the removal of this team',
      loading: gqlRemoveTeam.loading,
      change: () => gqlRemoveTeam.fetch({ id }).then(() => change && change()),
    }),
  })
}

const useRemoveTeam = createUseServer<{
  team: {
    id: string
  }
}>({
  query: `
    mutation RemoveTeam($id: String!) {
      team: RemoveTeam(id: $id) {
        id
      }
    }
  `,
})
