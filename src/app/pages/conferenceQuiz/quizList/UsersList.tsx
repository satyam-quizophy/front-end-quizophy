import {ListViewProvider} from './core/ListViewProvider'
import {QueryRequestProvider} from './core/QueryRequestProvider'
import {QueryResponseProvider} from './core/QueryResponseProvider'
import {UsersListHeader} from './components/header/UsersListHeader'
import {UsersTable} from './table/UsersTable'
import {KTCard} from '../../../../_metronic/helpers'
import {CommonDataProvider} from '../commonData/CommonDataProvider'

const UsersList = () => {
  return (
    <KTCard>
      <UsersListHeader />
      <UsersTable />
    </KTCard>
  )
}

const UsersListWrapper = () => (
  <QueryRequestProvider>
    <QueryResponseProvider>
      <ListViewProvider>
        <CommonDataProvider>
          <UsersList />
        </CommonDataProvider>
      </ListViewProvider>
    </QueryResponseProvider>
  </QueryRequestProvider>
)

export {UsersListWrapper}
