import * as yup from 'yup'

yup.addMethod(yup.mixed, 'json', function(message?: string) {
  return this.test(
    'json',
    message || '${path} is not a valid JSON string',
    value => {
      if (!value) return false
      try {
        JSON.parse(value)
      } catch {
        return false
      }
      return true
    }
  ).transform(function(value) {
    return this.isType(value)
      ? JSON.stringify(JSON.parse(value), null, 2)
      : value
  })
})
