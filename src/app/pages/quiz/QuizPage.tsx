import {Route, Routes, Outlet, Navigate} from 'react-router-dom'
import {PageLink, PageTitle} from '../../../_metronic/layout/core'
import {QuestionListWrapper} from './question-list/QuestionList'
import {QuestionViewWrapper} from './question-view/QuestionView'
import {UsersListWrapper} from './users-list/UsersList'

const usersBreadcrumbs: Array<PageLink> = [
  {
    title: 'Quiz',
    path: '/quiz/quiz',
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

const Quiz = () => {
  return (
    <Routes>
      <Route element={<Outlet />}>
        <Route
          path='quiz'
          element={
            <>
              <PageTitle breadcrumbs={usersBreadcrumbs}>Quizzes list</PageTitle>
              <UsersListWrapper />
            </>
          }
        />
        <Route
          path='add-question/:id'
          element={
            <>
              <PageTitle breadcrumbs={usersBreadcrumbs}>Questions list</PageTitle>
              <QuestionListWrapper />
            </>
          }
        />
        <Route
          path='view-question/:id'
          element={
            <>
              <PageTitle breadcrumbs={usersBreadcrumbs}>Questions list</PageTitle>
              <QuestionViewWrapper />
            </>
          }
        />
        <Route index element={<Navigate to='/quiz/quiz' />} />
      </Route>
    </Routes>
  )
}

export default Quiz
