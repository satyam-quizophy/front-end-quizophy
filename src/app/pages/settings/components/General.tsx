/* eslint-disable jsx-a11y/anchor-is-valid */
import React, {FC, useEffect, useState} from 'react'
import {Link} from 'react-router-dom'
import {KTSVG, toAbsoluteUrl} from '../../../../_metronic/helpers'
import {Dropdown1, ChatInner} from '../../../../_metronic/partials'
import {SettingsName} from './SettingsName'
import {Field, ErrorMessage, useFormik} from 'formik'
import clsx from 'clsx'
import {Button} from './Button'
import axios, {AxiosResponse} from 'axios'
import Swal from 'sweetalert2'
import { API_URL } from '../../staff-management/users-list/core/_requests'
import * as Yup from 'yup'
import { errrorMessage, successMessage } from '../../../modules/auth/components/ToastComp'
let typeArr=["quizophy_dark_logo","quizophy_light_logo","quizophy_favicon","facebook_icon","twitter_icon","instagram_icon","linkedin_icon","whatsapp_icon","payment_failed_img","payment_success_img","thank_you_img","play_store_img","app_store_img"]

const General: FC = () => {
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

  const uploadImage = async (file: any,index:number) => {
    const fd = new FormData()
    if(Math.ceil( ( (file[0].size * 8) / 8) / 1000 )>1024){
      errrorMessage(`Image is of un-expected size (size must be less than 1MB)`)
       return 
      }
      let newArr=file[0]?.type?.split("/")
     if(newArr[0]==="audio" || newArr[0]==="video" || newArr[1]==="mpeg" || newArr[1]==="mkv" || newArr[1]==="x-matroska" || newArr[1]==="mp4" || newArr[1]==="mp3"){
      errrorMessage(`Only image supported`)
        return
     }
      else{
        if(file[0]){
            fd.append('image', file[0])
        }
        const {data}=await axios.post(`${API_URL}/option/upload`,fd)
        if(data?.success){
          return data?.image
          // newArrValue[index].value=""
          // setValue(newArrValue)
          // setValue({...va,profile_image:data?.image})
        }
      }
  }



  return (
    <div className='d-flex flex-column flex-lg-row'>
      <SettingsName active={'general'} />
      <div className='flex-lg-row-fluid ms-lg-7 ms-xl-10'>
        <div className='card p-10' id='kt_chat_messenger'>
          <form className='form row gy-5' onSubmit={onSubmit}>

              {
                values?.map((item:any,index:number)=>{
                   return  typeArr?.includes(item?.name) &&  <div key={index} className='col-4 my-6'>
                <label className='d-block form-label'>{item?.name}</label>
                <div className='image-input image-input-outline' data-kt-image-input='true'>
                  <div className=''>
                    <img
                      src={ item?.value ? item?.value :toAbsoluteUrl('/media/svg/avatars/blank.svg')}
                      alt='dark_logo'
                      className={item?.name==="quizophy_light_logo"  ? "bg-dark image-input-wrapper w-125px h-125px":'image-input-wrapper w-125px h-125px'}
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
                      name='dark_logo'
                      accept='.png, .jpg, .jpeg'
                      onChange={async (e: any) => {
                       let image=await uploadImage(e?.target?.files,index)
                       let newArrValue:any[]=[...values]
                       newArrValue[index].value=image
                       setValue(newArrValue)
                      }}
                    />
                    <input type='hidden' name='avatar_remove' />
                  </label>
                   {
                    item?.value!=="" &&    <button
                    className='btn btn-icon btn-circle btn-active-color-primary w-25px h-25px bg-body shadow'
                    data-kt-image-input-action='remove'
                    data-bs-toggle='tooltip'
                    title='Remove avatar'
                    type='button'
                    onClick={()=>{
                      let newArrValue:any[]=[...values]
                      newArrValue[index].value=""
                      setValue(newArrValue)
                    }}
                  >
                    <i className='bi bi-x fs-2'></i>
                  </button>
                   }
                  
                  
                </div>
              </div>
                })
              }
              {/* <div className='fv-row w-100 flex-md-root'>
                <label className='d-block form-label'>Logo Dark</label>
                <div className='image-input image-input-outline' data-kt-image-input='true'>
                  <div className=''>
                    <img
                      src={ toAbsoluteUrl('/media/svg/avatars/blank.svg')}
                      alt='dark_logo'
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
                      name='dark_logo'
                      accept='.png, .jpg, .jpeg'
                      onChange={(e: any) => {
                        uploadImage(e)
                      }}
                    />
                    <input type='hidden' name='avatar_remove' />
                  </label>
                   
                    <button
                      className='btn btn-icon btn-circle btn-active-color-primary w-25px h-25px bg-body shadow'
                      data-kt-image-input-action='remove'
                      data-bs-toggle='tooltip'
                      title='Remove avatar'
                      type='button'
                    >
                      <i className='bi bi-x fs-2'></i>
                    </button>
                  
                </div>
                <div className='form-text'>Allowed file types: png, jpg, jpeg.</div>
              </div> */}
              {/* <div className='fv-row w-100 flex-md-root'>
                <label className='d-block form-label'>Logo Light</label>
                <div className='image-input image-input-outline' data-kt-image-input='true'>
                  <div className=''>
                    <img
                      src={
                        values.light_logo != ''
                          ? values.light_logo
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
                      name='light_logo'
                      accept='.png, .jpg, .jpeg'
                      onChange={(e: any) => {
                        uploadImage(e)
                      }}
                    />
                    <input type='hidden' name='avatar_remove' />
                  </label>
                  {values.light_logo != '' && (
                    <button
                      className='btn btn-icon btn-circle btn-active-color-primary w-25px h-25px bg-body shadow'
                      data-kt-image-input-action='remove'
                      data-bs-toggle='tooltip'
                      title='Remove avatar'
                      type='button'
                      onClick={() => setValue({...values, light_logo: ''})}
                    >
                      <i className='bi bi-x fs-2'></i>
                    </button>
                  )}
                </div>
                <div className='form-text'>Allowed file types: png, jpg, jpeg.</div>
              </div>
              <div className='fv-row w-100 flex-md-root'>
                <label className='d-block form-label'>Fav icon</label>
                <div className='image-input image-input-outline' data-kt-image-input='true'>
                  <div className=''>
                    <img
                      src={
                        values.favicon != ''
                          ? values.favicon
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
                      name='favicon'
                      accept='.png, .jpg, .jpeg'
                      onChange={(e: any) => {
                        uploadImage(e)
                      }}
                    />
                    <input type='hidden' name='avatar_remove' />
                  </label>
                  {values.favicon != '' && (
                    <button
                      className='btn btn-icon btn-circle btn-active-color-primary w-25px h-25px bg-body shadow'
                      data-kt-image-input-action='remove'
                      data-bs-toggle='tooltip'
                      title='Remove avatar'
                      type='button'
                      onClick={() => setValue({...values, favicon: ''})}
                    >
                      <i className='bi bi-x fs-2'></i>
                    </button>
                  )}
                </div>
                <div className='form-text'>Allowed file types: png, jpg, jpeg.</div>
              </div> */}
            <Button />
          </form>
        </div>
      </div>
    </div>
  )
}

export {General}
