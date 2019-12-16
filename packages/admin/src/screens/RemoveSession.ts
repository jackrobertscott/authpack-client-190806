import { createElement as element, FC } from 'react'
import { Page } from '@authpack/theme'
import { createUseServer } from '../hooks/useServer'
import { ConfirmRemove } from '../templates/ConfirmRemove'

export const RemoveSession: FC<{
  id: string
  change?: (id?: string) => void
}> = ({ id, change }) => {
  const gqlRemoveSession = useRemoveSession()
  return element(Page, {
    title: 'Remove',
    subtitle: 'Session',
    children: element(ConfirmRemove, {
      helper: 'Remove this session',
      alert: 'Please confirm the removal of this session',
      loading: gqlRemoveSession.loading,
      change: () =>
        gqlRemoveSession.fetch({ id }).then(() => change && change()),
    }),
  })
}

const useRemoveSession = createUseServer<{
  session: {
    id: string
  }
}>({
  query: `
    mutation RemoveSession($id: String!) {
      session: RemoveSession(id: $id) {
        id
      }
    }
  `,
})
