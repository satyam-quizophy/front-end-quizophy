/* eslint-disable jsx-a11y/anchor-is-valid */
import clsx from 'clsx'
import {FC} from 'react'
import {toAbsoluteUrl} from '../../../../../../_metronic/helpers'
import {useListView} from '../../core/ListViewProvider'
import {User} from '../../core/_models'

type Props = {
  user: any
}

const UserInfoCell: FC<Props> = ({user}) => {
  console.log(user, 'user')
  const {setItemIdForUpdate} = useListView()

  const openEditModal = () => {
    setItemIdForUpdate(user.id)
  }

  return (
    <div className='d-flex align-items-center'>
      {/* begin:: Avatar */}
      <div className='d-flex flex-column'>
        <a
          style={{cursor: 'pointer'}}
          className='text-gray-800 text-hover-primary mb-1'
        >
          {user.course_category}
        </a>
      </div>
    </div>
  )
}

export {UserInfoCell}
