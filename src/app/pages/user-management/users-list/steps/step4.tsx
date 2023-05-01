import React, {FC, useEffect, useState} from 'react'
import {Field, ErrorMessage} from 'formik'

type Props = {
  values: any
  setFieldValue: any
}

const Step4: FC<Props> = ({values, setFieldValue}) => {
  useEffect(() => {
    setFieldValue('pan.dob', values.pan.dob != '' ? values?.pan?.dob : values.dob)
  }, [])

  return (
    <div className='w-100'>
      <div className='fv-row mb-10'>
        <label className='form-label required'>Name</label>
        <Field name='pan.name' className='form-control mb-2' />
        <div className='text-danger mt-2'>
          <ErrorMessage name='pan.name' />
        </div>
      </div>

      <div className='d-flex flex-wrap gap-5 mb-10'>
        <div className='fv-row w-100 flex-md-root'>
          <label className='form-label required'>Pan Number</label>

          <Field
            name='pan.pannumber'
            className='form-control mb-2'
            placeholder={'Enter Pan Number'}
          />
          <div className='text-danger mt-2'>
            <ErrorMessage name='pan.pannumber' />
          </div>
        </div>
        <div className='fv-row w-100 flex-md-root'>
          <label className='d-flex align-items-center form-label'>
            <span className='required'>DOB</span>
          </label>

          <Field
            name='pan.dob'
            type={'date'}
            className='form-control mb-2'
            placeholder={'Enter DOB'}
          />
          <div className='text-danger mt-2'>
            <ErrorMessage name='pan.dob' />
          </div>
        </div>
      </div>

      {values?.pan?.id && (
        <>
          <div className='d-flex flex-wrap gap-5 mb-10'>
            <div className='fv-row w-100 flex-md-root'>
              <label className='form-label'>Verified At</label>

              <Field
                name='pan.verification.verified_at'
                type={'date'}
                className='form-control mb-2'
                placeholder={'Enter Verified At'}
              />
              {/* <div className='text-danger mt-2'>
                <ErrorMessage name='pan.verification.verified_at' />
              </div> */}
            </div>
            <div className='fv-row w-100 flex-md-root'>
              <label className='d-flex align-items-center form-label'>
                <span className='form-label'>Verified By</span>
              </label>

              <Field
                name='pan.verification.verified_by'
                className='form-control mb-2'
                placeholder={'Enter Verified By'}
              />
              {/* <div className='text-danger mt-2'>
                <ErrorMessage name='pan.verification.verified_by' />
              </div> */}
            </div>
          </div>

          <div className='fv-row mb-10'>
            <label className='form-label'>Status</label>

            <Field
              as='select'
              name='pan.pan_status'
              className='form-select mb-2'
              data-control='select2'
              data-hide-search='true'
              data-placeholder='Select an option'
            >
              {<option></option>}
              <option>Varified</option>
              <option>Review</option>
              <option>Pending</option>
              <option>Error</option>
            </Field>
            {/* <div className='text-danger mt-2'>
              <ErrorMessage name='pan.pan_status' />
            </div> */}
          </div>

          <div className='fv-row mb-10'>
            <label className='form-label'>Rejection Reason</label>
            <Field
              name='pan.reject_reason'
              as='textarea'
              rows={4}
              className='form-control mb-2'
              placeholder={'Enter Rejection Reason'}
            />
            {/* <div className='text-danger mt-2'>
              <ErrorMessage name='pan.reject_reason' />
            </div> */}
          </div>

          <label className='form-check form-check-sm form-check-custom me-5 me-lg-15'>
            <Field className='form-check-input' type='checkbox' name='pan.verification.verified' />
            <span className='form-check-label fw-bold'>Is PAN Card Verified </span>
          </label>
        </>
      )}
    </div>
  )
}

export {Step4}
