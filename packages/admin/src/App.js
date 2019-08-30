import { createElement as component } from 'react'
import { css } from 'emotion'
import GraphiQL from 'graphiql'
import 'graphiql/graphiql.css'

export const App = () => {
  const graphQLFetcher = graphQLParams => {
    return fetch('http://localhost:4000', {
      method: 'post',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(graphQLParams),
    }).then(response => response.json())
  }
  return component('div', {
    className: css({
      height: '100vh',
    }),
    children: component(GraphiQL, {
      fetcher: graphQLFetcher,
    }),
  })
}
