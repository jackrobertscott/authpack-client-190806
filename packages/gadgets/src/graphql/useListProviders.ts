import { createUseServer } from '../hooks/useServer'

export const useListProviders = createUseServer<
  {},
  {
    providers: Array<{
      id: string
    }>
  }
>({
  name: 'ListProviders',
  query: `
    query ListProviders {
      providers: ListProviders {
        id
      }
    }
  `,
})
