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
  schema: yup.ObjectSchema
  change?: (value: IValue) => void
  submit?: (value: IValue) => void
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
      .then(errorChange)
    if (change) return store.listen(data => change(data))
  }, [])
  useEffect(() => {
    mounted.current = true
    return () => {
      mounted.current = false
    }
  }, [])
  useEffect(() => {
    validChange(!Object.values(error).filter(Boolean).length)
  }, [error])
  const update = (key: string) => (next: any) => {
    store.change({ ...store.state, [key]: next })
    schema
      .validateAt(key, store.state)
      .then(() => {
        if (mounted.current && error[key])
          setTimeout(() => errorChange({ ...error, [key]: undefined }))
      })
      .catch(e => {
        if (mounted.current)
          setTimeout(() => errorChange({ ...error, [key]: e }))
      })
  }
  const factory = () => ({
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
  })
  return useMemo(factory, [valid, store.state, error])
}
