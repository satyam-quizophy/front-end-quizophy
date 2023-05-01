/* eslint-disable jsx-a11y/anchor-is-valid */
import axios, {AxiosResponse} from 'axios'
import clsx from 'clsx'
import React, {FC, useEffect, useState} from 'react'
import {Link} from 'react-router-dom'
import Swal from 'sweetalert2'
import {KTSVG, toAbsoluteUrl} from '../../../../_metronic/helpers'
import {Dropdown1, ChatInner} from '../../../../_metronic/partials'
import {API_URL} from './ApiUrl'
import {Button} from './Button'
import {SettingsName} from './SettingsName'

const Email: FC = () => {
  const [values, setValue] = useState<any>({
    mail_engine: '',
    protocol: '',
    email: '',
    charset: '',
    bcc_all: '',
    signature: '',
    header: '',
    footer: '',
    test_email: '',
  })
  const [apikey, setApiKey] = useState<string>('')
  const [errors, setErrors] = useState<any>({
    mail_engine: '',
    protocol: '',
    email: '',
    charset: '',
    bcc_all: '',
    signature: '',
    apikey: '',
  })

  const [tab, setTab] = useState('email_smtp')

  useEffect(() => {
    getInfo()
  }, [tab])

  const getInfo = async () => {
    await axios
      .get(`${API_URL}/${tab}`)
      .then((data: AxiosResponse<any>) => {
        if (data.data != null) {
          const newvalues = JSON.parse(data.data.value)
          tab == 'email_smtp' ? setValue(newvalues) : setApiKey(newvalues.apikey)
        }
      })
      .catch((err) => {
        console.log(err, 'err')
      })
  }

  const onChange = (e: any) => {
    const {name, value} = e.target
    tab == 'email_smtp' ? setValue({...values, [name]: value}) : setApiKey(value)
    setErrors({...errors, [name]: ''})
  }

  const onSubmit = async (e: any) => {
    e.preventDefault()
    if (values.mail_engine == '') {
      setErrors({...errors, mail_engine: 'Mail engine is required'})
      return
    }
    if (values.protocol == '') {
      setErrors({...errors, protocol: 'Email protocol is required'})
      return
    }
    if (values.email == '') {
      setErrors({...errors, email: 'Email is required'})
      return
    }

    if (values.charset == '') {
      setErrors({...errors, charset: 'Email charset is required'})
      return
    }

    if (values.bcc_all == '') {
      setErrors({...errors, bcc_all: 'Bcc all emails to is required'})
      return
    }
    if (values.signature == '') {
      setErrors({...errors, signature: 'Email signature is required'})
      return
    }

    if (apikey == '' && tab == 'email_sendinblue') {
      setErrors({...errors, apikey: 'Api-key is required'})
      return
    }

    const payload = {
      name: tab,
      value: JSON.stringify(tab == 'email_smtp' ? values : {apikey}),
      auto_load: 0,
    }
    await axios
      .post(API_URL, payload)
      .then((data: AxiosResponse<any>) => {
        Swal.fire({
          title: 'Success!',
          text: `Settings Updated!`,
          icon: 'success',
          confirmButtonText: 'Okay',
        })
      })
      .catch((err) => {
        console.log(err, 'err')
      })
  }

  return (
    <div className='d-flex flex-column flex-lg-row'>
      <SettingsName active={'email'} />
      <div className='flex-lg-row-fluid ms-lg-7 ms-xl-10'>
        <div className='card p-10' id='kt_chat_messenger'>
          <ul className='nav nav-stretch nav-line-tabs nav-line-tabs-2x border-transparent fs-5 fw-bolder'>
            <li className='nav-item mt-2'>
              <a
                style={{cursor: 'pointer'}}
                className={`nav-link text-active-primary ms-0 me-10 py-5 ${
                  tab == 'email_smtp' ? 'active' : ''
                }`}
                onClick={() => setTab('email_smtp')}
              >
                SMTP
              </a>
            </li>
            <li className='nav-item mt-2'>
              <a
                style={{cursor: 'pointer'}}
                className={`nav-link text-active-primary ms-0 me-10 py-5 ${
                  tab == 'email_sendinblue' ? 'active' : ''
                }`}
                onClick={() => setTab('email_sendinblue')}
              >
                Send In Blue
              </a>
            </li>
          </ul>
          <div className='separator separator-dashed my-5 '></div>
          <form noValidate className='form' onSubmit={onSubmit}>
            <div className='d-flex flex-wrap gap-5'>
              {tab == 'email_smtp' ? (
                <>
                  {' '}
                  <h4>SMTP Settings</h4>
                  <span className='text-muted'>Setup main email</span>{' '}
                </>
              ) : (
                <>
                  <h4>Send In Blue Settings</h4>
                  <span className='text-muted'>Setup Send in blue email</span>
                </>
              )}
            </div>

            <div className='separator separator-dashed my-5'></div>
            {tab == 'email_smtp' ? (
              <>
                <div className='d-flex flex-wrap gap-5 mb-10'>
                  <div className='fv-row w-100 flex-md-root'>
                    <label className='required fw-bold fs-6 mb-2'>Mail Engine</label>
                    <div className='form-check form-check-custom form-check-solid gap-3'>
                      <input
                        name='mail_engine'
                        type={'radio'}
                        value='0'
                        onChange={onChange}
                        checked={values.mail_engine == '0'}
                        id='PHPMailer'
                        className={clsx('form-check-input mb-3 mb-lg-0')}
                        autoComplete='off'
                      />
                      <label className='form-check-label' htmlFor='PHPMailer'>
                        <div className='fw-bolder text-gray-800'>PHPMailer</div>
                      </label>
                      <input
                        name='mail_engine'
                        type={'radio'}
                        value='1'
                        onChange={onChange}
                        checked={values.mail_engine == '1'}
                        id='CodeIgniter'
                        className={clsx('form-check-input mb-3 mb-lg-0')}
                        autoComplete='off'
                      />
                      <label className='form-check-label' htmlFor='CodeIgniter'>
                        <div className='fw-bolder text-gray-800'>CodeIgniter</div>
                      </label>
                    </div>
                    <div className='fv-plugins-message-container pt-2'>
                      <div className='fv-help-block'>
                        <span role='alert' className='text-danger'>
                          {errors.mail_engine}
                        </span>
                      </div>
                    </div>
                  </div>
                  <div className='fv-row w-100 flex-md-root'>
                    <label className='required fw-bold fs-6 mb-2'>Email Protocol</label>
                    <div className='form-check form-check-custom form-check-solid gap-3'>
                      <input
                        name='protocol'
                        type={'radio'}
                        value='0'
                        onChange={onChange}
                        checked={values.protocol == '0'}
                        id='SMTP'
                        className={clsx('form-check-input mb-3 mb-lg-0')}
                        autoComplete='off'
                      />
                      <label className='form-check-label' htmlFor='SMTP'>
                        <div className='fw-bolder text-gray-800'>SMTP</div>
                      </label>
                      <input
                        name='protocol'
                        type={'radio'}
                        value='1'
                        onChange={onChange}
                        checked={values.protocol == '1'}
                        id='Sendmail'
                        className={clsx('form-check-input mb-3 mb-lg-0')}
                        autoComplete='off'
                      />
                      <label className='form-check-label' htmlFor='Sendmail'>
                        <div className='fw-bolder text-gray-800'>Sendmail</div>
                      </label>
                      <input
                        name='protocol'
                        type={'radio'}
                        value='2'
                        onChange={onChange}
                        checked={values.protocol == '2'}
                        id='Mail'
                        className={clsx('form-check-input mb-3 mb-lg-0')}
                        autoComplete='off'
                      />
                      <label className='form-check-label' htmlFor='Mail'>
                        <div className='fw-bolder text-gray-800'>Mail</div>
                      </label>
                    </div>
                    <div className='fv-plugins-message-container pt-2'>
                      <div className='fv-help-block'>
                        <span role='alert' className='text-danger'>
                          {errors.protocol}
                        </span>
                      </div>
                    </div>
                  </div>
                </div>

                <div className='d-flex flex-wrap gap-5 mb-10'>
                  <div className='fv-row w-100 flex-md-root'>
                    <label className='required fw-bold fs-6 mb-2'>Email</label>
                    <input
                      placeholder='Enter a email'
                      name='email'
                      type={'email'}
                      onChange={onChange}
                      value={values.email}
                      className={clsx('form-control mb-3 mb-lg-0', {'is-invalid': errors.email})}
                      autoComplete='off'
                    />
                    <div className='fv-plugins-message-container'>
                      <div className='fv-help-block'>
                        <span role='alert' className='text-danger'>
                          {errors.email}
                        </span>
                      </div>
                    </div>
                  </div>
                  <div className='fv-row w-100 flex-md-root'>
                    <label className='required fw-bold fs-6 mb-2'>Email Charset</label>
                    <input
                      placeholder='Enter a charset'
                      name='charset'
                      onChange={onChange}
                      value={values.charset}
                      className={clsx('form-control mb-3 mb-lg-0', {'is-invalid': errors.charset})}
                      autoComplete='off'
                    />
                    <div className='fv-plugins-message-container'>
                      <div className='fv-help-block'>
                        <span role='alert' className='text-danger'>
                          {errors.charset}
                        </span>
                      </div>
                    </div>
                  </div>
                </div>

                <div className='d-flex flex-wrap gap-5 mb-10'>
                  <div className='fv-row w-100 flex-md-root'>
                    <label className='required fw-bold fs-6 mb-2'>BCC All Emails To</label>
                    <input
                      placeholder='Enter BCC emails'
                      name='bcc_all'
                      onChange={onChange}
                      value={values.bcc_all}
                      className={clsx('form-control mb-3 mb-lg-0', {'is-invalid': errors.bcc_all})}
                      autoComplete='off'
                    />
                    <div className='fv-plugins-message-container'>
                      <div className='fv-help-block'>
                        <span role='alert' className='text-danger'>
                          {errors.bcc_all}
                        </span>
                      </div>
                    </div>
                  </div>
                  <div className='fv-row w-100 flex-md-root'>
                    <label className='required fw-bold fs-6 mb-2'>Email Signature</label>
                    <input
                      placeholder='Enter a email signature'
                      name='signature'
                      onChange={onChange}
                      value={values.signature}
                      className={clsx('form-control mb-3 mb-lg-0', {
                        'is-invalid': errors.signature,
                      })}
                      autoComplete='off'
                    />
                    <div className='fv-plugins-message-container'>
                      <div className='fv-help-block'>
                        <span role='alert' className='text-danger'>
                          {errors.signature}
                        </span>
                      </div>
                    </div>
                  </div>
                </div>

                <div className='d-flex flex-wrap gap-5 mb-10'>
                  <div className='fv-row w-100 flex-md-root'>
                    <label className='fw-bold fs-6 mb-2'>Predefined Header</label>
                    <textarea
                      placeholder='Enter predefined header'
                      rows={6}
                      name='header'
                      onChange={onChange}
                      value={values.header}
                      className={clsx('form-control mb-3 mb-lg-0')}
                      autoComplete='off'
                    />
                  </div>
                  <div className='fv-row w-100 flex-md-root'>
                    <label className='fw-bold fs-6 mb-2'>Predefined Footer</label>
                    <textarea
                      placeholder='Enter predefined footer'
                      rows={6}
                      name='footer'
                      onChange={onChange}
                      value={values.footer}
                      className={clsx('form-control mb-3 mb-lg-0')}
                      autoComplete='off'
                    />
                  </div>
                </div>
                <div className='fv-row w-100 flex-md-root'>
                  <label className='fw-bold fs-6 mb-2'>Send Test Email</label>
                  <div className='text-muted mb-3'>
                    Send test email to make sure that your SMTP settings is set correctly.
                  </div>
                  <div style={{flexDirection: 'row', display: 'flex'}} className='mb-2 gap-5'>
                    <input
                      placeholder='Enter test email'
                      name='test_email'
                      onChange={onChange}
                      value={values.test_email}
                      className={clsx('form-control mb-3 mb-lg-0')}
                      autoComplete='off'
                    />
                    <button type='button' className='btn btn-lg btn-light-primary w-20 fs-15'>
                      Test
                    </button>
                  </div>
                </div>
              </>
            ) : (
              <div className='fv-row w-100 mb-10'>
                <label className='required fw-bold fs-6 mb-2'>Api key</label>
                <input
                  placeholder='Enter a email api-key'
                  name='apikey'
                  onChange={onChange}
                  value={apikey}
                  className={clsx('form-control mb-3 mb-lg-0', {'is-invalid': errors.apikey})}
                  autoComplete='off'
                />
                <div className='fv-plugins-message-container'>
                  <div className='fv-help-block'>
                    <span role='alert' className='text-danger'>
                      {errors.apikey}
                    </span>
                  </div>
                </div>
              </div>
            )}
            <Button />
          </form>
        </div>
      </div>
    </div>
  )
}

export {Email}
