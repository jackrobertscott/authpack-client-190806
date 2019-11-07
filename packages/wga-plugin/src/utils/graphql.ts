import axios from 'axios'
import { Dispatcher } from 'events-and-things'
import { SettingsStore } from './settings'

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
        url: SettingsStore.current.api,
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
