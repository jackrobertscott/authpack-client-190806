export const WEBHOOKEVENTS = [
  'coupons',
  'credentials',
  'memberships',
  'plans',
  'providers',
  'sessions',
  'subscriptions',
  'teams',
  'users',
  'webhooks',
].flatMap(name => [`${name}.create`, `${name}.update`, `${name}.remove`])
