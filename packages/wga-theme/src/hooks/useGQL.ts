import axios from 'axios'
import { useState, useMemo, useEffect, useRef } from 'react'
import { useToaster } from './useToaster'

export const createUseGraph = <T>({
  url,
  query,
  name,
}: {
  url: string
  query: string
  name?: string
}) => ({
  variables,
  operationName,
}: {
  variables?: { [key: string]: any }
  operationName?: string
}) => {
  const data = useGraph<T>({ url, query, name })
  useEffect(() => {
    if (variables)
      data.fetch({
        variables,
        operationName,
      })
  }, [])
  return data
}

export const useGraph = <T>({
  url,
  query,
  name,
}: {
  url: string
  query: string
  name?: string
}) => {
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
  const fetch = ({
    variables,
    operationName,
  }: {
    variables?: { [key: string]: any }
    operationName?: string
  }) => {
    loadingChange(true)
    errorChange(undefined)
    return axios({
      url,
      method: 'post',
      data: {
        query,
        variables,
        operationName: operationName || name,
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
  // eslint-disable-next-line
  const factory = () => ({
    data,
    loading,
    error,
    fetch,
  })
  return useMemo(factory, [data, loading, error])
}
