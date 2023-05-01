import {FC, useEffect, useRef, useState} from 'react'
import {ErrorMessage, Field, Form, Formik, FormikValues} from 'formik'
import {toAbsoluteUrl} from '../../../../../_metronic/helpers'
import {createAccountSchemas, initialUser, User} from '../core/_models'
import {useListView} from '../core/ListViewProvider'
import {UsersListLoading} from '../components/loading/UsersListLoading'
import {createUser} from '../core/_requests'
import {useQueryResponse} from '../core/QueryResponseProvider'
import Swal from 'sweetalert2'
import axios, {AxiosResponse} from 'axios'
import {API_URL} from '../../../settings/components/ApiUrl'

type Props = {
  isUserLoading: boolean
  role: User
}

const UserEditModalForm: FC<Props> = ({role, isUserLoading}) => {
  const {setItemIdForUpdate} = useListView()
  const {refetch} = useQueryResponse()
  const [currentSchema, setCurrentSchema] = useState(createAccountSchemas[0])
  const [roleForEdit, setRoleForEdit] = useState<User>({
    ...role,
    id: role.id || initialUser.id,
    course_name: role.course_name || initialUser.course_name,
    position: role.position || initialUser.position,
    image: role.image || initialUser.image,
  })
  const closeDrawerRef: any = useRef(null)

  useEffect(() => {
    console.log(roleForEdit, 'roleforedit')
  }, [])

  useEffect(() => {
    console.log(role, 'role')
  }, [role])

  const cancel = (withRefresh?: boolean) => {
    if (withRefresh) {
      refetch()
    }
    setItemIdForUpdate(undefined)
  }

  const submitStep = async (values: User, actions: FormikValues) => {
    debugger
    try {
      values.image = roleForEdit.image
      await createUser(values)
    } catch (ex) {
      console.error(ex)
    } finally {
      debugger
      actions.resetForm()
      Swal.fire({
        title: 'Success!',
        text: `Course Updated!`,
        icon: 'success',
        confirmButtonText: 'Okay',
      })
      cancel(true)
    }
  }

  const uploadImage = async (e: any) => {
    const file = e.currentTarget.files[0]
    const fd = new FormData()
    fd.append('image', file)
    await axios
      .post(`${API_URL}/upload`, fd)
      .then((data: AxiosResponse<any>) => {
        setRoleForEdit({...roleForEdit, image: data.data})
      })
      .catch((err) => {
        console.log(err, 'err')
      })
  }

  return (
    <>
      <div className='stepper stepper-links d-flex flex-column' id='kt_create_account_stepper'>
        <Formik
          validationSchema={currentSchema}
          initialValues={roleForEdit}
          onSubmit={submitStep}
          validateOnChange={false}
        >
          {() => (
            <Form className='mx-auto mw-700px w-100 pt-5 pb-10' id='kt_create_account_form'>
              <div className='fv-row mb-7'>
                <label className='d-block form-label'>Course Image</label>
                <div className='image-input image-input-outline' data-kt-image-input='true'>
                  <div className=''>
                    <img
                      src={
                        roleForEdit?.image == null || roleForEdit?.image == ''
                          ? toAbsoluteUrl('/media/svg/avatars/blank.svg')
                          : roleForEdit?.image
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
                  {roleForEdit.image !== null && (
                    <button
                      className='btn btn-icon btn-circle btn-active-color-primary w-25px h-25px bg-body shadow'
                      data-kt-image-input-action='remove'
                      data-bs-toggle='tooltip'
                      title='Remove avatar'
                      type='button'
                      onClick={() => setRoleForEdit({...roleForEdit, image: ''})}
                    >
                      <i className='bi bi-x fs-2'></i>
                    </button>
                  )}
                </div>
                <div className='form-text'>Allowed file types: png, jpg, jpeg.</div>
              </div>

              <div className='fv-row w-100 mb-10'>
                <label className='form-label required'>Course Name</label>

                <Field
                  name='course_name'
                  className='form-control mb-2'
                  placeholder={'Enter Course Name'}
                  value={roleForEdit.course_name}
                  onChange={(e: any) =>
                    setRoleForEdit({...roleForEdit, course_name: e.target.value})
                  }
                />
                <div className='text-danger mt-2'>
                  <ErrorMessage name='course_name' />
                </div>
              </div>
              <div className='fv-row w-100 mb-10'>
                <label className='d-flex align-items-center form-label'>
                  <span className='required'>Position</span>
                </label>

                <Field
                  name='position'
                  className='form-control mb-2'
                  type='number'
                  value={roleForEdit.position}
                  onChange={(e: any) => setRoleForEdit({...roleForEdit, position: e.target.value})}
                  placeholder={'Enter Order of course'}
                />
                <div className='text-danger mt-2'>
                  <ErrorMessage name='position' />
                </div>
              </div>

              <div className='d-flex flex-stack pt-15'>
                <button
                  ref={closeDrawerRef}
                  className='btn btn-primary btn-lg'
                  type='button'
                  style={{width: '40%'}}
                  data-kt-element='send'
                  onClick={() => {
                    debugger
                    setItemIdForUpdate(undefined)
                    closeDrawerRef?.current.setAttribute('id', 'kt_drawer_course_close')
                  }}
                >
                  Cancel
                </button>
                <button type='submit' className='btn btn-lg btn-primary' style={{width: '40%'}}>
                  <span className='indicator-label'>{'Submit'}</span>
                </button>
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
