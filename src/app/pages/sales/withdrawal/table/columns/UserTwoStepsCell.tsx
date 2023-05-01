import {FC, useState} from 'react'
import Swal from 'sweetalert2'
import {ID} from '../../../../../../_metronic/helpers'
import {updateStatus} from '../../core/_requests'

type Props = {
  id?: ID
  status: any
}

const UserTwoStepsCell: FC<Props> = ({id, status}) => {
  const [stat, setStatus] = useState<any>(status)

  return (
    <>
      {' '}
      {
        <select
          className='form-select'
          onChange={async (e) => {
            setStatus(e.target.value)
            await updateStatus({withdraw_status: e.target.value}, id)
          }}
          value={stat}
        >
          <option>Initiate</option>
          <option>Process</option>
          <option>Success</option>
          <option>Failed</option>
        </select>
      }
    </>
  )
}

export {UserTwoStepsCell}
