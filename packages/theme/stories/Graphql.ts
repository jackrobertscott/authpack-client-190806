import '@fortawesome/fontawesome-free/css/all.min.css'
import GraphiQL from 'graphiql'
import 'graphiql/graphiql.css'
import { createElement as element, FC } from 'react'
import { storiesOf } from '@storybook/react'
import { css } from 'emotion'
import { Root, graphql, useTheme } from '../src/index'

console.clear()

const stories = storiesOf('Pages', module).addDecorator(data => {
  return element(Root, {
    theme: 'night_sky',
    children: element('div', {
      children: data(),
      className: css({
        display: 'flex',
        flexGrow: 1,
      }),
    }),
  })
})

stories.add('Explorer', () => {
  return element(Explorer)
})

const Explorer: FC = () => {
  const theme = useTheme()
  return element('div', {
    children: element(GraphiQL, {
      fetcher: async (graphQLParams: any) => {
        try {
          const data = await graphql<any>({
            ...graphQLParams,
            url: 'http://localhost:4000',
            authorization: ['KEY_HERE'].filter(Boolean).join(','),
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
