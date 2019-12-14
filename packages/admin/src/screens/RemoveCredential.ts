import { createElement as element, FC } from 'react'
import { Page } from '@authpack/theme'
import { createUseServer } from '../hooks/useServer'
import { ConfirmRemove } from '../templates/ConfirmRemove'

export const RemoveCredential: FC<{
  id: string
  change?: (id?: string) => void
}> = ({ id, change }) => {
  const gqlRemoveCredential = useRemoveCredential()
  return element(Page, {
    title: 'Remove',
    subtitle: 'Credential',
    children: element(ConfirmRemove, {
      helper: 'Remove this credential',
      alert: 'Please confirm the removal of this credential',
      loading: gqlRemoveCredential.loading,
      change: () =>
        gqlRemoveCredential.fetch({ id }).then(() => change && change()),
    }),
  })
}

const useRemoveCredential = createUseServer<{
  credential: {
    id: string
  }
}>({
  query: `
    mutation RemoveCredential($id: String!) {
      credential: RemoveCredential(id: $id) {
        id
      }
    }
  `,
})
