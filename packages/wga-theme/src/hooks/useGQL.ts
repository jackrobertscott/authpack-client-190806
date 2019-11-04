import axios from 'axios'
import { useState, useMemo, useEffect, useRef } from 'react'
import { useToaster } from './useToaster'

export const createUseGQL = <V, T>(options: {
  url: string
  query: string
  name?: string
  authorization?: string
}) => () => {
  return useGQL<V, T>(options)
}

export const useGQL = <V, T>({
  url,
  query,
  name,
  authorization,
}: {
  url: string
  query: string
  name?: string
  authorization?: string
}) => {
  const mounted = useRef(false)
  useEffect(() => {
    mounted.current = true
    return () => {
      mounted.current = false
    }
  }, [])
  const toaster = useToaster()
  const [data, dataChange] = useState<T | undefined>()
  const [loading, loadingChange] = useState<boolean>()
  const [error, errorChange] = useState<Error | undefined>()
  const fetch = (variables?: V) => {
    loadingChange(true)
    errorChange(undefined)
    return axios({
      url,
      method: 'post',
      headers: {
        'Content-Type': 'application/json',
        Authorization: authorization || '',
      },
      data: {
        query,
        variables,
        operationName: name,
      },
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
      .catch((caught: Error & { code: number }) => {
        if (mounted.current) {
          errorChange(caught)
          loadingChange(false)
          toaster.add({
            icon: 'bell',
            label: `Error ${(caught && caught.code) || ''}`,
            helper: caught.message,
          })
        }
        throw caught
      })
  }
  const factory = () => ({
    data,
    loading,
    error,
    fetch,
  })
  return useMemo(factory, [data, loading, error])
}
