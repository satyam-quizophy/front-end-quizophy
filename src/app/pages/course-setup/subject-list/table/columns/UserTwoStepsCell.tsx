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
        <label className='form-check form-check-custom form-check-solid form-switch mb-5'>
          <input
            className='form-check-input me-3'
            data-switch='true'
            data-on-color='#D8322D'
            type='checkbox'
            name='status'
            data-off-color='warning'
            checked={stat}
            onChange={async (e) => {
              setStatus(e.currentTarget.checked)
              await updateStatus({status: e.currentTarget.checked ? 1 : 0}, id)
              Swal.fire({
                title: 'Success!',
                text: `Status updated successfully!`,
                icon: 'success',
                confirmButtonText: 'Okay',
              })
            }}
          />
        </label>
      }
    </>
  )
}

export {UserTwoStepsCell}
