import {KTSVG} from '../../../../../../_metronic/helpers'
import {useListView} from '../../core/ListViewProvider'
import {UsersListFilter} from './UsersListFilter'
import {useQueryResponseData, useQueryResponseLoading} from '../../core/QueryResponseProvider'
import {ExportReactCSV} from '../Export'
import { useAuth } from '../../../../../modules/auth'
import { warningMessage } from '../../../../../modules/auth/components/ToastComp'
import { useSelector } from 'react-redux'
import {useState,useEffect} from "react"
const UsersListToolbar = () => {
  const {setItemIdForUpdate} = useListView()
  const {currentUser}=useAuth()
  const users = useQueryResponseData()
  const openAddUserModal = () => {
    setItemIdForUpdate(null)
  }
  const {staffPermission,navItem}=useSelector((state:any)=>state.reducerData)
  const [permissionList,setPermissionList]=useState<any>({})
  const filterStaffPermission=async (title:string)=>{
    let result=staffPermission.filter((item:any)=>item.permission_name===title && item)
    setPermissionList(result[0])
  }
  useEffect(()=>{
    filterStaffPermission(navItem?.item)
    },[navItem])

  return (
    <div className='d-flex justify-content-end' data-kt-user-table-toolbar='base'>
      <UsersListFilter />

      <ExportReactCSV csvData={users} fileName={'staff.xls'} />
      {permissionList?.can_create && <button type='button' className='btn btn-primary' onClick={()=>{
        openAddUserModal()
      }}>
        <KTSVG path='/media/icons/duotune/arrows/arr075.svg' className='svg-icon-2' />
        Add Staff
      </button>}
      {/* end::Add user */}
    </div>
  )
}

export {UsersListToolbar}
