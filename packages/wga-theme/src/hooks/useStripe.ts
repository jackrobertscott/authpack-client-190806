import { useMemo } from 'react'

export const useStripe = (stripe: any) => {
  const tokenize = (cardStripe: any, options: any = {}): Promise<any> => {
    return stripe
      .createToken(cardStripe, options)
      .then(({ error, token }: any = {}) => {
        if (error) throw error
        return token
      })
  }
  return useMemo(() => {
    return { tokenize }
  }, [stripe])
}
