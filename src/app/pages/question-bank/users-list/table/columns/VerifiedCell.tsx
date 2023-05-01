import {FC} from 'react'

type Props = {
  questions: any
}

const Verified: FC<Props> = ({questions}) => (
  <>
    {' '}
    {questions?.every((item: any) => item?.verified?.is_verified == 1) ? (
      <div className='badge badge-light-success fw-bolder'>Yes</div>
    ) : (
      <>
        <div className='badge badge-light-danger fw-bolder'>No</div>
        <i
          className='fas fa-exclamation-circle ms-1 fs-7'
          data-bs-toggle='tooltip'
          title='All questions must be verified!'
        ></i>
      </>
    )}
  </>
)

export {Verified}
