import {FC, useEffect, useRef, useState} from 'react'
import * as Yup from 'yup'
import {ErrorMessage, Form, Formik, FormikValues} from 'formik'
import {isNotEmpty, KTSVG} from '../../../../../_metronic/helpers'
import {createAccountSchemas, initialUser, User} from '../core/_models'
import {useListView} from '../core/ListViewProvider'
import {UsersListLoading} from '../components/loading/UsersListLoading'
import {createUser, getUserById, updateBank, updatePan, updateUpi, updateUser} from '../core/_requests'
import {useQueryResponse} from '../core/QueryResponseProvider'
import Swal from 'sweetalert2'
import {StepperComponent} from '../../../../../_metronic/assets/ts/components'
import {Step1} from '../steps/Step1'
import {Step2} from '../steps/Step2'
import {Step3} from '../steps/step3'
import {Step4} from '../steps/step4'
import { actions } from 'react-table'
import { errrorMessage, successMessage } from '../../../../modules/auth/components/ToastComp'
import validator from 'validator'
type Props = {
  isUserLoading: boolean
  role: User
}

const UserEditModalForm: FC<Props> = ({role, isUserLoading}) => {
  const stepperRef = useRef<HTMLDivElement | null>(null)
  const stepper = useRef<StepperComponent | null>(null)
  const [step,setStep]=useState<number>(1)
  const {setItemIdForUpdate,itemIdForUpdate} = useListView()
  const {refetch} = useQueryResponse()
  const [isSubmitButton, setSubmitButton] = useState(false)
  const [currentSchema, setCurrentSchema] = useState(createAccountSchemas[0])
  const [roleForEdit, setRoleForEdit] = useState<any>({
    id:undefined,
    firstname:"",
    lastname:"",
    email:"",
    phone:"",
    email_verified:false,
    profile_image:"",
    locale:"",
    touchId_enable:0,
    password:"",
    gender:"Male",  
  })
  const [address,setAddress]=useState<any>({
    id:undefined,
    state:"",
    city:"",
    district:"",
    country:"",
    pincode:""
   })
  const [upi,setUpi]=useState<any>({
    id:undefined,
    upi_id:"",
    name:"",
    father_name:"",
    reject_reason:"",
    upi_status:"",
    verification:{
      verified_by:"",
      verified_at:"",
      verified:false,
      type:"upi",
    }
   })
  const [pan,setPan]=useState<any>({
    id:undefined,
    name:"",
    pannumber:"",
    dob:"",
    pan_url:"",
    reject_reason:"",
    pan_status:"",
    verification:{
      verified_by:"",
      verified_at:"",
      verified:false,
      type:"pan",
    }
   })
  const [bank,setBank]=useState<any>({
    id:undefined,
    account_number:"",
    ifsc_code:"",
    bank_name:"",
    branch_name:"",
    state:"",
    bank_proof_url:"",
    reject_reason:"",
    bank_status:"",
    verification:{
      verified_by:"",
      verified_at:"",
      verified:false,
      type:"bank",
    }
  })
const [device,setDevice]=useState<any>({
  id:undefined,
  device_id:"",
  device_token:"",
  device_name:""
 })
const [referral,setReferral]=useState<any>({
  id:undefined,
    refered_by:"",
    referral_code:""
})
  useEffect(() => {
     if(itemIdForUpdate){
      getUserById(itemIdForUpdate).then((data)=>{
        setRoleForEdit(data)
        setAddress(data?.address)
        setUpi(data?.upi)
        setBank(data?.bank)
        setPan(data?.pan)
        setReferral(data?.referral)
        setDevice(data?.device)
      })
     }

  }, [])

  const cancel = (withRefresh?: boolean) => {
    setItemIdForUpdate(undefined)
  }

  const handleChange=(name:any,value:any)=>{
        setRoleForEdit({...roleForEdit,[name]:value})
        console.log(roleForEdit)
  }

  // const loadStepper = () => {
  //   stepper.current = StepperComponent.createInsance(stepperRef.current as HTMLDivElement)
  // }

  // const prevStep = () => {
  //   if (!stepper.current) {
  //     return
  //   }

  //   setSubmitButton(stepper.current.currentStepIndex === stepper.current.totatStepsNumber! - 1)

  //   stepper.current.goPrev()

  //   setCurrentSchema(createAccountSchemas[stepper.current.currentStepIndex - 1])
  // }

  const submitStep = async (values: User, actions: FormikValues) => {
    console.log(values)
    // if (!stepper.current) {
    //   return
    // }
    // console.log("hiii",stepper.current)
    // setSubmitButton(stepper.current.currentStepIndex === stepper.current.totatStepsNumber)
    // setCurrentSchema(createAccountSchemas[stepper.current.currentStepIndex])
    // if (stepper.current.currentStepIndex !== stepper.current.totatStepsNumber) {
    //   console.log("next")
    //   if (stepper.current.currentStepIndex == 1) {
    //     console.log("hii 1")

    //     const user = await updateUser(values)
    //     actions.setFieldValue('id', user?.id)
    //     actions.setFieldValue('address', user?.address)
    //     actions.setFieldValue('device', user?.device)
    //   } else if (stepper.current.currentStepIndex == 2) {
    //     console.log("hii 2")
    //     const bank = await updateBank(values.bank, values.id)
    //     actions.setFieldValue('bank', bank)
    //   } else if (stepper.current.currentStepIndex == 3) {
    //     console.log("hii 2")

    //     const upi = await updateUpi(values.upi, values.id)
    //     actions.setFieldValue('upi', upi)
    //   }
    //   stepper.current.goNext()
    // } else {
    //   console.log("submitted")
    //   try {
    //     await updatePan(values.pan, values.id)
    //   } catch (ex) {
    //     console.error(ex)
    //   } finally {
    //     actions.resetForm()
    //     cancel(true)
    //     Swal.fire({
    //       title: 'Success!',
    //       text: `User ${values.id ? 'Updated' : 'Created'}!`,
    //       icon: 'success',
    //       confirmButtonText: 'Okay',
    //     })
    //   }
    // }
  }

  return (
    <>
      <div
        className='stepper stepper-links d-flex flex-column'
        id='kt_create_account_stepper'
      >
        <div className='stepper-nav mb-5'>
          <div className={`stepper-item ${step===1?"current":""}`} data-kt-stepper-element='nav'>
            <h3 className='stepper-title'>User Details</h3>
          </div>

          <div className={`stepper-item ${step===2?"current":""}`} data-kt-stepper-element='nav'>
            <h3 className='stepper-title'>Bank Details</h3>
          </div>

          <div className={`stepper-item ${step===3?"current":""}`} data-kt-stepper-element='nav'>
            <h3 className='stepper-title'>UPI Details</h3>
          </div>

          <div className={`stepper-item ${step===4?"current":""}`} data-kt-stepper-element='nav'>
            <h3 className='stepper-title'>PAN Card Details</h3>
          </div>
        </div>

        {/* <Formik
          validationSchema={currentSchema}
          initialValues={roleForEdit}
          onSubmit={submitStep}
          validateOnChange={false}
        >
          {({setFieldValue, values, touched, setFieldError, errors}) => (
            <Form className='mx-auto mw-700px w-100 pt-5 pb-10' id='kt_create_account_form'>
              <div className='current' data-kt-stepper-element='content'>
                <Step1
                  setFieldValue={setFieldValue}
                  values={values}
                  touched={touched}
                  setFieldError={setFieldError}
                  errors={errors}
                />
              </div>

              <div data-kt-stepper-element='content'>
                <Step2 setFieldValue={setFieldValue} values={values} />
              </div>

              <div data-kt-stepper-element='content'>
                <Step3 setFieldValue={setFieldValue} values={values} />
              </div>

              <div data-kt-stepper-element='content'>
                <Step4 setFieldValue={setFieldValue} values={values} />
              </div>

              <div className='d-flex flex-stack pt-15'>
                <div className='mr-2'>
                  <button
                    onClick={prevStep}
                    type='button'
                    className='btn btn-lg btn-light-primary me-3'
                    data-kt-stepper-action='previous'
                  >
                    <KTSVG
                      path='/media/icons/duotune/arrows/arr063.svg'
                      className='svg-icon-4 me-1'
                    />
                    Back
                  </button>
                </div>

                <div>
                  <button type='submit' className='btn btn-lg btn-primary me-3'>
                    <span className='indicator-label'>
                      {!isSubmitButton && 'Continue'}
                      {isSubmitButton && 'Submit'}
                      <KTSVG
                        path='/media/icons/duotune/arrows/arr064.svg'
                        className='svg-icon-3 ms-2 me-0'
                      />
                    </span>
                  </button>
                </div>
              </div>
            </Form>
          )}
        </Formik> */}

         <form>
              {
                step===1 && <Step1 roleForEdit={roleForEdit} setRoleForEdit={setRoleForEdit} address={address} setAddress={setAddress} device={device} setDevice={setDevice} referral={referral} setReferral={setReferral}/>
              }
              {
                step===2 && <Step2 bank={bank} setBank={setBank}/>
              }
              {
                step===3 && <Step3 upi={upi} setUpi={setUpi}/>
              }
              {
                step===4 && <Step4 pan={pan} setPan={setPan}/>
              }
              
              <div className="my-4 d-flex justify-content-between align-items-center">
              <button  className="btn btn-warning" disabled={step===1?true:false} onClick={(e:any)=>{
                  e?.preventDefault()
                  if(step===1){
                  }else{
                    setStep((pre)=>pre-1)
                  }
              }}>Back</button>
              <button  className="btn btn-primary" onClick={async (e:any)=>{
                  e?.preventDefault()
                  if(step===1){
                      if(!roleForEdit?.firstname?.trim() || !roleForEdit?.lastname?.trim() || !address?.pincode?.trim() || !roleForEdit?.dob || !address?.district?.trim() || !address?.city?.trim() || !address?.state?.trim() ||  !address?.country?.trim() || !roleForEdit?.password?.trim()){
                            errrorMessage("Please Filled Required details.")
                      }
                      else if(!validator.isEmail(roleForEdit?.email)){
                          errrorMessage("Invalid Email")
                      }
                      else if(roleForEdit?.password?.trim()?.length<8){
                        errrorMessage("Invalid Password")
                    }
                    else if(roleForEdit?.phone?.trim()?.length>10 || roleForEdit?.phone?.trim()?.length<10){
                      errrorMessage("Invalid Phone Number")
                  }
                  else{
                     const data=await updateUser({...roleForEdit,address,referral,device})
                     if(data){
                      setRoleForEdit(data)
                      setAddress(data?.address)
                      setDevice(data?.device)
                      setReferral(data?.referral)
                      setStep((pre)=>pre+1)
                     }
                  }
                  }
                  else if(step===2){
                    if(!bank?.account_number?.trim() || !bank?.ifsc_code?.trim() || !bank?.branch_name?.trim() || !bank?.state || !bank?.bank_status || !bank?.bank_name ){
                      errrorMessage("Please Filled Required details.")
                  }else{
                    const data=await updateBank(bank,roleForEdit?.id?roleForEdit?.id:undefined)
                    if(data){
                      setBank(data)
                      setStep((pre)=>pre+1)
                    }
                  }
                    
                  }

                  else if(step===3){
                    if(!upi?.upi_id?.trim() || !upi?.name?.trim() || !upi?.father_name?.trim() || !upi?.upi_status){
                      errrorMessage("Please Filled Required details.")
                  }else{
                    const data=await updateUpi(upi,itemIdForUpdate?itemIdForUpdate:undefined)
                    if(data){
                      setUpi(data)
                      setStep((pre)=>pre+1)
                    }
                  }
                    
                  }
                  else{
                    if(!pan?.pannumber?.trim() || !pan?.name?.trim() || !pan?.dob?.trim() || !pan?.pan_status){
                      errrorMessage("Please Filled Required details.")
                  }else{
                    const data=await updatePan(pan,itemIdForUpdate?itemIdForUpdate:undefined)
                    if(data){
                      setPan(data)
                      successMessage("Details updated Successfully")
                      cancel()
                    }
                  }
                  }
                  // if(step!==4){
                  //   setStep((pre)=>pre+1)
                  // }
              }}>{step===4?"Submit":"Continue"}</button>

              </div>
              
         </form>
      </div>
      {isUserLoading && <UsersListLoading />}
    </>
  )
}

export {UserEditModalForm}
