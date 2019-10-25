import { Dispatcher } from 'events-and-things'
import { sender } from './sender'

export interface IGraphql {
  variables?: { [key: string]: any }
  data?: { [key: string]: any }
}

export const generator = <T extends IGraphql>({
  url,
  authorization,
  name,
  query,
}: {
  url: string
  authorization: string
  name: string
  query: string
}) => {
  const dispatcher = new Dispatcher<T['data']>()
  return {
    async run(variables: T['variables']) {
      const data = await sender<T['variables']>({
        url,
        query,
        operationName: name,
        variables,
        authorization,
      })
      dispatcher.dispatch(data)
      return data
    },
    listen(callback: (data: T['data']) => void) {
      return dispatcher.listen(callback)
    },
  }
}
