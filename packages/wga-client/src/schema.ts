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

export const schema = (data: { keys: () => string }) => {
  return {
    create: {
      credential: CreateCredential(data),
      membership: CreateMembership(data),
      team: CreateTeam(data),
    },
    forgot: {
      password: ForgotUserPassword(data),
    },
    list: {
      credentials: ListCredentials(data),
      memberships: ListMemberships(data),
      permissions: ListPermissions(data),
      providers: ListProviders(data),
      sessions: ListSessions(data),
      teams: ListTeams(data),
    },
    login: {
      user: LoginUser(data),
    },
    logout: {
      user: LogoutUser(data),
    },
    refresh: {
      credential: RefreshCredential(data),
      session: RefreshSession(data),
    },
    remove: {
      credential: RemoveCredential(data),
      membership: RemoveMembership(data),
      team: RemoveTeam(data),
      user: RemoveUser(data),
    },
    reset: {
      password: ResetUserPassword(data),
    },
    retrieve: {
      app: RetrieveApp(data),
      session: RetrieveSession(data),
    },
    signup: {
      user: SignupUser(data),
    },
    switch: {
      team: SwitchTeam(data),
    },
    update: {
      membership: UpdateMembership(data),
      team: UpdateTeam(data),
      user: UpdateUser(data),
      password: UpdateUserPassword(data),
    },
  }
}
