import axios from 'axios';
import React, { useEffect, useState } from 'react'
import DataTable from "react-data-table-component";
import 'react-responsive-modal/styles.css';
import { Modal } from 'react-responsive-modal';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import validator from 'validator'
import Select from 'react-select'
import { useNavigate } from 'react-router-dom';
import {  APIURLQUIZ } from '../../APIURL';
import { AiFillEdit } from 'react-icons/ai';
import { useSelector } from 'react-redux';

const ViewAllTransaction = () => {
  
    const [transaction,setTransaction]=useState<Array<any[]>>([])
    
    const navigate=useNavigate()
    const [permissionlist,setPermissionList]=useState<any>()
  const {staffPermission,navItem}=useSelector((state:any)=>state.reducerData)
  const filterStaffPermission=async (title:string)=>{
    let result=staffPermission.filter((item:any)=>item.permission_name===title && item)
    setPermissionList(result[0])
  }
  useEffect(()=>{
    filterStaffPermission(navItem?.item)
    },[navItem])
    const findAllTransactions=async ()=>{
         const {data}=await axios.get(`${APIURLQUIZ}/admin/get-all-transaction`)
         setTransaction(data?.data)
    }
  
    const columns = [
      {
        id: 1,
        name: "Email",
        selector: (row:any) => row.user_email,
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
        name: "Plan Name",
        selector: (row:any) => row.plan_name,
        sortable: true,
        reorder: true
      },
      
        {
            id: 3,
            name: "Payment Method",
            selector: (row:any) => row.payment_method,
            sortable: true,
            // right: true,
            reorder: true
          },
      {
        id: 4,
        name: "Amount",
        selector: (row:any) => row.amount,
        sortable: true,
        // right: true,
        reorder: true
      },
      {
        id: 5,
        name: "Currency",
        selector: (row:any) => row.currency,
        sortable: true,
        // right: true,
        reorder: true
      },
      {
          id: 6,
          name: "Payment Status",
          selector: (row:any) => row.paymentStatus,
          sortable: true,
          // right: true,
          reorder: true
        },
          {
            id: 7,
            name: "Actions",
            selector: (row:any) => <AiFillEdit style={{color:"#777ea0",fontSize:"25px"}} onClick={()=>{
              (permissionlist?.can_edit || permissionlist?.can_delete) &&  navigate(`/conference-quiz/podium/update-transaction/${row?.id}`,{state:{row}})
            }}/>,
            sortable: true,
            reorder: true
          },
    ];

  
   

  
    useEffect(()=>{
        findAllTransactions()
    },[])
    return (
      <div className="container">
          <div className="row">

          <div className="col-12 text-center d-flex" style={{justifyContent:"flex-end"}}>
           {permissionlist?.can_create &&  <button className="btn btn-primary" onClick={()=>{
                   navigate("/conference-quiz/podium/create-new-transaction")
             }}>Create New Transaction</button>}
           </div>
            
             <div className="col-12 mt-5">
              {
              permissionlist?.can_view &&  transaction?.length>0 ? <DataTable
                title=""
                columns={columns}
                data={transaction}
                defaultSortFieldId={0}
                pagination
                selectableRows
                onRowClicked={(row:any)=>{
                  // onOpenModal(row)
                }}
              /> : <div style={{width:"100%",height:"60vh",display:"flex",justifyContent:"center",alignItems:"center"}}><h2 style={{border:"2px solid black",fontSize:"20px",padding:"20px 20px",cursor:"pointer",borderRadius:"15px"}}>No Transactions Found</h2></div>
              }
             
             </div>
          </div>
      </div>
    )
      }


export default ViewAllTransaction