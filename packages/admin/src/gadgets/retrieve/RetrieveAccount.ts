import { createElement as create, FC, useEffect } from 'react'
import { Gadgets, Overview } from 'wga-theme'
import { format } from 'date-fns'
import { useGraph } from '../../hooks/useGraph'

export type IRetrieveAccount = {
  id: string
  change?: () => void
}

export const RetrieveAccount: FC<IRetrieveAccount> = ({ id }) => {
  const retrieveAccountGraph = useGraph<{
    account: {
      id: string
      created: string
      updated: string
      name: string
      username: string
      email: string
    }
  }>({
    api: true,
    query: `
      query RetrieveAccount($options: RetrieveAccountOptions!) {
        account: RetrieveAccount(options: $options) {
          id
          updated
          created
          name
          username
          email
        }
      }
    `,
  })
  useEffect(() => {
    retrieveAccountGraph.fetch({
      options: { id },
    })
    // eslint-disable-next-line
  }, [id])
  return create(Gadgets.Container, {
    label: 'Update Account',
    brand: 'Your App',
    children: create(Gadgets.Spacer, {
      children: retrieveAccountGraph.data && [
        create(Overview.Container, {
          key: 'Id',
          label: 'Id',
          icon: 'fingerprint',
          value: retrieveAccountGraph.data.account.id,
        }),
        create(Overview.Container, {
          key: 'Email',
          label: 'Email',
          icon: 'inbox',
          value: retrieveAccountGraph.data.account.email,
        }),
        create(Overview.Container, {
          key: 'Username',
          label: 'Username',
          icon: 'tags',
          value: retrieveAccountGraph.data.account.username,
        }),
        create(Overview.Container, {
          key: 'Name',
          label: 'Name',
          icon: 'user',
          value: retrieveAccountGraph.data.account.name,
        }),
        create(Overview.Container, {
          key: 'Created',
          label: 'Created',
          icon: 'clock',
          value: format(
            new Date(retrieveAccountGraph.data.account.created),
            "dd LLL yyyy 'at' hh:mm aaaa"
          ),
        }),
        create(Overview.Container, {
          key: 'Updated',
          label: 'Updated',
          icon: 'clock',
          value: format(
            new Date(retrieveAccountGraph.data.account.updated),
            "dd LLL yyyy 'at' hh:mm aaaa"
          ),
        }),
      ],
    }),
  })
}
