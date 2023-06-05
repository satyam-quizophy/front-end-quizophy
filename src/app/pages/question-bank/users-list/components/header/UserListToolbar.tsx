import { useSelector } from 'react-redux'
import {KTSVG} from '../../../../../../_metronic/helpers'
import {useListView} from '../../core/ListViewProvider'
import {useQueryResponseData} from '../../core/QueryResponseProvider'
import {ExportReactCSV} from '../Export'
import {UsersListFilter} from './UsersListFilter'
import {useEffect,useState} from "react"
import { useNavigate } from 'react-router-dom'
const UsersListToolbar = () => {
  const navigate=useNavigate()
  const users = useQueryResponseData()
  const {setItemIdForUpdate} = useListView()
  const openAddUserModal = () => {
    // setItemIdForUpdate(null)
    navigate("/questions/edit-details")
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

      {/* begin::Export */}
      <ExportReactCSV csvData={users} fileName={'questions.xls'} />

      {/* end::Export */}

      {/* begin::Add user */}
      {permissionList?.can_create && <button type='button' className='btn btn-primary' onClick={openAddUserModal}>
        <KTSVG path='/media/icons/duotune/arrows/arr075.svg' className='svg-icon-2' />
        Add Question
      </button>}
      {/* end::Add user */}
    </div>
  )
}

export {UsersListToolbar}
