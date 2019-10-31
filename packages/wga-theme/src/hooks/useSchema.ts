import * as yup from 'yup'
import { useState, useMemo, useRef, useEffect } from 'react'

interface IValue {
  [key: string]: any
}

interface IError {
  [key: string]: Error | undefined
}

export const useSchema = ({
  schema,
  change,
}: {
  schema: yup.ObjectSchema
  change?: (value: IValue) => void
}) => {
  const [value, valueChange] = useState<IValue>(schema.default())
  const [error, errorChange] = useState<IError>({})
  const mounted = useRef(false)
  useEffect(() => {
    if (change) change(value)
  }, [value])
  useEffect(() => {
    mounted.current = true
    return () => {
      mounted.current = false
    }
  }, [])
  const factory = () => ({
    valid: mounted.current && !Object.values(error).filter(Boolean).length,
    state: value,
    value(key: string) {
      return value[key]
    },
    error(key: string) {
      return error[key]
    },
    change(key: string) {
      return (data: any) => {
        const updates = { ...value, [key]: data }
        valueChange(updates)
        schema
          .validateAt(key, updates)
          .then(() => {
            if (mounted.current && error[key])
              errorChange({ ...error, [key]: undefined })
          })
          .catch(e => {
            if (mounted.current) errorChange({ ...error, [key]: e })
          })
      }
    },
  })
  return useMemo(factory, [value, error])
}
