import React, {FC, useEffect, useState} from 'react'
import {useNavigate} from 'react-router-dom'
import {KTSVG} from '../../../../_metronic/helpers'
import { useSelector } from 'react-redux'

type Props = {
  active: string
}

const SettingsName: FC<Props> = ({active}) => {
  const Navigate = useNavigate()
  const {asideMenuUrl}=useSelector((state:any)=>state?.reducerData)
  const settings = [
    asideMenuUrl?.includes("general") ? {name: 'general', icon: '001'}:{},
    asideMenuUrl?.includes("company-information") ? {name: 'company-information', icon: '002'}:{},
    asideMenuUrl?.includes("localization") ?   {name: 'localization', icon: '003'}:{},
    asideMenuUrl?.includes("email") ?  {name: 'email', icon: '004'}:{},
    asideMenuUrl?.includes("finance") ?  {name: 'finance', icon: '005'}:{},
    asideMenuUrl?.includes("payment-gateways") ?  {name: 'payment-gateways', icon: '006'}:{},
    asideMenuUrl?.includes("customers") ?  {name: 'customers', icon: '007'}:{},
    asideMenuUrl?.includes("PDF") ?   {name: 'PDF', icon: '008'}:{},
    asideMenuUrl?.includes("SMS") ?  {name: 'SMS', icon: '009'}:{},
    asideMenuUrl?.includes("cron-jobs") ?   {name: 'cron-jobs', icon: '010'}:{},
    asideMenuUrl?.includes("misc") ?   {name: 'misc', icon: '011'}:{},
    asideMenuUrl?.includes("cash-bonus") ?  {name: 'cash-bonus', icon: '012'}:{},
    asideMenuUrl?.includes("wallet-minimum-balance") ?  {name: 'wallet-minimun-balance', icon: '013'}:{},
    asideMenuUrl?.includes("app-current-version") ?  {name: 'app-current-version', icon: '014'}:{},
    asideMenuUrl?.includes("spin-the-wheel") ?  {name: 'spin-the-wheel', icon: '015'}:{},
    asideMenuUrl?.includes("quizophy-AWS-settings") ?  {name: 'quizophy-AWS-settings', icon: '016'}:{},
  ]
  return (
    <div className='flex-column flex-lg-row-auto w-100 w-lg-275px mb-10 mb-lg-0'>
      <div
        className='card card-flush'>
        <div className='card-body' id='kt_chat_contacts_body'>
          <div className='menu menu-column menu-rounded menu-state-bg menu-state-title-primary menu-state-icon-primary menu-state-bullet-primary mb-10'>
            {settings?.map((item, i) => (
              <div
                key={i}
                className='menu-item mb-3'
                onClick={() => {
                  Navigate(`/settings/${item?.name}`)
                }}
              >
                <span className={`menu-link ${active == item?.name ? 'active' : ''}`}>
                  <span className='menu-icon'>
                    <span className='svg-icon svg-icon-2 me-3'>
                      <KTSVG
                        path={`/media/icons/duotune/general/gen${item?.icon}.svg`}
                        className='svg-icon-2'
                      />
                    </span>
                  </span>
                  <span className='menu-title' style={{textTransform: 'capitalize'}}>
                    {item?.name?.replace(/-/g, ' ')}
                  </span>
                </span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}
export {SettingsName}
