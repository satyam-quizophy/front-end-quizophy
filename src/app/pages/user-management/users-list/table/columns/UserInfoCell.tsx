/* eslint-disable jsx-a11y/anchor-is-valid */
import clsx from 'clsx'
import {FC} from 'react'
import {toAbsoluteUrl} from '../../../../../../_metronic/helpers'
import {useListView} from '../../core/ListViewProvider'
import {User} from '../../core/_models'

type Props = {
  user: User
}

const UserInfoCell: FC<Props> = ({user}) => {
  const {setItemIdForUpdate} = useListView()

  const openEditModal = () => {
    setItemIdForUpdate(user.id)
  }

  return (
    <div className='d-flex align-items-center'>
      {/* begin:: Avatar */}
      <div className='symbol symbol-circle symbol-50px overflow-hidden me-3'>
        <a onClick={openEditModal} style={{cursor: 'pointer'}}>
          {user.profile_image ? (
            <div className='symbol-label'>
              <img src={user.profile_image} alt={user.firstname} className='w-100' />
            </div>
          ) : (
            <div className={clsx('symbol-label fs-3', `bg-light-warning`, `text-warning`)}>
              {user.firstname?.charAt(0)}
            </div>
          )}
        </a>
      </div>
      <div className='d-flex flex-column'>
        <a
          onClick={openEditModal}
          style={{cursor: 'pointer'}}
          className='text-gray-800 text-hover-primary mb-1'
        >
          {user.firstname} {user.lastname}
        </a>
        <span>{user.email}</span>
      </div>
    </div>
  )
}

export {UserInfoCell}
