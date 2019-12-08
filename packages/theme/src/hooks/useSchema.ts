import * as yup from 'yup'
import { useState, useMemo, useRef, useEffect } from 'react'
import { useToaster } from '../hooks/useToaster'
import { drip } from '../utils/throttle'
import { useMounted } from './useMounted'

export const useSchema = ({
  schema,
  change,
  submit,
  poller = () => {},
}: {
  schema: yup.ObjectSchema<any>
  change?: (value: { [key: string]: any }) => void
  submit?: (value: { [key: string]: any }) => void
  poller?: (value: { [key: string]: any }) => void
}) => {
  const mounted = useMounted()
  const toaster = useToaster()
  const [valid, validChange] = useState<boolean>(false)
  const [ready, readyChange] = useState<boolean>(false)
  const [state, stateChange] = useState<{ [key: string]: any }>({
    ...schema.default(),
  })
  const [error, errorChange] = useState<{
    [key: string]: Error | undefined
  }>({})
  const dripPoller = useRef(drip(1000, poller))
  const set = (value: { [key: string]: any }) => {
    if (!mounted.current) return
    const clean = Object.keys(value).reduce((all: any, next) => {
      if (value[next] !== null) all[next] = value[next]
      return all
    }, {})
    stateChange(clean)
  }
  const update = (key: string) => (data: any) => {
    if (!mounted.current) return
    const value = { ...state, [key]: data }
    stateChange(value)
    schema
      .validateAt(key, value)
      .then(() => {
        if (!mounted.current) return
        errorChange({ ...error, [key]: undefined })
      })
      .catch(e => {
        if (!mounted.current) return
        errorChange({ ...error, [key]: e })
      })
  }
  useEffect(() => {
    if (mounted.current && change) change(state)
    const validatedFields = Object.keys(state).map(async key => {
      try {
        await schema.validateAt(key, state)
        return [key, undefined]
      } catch (e) {
        return [key, e]
      }
    })
    Promise.all(validatedFields)
      .then(errors => {
        return errors.reduce((all, next) => {
          const [key, value] = next as [string, any]
          if (key && value) (all as any)[key as string] = value
          return all
        }, {})
      })
      .then(e => {
        if (!mounted.current) return
        if (!Object.values(e).filter(Boolean).length) dripPoller.current(state)
        errorChange(e)
        readyChange(true)
      })
  }, [state])
  useEffect(() => {
    if (mounted.current)
      validChange(ready && !Object.values(error).filter(Boolean).length)
  }, [error])
  return useMemo(() => {
    return {
      set,
      state,
      valid,
      value: (key: string) => state[key],
      error: (key: string) => error[key],
      change: (key: string) => update(key),
      reset: () => set({ ...schema.default() }),
      submit: () =>
        mounted.current &&
        submit &&
        schema
          .validate(state, { stripUnknown: true })
          .then(data => submit(data))
          .catch(e => {
            toaster.add({
              icon: 'bell',
              label: 'Error',
              helper: e.message,
            })
          }),
    }
  }, [valid, state, error, schema])
}
