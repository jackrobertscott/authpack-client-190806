import { Dispatcher } from 'events-and-things'

export interface IGraphql {
  variables?: { [key: string]: any }
  data?: { [key: string]: any }
}

export const generator = <T extends IGraphql>({
  handler,
}: {
  handler: (variables: T['variables']) => Promise<T['data']>
}) => {
  const dispatcher = new Dispatcher<T['data']>()
  return {
    async run(variables: T['variables']) {
      const data = await handler(variables)
      dispatcher.dispatch(data)
      return data
    },
    listen(callback: (data: T['data']) => void) {
      return dispatcher.listen(callback)
    },
  }
}
