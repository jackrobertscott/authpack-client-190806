import { fetcher } from './fetcher'

export type IGraph<IShape, IOptionsCreate, IOptionsUpdate> = {
  analytics(options?: {
    ending?: string
    months?: number
  }): Promise<{
    created: number
    updated: number
  }>
  count(options?: { search?: string }): Promise<number>
  create(options: IOptionsCreate): Promise<IShape>
  list(options?: { search?: string; limit?: number }): Promise<IShape[]>
  remove(options: { id: string }): Promise<IShape>
  retrieve(options: { id: string }): Promise<IShape>
  update(options: IOptionsUpdate): Promise<IShape>
}

export const createGraph = <IShape, IOptionsCreate, IOptionsUpdate>({
  name,
  fields,
  authorization,
}: {
  name: string
  fields: string
  authorization: string
}): IGraph<IShape, IOptionsCreate, IOptionsUpdate> => {
  const sender = fetcher(authorization)
  return {
    analytics: options =>
      sender({
        variables: { options },
        query: `
          query Analytics${name}($options: Analytics${name}Options) {
            data: Analytics${name}(options: $options) {
              created
              updated
            }
          }
        `,
      }),
    count: options =>
      sender({
        variables: { options },
        query: `
          query Count${name}($options: Count${name}Options) {
            data: Count${name}(options: $options)
          }
        `,
      }),
    create: options =>
      sender({
        variables: { options },
        query: `
          mutation Create${name}($options: Create${name}Options) {
            data: Create${name}(options: $options) {
              ${fields}
            }
          }
        `,
      }),
    list: options =>
      sender({
        variables: { options },
        query: `
          query List${name}($options: List${name}Options) {
            data: List${name}(options: $options) {
              ${fields}
            }
          }
        `,
      }),
    remove: options =>
      sender({
        variables: { options },
        query: `
          mutation Remove${name}($options: Remove${name}Options) {
            data: Remove${name}(options: $options) {
              ${fields}
            }
          }
        `,
      }),
    retrieve: options =>
      sender({
        variables: { options },
        query: `
          query Retrieve${name}($options: Retrieve${name}Options) {
            data: Retrieve${name}(options: $options) {
              ${fields}
            }
          }
        `,
      }),
    update: options =>
      sender({
        variables: { options },
        query: `
          mutation Update${name}($options: Update${name}Options) {
            data: Update${name}(options: $options) {
              ${fields}
            }
          }
        `,
      }),
  }
}
