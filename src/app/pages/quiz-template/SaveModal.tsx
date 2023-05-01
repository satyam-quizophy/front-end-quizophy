import React, {FC} from 'react'
import {KTSVG} from '../../../_metronic/helpers'
import {ErrorMessage, Field} from 'formik'

type Props = {
  onClose: any
  setName: any
  name: string
  onSubmit: any
}

const SaveModal: FC<Props> = ({onClose, setName, name, onSubmit}) => {
  return (
    <>
      <div
        className='modal fade show d-block'
        id='exampleModalScrollable'
        tabIndex={-1}
        role='dialog'
        aria-labelledby='staticBackdrop'
        aria-hidden='true'
      >
        <div className='modal-dialog modal-dialog-scrollable' role='document'>
          <div className='modal-content'>
            <div className='modal-header'>
              <h5 className='modal-title' id='exampleModalLabel'>
                Add the finishing touches!
              </h5>
              <div
                className='btn btn-icon btn-sm btn-active-icon-primary'
                data-kt-users-modal-action='close'
                onClick={onClose}
                style={{cursor: 'pointer'}}
              >
                <KTSVG path='/media/icons/duotune/arrows/arr061.svg' className='svg-icon-1' />
              </div>
            </div>
            <div className='modal-body' style={{height: 330}}>
              <h6 className='text-muted'>Enter a name for your quiz template.</h6>
              <h5>Name</h5>
              <Field
                name={`name`}
                placeholder={'Enter a quiz template name'}
                onChange={(e: any) => {
                  setName(e.target.value)
                }}
                className='form-control mb-2'
                value={name}
              ></Field>
              <div className='text-danger mt-2'>
                <ErrorMessage name='question.type' />
              </div>
              <p className='text-muted fs-12'>
                A name will give players an indication of what the template is about.
              </p>
            </div>
            <div className='modal-footer'>
              <button
                type='button'
                className='btn btn-light-primary font-weight-bold'
                data-dismiss='modal'
                onClick={onClose}
              >
                Close
              </button>
              <button type='button' onClick={onSubmit} className='btn btn-primary font-weight-bold'>
                Save changes
              </button>
            </div>
          </div>
        </div>
      </div>
      <div className='modal-backdrop fade show'></div>
    </>
  )
}

export {SaveModal}
