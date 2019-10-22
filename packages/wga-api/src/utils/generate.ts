import { Dispatcher } from 'events-and-things'

export const generate = <V, T>({
  name,
  query,
}: {
  name: string
  query: string
}) => ({ keys }: { keys: () => string }) => {
  const dispatcher = new Dispatcher<T>()
  return {
    async run(variables: V) {
      const data = await chat<V>({
        query,
        operationName: name,
        variables,
        authorization: keys(),
      })
      dispatcher.dispatch(data)
      return data
    },
    listen(callback: (data: T) => void) {
      return dispatcher.listen(callback)
    },
  }
}

export const chat = async <V>({
  query,
  operationName,
  authorization,
  variables,
}: {
  query: string
  operationName?: string
  authorization?: string
  variables: V
}) => {
  const response = await fetch('http://localhost:4000', {
    method: 'post',
    headers: {
      ['Content-Type']: 'application/json',
      ['Authorization']: authorization || '',
    },
    body: JSON.stringify({
      query,
      operationName,
      variables,
    }),
  })
  const json = await response.json()
  return json.data
}
