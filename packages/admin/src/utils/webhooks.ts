export const WEBHOOKEVENTS = [
  'credentials',
  'memberships',
  'roles',
  'providers',
  'sessions',
  'teams',
  'users',
  'webhooks',
].flatMap(name => [`${name}.create`, `${name}.update`, `${name}.remove`])
