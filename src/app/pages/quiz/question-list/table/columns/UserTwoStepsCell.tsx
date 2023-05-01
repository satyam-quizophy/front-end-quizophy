import {FC, useEffect, useState} from 'react'
import Swal from 'sweetalert2'
import {ID} from '../../../../../../_metronic/helpers'
import {addQuestion, deleteUser, getQuizQuestions} from '../../core/_requests'
import {useParams} from 'react-router-dom'

type Props = {
  id?: ID
}

const UserTwoStepsCell: FC<Props> = ({id}) => {
  const params = useParams()
  console.log(params, 'params')
  useEffect(() => {
    getQuizQuestions(id)
      .then((data) => {
        setStatus(data)
      })
      .catch((err) => {
        console.log(err)
      })
  }, [id])

  const [status, setStatus] = useState<any>(false)

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
            checked={status}
            onChange={async (e) => {
              if (e.currentTarget.checked) {
                await addQuestion({quiz_id: params.id, question_bank_id: id})
              } else {
                await deleteUser(id)
              }
              setStatus(!status)
            }}
          />
          <span style={{color: status == false ? '#44A8C1' : '#D8322D'}}>
            {status == true ? 'Remove from Quiz' : 'Add to Quiz'}
          </span>
        </label>
      }
    </>
  )
}

export {UserTwoStepsCell}
