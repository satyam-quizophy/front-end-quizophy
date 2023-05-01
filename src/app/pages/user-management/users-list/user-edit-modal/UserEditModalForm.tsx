import {FC, useEffect, useRef, useState} from 'react'
import * as Yup from 'yup'
import {Form, Formik, FormikValues} from 'formik'
import {isNotEmpty, KTSVG} from '../../../../../_metronic/helpers'
import {createAccountSchemas, initialUser, User} from '../core/_models'
import {useListView} from '../core/ListViewProvider'
import {UsersListLoading} from '../components/loading/UsersListLoading'
import {createUser, updateBank, updatePan, updateUpi, updateUser} from '../core/_requests'
import {useQueryResponse} from '../core/QueryResponseProvider'
import Swal from 'sweetalert2'
import {StepperComponent} from '../../../../../_metronic/assets/ts/components'
import {Step1} from '../steps/Step1'
import {Step2} from '../steps/Step2'
import {Step3} from '../steps/step3'
import {Step4} from '../steps/step4'

type Props = {
  isUserLoading: boolean
  role: User
}

const UserEditModalForm: FC<Props> = ({role, isUserLoading}) => {
  const stepperRef = useRef<HTMLDivElement | null>(null)
  const stepper = useRef<StepperComponent | null>(null)
  const {setItemIdForUpdate} = useListView()
  const {refetch} = useQueryResponse()
  const [isSubmitButton, setSubmitButton] = useState(false)
  const [currentSchema, setCurrentSchema] = useState(createAccountSchemas[0])
  const [roleForEdit, setRoleForEdit] = useState<User>({
    ...role,
    firstname: role.firstname || initialUser.firstname,
    lastname: role.lastname || initialUser.lastname,
    fathername: role.fathername || initialUser.fathername,
    email: role.email || initialUser.email,
    email_verified: role.email_verified || initialUser.email_verified,
    password: role.password || initialUser.password,
    phone: role.phone || initialUser.phone,
    phone_verified: role.phone_verified || initialUser.phone_verified,
    profile_image: role.profile_image || initialUser.profile_image,
    dob: role.dob || initialUser.dob,
    gender: role.gender || initialUser.gender,
    locale: role.locale || initialUser.locale,
    touchId_enable: role.touchId_enable || initialUser.touchId_enable,
    address: role.address || initialUser.address,
    referral: role.referral || initialUser.referral,
    device: role.device || initialUser.device,
    bank: role.bank || initialUser.bank,
    upi: role.upi || initialUser.upi,
    pan: role.pan || initialUser.pan,
  })

  useEffect(() => {
    if (!stepperRef.current) {
      return
    }

    loadStepper()
  }, [stepperRef])

  const cancel = (withRefresh?: boolean) => {
    if (withRefresh) {
      refetch()
    }
    setItemIdForUpdate(undefined)
  }

  const loadStepper = () => {
    stepper.current = StepperComponent.createInsance(stepperRef.current as HTMLDivElement)
  }

  const prevStep = () => {
    if (!stepper.current) {
      return
    }

    setSubmitButton(stepper.current.currentStepIndex === stepper.current.totatStepsNumber! - 1)

    stepper.current.goPrev()

    setCurrentSchema(createAccountSchemas[stepper.current.currentStepIndex - 1])
  }

  const submitStep = async (values: User, actions: FormikValues) => {
    if (!stepper.current) {
      return
    }
    setSubmitButton(stepper.current.currentStepIndex === stepper.current.totatStepsNumber! - 1)
    setCurrentSchema(createAccountSchemas[stepper.current.currentStepIndex])
    if (stepper.current.currentStepIndex !== stepper.current.totatStepsNumber) {
      if (stepper.current.currentStepIndex == 1) {
        const user = await updateUser(values)
        actions.setFieldValue('id', user?.id)
        actions.setFieldValue('address', user?.address)
        actions.setFieldValue('device', user?.device)
      } else if (stepper.current.currentStepIndex == 2) {
        const bank = await updateBank(values.bank, values.id)
        actions.setFieldValue('bank', bank)
      } else if (stepper.current.currentStepIndex == 3) {
        const upi = await updateUpi(values.upi, values.id)
        actions.setFieldValue('upi', upi)
      }
      stepper.current.goNext()
    } else {
      try {
        await updatePan(values.pan, values.id)
      } catch (ex) {
        console.error(ex)
      } finally {
        // setSubmitting(true)
        actions.resetForm()
        cancel(true)
        Swal.fire({
          title: 'Success!',
          text: `User ${values.id ? 'Updated' : 'Created'}!`,
          icon: 'success',
          confirmButtonText: 'Okay',
        })
      }
    }
  }

  return (
    <>
      <div
        ref={stepperRef}
        className='stepper stepper-links d-flex flex-column'
        id='kt_create_account_stepper'
      >
        <div className='stepper-nav mb-5'>
          <div className='stepper-item current' data-kt-stepper-element='nav'>
            <h3 className='stepper-title'>User Details</h3>
          </div>

          <div className='stepper-item' data-kt-stepper-element='nav'>
            <h3 className='stepper-title'>Bank Details</h3>
          </div>

          <div className='stepper-item' data-kt-stepper-element='nav'>
            <h3 className='stepper-title'>UPI Details</h3>
          </div>

          <div className='stepper-item' data-kt-stepper-element='nav'>
            <h3 className='stepper-title'>PAN Card Details</h3>
          </div>
        </div>

        <Formik
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
        </Formik>
      </div>
      {isUserLoading && <UsersListLoading />}
    </>
  )
}

export {UserEditModalForm}
