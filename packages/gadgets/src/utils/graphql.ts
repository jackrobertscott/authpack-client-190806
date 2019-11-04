import axios from 'axios'
import { Dispatcher } from 'events-and-things'
import { config } from './config'
import { settings } from './settings'
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
        url: config.state.api,
        method: 'post',
        headers: {
          'Content-Type': 'application/json',
          Authorization: [settings.state.domain, settings.state.bearer]
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
