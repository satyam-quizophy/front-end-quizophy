import {Column} from 'react-table'
import {UserInfoCell} from './UserInfoCell'
import {UserLastLoginCell} from './UserLastLoginCell'
import {UserCustomHeader} from './UserCustomHeader'
import {User} from '../../core/_models'
import {SubjectCell} from './SubjectCell'
import {Type} from './Type'
import { Marks } from './Marks'

const usersColumns: ReadonlyArray<Column<User>> = [
  {
    Header: (props) => <UserCustomHeader tableProps={props} title='ID' className='min-w-125px' />,
    accessor: 'id',
  },
  {
    Header: (props) => (
      <UserCustomHeader tableProps={props} title='Question' className='min-w-125px' />
    ),
    id: 'questions',
    Cell: ({...props}) => <UserInfoCell user={props.data[props.row.index]} />,
  },
  {
    Header: (props) => (
      <UserCustomHeader tableProps={props} title='Subject' className='min-w-125px' />
    ),
    id: 'subject',
    Cell: ({...props}) => <SubjectCell subject_id={props.data[props.row.index].subject_id} />,
  },
  {
    Header: (props) => <UserCustomHeader tableProps={props} title='Type' className='min-w-125px' />,
    id: 'question_type',
    Cell: ({...props}) => <Type question_type={props.data[props.row.index].question_type} />,
  },
  {
    Header: (props) => (
      <UserCustomHeader tableProps={props} title='Level' className='min-w-125px' />
    ),
    id: 'level',
    Cell: ({...props}) => <UserLastLoginCell level={props.data[props.row.index].level} />,
  },
  {
    Header: (props) => (
      <UserCustomHeader tableProps={props} title='Marks' className='min-w-125px' />
    ),
    id: 'marks',
    Cell: ({...props}) => <Marks marks={props.data[props.row.index].marks} />,
  },
]

export {usersColumns}
