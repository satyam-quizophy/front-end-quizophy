import React, {FC, useEffect, useState} from 'react'
import {Field, ErrorMessage, Formik} from 'formik'
import {toAbsoluteUrl} from '../../../../../_metronic/helpers'
import PasswordStrengthBar from 'react-password-strength-bar'
import axios, {AxiosResponse} from 'axios'
import { API_URL } from '../../../settings/components/ApiUrl'
// import {checkEmail} from '../core/_requests'

type Props = {
  setFieldValue: any
  values: any
  touched: any
  setFieldError: any
  errors: any
}

const Step1: FC<Props> = ({setFieldValue, values, touched, setFieldError, errors}) => {
  console.log(touched, 'touched', errors, values)
  // const validateEmail = async (value: string) => {
  //   let error
  //   var re = /\S+@\S+\.\S+/
  //   let correct = re.test(value)
  //   if (value != '' && correct && !values.id) {
  //     await checkEmail(value)
  //       .then((data: any) => {
  //         if (data.data == 'Email already exists') {
  //           error = data.data
  //           // setFieldError('email', data.data)
  //         } else {
  //           error = null
  //         }
  //       })
  //       .catch((err) => {
  //         console.log(err)
  //       })
  //   }

  //   return error
  // }

  const uploadImage = async (e: any) => {
    const file = e.currentTarget.files[0]
    const fd = new FormData()
    fd.append('image', file)
    await axios
      .post(`${API_URL}/upload`, fd)
      .then((data: AxiosResponse<any>) => {
        setFieldValue('profile_image', data.data)
      })
      .catch((err) => {
        console.log(err, 'err')
      })
  }

  const [showPassword, setPasswordShow] = useState(false)
  return (
    <div className='w-100'>
      <div className='fv-row mb-7'>
        <label className='d-block form-label'>Profile Image</label>
        <div className='image-input image-input-outline' data-kt-image-input='true'>
          <div className=''>
            <img
              src={
                values?.profile_image != null
                  ? values?.profile_image
                  : toAbsoluteUrl('/media/svg/avatars/blank.svg')
              }
              alt='avatar'
              className='image-input-wrapper w-125px h-125px'
            />
          </div>
          <label
            className='btn btn-icon btn-circle btn-active-color-primary w-25px h-25px bg-body shadow'
            data-kt-image-input-action='change'
            data-bs-toggle='tooltip'
            title='Change avatar'
          >
            <i className='bi bi-pencil-fill fs-7'></i>
            <input
              type='file'
              name='profile_image'
              accept='.png, .jpg, .jpeg'
              onChange={uploadImage}
            />
            <input type='hidden' name='avatar_remove' />
          </label>
          {values.profile_image !== null && (
            <button
              className='btn btn-icon btn-circle btn-active-color-primary w-25px h-25px bg-body shadow'
              data-kt-image-input-action='remove'
              data-bs-toggle='tooltip'
              title='Remove avatar'
              type='button'
              onClick={() => setFieldValue('profile_image', null)}
            >
              <i className='bi bi-x fs-2'></i>
            </button>
          )}
        </div>
        <div className='form-text'>Allowed file types: png, jpg, jpeg.</div>
      </div>

      <div className='d-flex flex-wrap gap-5 mb-10'>
        <div className='fv-row w-100 flex-md-root'>
          <label className='form-label required'>First Name</label>

          <Field name='firstname' className='form-control mb-2' placeholder={'Enter First Name'} />
          <div className='text-danger mt-2'>
            <ErrorMessage name='firstname' />
          </div>
        </div>
        <div className='fv-row w-100 flex-md-root'>
          <label className='d-flex align-items-center form-label'>
            <span className='required'>Last Name</span>
          </label>

          <Field name='lastname' className='form-control mb-2' placeholder={'Enter Last Name'} />
          <div className='text-danger mt-2'>
            <ErrorMessage name='lastname' />
          </div>
        </div>
      </div>

      <div className='d-flex flex-wrap gap-5 mb-10'>
        <div className='fv-row w-100 flex-md-root'>
          <label className='fs-6 fw-bold form-label required'>Email</label>

          <Field
            name='email'
            className='form-control mb-2'
            placeholder={'Enter Valid Email'}
            // validate={validateEmail}
          />
            <div className='text-danger mt-2'>
              <ErrorMessage name='email' />
            </div>
        </div>

        <div className='fv-row w-100 flex-md-root'>
          <label className='d-flex align-items-center form-label'>
            <span className='required'>Phone Number</span>
          </label>

          <Field
            name='phone'
            type={'number'}
            className='form-control mb-2'
            placeholder={'Enter Valid Phone Number'}
          />
          <div className='text-danger mt-2'>
            <ErrorMessage name='phone' />
          </div>
        </div>
      </div>

      <div className='d-flex flex-wrap gap-5 mb-10'>
        <div className='fv-row w-100 flex-md-root'>
          <label className='fs-6 fw-bold form-label required'>DOB</label>
          <Field
            type={'date'}
            name='dob'
            className='form-control mb-2'
            placeholder={'Enter Valid DOB'}
          />
            <div className='text-danger mt-2'>
              <ErrorMessage name='dob' />
            </div>
        </div>

        <div className='fv-row w-100 flex-md-root'>
          <label className='d-flex align-items-center form-label'>
            <span className='required'>City</span>
          </label>

          <Field
            name='address.city'
            className='form-control mb-2'
            placeholder={'Enter Valid City'}
          />
          <div className='text-danger mt-2'>
            <ErrorMessage name='address.city' />
          </div>
        </div>
      </div>

      <div className='d-flex flex-wrap gap-5 mb-10'>
        <div className='fv-row w-100 flex-md-root'>
          <label className='fs-6 fw-bold form-label required'>District</label>

          <Field
            name='address.district'
            className='form-control mb-2'
            placeholder={'Enter Correct State'}
          />
          <div className='text-danger mt-2'>
            <ErrorMessage name='address.district' />
          </div>
        </div>

        <div className='fv-row w-100 flex-md-root'>
          <label className='d-flex align-items-center form-label'>
            <span className='required'>State</span>
          </label>

          <Field
            name='address.state'
            className='form-control mb-2'
            placeholder={'Enter Correct State'}
          />
          <div className='text-danger mt-2'>
            <ErrorMessage name='address.state' />
          </div>
        </div>
      </div>

      {values?.id && (
        <div className='d-flex flex-wrap gap-5 mb-10'>
          <div className='fv-row w-100 flex-md-root'>
            <label className='fs-6 fw-bold form-label required'>My Referral Code</label>
            <Field
              name='referral.referral_code'
              className='form-control mb-2'
              placeholder={'Enter Referral Code'}
              disabled={true}
            />
            <div className='text-danger mt-2'>
              <ErrorMessage name='referral.referral_code' />
            </div>
          </div>

          <div className='fv-row w-100 flex-md-root'>
            <label className='d-flex align-items-center form-label'>
              <span className='required'>Referred By</span>
            </label>

            <Field
              name='referral.refered_by'
              className='form-control mb-2'
              placeholder={'Enter Referred By'}
              disabled={true}
            />
            <div className='text-danger mt-2'>
              <ErrorMessage name='referral.refered_by' />
            </div>
          </div>
        </div>
      )}

      <div className='d-flex flex-wrap gap-5 mb-10'>
        <div className='fv-row w-100 flex-md-root'>
          <label className='fs-6 fw-bold form-label required'>Device Id</label>

          <Field
            name='device[0].device_id'
            className='form-control mb-2'
            placeholder={'Enter Correct DeviceId'}
          />
          <div className='text-danger mt-2'>
            <ErrorMessage name='device[0].device_id' />
          </div>
        </div>

        <div className='fv-row w-100 flex-md-root'>
          <label className='d-flex align-items-center form-label'>
            <span className='required'>Device Token</span>
          </label>

          <Field
            name='device[0].device_token'
            className='form-control mb-2'
            placeholder={'Enter Correct Device Token'}
          />
          <div className='text-danger mt-2'>
            <ErrorMessage name='device[0].device_token' />
          </div>
        </div>
      </div>

      <div className='fv-row mb-10'>
        <label className='d-flex align-items-center form-label'>
          <span className='required'>Fingure Print Enable/Disable</span>
        </label>
        <Field
          as='select'
          name='touchId_enable'
          className='form-select mb-2'
          data-control='select2'
          data-hide-search='true'
          placeholder='Select an option'
        >
          <option></option>
          <option value={1}>Enable</option>
          <option value={0}>Disable</option>
        </Field>
        <div className='text-danger'>
          <ErrorMessage name='touchId_enable' />
        </div>
      </div>

      <div className='fv-row mb-10'>
        <label className='d-flex align-items-center form-label'>
          <span className='required'>Password</span>
        </label>
        <div style={{flexDirection: 'row', display: 'flex'}} className='mb-2 gap-5'>
          <div className='position-relative w-100'>
            <Field
              name='password'
              type={!showPassword ? 'password' : 'text'}
              className='form-control mb-2'
              placeholder={'Enter Strong Password Or Generate'}
            />
            <button
              type='button'
              onClick={() => setPasswordShow(!showPassword)}
              className='btn btn-sm btn-icon position-absolute translate-middle top-50 end-0 me-n2'
              data-kt-password-meter-control='visibility'
            >
              {!showPassword ? (
                <i className='bi bi-eye-slash fs-2'></i>
              ) : (
                <i className='bi bi-eye fs-2'></i>
              )}
            </button>
          </div>
          <button
            type='button'
            className='btn btn-lg btn-light-primary w-50 p-0 fs-15'
            onClick={() => {
              setFieldValue(
                'password',
                Math.random()
                  .toString(36)
                  .slice(2)
              )
            }}
          >
            Generate Password
          </button>
        </div>
        <PasswordStrengthBar password={values?.password} />
        <div className='text-danger'>
          <ErrorMessage name='password' />
        </div>
      </div>
    </div>
  )
}

export {Step1}
