export const testAlphanumeric = (value: any) => {
  if (!value) return true
  return (
    typeof value === 'string' && new RegExp('^[0-9a-zA-Z_]+$', 'i').test(value)
  )
}
