import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { useLocation, useNavigate, useParams } from 'react-router-dom'
import { APIURLAUTH, APIURLQUIZ } from '../../APIURL'
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import validator from 'validator'
import Select from 'react-select'
import ToastComp from '../../userList/ToastComp';
import { useSelector } from 'react-redux';

const CreateUpdateTransaction = () => {
    const [editTransaction,setEditTransaction]=useState<any>()
    const [upgradeTransaction,setUpgradeTransaction]=useState<any>({ value: "false", label: "false"})
    const [planType,setPlanType]=useState<any>({ value: "Monthly", label: "Monthly"})
    const [paymentMethod,setPaymentMethod]=useState<any>({value:"RazorPay",label:"RazorPay"})
    const [createTransactionData,setCreateTransactionData]=useState<any>( {
    user_email: '',
    plan_name: '',
    plan_type: 'Monthly',
    plan_player_limit: 0,
    amount: 0,
    event_per_month: 'Unlimited',
    razorpay_order_id: '',
    transaction_id: '',
    transaction_from: "",
    currency: '',
    plan_buy_date: new Date(),
    is_upgrade_plan: false,
    upgrade_date: null,
    upgrade_amount:0,
    amount_deducted_to_upgrade: 0,
    adjustable_amount: 0,
    payment_method: 'RazorPay',
    paymentStatus: '',})
    const location=useLocation()
    const params=useParams()
    const navigate=useNavigate()
    const [permissionlist,setPermissionList]=useState<any>()
    const {staffPermission,navItem}=useSelector((state:any)=>state.reducerData)
    const filterStaffPermission=async (title:string)=>{
      let result=staffPermission.filter((item:any)=>item.permission_name===title && item)
      setPermissionList(result[0])
      if(!result[0]?.can_create && !result[0]?.can_edit && !result[0]?.can_delete) navigate("/conference-quiz/podium/transaction-history")
    }
    useEffect(()=>{
      filterStaffPermission(navItem?.item)
      },[navItem])
    const options2 = [
      { value: "Monthly", label: "Monthly" },
      { value: "Yearly", label: "Yearly" },
      { value: "Adds-On", label: "Adds-On" },
      { value: "ONE TIME", label: "ONE TIME" },
    ];
    const options3 = [
      { value: "RazorPay", label: "RazorPay" },
      { value: "PayPal", label: "PayPal" },
      { value: "Stripe", label: "Stripe" },
      { value: "Braintree", label: "Braintree" },
      { value: "PayStack", label: "PayStack" },
    ];
    const options = [
      { value: "false", label: "false" },
      { value: "true", label: "true" },
    ];
    
    const findTransactionById=async()=>{
         const {data}=await axios.get(`${APIURLQUIZ}/admin/getTransactionById/${params?.id}`)
         if(data?.success){
            setEditTransaction(data?.data)
         }
    }
    useEffect(()=>{
        if(params?.id){
            findTransactionById()
        }
    },[])


    const createTransaction=async ()=>{
      if (!validator.isEmail(createTransactionData?.user_email)) {
        ToastComp({message:`Invalid Email`,type:"Error"})
        return; 
   }
    else if(createTransactionData?.plan_name?.trim()==="" || createTransactionData?.event_per_month?.trim()==="" || createTransactionData?.paymentStatus?.trim()==="" || createTransactionData?.currency?.trim()==="" || createTransactionData?.transaction_id?.trim()===""){
      ToastComp({message:`All fields are required`,type:"Error"})
      return; 
    }
    else if(createTransactionData?.plan_player_limit<=0){
      ToastComp({message:`Player limit must be greater than 0`,type:"Error"})
      return; 
    }
    else if(createTransactionData?.amount<=0){
      ToastComp({message:`Amount must be greater than 0`,type:"Error"})

      return; 
    }

    else if(createTransactionData?.payment_method==="RazorPay" && createTransactionData?.razorpay_order_id?.trim()===""){
      ToastComp({message:`RazorPay order ID can't be empty`,type:"Error"})
      return; 
    }
    else if(createTransactionData?.is_upgrade_plan && (createTransactionData?.upgrade_amount<=0 || createTransactionData?.amount_deducted_to_upgrade<=0 || createTransactionData?.adjustable_amount<=0)){
      ToastComp({message:`Please filled upgrade details`,type:"Error"})
      return;
    }
    else{
      const {data}=await axios.post(`${APIURLQUIZ}/admin/createNewTransaction`,{createTransaction:createTransactionData})
      if(data?.success){
        ToastComp({message:data?.message,type:"Success"})
            navigate("/conference-quiz/podium/transaction-history")
      }else{
        ToastComp({message:data?.message,type:"Warning"})

      }
     
    }
      
    }

    const updateTransaction=async()=>{
         
        if (!validator.isEmail(editTransaction?.user_email)) {
          ToastComp({message:`Invalid email`,type:"Error"})
            return; 
       }
        else if(editTransaction?.plan_name?.trim()==="" || editTransaction?.event_per_month?.trim()==="" || editTransaction?.paymentStatus?.trim()==="" || editTransaction?.currency?.trim()==="" || editTransaction?.transaction_id?.trim()===""){
          ToastComp({message:`Please filled required details`,type:"Error"})
          return; 
        }
        else if(editTransaction?.plan_player_limit<=0){
          ToastComp({message:`Player limit must be greater than 0`,type:"Error"})
          return; 
        }
        else if(editTransaction?.amount<=0){
          ToastComp({message:`Amount must be greater than 0`,type:"Error"})
          return; 
        }

        else if(editTransaction?.payment_method==="RazorPay" && editTransaction?.razorpay_order_id?.trim()===""){
          ToastComp({message:`RazorPay order ID can't be empty`,type:"Error"})

          return; 
        }
        else if(editTransaction?.is_upgrade_plan && (editTransaction?.upgrade_amount<=0 || editTransaction?.amount_deducted_to_upgrade<=0 || editTransaction?.adjustable_amount<=0)){
          ToastComp({message:`Please filled upgrade details`,type:"Error"})

          return;
        }

       else{
        const {data}=await axios.put(`${APIURLQUIZ}/admin/updateTransaction/${params?.id}`,{editTransaction})
        if(data?.success){
          ToastComp({message:data?.message,type:"Success"})

              navigate("/conference-quiz/podium/transaction-history")
        }else{
          ToastComp({message:data?.message,type:"Warning"})

        }
       }
    }
    const deleteTransaction=async()=>{
        const {data}=await axios.delete(`${APIURLQUIZ}/admin/deleteTransaction/${editTransaction?.id}`)
        if(data?.success){
          ToastComp({message:`Transaction deleted Successfully`,type:"Success"})
             navigate("/conference-quiz/podium/transaction-history")
        }
     }

    
  return (
    <div>
         <form className="my-5">
             <div className="row">
                      <div className="col-md-4 fv-row fv-plugins-icon-container mt-3">
                                  <label className="required fs-6 fw-semibold mb-1">User Email</label>
                                  <input required type="text" className="form_style form-control form-control-solid fw-bolder" style={{background:"#f2f2f2"}} value={editTransaction?.id ? editTransaction?.user_email : createTransactionData?.user_email}  onChange={(e:any)=>{
                                      if(editTransaction?.id){
                                        setEditTransaction({...editTransaction,user_email:e?.target?.value})
                                      }else{
                                        setCreateTransactionData({...createTransactionData,user_email:e?.target?.value})
                                      }
                                  }} placeholder="Enter User Email" name="first-name"/>
                      <div className="fv-plugins-message-container mb-1 invalid-feedback"></div></div>
                      <div className="col-md-4 fv-row fv-plugins-icon-container mt-3">
                                  <label className="required fs-6 fw-semibold mb-1">Plan Name</label>
                               
                                  <input required type="text" className="form_style form-control form-control-solid fw-bolder" style={{background:"#f2f2f2"}} value={editTransaction?.id ? editTransaction?.plan_name : createTransactionData?.plan_name} onChange={(e:any)=>{
                                     if(editTransaction?.id){
                                      setEditTransaction({...editTransaction,plan_name:e?.target?.value})
                                    }else{
                                      setCreateTransactionData({...createTransactionData,plan_name:e?.target?.value})
                                    }
                                  }} placeholder="Enter Plan Name" name="first-name"/>
                      <div className="fv-plugins-message-container mb-1 invalid-feedback"></div></div>
                      <div className="col-md-4 fv-row fv-plugins-icon-container mt-3">
                                  <label className="required fs-6 fw-semibold mb-1">Plan Type</label>
                               
                                  <Select options={options2}  defaultValue={planType}  onChange={(e:any)=>{
                                    if(e?.value!=="Yearly"){
                                      setPlanType(e)
                                      if(editTransaction?.id){
                                        setEditTransaction({...editTransaction,plan_type:e?.value,is_upgrade_plan:false,upgrade_amount:null,amount_deducted_to_upgrade:null,adjustable_amount:null,upgrade_date:null})
                                      }else{
                                        setCreateTransactionData({...createTransactionData,plan_type:e?.value,is_upgrade_plan:false,upgrade_amount:null,amount_deducted_to_upgrade:null,adjustable_amount:null,upgrade_date:null})
                                      }
                                    }else{
                                      setPlanType(e)
                                      if(editTransaction?.id){
                                        setEditTransaction({...editTransaction,plan_type:e?.value})
                                      }else{
                                        setCreateTransactionData({...createTransactionData,plan_type:e?.value})
                                      }
                                    }
                                    
                                  }} />
                        <div className="fv-plugins-message-container mb-1 invalid-feedback"></div></div>
                     
                      <div className="col-md-4 fv-row fv-plugins-icon-container mt-3">
                                  <label className="required fs-6 fw-semibold mb-1">Plan Player Limit</label>
                               
                                  <input required type="number" className="form_style form-control form-control-solid fw-bolder" style={{background:"#f2f2f2"}} value={editTransaction?.id ? editTransaction?.plan_player_limit : createTransactionData?.plan_player_limit}  onChange={(e:any)=>{
                                        if(editTransaction?.id){
                                          setEditTransaction({...editTransaction,plan_player_limit:Number(e?.target?.value)})
                                        }else{
                                          setCreateTransactionData({...createTransactionData,plan_player_limit:Number(e?.target?.value)})
                                        }
                                  }} placeholder="Enter Plan Player Limit" name="first-name"/>
                      <div className="fv-plugins-message-container mb-1 invalid-feedback"></div></div>
                      <div className="col-md-4 fv-row fv-plugins-icon-container mt-3">
                                  <label className="required fs-6 fw-semibold mb-1">Amount</label>
                               
                                  <input required type="number" className="form_style form-control form-control-solid fw-bolder" style={{background:"#f2f2f2"}}  value={editTransaction?.id ? editTransaction?.amount : createTransactionData?.amount}  onChange={(e:any)=>{
                                            if(editTransaction?.id){
                                              setEditTransaction({...editTransaction,amount:Number(e?.target?.value)})
                                            }else{
                                              setCreateTransactionData({...createTransactionData,amount:Number(e?.target?.value)})
                                            }
                                  }} placeholder="Enter Amount" name="first-name"/>
                      <div className="fv-plugins-message-container mb-1 invalid-feedback"></div></div>
                      <div className="col-md-4 fv-row fv-plugins-icon-container mt-3">
                                  <label className="required fs-6 fw-semibold mb-1">Payment Method</label>
                               
                                  <Select options={options3}  defaultValue={paymentMethod}  onChange={(e:any)=>{
                                    setPaymentMethod(e)
                                    if(e?.value!=="RazorPay"){
                                      if(editTransaction?.id){
                                        setEditTransaction({...editTransaction,payment_method:e?.value,razorpay_order_id:""})
                                      }else{
                                        setCreateTransactionData({...createTransactionData,payment_method:e?.value,razorpay_order_id:""})
                                      }
                                    }else{
                                      if(editTransaction?.id){
                                        setEditTransaction({...editTransaction,payment_method:e?.value})
                                      }else{
                                        setCreateTransactionData({...createTransactionData,payment_method:e?.value})
                                      }
                                    }
                                  }} />
                      <div className="fv-plugins-message-container mb-1 invalid-feedback"></div></div>
                      <div className="col-md-4 fv-row fv-plugins-icon-container mt-3">
                                  <label className="required fs-6 fw-semibold mb-1">Event Per Month</label>
                               
                                  <input required type="text" className="form_style form-control form-control-solid fw-bolder" style={{background:"#f2f2f2"}}  value={editTransaction?.id ? editTransaction?.event_per_month:createTransactionData?.event_per_month}  onChange={(e:any)=>{
                                            if(editTransaction?.id){
                                              setEditTransaction({...editTransaction,event_per_month:e?.target?.value})
                                            }else{
                                              setCreateTransactionData({...createTransactionData,event_per_month:e?.target?.value})
                                            }
                                  }} placeholder="Enter Event Per Month" name="first-name"/>
                      <div className="fv-plugins-message-container mb-1 invalid-feedback"></div></div>
                      <div className="col-md-4 fv-row fv-plugins-icon-container mt-3">
                                  <label className="required fs-6 fw-semibold mb-1">Payment Status</label>
                               
                                  <input required type="text" className="form_style form-control form-control-solid fw-bolder" style={{background:"#f2f2f2"}} value={editTransaction?.id ? editTransaction?.paymentStatus : createTransactionData?.paymentStatus}  onChange={(e:any)=>{
                                                if(editTransaction?.id){
                                                  setEditTransaction({...editTransaction,paymentStatus:e?.target?.value})
                                                }else{
                                                  setCreateTransactionData({...createTransactionData,paymentStatus:e?.target?.value})
                                                }    
                              }} placeholder="Enter Payment Status" name="first-name"/>
                      <div className="fv-plugins-message-container mb-1 invalid-feedback"></div></div>
                      <div className="col-md-4 fv-row fv-plugins-icon-container mt-3">
                                  <label className="required fs-6 fw-semibold mb-1">Currency</label>
                               
                                  <input required type="text" className="form_style form-control form-control-solid fw-bolder" style={{background:"#f2f2f2"}} value={editTransaction?.id ? editTransaction?.currency : createTransactionData?.currency}  onChange={(e:any)=>{
                                        if(editTransaction?.id){
                                          setEditTransaction({...editTransaction,currency:e?.target?.value})
                                        }else{
                                          setCreateTransactionData({...createTransactionData,currency:e?.target?.value})
                                        }          
                        }} placeholder="Enter Currency" name="first-name"/>
                      <div className="fv-plugins-message-container mb-1 invalid-feedback"></div></div>
                      
                      <div className="col-md-4 fv-row fv-plugins-icon-container mt-3">
                                  <label className="required fs-6 fw-semibold mb-1">Transaction ID</label>
                               
                                  <input required type="text" className="form_style form-control form-control-solid fw-bolder" style={{background:"#f2f2f2"}} value={editTransaction?.id ?editTransaction?.transaction_id:createTransactionData?.transaction_id}  onChange={(e:any)=>{
                                        if(editTransaction?.id){
                                          setEditTransaction({...editTransaction,transaction_id:e?.target?.value})
                                        }else{
                                          setCreateTransactionData({...createTransactionData,transaction_id:e?.target?.value})
                                        }         
                                 }} placeholder="Enter Transaction ID" name="first-name"/>
                      <div className="fv-plugins-message-container mb-1 invalid-feedback"></div></div>
                      <div className="col-md-4 fv-row fv-plugins-icon-container mt-3">
                                  <label className="fs-6 fw-semibold mb-1">Transaction From (Optional)</label>
                               
                                  <input required type="text" className="form_style form-control form-control-solid fw-bolder" style={{background:"#f2f2f2"}} value={editTransaction?.id ?editTransaction?.transaction_from : createTransactionData?.transaction_from}  onChange={(e:any)=>{
                                            if(editTransaction?.id){
                                              setEditTransaction({...editTransaction,transaction_from:e?.target?.value})
                                            }else{
                                              setCreateTransactionData({...createTransactionData,transaction_from:e?.target?.value})
                                            }
                                  }} placeholder="Enter Transaction From" name="first-name"/>
                      <div className="fv-plugins-message-container mb-1 invalid-feedback"></div></div>

                       {
                             editTransaction?.id ? editTransaction?.payment_method==="RazorPay" : createTransactionData?.payment_method==="RazorPay" &&  <div className="col-md-4 fv-row fv-plugins-icon-container mt-3">
                             <label className="required fs-6 fw-semibold mb-1">RazorPay Order ID</label>
                          
                             <input required type="text" className="form_style form-control form-control-solid fw-bolder" style={{background:"#f2f2f2"}} value={editTransaction?.id ?editTransaction?.razorpay_order_id:createTransactionData?.razorpay_order_id}  onChange={(e:any)=>{
                                if(editTransaction?.id){
                                  setEditTransaction({...editTransaction,razorpay_order_id:e?.target?.value})
                                }else{
                                  setCreateTransactionData({...createTransactionData,razorpay_order_id:e?.target?.value})
                                }
                             }} placeholder="Enter RazorPay Order ID" name="first-name"/>
                 <div className="fv-plugins-message-container mb-1 invalid-feedback"></div></div>
                       }

                       {
                        editTransaction?.id && editTransaction?.plan_type!=="Monthly" &&  editTransaction?.plan_type!=="ONE TIME" && editTransaction?.plan_type!=="Adds-On" &&  <div className="col-md-4 fv-row fv-plugins-icon-container mt-3">
                        <label className="required fs-6 fw-semibold mb-1">Is Upgrade Plan</label>
                     
                  
                        <Select options={options}  defaultValue={upgradeTransaction}  onChange={(e:any)=>{
                                      setUpgradeTransaction(e)
                                      if(e?.value==="false"){
                                        setEditTransaction({...editTransaction,is_upgrade_plan:false,upgrade_amount:null,amount_deducted_to_upgrade:null,adjustable_amount:null,upgrade_date:null})
                                      }else{
                                        setEditTransaction({...editTransaction,is_upgrade_plan:true,upgrade_date:new Date()})
                                      }
                          }} />
                         <div className="fv-plugins-message-container mb-1 invalid-feedback"></div></div>
                       }
                        {
                        !editTransaction?.id && createTransactionData?.plan_type!=="Monthly" &&  createTransactionData?.plan_type!=="ONE TIME" && createTransactionData?.plan_type!=="Adds-On" &&  <div className="col-md-4 fv-row fv-plugins-icon-container mt-3">
                        <label className="required fs-6 fw-semibold mb-1">Is Upgrade Plan</label>
                     
                  
                        <Select options={options}  defaultValue={upgradeTransaction}  onChange={(e:any)=>{
                                      setUpgradeTransaction(e)
                                      if(e?.value==="false"){
                                        setCreateTransactionData({...createTransactionData,is_upgrade_plan:false,upgrade_amount:null,amount_deducted_to_upgrade:null,adjustable_amount:null,upgrade_date:null})
                                      }else{
                                        setCreateTransactionData({...createTransactionData,is_upgrade_plan:true,upgrade_date:new Date()})
                                      }
                          }} />
                         <div className="fv-plugins-message-container mb-1 invalid-feedback"></div></div>
                       }
                      

                        {
                          editTransaction?.id ?editTransaction?.is_upgrade_plan:createTransactionData?.is_upgrade_plan && <>
                         <div className="col-md-4 fv-row fv-plugins-icon-container mt-3">
                        <label className="required fs-6 fw-semibold mb-1">Upgrade Amount</label>
                     
                        <input  type="number" className="form_style form-control form-control-solid fw-bolder" style={{background:"#f2f2f2"}} value={editTransaction?.id ? editTransaction?.upgrade_amount : createTransactionData?.upgrade_amount}  onChange={(e:any)=>{
                              if(editTransaction?.id){
                                setEditTransaction({...editTransaction,upgrade_amount:Number(e?.target?.value)})
                              }else{
                                setCreateTransactionData({...createTransactionData,upgrade_amount:Number(e?.target?.value)})
                              }      
                   }} placeholder="Enter Upgrade Amount" name="first-name"/>
                         <div className="fv-plugins-message-container mb-1 invalid-feedback"></div></div>
                         <div className="col-md-4 fv-row fv-plugins-icon-container mt-3">
                        <label className="required fs-6 fw-semibold mb-1">Amount Deducted To Upgrade</label>
                     
                        <input required type="number" className="form_style form-control form-control-solid fw-bolder" style={{background:"#f2f2f2"}} value={editTransaction?.id ? editTransaction?.amount_deducted_to_upgrade : createTransactionData?.amount_deducted_to_upgrade}  onChange={(e:any)=>{
                                      if(editTransaction?.id){
                                        setEditTransaction({...editTransaction,amount_deducted_to_upgrade:Number(e?.target?.value)})
                                      }else{
                                        setCreateTransactionData({...createTransactionData,amount_deducted_to_upgrade:Number(e?.target?.value)})
                                      }                       
                                    }}placeholder="Enter Amount Deducted To Upgrade Plan" name="first-name"/>
                         <div className="fv-plugins-message-container mb-1 invalid-feedback"></div></div>
                         <div className="col-md-4 fv-row fv-plugins-icon-container mt-3">
                        <label className="required fs-6 fw-semibold mb-1">Adjustable Amount</label>
                     
                        <input required type="number" className="form_style form-control form-control-solid fw-bolder" style={{background:"#f2f2f2"}} value={editTransaction?.id ? editTransaction?.adjustable_amount : createTransactionData?.adjustable_amount}  onChange={(e:any)=>{
                          if(editTransaction?.id){
                            setEditTransaction({...editTransaction,adjustable_amount:Number(e?.target?.value)})
                          }else{
                            setCreateTransactionData({...createTransactionData,adjustable_amount:Number(e?.target?.value)})
                          }
                        }} placeholder="Enter Adjustable Amount" name="first-name"/>
                         <div className="fv-plugins-message-container mb-1 invalid-feedback"></div></div>
                          </>
                        }
                       
                       
                        

                    
                     
  
                      <div className="col-12 d-flex flex-column">
                     
                             <button className="btn btn-success w-25 mt-5 text-center mx-auto" onClick={(e:any)=>{
                                e?.preventDefault()
                                if(params?.id){
                                 permissionlist?.can_edit &&  updateTransaction()
                                }else{
                                 permissionlist?.can_create && createTransaction()
                                }
                            }}>{params?.id ? "Update" : "Create"} Transaction</button>
                            {
                              params?.id  && permissionlist?.can_delete &&  <button className="btn btn-danger w-25 mt-5 text-center mx-auto" onClick={(e:any)=>{
                                e?.preventDefault()
                                deleteTransaction()
                            }}>Delete Transaction</button>
                            }
                           
                            
            
              </div>
              </div>
            
             </form>
    </div>
  )
}

export default CreateUpdateTransaction