import {Route, Routes, Outlet, Navigate} from 'react-router-dom'
import {PageLink, PageTitle} from '../../../_metronic/layout/core'
import {QuestionListWrapper} from './category-list/QuestionList'
import {QuestionViewWrapper} from './subject-list/QuestionView'
import {UsersListWrapper} from './course-list/UsersList'

const usersBreadcrumbs: Array<PageLink> = [
  {
    title: 'Courses',
    path: '/course/courses',
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

const CoursePage = () => {
  return (
    <Routes>
      <Route element={<Outlet />}>
        <Route
          path='courses'
          element={
            <>
              <PageTitle breadcrumbs={usersBreadcrumbs}>Courses list</PageTitle>
              <UsersListWrapper />
            </>
          }
        />
        <Route
          path='course-category'
          element={
            <>
              <PageTitle breadcrumbs={usersBreadcrumbs}>Course Category list</PageTitle>
              <QuestionListWrapper />
            </>
          }
        />
        <Route
          path='subjects'
          element={
            <>
              <PageTitle breadcrumbs={usersBreadcrumbs}>Subject list</PageTitle>
              <QuestionViewWrapper />
            </>
          }
        />
        <Route index element={<Navigate to='/course/courses' />} />
      </Route>
    </Routes>
  )
}

export default CoursePage
