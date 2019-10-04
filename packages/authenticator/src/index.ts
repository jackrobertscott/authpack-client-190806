import { IGraphUsers, createUsers } from './endpoints/users'
import { IGraphWorkspaces, createWorkspaces } from './endpoints/workspaces'
import { IGraphMemberships, createMemberships } from './endpoints/memberships'
import { IGraphPermissions, createPermissions } from './endpoints/permissions'
import { IGraphProviders, createProviders } from './endpoints/providers'
import { IGraphSessions, createSessions } from './endpoints/sessions'

export type IAuthenticator = {
  key: string
}

export class Authenticator {
  public users: IGraphUsers
  public workspaces: IGraphWorkspaces
  public memberships: IGraphMemberships
  public permissions: IGraphPermissions
  public providers: IGraphProviders
  public sessions: IGraphSessions
  private key: string

  constructor({ key }: IAuthenticator) {
    this.key = key
    this.users = createUsers(this.key)
    this.workspaces = createWorkspaces(this.key)
    this.memberships = createMemberships(this.key)
    this.permissions = createPermissions(this.key)
    this.providers = createProviders(this.key)
    this.sessions = createSessions(this.key)
  }
}
