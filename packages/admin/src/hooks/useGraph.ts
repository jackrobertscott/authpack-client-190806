import { useState, useMemo } from 'react'
import { chat } from '../utils/server'

export const useGraph = <T>({
  query,
  api,
}: {
  query: string
  api?: boolean
}): {
  data: T | undefined
  loading?: boolean
  error?: Error
  fetch: (
    variables?: { [key: string]: any },
    operationName?: string
  ) => Promise<any>
} => {
  const [data, dataChange] = useState<T | undefined>()
  const [loading, loadingChange] = useState<boolean>()
  const [error, errorChange] = useState<Error | undefined>()
  const fetch = (
    variables?: { [key: string]: any },
    operationName?: string
  ) => {
    loadingChange(true)
    errorChange(undefined)
    return chat({
      query,
      variables,
      operationName,
      api,
    })
      .then((done: any) => {
        if (done && done.error) throw done
        dataChange(done)
        errorChange(undefined)
        loadingChange(false)
        return done
      })
      .catch((caught: Error) => {
        errorChange(caught)
        loadingChange(false)
        throw caught
      })
  }
  // eslint-disable-next-line
  return useMemo(() => ({ data, loading, error, fetch }), [
    data,
    loading,
    error,
  ])
}
