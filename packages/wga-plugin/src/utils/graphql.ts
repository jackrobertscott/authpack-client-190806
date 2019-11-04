import axios from 'axios'
import { Dispatcher } from 'events-and-things'
import { settings } from './settings'

export const graphql = <V, T>({
  name,
  query,
}: {
  name: string
  query: string
}) => ({ keys }: { keys: () => string }) => {
  const dispatcher = new Dispatcher<T>()
  return {
    async run(variables: V) {
      const { data } = await axios({
        url: settings.state.api,
        method: 'post',
        headers: {
          'Content-Type': 'application/json',
          Authorization: keys(),
        },
        data: {
          query,
          variables,
          operationName: name,
        },
      })
      dispatcher.dispatch(data)
      return data
    },
    listen(callback: (data: T) => void) {
      return dispatcher.listen(callback)
    },
  }
}
