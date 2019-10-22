import { generate } from '../utils/generate'

export const RetrieveApp = generate<
  {
    value: {
      // todo...
    }
  },
  {
    app: {
      id: string
      created: string
      updated: string
      meta: { [key: string]: any }
    }
  }
>({
  name: 'RetrieveApp',
  query: `
    query RetrieveApp($value: RetrieveAppValue) {
      app: RetrieveApp(value: $value) {
        id
        created
        updated
        meta
      }
    }
  `,
})
