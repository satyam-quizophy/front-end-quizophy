import axios from 'axios';
import React, { useEffect, useState } from 'react'
import 'react-responsive-modal/styles.css';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import validator from 'validator'
import Select from 'react-select'
import { useNavigate } from 'react-router-dom';
import {  APIURLQUIZ } from '../../APIURL';
import { createNewPlan } from '../../userList/interface';
import ToastComp from '../../userList/ToastComp';

const CreateNewPlan = () => {
    const [selectCategory, setSelectCategory] = useState<string>("");
    const [createPlan,setCreatePlan]=useState<any>({
        name:"",
        description:"",
        event_per_month:"Unlimited",
        participant_per_event:null,
        monthly_price:null,
        yearly_price:null,
        support:"Email",
        logo_customization:"YES",
        custom_url:"YES",
        share_result:"YES",
        email_result:"YES",
        export_result:"YES",
        planCategory_id:1,
        popular_plan:false,
        free_plan:false,
        free_trial_count_limit:null
    })
    const [editPlan,setEditPlan]=useState<any>({})
    const [categoryOption,setCategoryOption]=useState<Array<any[]>>([])
    const [planCategoryData,setPlanCategorydata]=useState<Array<any[]>>([])
    // const [selectCategory,setSelectCategory]=useState<boolean>(false)
      const [logoCustomization,setLogoCustomization]=useState<any>({
      value: 'YES', label: 'YES'
    })
    const [exportResult,setExportResult]=useState<any>({
      value: 'YES', label: 'YES'
    })
    const [emailResult,setEmailResult]=useState<any>({
      value: 'YES', label: 'YES'
    })
    const [shareResult,setShareResult]=useState<any>({
      value: 'YES', label: 'YES'
    })
    const [customUrl,setCustomUrl]=useState<any>({
      value: 'YES', label: 'YES'
    })
    const [popularPlan,setPopularPlan]=useState<any>({
      value: 'false', label: 'false'
    })
    const [freePlan,setFreePlan]=useState<any>({
      value: 'false', label: 'false'
    })
    const navigate=useNavigate()
    const options = [
      { value: 'YES', label: 'YES' },
      { value: 'NO', label: 'NO' },
    ];

    const options2 = [
      { value: "true", label: "true" },
      { value: "false", label: "false" },
    ];


    
    const getPlanCategoryId=(name:any)=>{
      let planListArray:any[]=planCategoryData.filter((item:any)=>item?.name===name)
      setCreatePlan({...createPlan,planCategory_id:planListArray[0]?.id})
 }
  
    const getAllPlanCategoryWithPlanList=async()=>{
        const {data}=await axios.get(`${APIURLQUIZ}/admin/getSubscriptionPlanCategory`)
        if(data?.success){
          setPlanCategorydata(data?.data)
          let category=data?.categoryName.map((item:any)=> {
           return {value:item,label:item}
          })

          if(category.length>0){
            setCategoryOption(category)
          }
        }
    }
    useEffect(()=>{
       getAllPlanCategoryWithPlanList()
    },[])
  

    const submitNewPlan=async ()=>{
      // if(selectCategory==="Add-Ons"){
      //   setCreatePlan({...createPlan,name:"Add-Ons"})
      // }
        if(createPlan?.name===""){
          ToastComp({message:"Plan name should not be empty",type:"Error"})
              return false
         }else if(createPlan?.description===""){
          ToastComp({message:"Plan description should not be empty",type:"Error"})

              return false
         }
         else if(createPlan?.name!=="ONE TIME" && !createPlan?.participant_per_event){
          ToastComp({message:"Participants per event must be greater than 0",type:"Error"})
          return false 
         }
         else if(createPlan?.free_plan && !createPlan?.free_trial_count_limit){
          ToastComp({message:"Free trial count must be greater than 0",type:"Error"})
          return false
         }
          else{
            const {data}=await axios.post(`${APIURLQUIZ}/admin/createNewplan`,createPlan)
            if(data?.success){
              ToastComp({message:"New Plan created successfully",type:"Success"})
                 navigate("/conference-quiz/podium/plan-list")
            }else{
              ToastComp({message:data?.message,type:"Error"})
            }
         } 
      
    }
  

    return (
      <div className="container">
          <div className="row">
             
             <div className="col-12">
             <form className="my-5">
             <div className="row">
             <div className="col-md-4 fv-row fv-plugins-icon-container mt-3">
                                  <label className="required fs-6 fw-semibold mb-1">Select Plan Category</label>

                                  <Select options={categoryOption} placeholder="Select Plan Category"  onChange={(e:any)=>{
                                    setSelectCategory(e?.value)
                                    if(e?.value==="Add-Ons"){
                                       setCreatePlan({...createPlan,name:"Add-Ons",yearly_price:null,free_plan:false,free_trial_count_limit:null})
                                    }
                                      getPlanCategoryId(e?.value)
                                    }} />
                      <div className="fv-plugins-message-container mb-1 invalid-feedback"></div></div>
                      {
                       <div className="col-md-6 fv-row fv-plugins-icon-container mt-3">
                        <label className="required fs-6 fw-semibold mb-1">Plan Name</label>
                     
                        <input type="text" className="form_style form-control form-control-solid fw-bolder" style={{background:"#f2f2f2"}} value={createPlan?.name}  onChange={(e:any)=>{
                            setCreatePlan({...createPlan,name:e?.target?.value})
                        }} placeholder="Enter Plan Name" name="first-name"/>
            <div className="fv-plugins-message-container mb-1 invalid-feedback"></div></div>
                      }
                      
                      <div className="col-md-6 fv-row fv-plugins-icon-container mt-3">
                                  <label className="required fs-6 fw-semibold mb-1">Plan Description</label>
                               
                                  <input type="text" className="form_style form-control form-control-solid fw-bolder" style={{background:"#f2f2f2"}} value={createPlan?.description}  onChange={(e:any)=>{
                                      setCreatePlan({...createPlan,description:e?.target?.value})
                                    }} placeholder="Enter Description" name="first-name"/>
                      <div className="fv-plugins-message-container mb-1 invalid-feedback"></div></div>
                      <div className="col-md-6 fv-row fv-plugins-icon-container mt-3">
                                  <label className="required fs-6 fw-semibold mb-1">Event Per Month</label>
                               
                                  <input type="text" className="form_style form-control form-control-solid fw-bolder" style={{background:"#f2f2f2"}} value={createPlan?.event_per_month}  onChange={(e:any)=>{
                                      setCreatePlan({...createPlan,event_per_month:e?.target?.value})
                                    }} placeholder="Enter Event Per Month" name="first-name"/>
                      <div className="fv-plugins-message-container mb-1 invalid-feedback"></div></div>
                      {
                      
                        <div className="col-md-6 fv-row fv-plugins-icon-container mt-3">
                          <label className="required fs-6 fw-semibold mb-1">Participant Per Event</label>
                       
                          <input type="number" className="form_style form-control form-control-solid fw-bolder" style={{background:"#f2f2f2"}} value={createPlan?.participant_per_event?createPlan?.participant_per_event:""}  onChange={(e:any)=>{
                                      setCreatePlan({...createPlan,participant_per_event:Number(e?.target?.value)})
                                    }} placeholder="Enter Participants Per Event" name="first-name"/> 
                         
              <div className="fv-plugins-message-container mb-1 invalid-feedback"></div></div>
                      }
                      {
                        !createPlan?.free_plan &&
                       <div className="col-md-6 fv-row fv-plugins-icon-container mt-3">
                          <label className=" fs-6 fw-semibold mb-1">Month Price (INR)</label>
                       
                          <input type="number" className="form_style form-control form-control-solid fw-bolder" style={{background:"#f2f2f2"}} value={createPlan?.monthly_price ?createPlan?.monthly_price:""}  onChange={(e:any)=>{
                                      setCreatePlan({...createPlan,monthly_price:Number(e?.target?.value)})
                                    }} placeholder="Enter Monthly Price" name="first-name"/>
              <div className="fv-plugins-message-container mb-1 invalid-feedback"></div></div>
                      }
                      {
                        (selectCategory!=="Add-Ons" && !createPlan?.free_plan) &&
                    <div className="col-md-6 fv-row fv-plugins-icon-container mt-3">
                          <label className=" fs-6 fw-semibold mb-1">Yearly Price (INR)</label>
                       
                          <input type="number" className="form_style form-control form-control-solid fw-bolder" style={{background:"#f2f2f2"}} value={createPlan?.yearly_price?createPlan?.yearly_price:""}  onChange={(e:any)=>{
                                      setCreatePlan({...createPlan,yearly_price:Number(e?.target?.value)})
                                    }} placeholder="Enter Yarly Price" name="first-name"/>
              <div className="fv-plugins-message-container mb-1 invalid-feedback"></div></div>
                      }
                     <div className="col-md-4 fv-row fv-plugins-icon-container mt-3">
                                  <label className="required fs-6 fw-semibold mb-1">Support</label>
                               
                                  <input type="text" className="form_style form-control form-control-solid fw-bolder" style={{background:"#f2f2f2"}} value={createPlan?.support}  onChange={(e:any)=>{
                                      setCreatePlan({...createPlan,support:e?.target?.value})
                                    }} placeholder="Enter Support" name="first-name"/>
                      <div className="fv-plugins-message-container mb-1 invalid-feedback"></div></div>
                     
                      <div className="col-md-4 fv-row fv-plugins-icon-container mt-3">
                                  <label className="required fs-6 fw-semibold mb-1">Logo Customization</label>
                               
                                 
                                   <Select options={options}  defaultValue={logoCustomization}  onChange={(e:any)=>{
                                    setLogoCustomization(e)
                                      setCreatePlan({...createPlan,logo_customization:e?.value})
                                    }} />
                      <div className="fv-plugins-message-container mb-1 invalid-feedback"></div></div>
                      <div className="col-md-4 fv-row fv-plugins-icon-container mt-3">
                                  <label className="required fs-6 fw-semibold mb-1">Custom URL</label>
                               
                              
                                   <Select options={options}  defaultValue={customUrl}  onChange={(e:any)=>{
                                    setCustomUrl(e)
                                      setCreatePlan({...createPlan,custom_url:e?.value})
                                    }} />
                      <div className="fv-plugins-message-container mb-1 invalid-feedback"></div></div>
                      <div className="col-md-4 fv-row fv-plugins-icon-container mt-3">
                                  <label className="required fs-6 fw-semibold mb-1">Share Result</label>
                               
                                 
                                   <Select options={options}  defaultValue={shareResult}  onChange={(e:any)=>{
                                    setShareResult(e)
                                      setCreatePlan({...createPlan,share_result:e?.value})
                                    }} />
                      <div className="fv-plugins-message-container mb-1 invalid-feedback"></div></div>
                      <div className="col-md-4 fv-row fv-plugins-icon-container mt-3">
                                  <label className="required fs-6 fw-semibold mb-1">Email Result</label>
                               
                                   <Select options={options}  defaultValue={emailResult}  onChange={(e:any)=>{
                                    setEmailResult(e)
                                      setCreatePlan({...createPlan,email_result:e?.value})
                                    }} />
                      <div className="fv-plugins-message-container mb-1 invalid-feedback"></div></div>
                      <div className="col-md-4 fv-row fv-plugins-icon-container mt-3">
                                  <label className="required fs-6 fw-semibold mb-1">Export Result</label>
                               
                                   <Select options={options}  defaultValue={exportResult}  onChange={(e:any)=>{
                                       setExportResult(e)
                                      setCreatePlan({...createPlan,export_result:e?.value})
                                    }} />
                      <div className="fv-plugins-message-container mb-1 invalid-feedback"></div></div>

                       {
                        selectCategory!=="Add-Ons" &&  <div className="col-md-4 fv-row fv-plugins-icon-container mt-3">
                        <label className="required fs-6 fw-semibold mb-1">Is this your Free Plan</label>
                     
                         <Select options={options2}  defaultValue={freePlan}  onChange={(e:any)=>{
                             setFreePlan(e)
                             if(e?.value==="false"){
                              setCreatePlan({...createPlan,free_plan:e?.value==="false"?false:true,free_trial_count_limit:null})
                             }else{
                              setCreatePlan({...createPlan,free_plan:e?.value==="false"?false:true,monthly_price:null,yearly_price:null,popular_plan:false})
                             }
                          }} />
            <div className="fv-plugins-message-container mb-1 invalid-feedback"></div></div>
                       }
                     

                      <div className="col-md-4 fv-row fv-plugins-icon-container mt-3">
                                  <label className="required fs-6 fw-semibold mb-1">Is this your Popular Plan</label>
                               
                                   <Select options={options2}  defaultValue={popularPlan}  onChange={(e:any)=>{
                                       setPopularPlan(e)
                                      setCreatePlan({...createPlan,popular_plan:e?.value==="false"?false:true})
                                    }} />
                      <div className="fv-plugins-message-container mb-1 invalid-feedback"></div></div>
                      {
                        createPlan && createPlan?.free_plan &&   <div className="col-md-6 fv-row fv-plugins-icon-container mt-3">
                        <label className="required fs-6 fw-semibold mb-1">Free Trial Count Limit</label>
                     
                        <input type="number" className="form_style form-control form-control-solid fw-bolder" style={{background:"#f2f2f2"}} value={createPlan?.free_trial_count_limit}  onChange={(e:any)=>{
                            setCreatePlan({...createPlan,free_trial_count_limit:Number(e?.target?.value)})
                          }} placeholder="Enter Free Trial Limit" name="first-name"/>
            <div className="fv-plugins-message-container mb-1 invalid-feedback"></div></div>
                      }
                     
                     
                    
                     
  
                      <div className="col-12 d-flex flex-column">
              <button className="btn btn-success mt-5 text-center mx-auto" onClick={(e:any)=>{
                   e?.preventDefault()
                   submitNewPlan()
              }}>Create New Plan</button>
              
              </div>
              </div>
            
             </form>
                   
             </div>

          </div>
      </div>
    )
      }


export default CreateNewPlan