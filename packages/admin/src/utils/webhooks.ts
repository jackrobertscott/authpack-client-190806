export const WEBHOOKEVENTS = [
  'credentials',
  'memberships',
  'providers',
  'sessions',
  'teams',
  'users',
  'webhooks',
].flatMap(name => [`${name}.create`, `${name}.update`, `${name}.remove`])
