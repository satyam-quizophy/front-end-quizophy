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
    subject_id: role.subject_id || initialUser.subject_id,
    question_type: role.question_type || initialUser.question_type,
    level: role.level || initialUser.level,
    questions: role.questions || initialUser.questions,
    courses: role.courses || initialUser.courses,
    marks: role.marks || initialUser.marks,
  })
  const [selectedLang, setSelectedLang] = useState<any>(null)

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
      console.log(values,"update")

      // const user = await updateUser(values)
      // actions.setFieldValue('id', user?.id)
      // actions.setFieldValue('marks', user?.marks)
      stepper.current.goNext()
    } else {
      try {
        console.log(values,"create")
        await createUser(values.questions[selectedLang])
      } catch (ex) {
        console.error(ex)
      } finally {
        // setSubmitting(true)
        actions.resetForm()
        cancel(true)
        Swal.fire({
          title: 'Success!',
          text: `Question ${values.id ? 'Updated' : 'Created'}!`,
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
            <h3 className='stepper-title'>Question Type</h3>
          </div>

          <div className='stepper-item' data-kt-stepper-element='nav'>
            <h3 className='stepper-title'>Question</h3>
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
                <Step2
                  setFieldValue={setFieldValue}
                  values={values}
                  selectedLang={selectedLang}
                  setSelectedLang={setSelectedLang}
                  roleForEdit={roleForEdit}
                  errors={errors}
                />
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
