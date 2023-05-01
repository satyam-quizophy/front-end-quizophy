import axios, {AxiosResponse} from 'axios'
import clsx from 'clsx'
import React, {FC, useEffect, useState} from 'react'
import Swal from 'sweetalert2'
import { API_URL } from '../../staff-management/users-list/core/_requests'
import {Button} from './Button'
import {SettingsName} from './SettingsName'
import { errrorMessage, successMessage } from '../../../modules/auth/components/ToastComp'
let typeArr=["quizophy_aws_s3_bucket_name","quizophy_aws_s3_access_key","quizophy_aws_s3_access_secret_key","template_email","template_email_smtp_password","open_AI_API_key","pusher_key","pusher_API_ID","pusher_cluster_name","pusher_API_secret_key"]
const QuizophyAwsSetting: FC = () => {
  const [values, setValue] = useState<Array<any>>()
  useEffect(() => {
    getInfo()
  }, [])

  const getInfo = async () => {
    const {data}=await axios.get(`${API_URL}/option`)
    if(data?.success){
      console.log(data?.data)
       setValue(data?.data)
    }else{
      errrorMessage(data?.message)
    }
     
  }

  const onSubmit = async (e: any) => {
    e?.preventDefault()
      let dataTrueOrFalse=values?.some((item:any)=>{
        if(typeArr?.includes(item?.name)){
             return !item?.value?.trim() || item?.value?.trim()===""
        }
    })
    if(dataTrueOrFalse){
      errrorMessage("All Fields Are Required")
    }else{
       const {data}=await axios.put(`${API_URL}/option`,values)
       if(data?.success){
        getInfo()
        successMessage(data?.message)
       }else{
        errrorMessage(data?.message)
       }
    }
  }

  return (
    <div className='d-flex flex-column flex-lg-row'>
      <SettingsName active='quizophy-AWS-settings' />
      <div className='flex-lg-row-fluid ms-lg-7 ms-xl-10'>
        <div className='card p-10' id='kt_chat_messenger'>
          <span className='text-muted mb-10'>
            These information will be displayed on invoices/estimates/payments and other PDF
            documents where company info is required
          </span>
          <form className='form row' onSubmit={onSubmit} noValidate>
            {
              values?.map((item:any,index:number)=>{
                  return  typeArr?.includes(item?.name) && <div key={index} className='col-6 mb-10'>
                  <div className='fv-row w-100 flex-md-root'>
                    <label className='required fw-bold fs-6 mb-2'>{item?.name}</label>
                    <input
                      placeholder='Enter Company Name'
                      type='text'
                      name='city'
                      required
                      onChange={(e:any)=>{
                        let newArrValue:any[]=[...values]
                        newArrValue[index].value=e?.target?.value
                        setValue(newArrValue)
                      }}
                      value={item.value}
                      className={clsx(
                        'form-control mb-3 mb-lg-0',
                      
                      )}
                      autoComplete='off'
                    />
                    <div className='fv-plugins-message-container'>
                      <div className='fv-help-block'>
                        <span role='alert' className='text-danger'>
                      </span>
                      </div>
                    </div>
                  </div>
                </div>
              })
            }
            {/* <div className='d-flex flex-wrap gap-5 mb-10'>
            
              <div className='fv-row w-100 flex-md-root'>
                <label className='required fw-bold fs-6 mb-2'>Company Name</label>
                <input
                  placeholder='Enter a company name'
                  type='text'
                  name='name'
                  required
                  // onChange={onChange}
                  // value={}
                  className={clsx(
                    'form-control mb-3 mb-lg-0',
                  )}
                  autoComplete='off'
                />
                <div className='fv-plugins-message-container'>
                  <div className='fv-help-block'>
                    <span role='alert' className='text-danger'>
                    </span>
                  </div>
                </div>
              </div>
              <div className='fv-row w-100 flex-md-root'>
                <label className='required fw-bold fs-6 mb-2'>Address</label>
                <input
                  placeholder='Enter address'
                  type='text'
                  name='address'
                  required
                  // onChange={onChange}
                  // value={values.company_address}
                  className={clsx(
                    'form-control mb-3 mb-lg-0',
                    
                  )}
                  autoComplete='off'
                  // disabled={formik.isSubmitting || isUserLoading}
                />
                <div className='fv-plugins-message-container'>
                  <div className='fv-help-block'>
                    <span role='alert' className='text-danger'>
                    </span>
                  </div>
                </div>
              </div>
            </div>
            <div className='d-flex flex-wrap gap-5 mb-10'>
              <div className='fv-row w-100 flex-md-root'>
                <label className='required fw-bold fs-6 mb-2'>City</label>
                <input
                  placeholder='Enter city'
                  type='text'
                  name='city'
                  required
                  // onChange={onChange}
                  // value={values.city}
                  className={clsx(
                    'form-control mb-3 mb-lg-0',
                  
                  )}
                  autoComplete='off'
                  // disabled={formik.isSubmitting || isUserLoading}
                />
                <div className='fv-plugins-message-container'>
                  <div className='fv-help-block'>
                    <span role='alert' className='text-danger'>
                  </span>
                  </div>
                </div>
              </div>
              <div className='fv-row w-100 flex-md-root'>
                <label className='required fw-bold fs-6 mb-2'>State</label>
                <input
                  placeholder='Enter state'
                  // {...formik.getFieldProps('name')}
                  type='text'
                  name='state'
                  required
                  // onChange={onChange}
                  // value={values.state}
                  className={clsx(
                    'form-control mb-3 mb-lg-0',
                    // {
                    //   'is-valid': formik.touched.name && !formik.errors.name,
                    // }
                  )}
                  autoComplete='off'
                  // disabled={formik.isSubmitting || isUserLoading}
                />
                <div className='fv-plugins-message-container'>
                  <div className='fv-help-block'>
                    <span role='alert' className='text-danger'>
                    </span>
                  </div>
                </div>
              </div>
            </div>
            <div className='d-flex flex-wrap gap-5 mb-10'>
              <div className='fv-row w-100 flex-md-root'>
                <label className='required fw-bold fs-6 mb-2'>Country Code</label>
                <input
                  placeholder='Enter country code'
                  // {...formik.getFieldProps('name')}
                  type='text'
                  name='country_code'
                  required
                  // onChange={onChange}
                  // value={values.country_code}
                  className={clsx(
                    'form-control mb-3 mb-lg-0',
                   
                  )}
                  autoComplete='off'
                  // disabled={formik.isSubmitting || isUserLoading}
                />
                <div className='fv-plugins-message-container'>
                  <div className='fv-help-block'>
                    <span role='alert' className='text-danger'>
                    </span>
                  </div>
                </div>
              </div>
              <div className='fv-row w-100 flex-md-root'>
                <label className='required fw-bold fs-6 mb-2'>Zip Code</label>
                <input
                  placeholder='Enter zip code'
                  // {...formik.getFieldProps('name')}
                  type='text'
                  name='zip_code'
                  required
                  // onChange={onChange}
                  // value={values.zip_code}
                  className={clsx(
                    'form-control mb-3 mb-lg-0',
                   
                  )}
                  autoComplete='off'
                  // disabled={formik.isSubmitting || isUserLoading}
                />
                <div className='fv-plugins-message-container'>
                  <div className='fv-help-block'>
                    <span role='alert' className='text-danger'>
                    </span>
                  </div>
                </div>
              </div>
            </div>
            <div className='d-flex flex-wrap gap-5 mb-10'>
              <div className='fv-row w-100 flex-md-root'>
                <label className='required fw-bold fs-6 mb-2'>Phone</label>
                <input
                  placeholder='Enter phone number'
                  // {...formik.getFieldProps('name')}
                  type='text'
                  required
                  name='phone'
                  // onChange={onChange}
                  // value={values.phone_number}
                  className={clsx(
                    'form-control mb-3 mb-lg-0',
                   
                  )}
                  autoComplete='off'
                  // disabled={formik.isSubmitting || isUserLoading}
                />
                <div className='fv-plugins-message-container'>
                  <div className='fv-help-block'>
                    <span role='alert' className='text-danger'>
                    </span>
                  </div>
                </div>
              </div>
              <div className='fv-row w-100 flex-md-root'>
                <label className='fw-bold fs-6 mb-2'>GST Number</label>
                <input
                  placeholder='Enter gst number'
                  // {...formik.getFieldProps('name')}
                  type='text'
                  name='gst'
                  // onChange={onChange}
                  // value={values.gst}
                  className={clsx(
                    'form-control mb-3 mb-lg-0'
                    
                  )}
                  autoComplete='off'
                  // disabled={formik.isSubmitting || isUserLoading}
                />
                <div className='fv-plugins-message-container'>
                  <div className='fv-help-block'>
                  </div>
                </div>
              </div>
            </div> */}
            {/* )} */}
            <Button />
          </form>
        </div>
      </div>
    </div>
  )
}

export default QuizophyAwsSetting
