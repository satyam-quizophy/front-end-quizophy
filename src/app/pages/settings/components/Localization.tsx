/* eslint-disable jsx-a11y/anchor-is-valid */
import axios, {AxiosResponse} from 'axios'
import clsx from 'clsx'
import {FC, useEffect, useState} from 'react'
import { API_URL } from '../../staff-management/users-list/core/_requests'
import {Button} from './Button'
import {SettingsName} from './SettingsName'
import { errrorMessage, successMessage } from '../../../modules/auth/components/ToastComp'
let typeArr=["date_format","default_language","time_format","default_timezone"]
const Localization: FC = () => {
  const [values, setValue] = useState<Array<any[]>>()

  useEffect(() => {
    getInfo()
  }, [])

  const getInfo = async () => {
    const {data}=await axios.get(`${API_URL}/option`)
    if(data?.success){
      setValue(data?.data)
    }
  }

  const onSubmit = async (e: any) => {
    e.preventDefault()
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
      <SettingsName active={'localization'} />
      <div className='flex-lg-row-fluid ms-lg-7 ms-xl-10'>
        <div className='card p-10' id='kt_chat_messenger'>
          <form noValidate className='form row' onSubmit={onSubmit}>
            {
              values?.map((item:any,index:number)=>{
                 return  typeArr?.includes(item?.name) && <div key={index} className='col-6 mb-5'>
                <label className='required fw-bold fs-6 mb-2'>{item?.name}</label>
                <select
                  name='date_format'
                  placeholder='Select a date format'
                  onChange={(e:any)=>{
                    let newArr:any[]=[...values]
                    newArr[index].value=e?.target?.value
                    setValue(newArr)
                  }}
                  value={item?.value}
                  className={clsx(
                    'form-select mb-3 mb-lg-0',
                  )}
                  autoComplete='off'
                >
                {
                  item?.name==="date_format" && <>  
                  <option>yyyy-mm-dd</option>
                  <option>yyyy/mm/dd</option>
                  <option>yyyy.mm.dd</option>
                  <option>dd-mm-yyyy</option>
                  <option>dd/mm/yyyy</option>
                  <option>dd.mm.yyyy</option>
                  <option>mm-dd-yyyy</option>
                  <option>mm.dd.yyyy</option>
                  <option>mm/dd/yyyy</option>
                  </>
                }
                {
                  item?.name==="time_format" && <>  
                  <option>24 hours</option>
                  <option>12 hours</option></>
                }
                {
                  item?.name==="default_timezone" && <>  
                      <option>yyyy-mm-dd</option>
                  <option>yyyy/mm/dd</option>
                  <option>yyyy.mm.dd</option>
                  <option>dd-mm-yyyy</option>
                  <option>dd/mm/yyyy</option>
                  <option>dd.mm.yyyy</option>
                  <option>mm-dd-yyyy</option>
                  <option>mm.dd.yyyy</option>
                  <option>mm/dd/yyyy</option></>
                }
                {
                  item?.name==="default_language" && <>  
                    <option>English</option>
                  <option>Hindi</option></>
                }

                </select>
                <div className='fv-plugins-message-container'>
                  <div className='fv-help-block'>
                    <span role='alert' className='text-danger'>
                    </span>
                  </div>
                </div>
              </div>
              })
            }
            {/* <div className='d-flex flex-wrap gap-5 mb-10'>
              <div className='fv-row w-100 flex-md-root'>
                <label className='required fw-bold fs-6 mb-2'>Date Format</label>
                <select
                  name='date_format'
                  value={values.date_format}
                  placeholder='Select a date format'
                  onChange={onChange}
                  className={clsx(
                    'form-select mb-3 mb-lg-0',
                  )}
                  autoComplete='off'
                >
                  <option>d-m-Y</option>
                  <option>d/m/Y</option>
                  <option>d.m.Y</option>
                  <option>m-d-Y</option>
                  <option>m.d.Y</option>
                  <option>m/d/Y</option>
                  <option>Y-m-d</option>
                  <option>Y/m/d</option>
                  <option>Y.m.d</option>
                </select>
                <div className='fv-plugins-message-container'>
                  <div className='fv-help-block'>
                    <span role='alert' className='text-danger'>
                    </span>
                  </div>
                </div>
              </div>
              <div className='fv-row w-100 flex-md-root'>
                <label className='required fw-bold fs-6 mb-2'>Time Format</label>
                <select
                  placeholder='Enter a domain name'
                  name='time_format'
                  value={values.time_format}
                  onChange={onChange}
                  className={clsx(
                    'form-select mb-3 mb-lg-0',
                  )}
                  autoComplete='off'
                >
                  <option>24 hours</option>
                  <option>12 hours</option>
                </select>
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
                <label className='required fw-bold fs-6 mb-2'>Default Timezone</label>
                <select
                  placeholder='Enter allowed file types'
                  name='timezone'
                  value={values.timezone}
                  onChange={onChange}
                  className={clsx(
                    'form-select mb-3 mb-lg-0',
                  )}
                  autoComplete='off'
                >
                 <option>d-m-Y</option>
                  <option>d/m/Y</option>
                  <option>d.m.Y</option>
                  <option>m-d-Y</option>
                  <option>m.d.Y</option>
                  <option>m/d/Y</option>
                  <option>Y-m-d</option>
                  <option>Y/m/d</option>
                  <option>Y.m.d</option>
                </select>
                <div className='fv-plugins-message-container'>
                  <div className='fv-help-block'>
                    <span role='alert' className='text-danger'>
                    </span>
                  </div>
                </div>
              </div>
              <div className='fv-row w-100 flex-md-root'>
                <label className='required fw-bold fs-6 mb-2'>Default Language</label>
                <select
                  placeholder='Enter allowed file types'
                  name='language'
                  value={values.language}
                  onChange={onChange}
                  className={clsx(
                    'form-select mb-3 mb-lg-0',
                  )}
                  autoComplete='off'
                >
                  <option>English</option>
                  <option>Hindi</option>
                </select>
                <div className='fv-plugins-message-container'>
                  <div className='fv-help-block'>
                    <span role='alert' className='text-danger'>
                    </span>
                  </div>
                </div>
              </div>
            </div> */}

            <Button />
          </form>
        </div>
      </div>
    </div>
  )
}

export {Localization}
