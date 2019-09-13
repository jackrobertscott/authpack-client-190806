import { useState, useMemo, useRef } from 'react'

export const useGraph = ({ query, api }: { query: string; api?: boolean }) => {
  const [data, dataChange] = useState()
  const [loading, loadingChange] = useState<boolean>()
  const [error, errorChange] = useState<Error | undefined>()
  const execute = useRef(
    (variables: { [key: string]: any }, operationName?: string) => {
      loadingChange(true)
      errorChange(undefined)
      return fetch('http://localhost:3500', {
        method: 'post',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          query,
          variables,
          operationName,
          api,
        }),
      })
        .then(response => response.json())
        .then((done: any) => {
          dataChange(done && done.data)
          errorChange(undefined)
          loadingChange(false)
          return done
        })
        .catch((caught: Error) => {
          errorChange(caught)
          loadingChange(false)
        })
    }
  )
  const value = useMemo(() => ({ data, loading, error }), [
    data,
    loading,
    error,
  ])
  return [value, execute.current] as [
    { data: any; loading?: boolean; error?: Error },
    (variables: { [key: string]: any }, operationName?: string) => Promise<any>
  ]
}
