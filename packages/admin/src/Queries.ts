import { createElement as create, FC } from 'react'
import { css } from 'emotion'
import GraphiQL from 'graphiql'
import 'graphiql/graphiql.css'

export const App: FC<{}> = () => {
  return create('div', {
    className: css({
      height: '100vh',
    }),
    children: create(GraphiQL, {
      fetcher: (graphQLParams: any) =>
        fetch('http://localhost:4000', {
          method: 'post',
          headers: {
            'Content-Type': 'application/json',
            Authorization: 'wga-secret-key-67db3981deecc8113513dff75',
          },
          body: JSON.stringify(graphQLParams),
        }).then(response => response.json()),
    } as any),
  })
}
