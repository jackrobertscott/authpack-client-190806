import * as yup from 'yup'
import { useState, useMemo, useRef, useEffect } from 'react'
import { useStore } from './useStore'
import { useToaster } from './useToaster'

interface IValue {
  [key: string]: any
}
interface IError {
  [key: string]: Error | undefined
}

export const useSchema = ({
  local,
  schema,
  change,
  submit,
}: {
  local?: string
  schema: yup.ObjectSchema<any>
  change?: (value: IValue) => void
  submit?: (value: any) => void
}) => {
  const store = useStore<IValue>({
    key: local,
    initial: schema.default(),
  })
  const toaster = useToaster()
  const mounted = useRef(false)
  const [error, errorChange] = useState<IError>({})
  const [valid, validChange] = useState<boolean>(true)
  useEffect(() => {
    mounted.current = true
    return () => {
      mounted.current = false
    }
  }, [])
  useEffect(() => {
    const tasks = Object.keys(store.state).map(key => {
      return schema
        .validateAt(key, store.state)
        .then(() => [key, undefined])
        .catch(e => [key, e])
    })
    Promise.all(tasks)
      .then(errors => {
        return errors.reduce((all, next) => {
          const [key, value] = next as [string, any]
          if (key && value) (all as any)[key as string] = value
          return all
        }, {})
      })
      .then(e => mounted.current && errorChange(e))
    if (change) return store.listen(data => mounted.current && change(data))
  }, [])
  useEffect(() => {
    if (mounted.current)
      validChange(!Object.values(error).filter(Boolean).length)
  }, [error])
  const update = (key: string) => (data: any) => {
    store.change({ ...store.state, [key]: data })
    schema
      .validateAt(key, store.state)
      .then(() => {
        if (mounted.current && error[key])
          errorChange({ ...error, [key]: undefined })
      })
      .catch(e => mounted.current && errorChange({ ...error, [key]: e }))
  }
  return useMemo(() => {
    return {
      valid,
      state: store.state,
      value: (key: string) => store.state[key],
      error: (key: string) => error[key],
      change: (key: string) => update(key),
      validate: (data: any) => schema.validate(data),
      submit: () =>
        submit &&
        schema
          .validate(store.state)
          .then(data => submit(data))
          .catch(e => {
            toaster.add({
              icon: 'bell',
              label: 'Error',
              helper: e.message,
            })
          }),
    }
  }, [valid, store.state, error])
}
