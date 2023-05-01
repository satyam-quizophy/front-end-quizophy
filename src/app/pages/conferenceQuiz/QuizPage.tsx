import {Navigate, Outlet, Route, Routes} from 'react-router-dom'
import {PageLink, PageTitle} from '../../../_metronic/layout/core'
import {Create} from './createQuiz/Create'
import {CreateQuiz} from './createQuiz/CreateQuiz'
import {EditPage} from './editQuiz/EditPage'
import {GameSummaryPage} from './game-summary/GameSummaryPage'
import {GamePage} from './game/GamePage'
import {GameOverPage} from './gameover/GameOverPage'
import {GameStartPage} from './gameStart/GameStartPage'
import {LobbyPage} from './lobby/LobbyPage'
import CreateNewPlan from './podiumPlanList/createNewPlan/CreateNewPlan'
import {ReportsPage} from './reports/UsersList'
import {SelectMode} from './selectMode/SelectMode'
import {SummaryPage} from './summary/SummaryPage'
import CreateUser from './userList/createUser/CreateUser'
import UserList from './userList/UserList'
import PlanList from './podiumPlanList/viewPlanList/PlanList'
import ViewAllTransaction from './transactionHistory/ViewTransactions/ViewAllTransaction'
import TemplateList from './template/viewTemplate/TemplateList'
import CreateTemplate from './template/createTemplate/CreateTemplate'
import EditTemplate from './template/editTemplate/EditTemplate'
import OneTimeSetting from './oneTimeSetting/OneTimeSetting'
import OneTimeMoreInfo from './oneTimeSetting/oneTimeMoreInfo/OneTimeMoreInfo'
import CreateUpdateTransaction from './transactionHistory/createUpdateTransaction/CreateUpdateTransaction'
import { PermissionsListWrapper } from '../permissions/users-list/PermissionList'
import { UsersListWrapper } from '../user-management/users-list/UsersList'
import FAQs from './podiumFAQs/FAQs'
import Testimonial from './testimonials/Testimonial'
import PodiumFeatures from './podiumWorking/PodiumFeatures'
import PathMiddleWare from '../middleware/PathMiddleWare'
const usersBreadcrumbs: Array<PageLink> = [
  {
    title: 'Conference Quiz',
    path: '/conference-quiz/list',
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

const BookPage = () => {
  return (
    <>
      <Routes>
        <Route element={<Outlet />}>
          {/* <Route
            path='list'
            element={
              <>
                <PageTitle breadcrumbs={usersBreadcrumbs}>Conference Quiz list</PageTitle>
                <UsersListWrapper />
              </>
            }
          />
          <Route
            path='create'
            element={
              <>
                <PageTitle breadcrumbs={usersBreadcrumbs}>Create a Conference Quiz</PageTitle>
                <CreateQuiz />
              </>
            }
          />
          <Route
            path=':id'
            element={
              <>
                <PageTitle breadcrumbs={usersBreadcrumbs}>Select Quiz Mode</PageTitle>
                <SelectMode />
              </>
            }
          /> */}
          <Route
            path='user'
            element={
              <>
                <PageTitle breadcrumbs={usersBreadcrumbs}>User List</PageTitle>
                <PathMiddleWare><UserList /></PathMiddleWare>
                {/* <UsersListWrapper/> */}
              </>
            }
          />
          <Route
            path='user/create-new-user'
            element={
              <>
                <PageTitle breadcrumbs={usersBreadcrumbs}>Create New User</PageTitle>
                <CreateUser />
              </>
            }
          />
          <Route
            path='podium/plan-list'
            element={
              <>
                <PageTitle breadcrumbs={usersBreadcrumbs}>Podium Plan list</PageTitle>
                <PathMiddleWare><PlanList/></PathMiddleWare>
              </>
            }
          />
          <Route
            path='podium/create-new-plan'
            element={
              <>
                <PageTitle breadcrumbs={usersBreadcrumbs}>Create New Plan</PageTitle>
                <CreateNewPlan />
              </>
            }
          />
           <Route
            path='podium/transaction-history'
            element={
              <>
                <PageTitle breadcrumbs={usersBreadcrumbs}>Transaction History</PageTitle>
                <PathMiddleWare><ViewAllTransaction /></PathMiddleWare>
              </>
            }
          />
          <Route
            path='podium/create-new-transaction'
            element={
              <>
                <PageTitle breadcrumbs={usersBreadcrumbs}>Create Transaction</PageTitle>
                <CreateUpdateTransaction />
              </>
            }
          />
           <Route
            path='podium/update-transaction/:id'
            element={
              <>
                <PageTitle breadcrumbs={usersBreadcrumbs}>Update Transaction</PageTitle>
                <CreateUpdateTransaction />
              </>
            }
          />
          <Route
            path='podium/template'
            element={
              <>
                <PageTitle breadcrumbs={usersBreadcrumbs}>Template</PageTitle>
                <PathMiddleWare><TemplateList /></PathMiddleWare>
              </>
            }
          />
          <Route
            path='podium/create-new-template'
            element={
              <>
                <PageTitle breadcrumbs={usersBreadcrumbs}>Create New Template</PageTitle>
                <CreateTemplate />
              </>
            }
          />
          <Route
            path='podium/edit-template/:id'
            element={
              <>
                <PageTitle breadcrumbs={usersBreadcrumbs}>Edit Template</PageTitle>
                <EditTemplate />
              </>
            }
          />
           <Route
            path='podium/one-time/setting'
            element={
              <>
                <PageTitle breadcrumbs={usersBreadcrumbs}>One Time Setting</PageTitle>
               <PathMiddleWare><OneTimeSetting /></PathMiddleWare> 
              </>
            }
          />
           <Route
            path='podium/one-time/moreInfo/:id'
            element={
              <>
                <PageTitle breadcrumbs={usersBreadcrumbs}>One Time Info</PageTitle>
                <OneTimeMoreInfo />
              </>
            }
          />
          <Route
            path='podium/FAQs'
            element={
              <>
                <PageTitle breadcrumbs={usersBreadcrumbs}>Podium FAQs</PageTitle>
                <PathMiddleWare><FAQs /></PathMiddleWare>
              </>
            }
          />
           <Route
            path='podium/testimonials'
            element={
              <>
                <PageTitle breadcrumbs={usersBreadcrumbs}>Podium Testimonials</PageTitle>
              <PathMiddleWare> <Testimonial /></PathMiddleWare> 
              </>
            }
          />
          <Route
            path='podium/working'
            element={
              <>
                <PageTitle breadcrumbs={usersBreadcrumbs}>Podium Working</PageTitle>
               <PathMiddleWare><PodiumFeatures /></PathMiddleWare> 
              </>
            }
          />
          {/* <Route
            path='lobby'
            element={
              <>
                <PageTitle breadcrumbs={usersBreadcrumbs}>Quiz Lobby</PageTitle>
                <LobbyPage />
              </>
            }
          />
          <Route
            path='game'
            element={
              <>
                <PageTitle breadcrumbs={usersBreadcrumbs}>Game Loading</PageTitle>
                <GamePage />
              </>
            }
          />
          <Route
            path='game-start'
            element={
              <>
                <PageTitle breadcrumbs={usersBreadcrumbs}>Game Start</PageTitle>
                <GameStartPage />
              </>
            }
          />
          <Route
            path='game-over'
            element={
              <>
                <PageTitle breadcrumbs={usersBreadcrumbs}>Game Over</PageTitle>
                <GameOverPage />
              </>
            }
          />
          <Route
            path='game-summary'
            element={
              <>
                <PageTitle breadcrumbs={usersBreadcrumbs}>Game Over</PageTitle>
                <GameSummaryPage />
              </>
            }
          />
          <Route
            path='reports/:id'
            element={
              <>
                <PageTitle breadcrumbs={usersBreadcrumbs}>Reports Page</PageTitle>
                <ReportsPage />
              </>
            }
          />
          <Route
            path='summary/:id'
            element={
              <>
                <PageTitle breadcrumbs={usersBreadcrumbs}>Summary Page</PageTitle>
                <SummaryPage />
              </>
            }
          />
          <Route
            path='edit/:id'
            element={
              <>
                <PageTitle breadcrumbs={usersBreadcrumbs}>Edit Page</PageTitle>
                <EditPage />
              </>
            }
          /> */}
          <Route index element={<Navigate to='/conference-quiz/list' />} />
        </Route>
      </Routes>
    </>
  )
}

export default BookPage
