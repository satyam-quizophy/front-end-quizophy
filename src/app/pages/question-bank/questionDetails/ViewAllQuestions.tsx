import axios from 'axios';
import React, { useEffect, useState } from 'react'
import DataTable from "react-data-table-component";
import 'react-responsive-modal/styles.css';
import { Modal } from 'react-responsive-modal';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import validator from 'validator'
import Select from 'react-select'
import { useNavigate, useParams } from 'react-router-dom';
import { AiFillEdit } from 'react-icons/ai';
import { useSelector } from 'react-redux';
import { deleteQuestionDetailsUsingId, getUserById } from '../users-list/core/_requests';
import Switch from '@mui/material/Switch';
import { useCommonData } from '../users-list/commonData/CommonDataProvider'
import { MdDeleteOutline } from 'react-icons/md';
import { successMessage } from '../../../modules/auth/components/ToastComp';
const label = { inputProps: { 'aria-label': 'Switch demo' } };

const ViewAllQuestions = () => {
   const [questionBankDetails,setQuestionDetails]=useState<Array<any[]>>([])
   const [data,setData]=useState<any>()
   const {id}=useParams()
   const navigate=useNavigate()
    
   const getAllQuestions=async ()=>{
    const data=await getUserById(Number(id))
    setData(data)
    setQuestionDetails(data?.questions)
   }
   useEffect(()=>{
    getAllQuestions()
   },[])
   const deleteQuestionDetails=async (id:number)=>{
         const data=await deleteQuestionDetailsUsingId(id)
         successMessage(data.data.msg)
         getAllQuestions()
   }
    const columns = [
      {
        id: 1,
        name: "Q.ID",
        selector: (row:any) => row.id,
        sortable: true,
        reorder: true
      },
      // {
      //     id: 2,
      //     name: "Mobile Number",
      //     selector: (row:any) => row.user_mobile,
      //     sortable: true,
      //     reorder: true
      //   },
      {
        id: 2,
        name: "Language",
        selector: (row:any) => <p className="text-primary">{row.language}</p>,
        sortable: true,
        reorder: true
      },
      {
        id: 3,
        name: "Questions",
        selector: (row:any) => row.question.replace( /(<([^>]+)>)/ig, ''),
        sortable: true,
        reorder: true
      },
      
        {
            id: 4,
            name: "Added date",
            selector: (row:any) => row.createdAt,
            sortable: true,
            // right: true,
            reorder: true
          },
      {
        id: 5,
        name: "Verified",
        selector: (row:any) => <p className={`${row?.verified?.is_verified===1?"text-success fw-bolder":"text-danger fw-bolder"}`} >{row?.verified?.is_verified===1?"true":"false"}</p>,
        sortable: true,
        // right: true,
        reorder: true
      },
      {
        id: 6,
        name: "Verified By",
        selector: (row:any) => <p className={`${row?.verified?.verified_by ? "text-primary fw-bolder" :"text-warning fw-bolder"}`}>{row?.verified?.verified_by ? row?.verified?.verified_by :"Not Verified Yet"}</p>,
        sortable: true,
        // right: true,
        reorder: true
      },
      {
          id: 7,
          name: "Status",
            selector: (row:any) =>  <Switch {...label} checked={row.status===1 ? true : false} onChange={(e:any)=>{
            }}/>,
            sortable: true,
            reorder: true
        },
          {
            id: 8,
            name: "Actions",
            selector: (row:any) => <div>
            <AiFillEdit  className="cursor-pointer mx-2" style={{color:"#777ea0",fontSize:"25px"}} onClick={()=>{
              // (permissionlist?.can_edit || permissionlist?.can_delete) &&  navigate(`/conference-quiz/podium/update-transaction/${row?.id}`,{state:{row}})
              navigate(`/questions/edit-details/${data?.id}/${row.id}`)
            }}/>
             <MdDeleteOutline  className="cursor-pointer mx-2" style={{color:"red",fontSize:"25px"}} onClick={()=>{
                    deleteQuestionDetails(row.id)         
               }}/>
            </div>,
            sortable: true,
            reorder: true
          },
    ];

  

    return (
      <div className="container">
          <div className="row">

          <div className="col-12 text-center d-flex" style={{justifyContent:"flex-end"}}>
        
           <button className="btn btn-primary mx-3" onClick={()=>{
                   navigate("/questions/edit-details",{state:{data:{...data}}})
             }}>Add More Questions</button>
           </div>
            
             <div className="col-12 mt-5">
               <DataTable
                title=""
                columns={columns}
                data={questionBankDetails}
                defaultSortFieldId={0}
                pagination
                selectableRows
                onRowClicked={(row:any)=>{
                  // onOpenModal(row)
                }}
              /> 
             
             </div>
          </div>
      </div>
    )
      }


export default ViewAllQuestions