import {Route, Routes, Outlet, Navigate} from 'react-router-dom'
import {PageLink, PageTitle} from '../../../_metronic/layout/core'
import {UsersListWrapper} from './users-list/UsersList'

const usersBreadcrumbs: Array<PageLink> = [
  {
    title: 'Coupons',
    path: '/coupon',
    isSeparator: false,
    isActive: false,
  },
  {
    title: '',
    path: '',
    isSeparator: true,
    isActive: false,
  },
]

const CouponPage = () => {
  return (
    // <Routes>
    //   <Route element={<Outlet />}>
    //     <Route
    //       path='questions'
    //       element={
            <>
              <PageTitle breadcrumbs={usersBreadcrumbs}>Coupons list</PageTitle>
              <UsersListWrapper />
            </>
    //       }
    //     />
    //   </Route>
    //   <Route index element={<Navigate to='/apps/question-bank/questions' />} />
    // </Routes>
  )
}

export default CouponPage
