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
    }
  }
>({
  name: 'RetrieveApp',
  query: `
    query RetrieveApp($value: RetrieveAppValue) {
      app: RetrieveApp(value: $value) {
        id
      }
    }
  `,
})
