import '@fortawesome/fontawesome-free/css/all.min.css'
import GraphiQL from 'graphiql'
import 'graphiql/graphiql.css'
import { createElement as create, FC } from 'react'
import { storiesOf } from '@storybook/react'
import { css } from 'emotion'
import { Root, graphql, useTheme } from '../src/index'

console.clear()

const stories = storiesOf('Pages', module).addDecorator(data => {
  return create(Root, {
    theme: 'night_sky',
    children: create('div', {
      children: data(),
      className: css({
        display: 'flex',
        flexGrow: 1,
      }),
    }),
  })
})

stories.add('Explorer', () => {
  return create(Explorer)
})

const Explorer: FC = () => {
  const theme = useTheme()
  return create('div', {
    children: create(GraphiQL, {
      fetcher: async (graphQLParams: any) => {
        try {
          const data = await graphql<any>({
            ...graphQLParams,
            url: 'http://localhost:4000',
            authorization: ['wga-secret-key-f94c72f42177ca30b3f861ead']
              .filter(Boolean)
              .join(','),
          })
          return data.__schema ? { data } : data
        } catch (error) {
          return Promise.resolve(error)
        }
      },
    }),
    className: css({
      flexGrow: 1,
      /**
       * Styles here...
       */
    }),
  })
}
