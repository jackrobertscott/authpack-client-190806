import { useState, useMemo, useRef } from 'react'
import { useToaster } from '../hooks/useToaster'
import { graphql } from '../utils/graphql'
import { useMounted } from './useMounted'
import { useSpinner } from './useSpinner'

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
  const mounted = useMounted()
  const toaster = useToaster()
  const spinner = useSpinner()
  const [data, dataChange] = useState<T | undefined>()
  const [loading, loadingChange] = useState<boolean>()
  const [error, errorChange] = useState<Error | undefined>()
  return useMemo(() => {
    return {
      data,
      loading,
      error,
      fetch: async (variables?: any): Promise<T> => {
        let stop: () => void
        count.current = count.current + 1
        if (mounted.current) {
          if (!loading) loadingChange(true)
          errorChange(undefined)
          stop = spinner.begin()
        }
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
            count.current = count.current - 1
            if (mounted.current && count.current === 0) {
              errorChange(e)
              loadingChange(false)
            }
            toaster.add({
              icon: e.icon || 'bell',
              label: e.status || 'Error',
              helper: e.message,
            })
            return Promise.reject(e)
          })
          .finally(() => stop && stop())
      },
    }
  }, [data, loading, error, url, query, name, authorization])
}
