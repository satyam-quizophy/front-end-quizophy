/* eslint-disable jsx-a11y/anchor-is-valid */
import clsx from 'clsx'
import {FC} from 'react'
import {toAbsoluteUrl} from '../../../../../../_metronic/helpers'
import {useCommonData} from '../../core/CommonDataProvider'
import {useListView} from '../../core/ListViewProvider'
import {User} from '../../core/_models'

type Props = {
  user: any
}

const UserInfoCell: FC<Props> = ({user}) => {
  const {setItemIdForUpdate} = useListView()
  const {programs} = useCommonData()

  const openEditModal = () => {
    setItemIdForUpdate(user.id)
  }

  return (
    <div className='d-flex align-items-center'>
      <div className='d-flex flex-column'>
        <a
          style={{cursor: 'pointer'}}
          className='text-gray-800 text-hover-primary mb-1'
        >
          {programs?.find((x: any) => x.id == user?.sponsor_program_id)?.name}
        </a>
      </div>
    </div>
  )
}

export {UserInfoCell}
