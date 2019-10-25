import { Dispatcher } from 'events-and-things'
import { sender } from './sender'

export const generator = <Variables, Result>({
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
  const dispatcher = new Dispatcher<Result>()
  return {
    async run(variables: Variables) {
      const data = await sender<Variables>({
        url,
        query,
        operationName: name,
        variables,
        authorization,
      })
      dispatcher.dispatch(data)
      return data
    },
    listen(callback: (data: Result) => void) {
      return dispatcher.listen(callback)
    },
  }
}
