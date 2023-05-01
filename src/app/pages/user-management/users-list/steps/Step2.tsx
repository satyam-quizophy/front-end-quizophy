import React, {FC, useEffect, useState} from 'react'
import {Field, ErrorMessage} from 'formik'
import {useListView} from '../core/ListViewProvider'

type Props = {
  values: any
  setFieldValue: any
}

const Step2: FC<Props> = ({values, setFieldValue}) => {
  return (
    <div className='w-100'>
      <div className='fv-row mb-10'>
        <label className='form-label required'>Account Number</label>
        <Field name='bank.account_number' className='form-control mb-2' type='number' />
        <div className='text-danger mt-2'>
          <ErrorMessage name='bank.account_number' />
        </div>
      </div>

      <div className='d-flex flex-wrap gap-5 mb-10'>
        <div className='fv-row w-100 flex-md-root'>
          <label className='form-label required'>IFSC Code</label>

          <Field
            name='bank.ifsc_code'
            className='form-control mb-2'
            placeholder={'Enter IFSC Code'}
          ></Field>
          <div className='text-danger mt-2'>
            <ErrorMessage name='bank.ifsc_code' />
          </div>
        </div>
        <div className='fv-row w-100 flex-md-root'>
          <label className='d-flex align-items-center form-label'>
            <span className='required'>Bank Name</span>
          </label>

          <Field
            name='bank.bank_name'
            className='form-control mb-2'
            placeholder={'Enter Bank Name'}
          />
          <div className='text-danger mt-2'>
            <ErrorMessage name='bank.bank_name' />
          </div>
        </div>
      </div>

      <div className='d-flex flex-wrap gap-5 mb-10'>
        <div className='fv-row w-100 flex-md-root'>
          <label className='form-label required'>Branch Name</label>

          <Field
            name='bank.branch_name'
            className='form-control mb-2'
            placeholder={'Enter Branch Name'}
          />
          <div className='text-danger mt-2'>
            <ErrorMessage name='bank.branch_name' />
          </div>
        </div>
        <div className='fv-row w-100 flex-md-root'>
          <label className='d-flex align-items-center form-label'>
            <span className='required'>State</span>
          </label>

          <Field name='bank.state' className='form-control mb-2' placeholder={'Enter State Name'} />
          <div className='text-danger mt-2'>
            <ErrorMessage name='bank.state' />
          </div>
        </div>
      </div>

      {values?.bank?.id && (
        <>
          <div className='d-flex flex-wrap gap-5 mb-10'>
            <div className='fv-row w-100 flex-md-root'>
              <label className='form-label'>Verified At</label>

              <Field
                name='bank.verification.verified_at'
                type={'date'}
                className='form-control mb-2'
                placeholder={'Enter Verified At'}
              />
              {/* <div className='text-danger mt-2'>
                <ErrorMessage name='bank.verification.verified_at' />
              </div> */}
            </div>
            <div className='fv-row w-100 flex-md-root'>
              <label className='d-flex align-items-center form-label'>
                <span className='form-label'>Verified By</span>
              </label>

              <Field
                name='bank.verification.verified_by'
                className='form-control mb-2'
                placeholder={'Enter Verified By'}
              />
              {/* <div className='text-danger mt-2'>
                <ErrorMessage name='bank.verification.verified_by' />
              </div> */}
            </div>
          </div>
          <div className='fv-row mb-10'>
            <label className='form-label'>Status</label>

            <Field
              as='select'
              name='bank.bank_status'
              className='form-select mb-2'
              data-control='select2'
              data-hide-search='true'
              data-placeholder='Select an option'
            >
              <option></option>
              <option>Varified</option>
              <option>Review</option>
              <option>Pending</option>
              <option>Error</option>
            </Field>
            {/* <div className='text-danger mt-2'>
              <ErrorMessage name='bank.bank_status' />
            </div> */}
          </div>
          <div className='fv-row mb-10'>
            <label className='form-label'>Rejection Reason</label>
            <Field
              name='bank.reject_reason'
              as='textarea'
              rows={4}
              className='form-control mb-2'
              placeholder={'Enter Rejection Reason'}
            />
            {/* <div className='text-danger mt-2'>
              <ErrorMessage name='bank.reject_reason' />
            </div> */}
          </div>
          <label className='form-check form-check-sm form-check-custom me-5 me-lg-15'>
            <Field className='form-check-input' type='checkbox' name='bank.verification.verified' />
            <span className='form-check-label fw-bold'>Is Verified Bank Account</span>
          </label>{' '}
        </>
      )}
    </div>
  )
}

export {Step2}
