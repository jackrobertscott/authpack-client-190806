import nodefetch from 'node-fetch'

export const fetcher = (authorization: string) => {
  return async ({
    query,
    variables,
  }: {
    query: string
    variables: { [key: string]: any }
  }) =>
    ((window && window.fetch) || nodefetch)('http://localhost:4000', {
      method: 'post',
      headers: {
        'Content-Type': 'application/json',
        Authorization: authorization,
      },
      body: JSON.stringify({ query, variables }),
    })
      .then(response => response.json())
      .then(({ data } = {}) => data)
}
