import { Radio } from 'events-and-things'

export const radio = new Radio<{ name: string; payload?: any }>(null, {
  key: 'wga',
})
