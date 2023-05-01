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

  function removeHTML (str: string) {
    var tmp = document.createElement('DIV')
    tmp.innerHTML = str
    return tmp.textContent || tmp.innerText || ''
  }

  return (
    <div className='d-flex align-items-center'>
      <div className='d-flex flex-column'>
        {user.questions.length > 0 &&
          user.questions.map((item: any, i: any) => (
            <a
              key={i}
              onClick={openEditModal}
              style={{cursor: 'pointer'}}
              className='text-gray-800 text-hover-primary mb-1'
            >
              {removeHTML(item.question)}
            </a>
          ))}
      </div>
    </div>
  )
}

export {UserInfoCell}
