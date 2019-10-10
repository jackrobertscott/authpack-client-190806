import { createElement as create, FC } from 'react'
import { Gadgets, Overview } from 'wga-theme'
import { format } from 'date-fns'
import { createUseGraph } from '../hooks/useGraph'

export type IRetrieveUser = {
  id: string
  change?: () => void
}

export const RetrieveUser: FC<IRetrieveUser> = ({ id }) => {
  // load the user to show on page
  const retrieveUserGraph = useRetrieveUser({
    options: { id },
  })
  return create(Gadgets.Container, {
    label: 'Overview User',
    brand: 'Authenticator',
    children: create(Gadgets.Spacer, {
      children: create(Overview.Spacer, {
        children: retrieveUserGraph.data && [
          create(Overview.Container, {
            key: 'Id',
            label: 'Id',
            icon: 'fingerprint',
            value: retrieveUserGraph.data.user.id,
          }),
          create(Overview.Container, {
            key: 'Email',
            label: 'Email',
            icon: 'inbox',
            value: retrieveUserGraph.data.user.email,
          }),
          create(Overview.Container, {
            key: 'Username',
            label: 'Username',
            icon: 'tags',
            value: retrieveUserGraph.data.user.username,
          }),
          create(Overview.Container, {
            key: 'Name',
            label: 'Name',
            icon: 'user',
            value: retrieveUserGraph.data.user.name,
          }),
          create(Overview.Container, {
            key: 'Created',
            label: 'Created',
            icon: 'clock',
            value: format(
              new Date(retrieveUserGraph.data.user.created),
              "dd LLL yyyy 'at' hh:mm aaaa"
            ),
          }),
          create(Overview.Container, {
            key: 'Updated',
            label: 'Updated',
            icon: 'clock',
            value: format(
              new Date(retrieveUserGraph.data.user.updated),
              "dd LLL yyyy 'at' hh:mm aaaa"
            ),
          }),
        ],
      }),
    }),
  })
}

const useRetrieveUser = createUseGraph<{
  user: {
    id: string
    created: string
    updated: string
    name: string
    username: string
    email: string
  }
}>({
  name: 'RetrieveUser',
  query: `
    query RetrieveUser($options: RetrieveUserOptions!) {
      user: RetrieveUser(options: $options) {
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
