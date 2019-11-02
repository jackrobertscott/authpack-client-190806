import { useState, useMemo, useEffect, useRef } from 'react'
import { useToaster } from 'wga-theme'
import { chat } from '../utils/chat'

export const createUseGraph = <T>({
  name,
  query,
}: {
  name?: string
  query: string
}) => (variables?: { [key: string]: any }, operationName?: string) => {
  const data = useGraph<T>({ query, name })
  useEffect(() => {
    if (variables) data.fetch(variables, operationName)
    // eslint-disable-next-line
  }, [])
  return data
}

export const useGraph = <T>({
  query,
  name,
}: {
  query: string
  name?: string
}): {
  data: T | undefined
  loading?: boolean
  error?: Error
  fetch: (
    variables?: { [key: string]: any },
    operationName?: string
  ) => Promise<T>
} => {
  const mounted = useRef(false)
  useEffect(() => {
    mounted.current = true
    return () => {
      mounted.current = false
    }
  }, [])
  const [data, dataChange] = useState<T | undefined>()
  const [loading, loadingChange] = useState<boolean>()
  const [error, errorChange] = useState<Error | undefined>()
  const toaster = useToaster()
  const fetch = (
    variables?: { [key: string]: any },
    operationName?: string
  ) => {
    loadingChange(true)
    errorChange(undefined)
    return chat({
      query,
      variables,
      operationName: operationName || name,
    })
      .then((done: any) => {
        if (done && done.error) throw done
        if (mounted.current) {
          dataChange(done)
          errorChange(undefined)
          loadingChange(false)
        }
        return done as T
      })
      .catch((caught: Error) => {
        if (mounted.current) {
          errorChange(caught)
          loadingChange(false)
          toaster.add({
            icon: 'bell',
            label: 'Error',
            description: caught.message,
          })
        }
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
