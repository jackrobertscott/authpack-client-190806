export const testAlphanumeric = (value: any) => {
  return (
    typeof value === 'string' && new RegExp('^[0-9a-zA-Z_]+$', 'i').test(value)
  )
}
