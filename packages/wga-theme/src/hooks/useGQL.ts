import axios from 'axios'
import { useState, useMemo, useEffect, useRef } from 'react'
import { useToaster } from './useToaster'

export const createUseGQL = <T>(options: {
  url: string
  query: string
  name?: string
  authorization?: string
}) => () => {
  return useGQL<T>(options)
}

export const useGQL = <T>({
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
  const fetch = (variables?: any) => {
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
      .then(done => {
        if (mounted.current) {
          dataChange(done.data)
          errorChange(undefined)
          loadingChange(false)
        }
        return done.data as T
      })
      .catch(({ response }) => {
        if (mounted.current && response) {
          errorChange(response.data)
          loadingChange(false)
          toaster.add({
            icon: 'bell',
            label:
              response.data && response.data.code
                ? `Error ${response.data && response.data.code}`
                : 'Error',
            helper: response.data.message,
          })
          return Promise.reject(response.data)
        }
        const message = 'Could not connect to server'
        toaster.add({
          icon: 'wifi',
          label: 'Error',
          helper: message,
        })
        return Promise.reject(message)
      })
  }
  return useMemo(() => {
    return {
      data,
      loading,
      error,
      fetch,
    }
  }, [data, loading, error, url, query, name, authorization])
}
