import { CreateCredential } from './client/CreateCredential'
import { CreateMembership } from './client/CreateMembership'
import { CreateTeam } from './client/CreateTeam'
import { ForgotUserPassword } from './client/ForgotUserPassword'
import { ListCredentials } from './client/ListCredentials'
import { ListMemberships } from './client/ListMemberships'
import { ListPermissions } from './client/ListPermissions'
import { ListProviders } from './client/ListProviders'
import { ListSessions } from './client/ListSessions'
import { ListTeams } from './client/ListTeams'
import { LoginUser } from './client/LoginUser'
import { LogoutUser } from './client/LogoutUser'
import { RefreshCredential } from './client/RefreshCredential'
import { RefreshSession } from './client/RefreshSession'
import { RemoveCredential } from './client/RemoveCredential'
import { RemoveMembership } from './client/RemoveMembership'
import { RemoveTeam } from './client/RemoveTeam'
import { RemoveUser } from './client/RemoveUser'
import { ResetUserPassword } from './client/ResetUserPassword'
import { RetrieveApp } from './client/RetrieveApp'
import { RetrieveSession } from './client/RetrieveSession'
import { SignupUser } from './client/SignupUser'
import { SwitchTeam } from './client/SwitchTeam'
import { UpdateMembership } from './client/UpdateMembership'
import { UpdateTeam } from './client/UpdateTeam'
import { UpdateUser } from './client/UpdateUser'
import { UpdateUserPassword } from './client/UpdateUserPassword'

export interface ISchema {
  keys: () => string
}

export class Schema {
  protected keys: () => string
  constructor({ keys }: ISchema) {
    this.keys = keys
  }
  public get create() {
    return {
      credential: CreateCredential({ keys: this.keys }),
      membership: CreateMembership({ keys: this.keys }),
      team: CreateTeam({ keys: this.keys }),
    }
  }
  public get forgot() {
    return {
      password: ForgotUserPassword({ keys: this.keys }),
    }
  }
  public get list() {
    return {
      credentials: ListCredentials({ keys: this.keys }),
      memberships: ListMemberships({ keys: this.keys }),
      permissions: ListPermissions({ keys: this.keys }),
      providers: ListProviders({ keys: this.keys }),
      sessions: ListSessions({ keys: this.keys }),
      teams: ListTeams({ keys: this.keys }),
    }
  }
  public get login() {
    return {
      user: LoginUser({ keys: this.keys }),
    }
  }
  public get logout() {
    return {
      user: LogoutUser({ keys: this.keys }),
    }
  }
  public get refresh() {
    return {
      credential: RefreshCredential({ keys: this.keys }),
      session: RefreshSession({ keys: this.keys }),
    }
  }
  public get remove() {
    return {
      credential: RemoveCredential({ keys: this.keys }),
      membership: RemoveMembership({ keys: this.keys }),
      team: RemoveTeam({ keys: this.keys }),
      user: RemoveUser({ keys: this.keys }),
    }
  }
  public get reset() {
    return {
      password: ResetUserPassword({ keys: this.keys }),
    }
  }
  public get retrieve() {
    return {
      app: RetrieveApp({ keys: this.keys }),
      session: RetrieveSession({ keys: this.keys }),
    }
  }
  public get signup() {
    return {
      user: SignupUser({ keys: this.keys }),
    }
  }
  public get switch() {
    return {
      team: SwitchTeam({ keys: this.keys }),
    }
  }
  public get update() {
    return {
      membership: UpdateMembership({ keys: this.keys }),
      team: UpdateTeam({ keys: this.keys }),
      user: UpdateUser({ keys: this.keys }),
      password: UpdateUserPassword({ keys: this.keys }),
    }
  }
}
