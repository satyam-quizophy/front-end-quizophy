import React, {useState} from 'react'
import * as Yup from 'yup'
import clsx from 'clsx'
import {Link, useLocation, useNavigate} from 'react-router-dom'
import {useFormik} from 'formik'
import {requestPassword, resetPassword} from '../core/_requests'
import { errrorMessage, successMessage } from './ToastComp'

const initialValues = {
  otp: '',
  password:"",
  confirm_password:""
}

const forgotPasswordSchema = Yup.object().shape({
    otp: Yup.string()
    .min(6, 'Minimum 6 digits')
    .max(6, 'Maximum 6 digits')
    .required('OTP is required'),
     password: Yup.string()
    .min(8, 'Minimum 8 symbols')
    .max(50, 'Maximum 50 symbols')
    .required('Password is required'),
    confirm_password: Yup.string()
    .required(' Confirm Password confirmation is required')
    .min(8, 'Minimum 8 symbols')
    .max(50, 'Maximum 50 symbols')
    .when('password', {
      is: (val: string) => (val && val.length > 0 ? true : false),
      then: Yup.string().oneOf([Yup.ref('password')], "Password and Confirm Password didn't match"),
    }),
})

export function ResetPassword() {
  const [loading, setLoading] = useState(false)
  const location:any=useLocation()
  const [hasErrors, setHasErrors] = useState<boolean | undefined>(undefined)
  const navigate=useNavigate()
  const formik = useFormik({
    initialValues,
    validationSchema: forgotPasswordSchema,
    onSubmit: async (values, {setStatus, setSubmitting}) => {
      setLoading(true)
      setHasErrors(undefined)
      const {data}=await resetPassword(location.state.email,values.otp,values.password)
      if(data.success){
         successMessage(data?.message)
          navigate("/auth/login")
      }else{
            errrorMessage(data?.message)
      }
      // setTimeout(() => {
      //   requestPassword(values.email)
      //     .then(({data: {result}}) => {
      //       setHasErrors(false)
      //       setLoading(false)
      //     })
      //     .catch(() => {
      //       setHasErrors(true)
      //       setLoading(false)
      //       setSubmitting(false)
      //       setStatus('The login detail is incorrect')
      //     })
      // }, 1000)
    },
  })

  return (
    <>
      <form
        className='form w-100 fv-plugins-bootstrap5 fv-plugins-framework'
        noValidate
        id='kt_login_password_reset_form'
        onSubmit={formik.handleSubmit}
      >
        <div className='text-center mb-10'>
          {/* begin::Title */}
          <h1 className='text-dark mb-3'>Reset Password ?</h1>
          {/* end::Title */}

          {/* begin::Link */}
          <div className='text-gray-400 fw-bold fs-4'>Six digit OTP has been sent on your given email.</div>
          {/* end::Link */}
        </div>

        {/* begin::Title */}
        {/* {hasErrors === true && (
          <div className='mb-lg-15 alert alert-danger'>
            <div className='alert-text font-weight-bold'>
              Sorry, looks like there are some errors detected, please try again.
            </div>
          </div>
        )} */}

        {/* {hasErrors === false && (
          <div className='mb-10 bg-light-info p-8 rounded'>
            <div className='text-info'>Sent password reset. Please check your email</div>
          </div>
        )} */}
        {/* end::Title */}

        {/* begin::Form group */}
        <div className='fv-row mb-10'>
          <label className='form-label fw-bolder text-gray-900 fs-6'>OTP</label>
          <input
            type='number'
            placeholder=''
            autoComplete='off'
            {...formik.getFieldProps('otp')}
            className={clsx(
              'form-control form-control-lg form-control-solid',
              {'is-invalid': formik.touched.otp && formik.errors.otp},
              {
                'is-valid': formik.touched.otp && !formik.errors.otp,
              }
            )}
          />
          {formik.touched.otp && formik.errors.otp && (
            <div className='fv-plugins-message-container'>
              <div className='fv-help-block'>
                <span role='alert'>{formik.errors.otp}</span>
              </div>
            </div>
          )}
        </div>
        <div className='fv-row mb-10'>
          <label className='form-label fw-bolder text-gray-900 fs-6'>Password</label>
          <input
            type='password'
            placeholder=''
            autoComplete='off'
            {...formik.getFieldProps('password')}
            className={clsx(
              'form-control form-control-lg form-control-solid',
              {'is-invalid': formik.touched.password && formik.errors.password},
              {
                'is-valid': formik.touched.password && !formik.errors.password,
              }
            )}
          />
          {formik.touched.password && formik.errors.password && (
            <div className='fv-plugins-message-container'>
              <div className='fv-help-block'>
                <span role='alert'>{formik.errors.password}</span>
              </div>
            </div>
          )}
        </div>
        <div className='fv-row mb-10'>
          <label className='form-label fw-bolder text-gray-900 fs-6'>Confirm Password</label>
          <input
            type='password'
            placeholder=''
            autoComplete='off'
            {...formik.getFieldProps('confirm_password')}
            className={clsx(
              'form-control form-control-lg form-control-solid',
              {'is-invalid': formik.touched.confirm_password && formik.errors.confirm_password},
              {
                'is-valid': formik.touched.confirm_password && !formik.errors.confirm_password,
              }
            )}
          />
          {formik.touched.confirm_password && formik.errors.confirm_password && (
            <div className='fv-plugins-message-container'>
              <div className='fv-help-block'>
                <span role='alert'>{formik.errors.confirm_password}</span>
              </div>
            </div>
          )}
        </div>
        {/* end::Form group */}

        {/* begin::Form group */}
        <div className='d-flex flex-wrap justify-content-center pb-lg-0'>
          <button
            type='submit'
            id='kt_password_reset_submit'
            className='btn btn-lg btn-primary fw-bolder me-4'
          >
            <span className='indicator-label'>Submit</span>
            {loading && (
              <span className='indicator-progress'>
                Please wait...
                <span className='spinner-border spinner-border-sm align-middle ms-2'></span>
              </span>
            )}
          </button>
          <Link to='/auth/login'>
            <button
              type='button'
              id='kt_login_password_reset_form_cancel_button'
              className='btn btn-lg btn-light-primary fw-bolder'
              disabled={formik.isSubmitting || !formik.isValid}
            >
              Cancel
            </button>
          </Link>{' '}
        </div>
        {/* end::Form group */}
      </form>
    </>
  )
}
