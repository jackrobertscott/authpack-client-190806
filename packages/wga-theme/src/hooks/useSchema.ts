import * as yup from 'yup'
import { useState, useMemo, useRef, useEffect } from 'react'
import { ToasterStore } from '../utils/toaster'

export const useSchema = ({
  schema,
  change,
  submit,
}: {
  schema: yup.ObjectSchema<any>
  change?: (value: { [key: string]: any }) => void
  submit?: (value: { [key: string]: any }) => void
}) => {
  const mounted = useRef(false)
  const [valid, validChange] = useState<boolean>(false)
  const [loaded, loadedChange] = useState<boolean>(false)
  const [state, stateChange] = useState<{ [key: string]: any }>({})
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
    const tasks = Object.keys(state).map(async key => {
      try {
        await schema.validateAt(key, state)
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
      .then(e => mounted.current && loadedChange(true) && errorChange(e))
  }, [loaded])
  useEffect(() => {
    if (mounted.current && change) change(state)
  }, [state])
  useEffect(() => {
    if (mounted.current)
      validChange(loaded && !Object.values(error).filter(Boolean).length)
  }, [loaded, error])
  const update = (key: string) => (data: any) => {
    const value = { ...state, [key]: data }
    stateChange(value)
    schema
      .validateAt(key, value)
      .then(() => {
        if (mounted.current && error[key])
          errorChange({ ...error, [key]: undefined })
      })
      .catch(e => mounted.current && errorChange({ ...error, [key]: e }))
  }
  return useMemo(() => {
    return {
      state,
      valid,
      value: (key: string) => state[key],
      error: (key: string) => error[key],
      change: (key: string) => update(key),
      set: (value: { [key: string]: any }) => {
        stateChange(value)
        loadedChange(false)
      },
      validate: (data: any) => schema.validate(data),
      submit: () =>
        submit &&
        schema
          .validate(state, { stripUnknown: true })
          .then(data => submit(data))
          .catch(e => {
            ToasterStore.add({
              icon: 'bell',
              label: 'Error',
              helper: e.message,
            })
          }),
    }
  }, [valid, state, error, schema])
}
