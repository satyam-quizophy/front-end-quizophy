import {KTSVG} from '../../../../../../_metronic/helpers'
import {useListView} from '../../core/ListViewProvider'
import {UsersListFilter} from './UsersListFilter'
import {useQueryResponseData, useQueryResponseLoading} from '../../core/QueryResponseProvider'
import {ExportReactCSV} from '../Export'

const UsersListToolbar = () => {
  const {setItemIdForUpdate} = useListView()
  const users = useQueryResponseData()
  console.log(users, 'users')
  const openAddUserModal = () => {
    setItemIdForUpdate(null)
  }

  return (
    <div className='d-flex justify-content-end' data-kt-user-table-toolbar='base'>
      <UsersListFilter />

      <ExportReactCSV csvData={users} fileName={'permissions.xls'} />
      
      <button type='button' className='btn btn-primary' onClick={openAddUserModal}>
        <KTSVG path='/media/icons/duotune/arrows/arr075.svg' className='svg-icon-2' />
        Add Permission
      </button>
      {/* end::Add user */}
    </div>
  )
}

export {UsersListToolbar}
