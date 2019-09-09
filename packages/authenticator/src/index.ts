import { polyfill } from 'es6-promise'
import { createAccessors, IGraphAccessors } from './endpoints/accessors'
import { IGraphAccounts, createAccounts } from './endpoints/accounts'
import { IGraphGroups, createGroups } from './endpoints/groups'
import { IGraphMemberships, createMemberships } from './endpoints/memberships'
import { IGraphPermissions, createPermissions } from './endpoints/permissions'
import { IGraphProviders, createProviders } from './endpoints/providers'
import { IGraphSessions, createSessions } from './endpoints/sessions'

polyfill()

export type IAuthenticator = {
  key: string
}

export class Authenticator {
  public accessors: IGraphAccessors
  public accounts: IGraphAccounts
  public groups: IGraphGroups
  public memberships: IGraphMemberships
  public permissions: IGraphPermissions
  public providers: IGraphProviders
  public sessions: IGraphSessions
  private key: string

  constructor({ key }: IAuthenticator) {
    this.key = key
    this.accessors = createAccessors(this.key)
    this.accounts = createAccounts(this.key)
    this.groups = createGroups(this.key)
    this.memberships = createMemberships(this.key)
    this.permissions = createPermissions(this.key)
    this.providers = createProviders(this.key)
    this.sessions = createSessions(this.key)
  }
}
