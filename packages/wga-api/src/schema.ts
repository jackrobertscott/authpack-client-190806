import { APICountCredentials } from './api/APICountCredentials'
import { APICountMemberships } from './api/APICountMemberships'
import { APICountPermissions } from './api/APICountPermissions'
import { APICountProviders } from './api/APICountProviders'
import { APICountSessions } from './api/APICountSessions'
import { APICountTeams } from './api/APICountTeams'
import { APICountUsers } from './api/APICountUsers'
import { APICreateCredential } from './api/APICreateCredential'
import { APICreateMembership } from './api/APICreateMembership'
import { APICreatePermission } from './api/APICreatePermission'
import { APICreateProvider } from './api/APICreateProvider'
import { APICreateSession } from './api/APICreateSession'
import { APICreateTeam } from './api/APICreateTeam'
import { APICreateUser } from './api/APICreateUser'
import { APIListCredentials } from './api/APIListCredentials'
import { APIListMemberships } from './api/APIListMemberships'
import { APIListPermissions } from './api/APIListPermissions'
import { APIListProviders } from './api/APIListProviders'
import { APIListSessions } from './api/APIListSessions'
import { APIListTeams } from './api/APIListTeams'
import { APIListUsers } from './api/APIListUsers'
import { APIRemoveCredential } from './api/APIRemoveCredential'
import { APIRemoveMembership } from './api/APIRemoveMembership'
import { APIRemovePermission } from './api/APIRemovePermission'
import { APIRemoveProvider } from './api/APIRemoveProvider'
import { APIRemoveSession } from './api/APIRemoveSession'
import { APIRemoveTeam } from './api/APIRemoveTeam'
import { APIRemoveUser } from './api/APIRemoveUser'
import { APIRetrieveCredential } from './api/APIRetrieveCredential'
import { APIRetrieveMembership } from './api/APIRetrieveMembership'
import { APIRetrievePermission } from './api/APIRetrievePermission'
import { APIRetrieveProvider } from './api/APIRetrieveProvider'
import { APIRetrieveSession } from './api/APIRetrieveSession'
import { APIRetrieveTeam } from './api/APIRetrieveTeam'
import { APIRetrieveUser } from './api/APIRetrieveUser'
import { APIUpdateCredential } from './api/APIUpdateCredential'
import { APIUpdateMembership } from './api/APIUpdateMembership'
import { APIUpdatePermission } from './api/APIUpdatePermission'
import { APIUpdateProvider } from './api/APIUpdateProvider'
import { APIUpdateSession } from './api/APIUpdateSession'
import { APIUpdateTeam } from './api/APIUpdateTeam'
import { APIUpdateUser } from './api/APIUpdateUser'

export const schema = (data: { keys: () => string }) => {
  return {
    count: {
      credentials: APICountCredentials(data),
      memberships: APICountMemberships(data),
      permissions: APICountPermissions(data),
      providers: APICountProviders(data),
      sessions: APICountSessions(data),
      teams: APICountTeams(data),
      users: APICountUsers(data),
    },
    create: {
      credential: APICreateCredential(data),
      membership: APICreateMembership(data),
      permission: APICreatePermission(data),
      provider: APICreateProvider(data),
      session: APICreateSession(data),
      team: APICreateTeam(data),
      user: APICreateUser(data),
    },
    list: {
      credentials: APIListCredentials(data),
      memberships: APIListMemberships(data),
      permissions: APIListPermissions(data),
      providers: APIListProviders(data),
      sessions: APIListSessions(data),
      teams: APIListTeams(data),
      users: APIListUsers(data),
    },
    remove: {
      credential: APIRemoveCredential(data),
      membership: APIRemoveMembership(data),
      permission: APIRemovePermission(data),
      provider: APIRemoveProvider(data),
      session: APIRemoveSession(data),
      team: APIRemoveTeam(data),
      user: APIRemoveUser(data),
    },
    retrieve: {
      credential: APIRetrieveCredential(data),
      membership: APIRetrieveMembership(data),
      permission: APIRetrievePermission(data),
      provider: APIRetrieveProvider(data),
      session: APIRetrieveSession(data),
      team: APIRetrieveTeam(data),
      user: APIRetrieveUser(data),
    },
    update: {
      credential: APIUpdateCredential(data),
      membership: APIUpdateMembership(data),
      permission: APIUpdatePermission(data),
      provider: APIUpdateProvider(data),
      session: APIUpdateSession(data),
      team: APIUpdateTeam(data),
      user: APIUpdateUser(data),
    },
  }
}
