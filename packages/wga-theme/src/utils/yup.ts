export const testAlphanumeric = (value: any) => {
  return typeof value === 'string' && new RegExp('^[a-z0-9]+$', 'i').test(value)
}
