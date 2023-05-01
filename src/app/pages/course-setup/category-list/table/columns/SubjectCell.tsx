/* eslint-disable jsx-a11y/anchor-is-valid */
import axios, {AxiosResponse} from 'axios'
import clsx from 'clsx'
import {FC, useEffect, useState} from 'react'
import {toAbsoluteUrl} from '../../../../../../_metronic/helpers'
import {useCommonData} from '../../../commonData/CommonDataProvider'
import {useListView} from '../../core/ListViewProvider'
import {User} from '../../core/_models'

type Props = {
  course_id: any
}

const SubjectCell: FC<Props> = ({course_id}) => {
  const {allCourses} = useCommonData()
  const item = allCourses?.find((x: any) => x.id == course_id)?.course_name

  return (
    <div className='d-flex align-items-center'>
      <div className='d-flex flex-column'>{item}</div>
    </div>
  )
}

export {SubjectCell}
