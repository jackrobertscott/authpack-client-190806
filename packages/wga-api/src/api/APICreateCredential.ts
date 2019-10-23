import { generate } from '../utils/generate'
import { IMeta } from '../utils/types'
import { ICredential, CredentialFields } from '../models/Credential'

export const APICreateCredential = generate<
  {
    value: {
      meta?: IMeta
      user: string
      provider: string
      token: string
      email?: string
    }
  },
  {
    credential: ICredential
  }
>({
  name: 'APICreateCredential',
  query: `
    mutation APICreateCredential($value: APICreateCredentialValue!) {
      credential: APICreateCredential(value: $value) {
        ${CredentialFields}
      }
    }
  `,
})
