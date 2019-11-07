import * as yup from 'yup'
import { useState, useMemo, useRef, useEffect } from 'react'
import { useStore } from './useStore'
import { useToaster } from './useToaster'
import { Store } from 'events-and-things'

export const useSchema = ({
  schema,
  change,
  submit,
}: {
  local?: string
  schema: yup.ObjectSchema<any>
  change?: (value: { [key: string]: any }) => void
  submit?: (value: { [key: string]: any }) => void
}) => {
  const toaster = useToaster()
  const mounted = useRef(false)
  const [valid, validChange] = useState<boolean>(true)
  const ref = useRef(new Store(schema.default()))
  const store = useStore<{ [key: string]: any }>({ store: ref.current })
  const [error, errorChange] = useState<{
    [key: string]: Error | undefined
  }>({})
  useEffect(() => {
    mounted.current = true
    return () => {
      mounted.current = false
    }
  }, [])
  useEffect(() => {
    const tasks = Object.keys(store).map(async key => {
      try {
        await schema.validateAt(key, store)
        return [key, undefined]
      } catch (e) {
        return [key, e]
      }
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
    if (change)
      return ref.current.listen((data: { [key: string]: any }) => {
        if (mounted.current) change(data)
      })
  }, [])
  useEffect(() => {
    if (mounted.current)
      validChange(!Object.values(error).filter(Boolean).length)
  }, [error])
  const update = (key: string) => (data: any) => {
    ref.current.change({ ...store, [key]: data })
    schema
      .validateAt(key, store)
      .then(() => {
        if (mounted.current && error[key])
          errorChange({ ...error, [key]: undefined })
      })
      .catch(e => mounted.current && errorChange({ ...error, [key]: e }))
  }
  return useMemo(() => {
    return {
      valid,
      state: store,
      value: (key: string) => store[key],
      error: (key: string) => error[key],
      change: (key: string) => update(key),
      validate: (data: any) => schema.validate(data),
      submit: () =>
        submit &&
        schema
          .validate(store)
          .then(data => submit(data))
          .catch(e => {
            toaster.add({
              icon: 'bell',
              label: 'Error',
              helper: e.message,
            })
          }),
    }
  }, [valid, store, error])
}
