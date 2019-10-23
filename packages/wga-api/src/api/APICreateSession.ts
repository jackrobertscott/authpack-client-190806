import { generate } from '../utils/generate'
import { IMeta } from '../utils/types'
import { ISession, SessionFields } from '../models/Session'

export const APICreateSession = generate<
  {
    value: {
      meta?: IMeta
      user: string
      team?: string
      deactivated?: boolean
    }
  },
  {
    session: ISession
  }
>({
  name: 'APICreateSession',
  query: `
    mutation APICreateSession($value: APICreateSessionValue!) {
      session: APICreateSession(value: $value) {
        ${SessionFields}
      }
    }
  `,
})
