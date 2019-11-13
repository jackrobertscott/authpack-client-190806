import { useState, useMemo, useEffect, useRef } from 'react'
import { ToasterStore } from '../utils/toaster'
import { graphql } from '../utils/graphql'

export const createUseGQL = <T>(options: {
  url: string
  query: string
  operationName?: string
  authorization?: string
}) => () => {
  return useGQL<T>(options)
}

export const useGQL = <T>({
  url,
  query,
  operationName,
  authorization,
}: {
  url: string
  query: string
  operationName?: string
  authorization?: string
}) => {
  const count = useRef(0)
  const mounted = useRef(false)
  const [data, dataChange] = useState<T | undefined>()
  const [loading, loadingChange] = useState<boolean>()
  const [error, errorChange] = useState<Error | undefined>()
  useEffect(() => {
    mounted.current = true
    return () => {
      mounted.current = false
    }
  }, [])
  return useMemo(() => {
    return {
      data,
      loading,
      error,
      fetch: async (variables?: any): Promise<T> => {
        if (!loading) loadingChange(true)
        errorChange(undefined)
        count.current = count.current + 1
        return graphql<T>({
          url,
          query,
          operationName,
          authorization,
          variables,
        })
          .then(done => {
            count.current = count.current - 1
            if (mounted.current && count.current === 0) {
              dataChange(done)
              errorChange(undefined)
              loadingChange(false)
            }
            return done
          })
          .catch(e => {
            if (mounted.current) {
              errorChange(e)
              loadingChange(false)
            }
            ToasterStore.add({
              icon: e.icon || 'bell',
              label: `${e.status || 'Error'} ${e.code}`,
              helper: e.message,
            })
            return Promise.reject(e)
          })
      },
    }
  }, [data, loading, error, url, query, name, authorization])
}
