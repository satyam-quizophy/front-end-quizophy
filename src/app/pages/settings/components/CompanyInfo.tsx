/* eslint-disable jsx-a11y/anchor-is-valid */
import axios, {AxiosResponse} from 'axios'
import clsx from 'clsx'
import React, {FC, useEffect, useState} from 'react'
import Swal from 'sweetalert2'
import { API_URL } from '../../staff-management/users-list/core/_requests'
import {Button} from './Button'
import {SettingsName} from './SettingsName'
import { errrorMessage, successMessage } from '../../../modules/auth/components/ToastComp'
let typeArr=["company_name","company_address","state","city","zip_code","country_code","phone_number","gst_number","quizophy_domain","file_type"]
const CompanyInfo: FC = () => {
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
      // e.preventDefault()
    // if (values.name == '') {
    //   setErrors({...errors, name: 'Company Name is required'})
    //   return
    // }
    // if (values.address == '') {
    //   setErrors({...errors, address: 'Address is required'})
    //   return
    // }
    // if (values.city == '') {
    //   setErrors({...errors, city: 'City is required'})
    //   return
    // }
    // if (values.state == '') {
    //   setErrors({...errors, state: 'State is required'})
    //   return
    // }
    // if (values.zip_code == '') {
    //   setErrors({...errors, zip_code: 'Zip code is required'})
    //   return
    // }
    // if (values.country_code == '') {
    //   setErrors({...errors, country_code: 'Country code is required'})
    //   return
    // }
    // if (values.phone == '') {
    //   setErrors({...errors, country_code: 'Phone Number is required'})
    //   return
    // }
    // const payload = {
    //   name: 'company-information',
    //   value: JSON.stringify(values),
    //   auto_load: 0,
    // }
    // await axios
    //   .post(API_URL, payload)
    //   .then((data: AxiosResponse<any>) => {
    //     Swal.fire({
    //       title: 'Success!',
    //       text: `Settings Updated!`,
    //       icon: 'success',
    //       confirmButtonText: 'Okay',
    //     })
    //   })
    //   .catch((err) => {
    //     console.log(err, 'err')
    //   })
  }

  return (
    <div className='d-flex flex-column flex-lg-row'>
      <SettingsName active='company-information' />
      <div className='flex-lg-row-fluid ms-lg-7 ms-xl-10'>
        <div className='card p-10' id='kt_chat_messenger'>
          <span className='text-muted mb-10'>
            These information will be displayed on invoices/estimates/payments and other PDF
            documents where company info is required
          </span>
          <form className='form row' onSubmit={onSubmit} noValidate>
            {
              values?.map((item:any,index:number)=>{
                  return  typeArr?.includes(item?.name) && <div key={index} className='col-5 mb-10'>
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
            
            <Button />
          </form>
        </div>
      </div>
    </div>
  )
}

export {CompanyInfo}
