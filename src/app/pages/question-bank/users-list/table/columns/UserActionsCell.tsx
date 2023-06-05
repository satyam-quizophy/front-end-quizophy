/* eslint-disable jsx-a11y/anchor-is-valid */
import {FC, useEffect,useState} from 'react'
import {useMutation, useQueryClient} from 'react-query'
import {MenuComponent} from '../../../../../../_metronic/assets/ts/components'
import {ID, KTSVG, QUERIES} from '../../../../../../_metronic/helpers'
import {useListView} from '../../core/ListViewProvider'
import {useQueryResponse} from '../../core/QueryResponseProvider'
import {deleteUser} from '../../core/_requests'
import { useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import { successMessage } from '../../../../../modules/auth/components/ToastComp'
import { AiFillEdit } from 'react-icons/ai'
import { MdDeleteOutline } from 'react-icons/md'

type Props = {
  id: ID
}

const UserActionsCell: FC<Props> = ({id}) => {
  const {setItemIdForUpdate} = useListView()
  const navigate=useNavigate()
  const {query} = useQueryResponse()
  const queryClient = useQueryClient()

  useEffect(() => {
    MenuComponent.reinitialization()
  }, [])

  const openEditModal = () => {
    navigate(`/questions/edit-details/${id}`)
    // setItemIdForUpdate(id)
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
  
  const deleteItem = useMutation(() => deleteUser(id), {
    // 💡 response of the mutation is passed to onSuccess
    onSuccess: () => {
      successMessage("Question Bank details deleted successfully")
      // ✅ update detail view directly
      queryClient.invalidateQueries([`${QUERIES.USERS_LIST}-${query}`])
    },
  })

  return (
    <>
      <a
        href='#'
        className='btn btn-light btn-active-light-primary btn-sm'
        data-kt-menu-trigger='click'
        data-kt-menu-placement='bottom-end'
      >
        <i className='bi bi-three-dots-vertical fs-5'></i>
      </a>
      {/* begin::Menu */}
      <div
        className='menu menu-sub menu-sub-dropdown menu-column menu-rounded menu-gray-600 menu-state-bg-light-primary fw-bold fs-7 w-125px py-4'
        data-kt-menu='true'
      >
         <div className='menu-item'>
         {/* {permissionList?.can_view &&  <a className='menu-link px-1' onClick={()=>{
            navigate(`/questions/viewAllQuestions/${id}`)
         }}>
            View All Questions
          </a>} */}
        </div>
        {/* begin::Menu item */}
        <div className='menu-item px-3'>
         {permissionList?.can_edit &&  <a className='menu-link px-3' onClick={openEditModal}>
            Edit<AiFillEdit  className="cursor-pointer mx-2" style={{color:"#777ea0",fontSize:"25px"}} />
          </a>}
        </div>
        {/* end::Menu item */}

        {/* begin::Menu item */}
        <div className='menu-item px-3'>
         {permissionList?.can_delete && <a
            className='menu-link px-3'
            data-kt-users-table-filter='delete_row'
            onClick={async () => await deleteItem.mutateAsync()}
          >
            Delete<MdDeleteOutline  className="cursor-pointer mx-2" style={{color:"red",fontSize:"25px"}} />

          </a>}
        </div>
        {/* end::Menu item */}
      </div>
      {/* end::Menu */}
    </>
  )
}

export {UserActionsCell}
