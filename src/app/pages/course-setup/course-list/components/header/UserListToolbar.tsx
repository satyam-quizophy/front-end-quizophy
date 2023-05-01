import {useRef} from 'react'
import {KTSVG} from '../../../../../../_metronic/helpers'
import {useListView} from '../../core/ListViewProvider'
import {useQueryResponseData} from '../../core/QueryResponseProvider'
import {ExportReactCSV} from '../Export'
import {UsersListFilter} from './UsersListFilter'

const UsersListToolbar = () => {
  const users = useQueryResponseData()
  const {setItemIdForUpdate} = useListView()
  const openDrawerRef: any = useRef(null)
  const openAddUserModal = () => {
    setItemIdForUpdate(null)
    openDrawerRef.current.setAttribute('id', 'kt_drawer_course_toggle')
  }

  return (
    <div className='d-flex justify-content-end' data-kt-user-table-toolbar='base'>
      {/* <UsersListFilter /> */}

      {/* begin::Export */}
      <ExportReactCSV csvData={users} fileName={'courses.xls'} />

      {/* end::Export */}

      {/* begin::Add user */}
      <button
        type='button'
        ref={openDrawerRef}
        className='btn btn-primary'
        onClick={openAddUserModal}
      >
        <KTSVG path='/media/icons/duotune/arrows/arr075.svg' className='svg-icon-2' />
        Add Course
      </button>
      {/* end::Add user */}
    </div>
  )
}

export {UsersListToolbar}
