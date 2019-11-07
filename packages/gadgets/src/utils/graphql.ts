import axios from 'axios'
import { Dispatcher } from 'events-and-things'
import { ConfigStore } from './config'
import { SettingsStore } from './settings'
import { useRef } from 'react'

export const createGraphqlHook = <V, T>({
  name,
  query,
}: {
  name: string
  query: string
}) => () => {
  const dispatcher = useRef(new Dispatcher<T>())
  return {
    async run(variables: V) {
      const { data } = await axios({
        url: ConfigStore.current.api,
        method: 'post',
        headers: {
          'Content-Type': 'application/json',
          Authorization: [
            SettingsStore.current.domain,
            SettingsStore.current.bearer,
          ]
            .filter(String)
            .join(','),
        },
        data: {
          query,
          variables,
          operationName: name,
        },
      })
      dispatcher.current.dispatch(data)
      return data
    },
    listen(callback: (data: T) => void) {
      return dispatcher.current.listen(callback)
    },
  }
}
