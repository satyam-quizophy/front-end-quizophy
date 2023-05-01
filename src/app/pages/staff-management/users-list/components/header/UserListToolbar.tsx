import {KTSVG} from '../../../../../../_metronic/helpers'
import {useListView} from '../../core/ListViewProvider'
import {UsersListFilter} from './UsersListFilter'
import {useQueryResponseData, useQueryResponseLoading} from '../../core/QueryResponseProvider'
import {ExportReactCSV} from '../Export'
import { useAuth } from '../../../../../modules/auth'
import { warningMessage } from '../../../../../modules/auth/components/ToastComp'

const UsersListToolbar = () => {
  const {setItemIdForUpdate} = useListView()
  const {currentUser}=useAuth()
  const users = useQueryResponseData()
  const openAddUserModal = () => {
    setItemIdForUpdate(null)
  }

  return (
    <div className='d-flex justify-content-end' data-kt-user-table-toolbar='base'>
      <UsersListFilter />

      <ExportReactCSV csvData={users} fileName={'staff.xls'} />
      <button type='button' className='btn btn-primary' onClick={()=>{
        openAddUserModal()
      }}>
        <KTSVG path='/media/icons/duotune/arrows/arr075.svg' className='svg-icon-2' />
        Add Staff
      </button>
      {/* end::Add user */}
    </div>
  )
}

export {UsersListToolbar}
