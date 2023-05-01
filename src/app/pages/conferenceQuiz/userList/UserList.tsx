import axios from 'axios';
import React, { useEffect, useMemo, useState } from 'react'
import DataTable from "react-data-table-component";
import "./css/index.css"
import 'react-responsive-modal/styles.css';
import { Modal } from 'react-responsive-modal';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import validator from 'validator'
import 'react-phone-number-input/style.css'
import PhoneInput, { formatPhoneNumber, formatPhoneNumberIntl, isValidPhoneNumber } from 'react-phone-number-input'
import ReactCountryFlag from "react-country-flag"
import Select from 'react-select'
import countryList from 'react-select-country-list'
import { useNavigate } from 'react-router-dom';
import { APIURLAUTH } from '../APIURL';
import { AiFillEdit } from 'react-icons/ai';
import ToastComp from './ToastComp';
const UserList = () => {
  const [open, setOpen] = useState(false);
  const [editUser,setEditUser]=useState<any>({})
  const [validNumber,setValidNumber]=useState<any>(false)

  const [user,setUser]=useState<Array<any[]>>([])

  const navigate=useNavigate()
  const options = useMemo(() => countryList().getData(), [])
  

  const onOpenModal = (row:any) => {
    setEditUser({...row})
    setOpen(true)
  };
  const onCloseModal = () => {
    findAllUser()
    setOpen(false)
  };
  const findAllUser=async ()=>{
       const {data}=await axios.get(`${APIURLAUTH}/admin/get-all-users`)
       setUser(data?.data)
  }

  const columns = [
    {
      id: 1,
      name: "First Name",
      selector: (row:any) => row.first_name,
      sortable: true,
      reorder: true
    },
    {
        id: 2,
        name: "Last Name",
        selector: (row:any) => row.last_name,
        sortable: true,
        reorder: true
      },
    {
      id: 3,
      name: "Email",
      selector: (row:any) => row.email,
      sortable: true,
      reorder: true
    },
    {
      id: 4,
      name: "Phone Number",
      selector: (row:any) => row.phone_number,
      sortable: true,
      reorder: true
    },
    {
      id: 5,
      name: "Actions",
      selector: (row:any) => <AiFillEdit style={{color:"#777ea0",fontSize:"25px"}} onClick={()=>{
          onOpenModal(row)
      }}/>,
      sortable: true,
      reorder: true
    },
    // {
    //   id: 6,
    //   name: "Country Code",
    //   selector: (row:any) => row.countryCode,
    //   sortable: true,
    //   // right: true,
    //   reorder: true
    // }
  ];

  const checkValidation=async()=>{
    if(editUser?.first_name.trim().length<3){
      ToastComp({message:"First name cannot be less than 3 characters",type:"Error"})
      return false
    } 
    else if(editUser?.last_name.trim().length<3){
      ToastComp({message:"Last name cannot be less than 3 characters",type:"Error"})
      return false
    }  

    else if(!isValidPhoneNumber(editUser?.phone_number)){
      ToastComp({message:"Invalid mobile number",type:"Error"})
      return; 
     }
     else if (!validator.isEmail(editUser?.email)) {
      ToastComp({message:"Invalid Email",type:"Error"})

      return; 
        }

      else{
          const {data}=await axios.put(`${APIURLAUTH}/admin/${editUser?.id}`,{data:editUser})
          if(data?.success){
            ToastComp({message:"User Updated Successfully",type:"Success"})
              onCloseModal()
          }
      }


  }

  const deleteUser=async ()=>{
    const {data}=await axios.delete(`${APIURLAUTH}/admin/${editUser?.id}`)
     if(data?.success){
      ToastComp({message:"User Deleted Successfully",type:"Success"})
        onCloseModal()
     }
  }

  useEffect(()=>{
     findAllUser()
  },[])
  return (
    <div className="container">
        <div className="row">
           <div className="col-12 text-center d-flex" style={{justifyContent:"flex-end"}}>
             <button className="btn btn-primary" onClick={()=>{
                   navigate("/conference-quiz/user/create-new-user")
             }}>Create New User</button>
           </div>
           <div className="col-12 mt-5">
           {
            user?.length>0 ? <DataTable
                  title=""
                  columns={columns}
                  data={user}
                  defaultSortFieldId={0}
                  pagination
                  selectableRows
                  onRowClicked={(row:any)=>{
                    // onOpenModal(row)
                  }}
                /> : <div style={{width:"100%",height:"60vh",display:"flex",justifyContent:"center",alignItems:"center"}}><h2 style={{border:"2px solid black",fontSize:"20px",padding:"20px 20px",cursor:"pointer",borderRadius:"15px"}}>No User Found</h2></div>
         }
           </div>

           {
        open &&  <Modal open={open} onClose={onCloseModal} center>
          <h2 className="my-5 text-center">Update User</h2>
                          <form className="my-5">
          <div className="row">
          <div className="col-md-4 fv-row fv-plugins-icon-container mt-3">
                                <label className="required fs-6 fw-semibold mb-1">First Name</label>
                             
                                <input type="text" className="form_style form-control form-control-solid fw-bolder" style={{background:"#f2f2f2"}} value={editUser?.first_name}  onChange={(e:any)=>{
                                   setEditUser({...editUser,first_name:e?.target?.value})
                                }} placeholder="" name="first-name"/>
            <div className="fv-plugins-message-container mb-1 invalid-feedback"></div></div>
            <div className="col-md-4 fv-row fv-plugins-icon-container mt-3">
                                <label className="required fs-6 fw-semibold mb-1">Last Name</label>
                             
                                <input type="text" className="form_style form-control form-control-solid fw-bolder" value={editUser?.last_name} style={{background:"#f2f2f2"}} onChange={(e:any)=>{
                                   setEditUser({...editUser,last_name:e?.target?.value})
                                }}  placeholder="" name="first-name"/>
            <div className="fv-plugins-message-container mb-1 invalid-feedback"></div></div>
            <div className="col-md-4 fv-row fv-plugins-icon-container mt-3">
                                <label className="required fs-6 fw-semibold mb-1">Email</label>
                             
                                <input type="text" className="form_style form-control form-control-solid fw-bolder" value={editUser?.email} style={{background:"#f2f2f2"}} onChange={(e:any)=>{
                                  setEditUser({...editUser,email:e?.target?.value})
                                }}  placeholder="" name="first-name"/>
            <div className="fv-plugins-message-container mb-1 invalid-feedback"></div></div>
            <div className="col-md-4 fv-row fv-plugins-icon-container mt-3">
                                <label className="required fs-6 fw-semibold mb-1">Phone Number</label>
                             
                                {/* <input type="text" className="form_style form-control form-control-solid fw-bolder" value={editUser?.phone_number} style={{background:"#f2f2f2"}} onChange={(e:any)=>{
                                   setEditUser({...editUser,phone_number:e?.target?.value})
                                }}  placeholder="" name="first-name"/> */}

      <PhoneInput
      className="form_style form-control form-control-solid fw-bolder" 
        style={{border:"none",outline:"none",background:"#f2f2f2"}}
        countryCallingCodeEditable={true}
        initialValueFormat="national"
        value={editUser?.phone_number}
        defaultCountry={editUser?.countryCode}
            placeholder="Enter phone number"
            onChange={(e:any)=>{             
              setEditUser({...editUser,phone_number:e}) 
              setValidNumber(e && e?.length>0 && isValidPhoneNumber(e))
            }}
            error={editUser?.phone_number ? (isValidPhoneNumber(editUser?.phone_number) ? undefined : 'Invalid phone number') : 'Phone number required'}/>
            <div className="fv-plugins-message-container mb-1 invalid-feedback"></div></div>

            <div className="col-md-4 fv-row fv-plugins-icon-container mt-3">
                                <label className="fs-6 fw-semibold mb-1">Custom URL</label>
                             
                                <input type="text" className="form_style form-control form-control-solid fw-bolder" value={editUser?.customUrl} style={{background:"#f2f2f2"}} onChange={(e:any)=>{
                                  setEditUser({...editUser,customUrl:e?.target?.value})
                                }}  placeholder="Enter Custom URL" name="first-name"/>
            <div className="fv-plugins-message-container mb-1 invalid-feedback"></div></div>
           
            <div className="col-12 d-flex flex-column">
            <button className="btn btn-success w-25 mt-5 text-center mx-auto" onClick={(e:any)=>{
                 e?.preventDefault()
                 checkValidation()
            }}>Update User</button>
             <button className="btn btn-danger w-25 mt-5 text-center mx-auto" onClick={(e:any)=>{
                 e?.preventDefault()
                 deleteUser()
                //  checkValidation()
            }}>Delete User</button>
            </div>
           
          </div>
          
        </form>
                        </Modal>
        }
        </div>
    </div>
  )
}

export default UserList