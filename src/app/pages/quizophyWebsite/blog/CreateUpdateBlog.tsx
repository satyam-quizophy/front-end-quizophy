import React, { useEffect, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import axios, { AxiosResponse } from 'axios';
import { QUIZOPHY_WEBSITE_API_URL } from '../ApiUrl';
import Dropzone from 'react-dropzone';
import { APIURLQUIZ } from '../../conferenceQuiz/APIURL';
import { toast } from 'react-toastify';
import Switch from '@mui/material/Switch';
import ToatComp from './ToatComp';
import { useAuth } from '../../../modules/auth';
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';
import "../blog/index.css"
import { MdOutlineAdd } from 'react-icons/md';
import 'react-responsive-modal/styles.css';
import { Modal } from 'react-responsive-modal';
import { API_URL } from '../../settings/components/ApiUrl';
const label = { inputProps: { 'aria-label': 'Switch demo' } };
const CreateUpdateBlog = () => {
    const navigate=useNavigate()
    const [editBlog,setEditBlog]=useState<any>()
    const {currentUser}=useAuth()
    const [blogSlug,setBlogSlug]=useState<any>()
    const [value,setValue]=useState<any>()
    const [createNewCategory,setCreateNewcategory]=useState<boolean>(false)
    const [createBlog,setCreateBlog]=useState<any>({
        title:"",
        description:"",
        image:"",
        auther:currentUser?.first_name+" "+currentUser?.last_name,
        date_time:new Date(),
        category:""
    })
    const [blogCategory,setBlogCategory]=useState<any>()
	const getAllBlogCategory=async ()=>{
         const {data}=  await axios.get(`${API_URL}/option/website_blog_category`)
		 setBlogCategory(data)
	}
	useEffect(()=>{
         getAllBlogCategory()
	},[])
    const [blogImage,setblogImage]=useState<any>()
    const params=useParams()

    const modules = {
        toolbar: [
            [{header:[1,2,3,4,5,6,false]     
            }],
          [{size: []}],
          ['bold', 'italic', 'underline', 'strike', 'blockquote'],
          [{'list': 'ordered'}, {'list': 'bullet'}, 
           {'indent': '-1'}, {'indent': '+1'}],
          ['link', 'image', 'video'],
          ['clean']
        ],
    }

const createNewBlog=async ()=>{
       if(createBlog?.title?.trim()===""){
        ToatComp({message:"Please Enter Blog Title",type:"Error"})
       }else if(value?.trim()==="" || !value?.trim()){
        ToatComp({message:"Please Enter Blog Description",type:"Error"})
       }else if(blogImage?.trim()==="" || !blogImage){
        ToatComp({message:"Please Enter Blog Image",type:"Error"})
       }
      else{
        const {data}=await axios.post(`${QUIZOPHY_WEBSITE_API_URL}/blog/add`,{...createBlog,author:currentUser?.first_name+" "+currentUser?.last_name,image:blogImage,slug:blogSlug,description:value})
         if(data?.success){
            ToatComp({message:data?.message,type:"Success"})
            navigate("/quizophy-website/blog")
         }
       }
    }
    const updateBlogData=async ()=>{
       if(editBlog?.title?.trim()===""){
        ToatComp({message:"Please Enter Blog Title",type:"Error"})
       }else if(value?.trim()==="" || !value?.trim()){
        ToatComp({message:"Please Enter Blog Description",type:"Error"})
       }else if(blogImage?.trim()===""){
        ToatComp({message:"Please Enter Blog Image",type:"Error"})
       }
       else{
        const {data}=await axios.put(`${QUIZOPHY_WEBSITE_API_URL}/blog/${params?.id}`,{...editBlog,image:blogImage,author:currentUser?.first_name+" "+currentUser?.last_name,slug:blogSlug,description:value})
         if(data?.success){
            if(createNewCategory){
                saveBlogCategory()
            }
            navigate("/quizophy-website/blog")
            ToatComp({message:data?.message,type:"Success"})
         }
       }
    }
   const getBlogById=async ()=>{
       const {data}=await axios.get(`${QUIZOPHY_WEBSITE_API_URL}/blog/admin/${params.id}`)
       if(data?.success){
        setblogImage(data?.data?.image)
        setBlogSlug(data?.data?.slug)
        setValue(data?.data?.description)
        setEditBlog(data?.data)
       }
   }
  useEffect(()=>{
    if(params?.id){
        getBlogById()
    }
  },[])

  const saveBlogCategory=async ()=>{
    const {data}= await axios.put(`${API_URL}/option/${blogCategory?.name}`,{value:editBlog?.id?editBlog?.category:createBlog?.category})
    if(data?.success){
        setCreateNewcategory(false)
        getAllBlogCategory()
        ToatComp({message:data?.message,type:"Success"})
    }else{
        ToatComp({message:data?.message,type:"Error"})
    }
  }
  const uploadImage = async (file: any) => {
    const fd = new FormData()
    if(Math.ceil( ( (file[0].size * 8) / 8) / 1000 )>1024){
        ToatComp({message:"Image is of un-expected size (size must be less than 1MB)",type:"Warning"})
       
       return 
      }
      let newArr=file[0]?.type?.split("/")
     if(newArr[0]==="audio" || newArr[0]==="video" || newArr[1]==="mpeg" || newArr[1]==="mkv" || newArr[1]==="x-matroska" || newArr[1]==="mp4" || newArr[1]==="mp3"){
        ToatComp({message:"Only image supported",type:"Error"})
        return
     }
      else{
        if(file[0]){
            fd.append('image', file[0])
        }
        await axios
        .post(`${APIURLQUIZ}/admin/upload-testimonial-image`, fd)
          .then((data: AxiosResponse<any>) => {
              if(data?.data?.success){
                setblogImage(data?.data?.image)
              }
          })
          .catch((err) => {
            console.log(err, 'err')
          })
      }
  }
  return (
    <>
              <div className="container" style={{marginTop:"30px",marginBottom:"40px"}}>
            <div className="row">
              <div className="col-12">
                 <div className="row">
                   <div className="col-12">
                         <div className="row my-5">
                            <div className="col-6" >
                               <div className="p-5" style={{boxShadow: "rgba(0, 0, 0, 0.24) 0px 3px 8px"}}>
                               <div className="col-md-12 fv-row fv-plugins-icon-container mt-3">
                                <label className="required fs-6 fw-semibold text-primary">Blog Title</label>
                             
                                <input className="form_style form-control form-control-solid fw-bolder" style={{background:"#f2f2f2"}} value={editBlog?.id ? editBlog?.title :createBlog?.title}  onChange={(e:any)=>{
                                    if(editBlog?.id){
                                        setEditBlog({...editBlog,title:e?.target?.value})
                                        const noSpecialChars = e?.target?.value?.replace(/[^a-zA-Z ]/g, '');
                                        var newStr = noSpecialChars.replace(/  +/g, ' ');
                                        newStr=newStr?.trim()
                                            let splitArr=newStr?.split(" ")
                                            setBlogSlug(splitArr?.join("-")?.toLowerCase())                                       
                                    }else{
                                        setCreateBlog({...createBlog,title:e?.target?.value})
                                        const noSpecialChars = e?.target?.value?.replace(/[^a-zA-Z ]/g, '');
                                        var newStr = noSpecialChars.replace(/  +/g, ' ');
                                        newStr=newStr?.trim()
                                            let splitArr=newStr?.split(" ")
                                            setBlogSlug(splitArr?.join("-")?.toLowerCase())                                       
                                    }
                                }} placeholder="Enter Blog Title" name="first-name"/>
            <div className="fv-plugins-message-container mb-1 invalid-feedback"></div></div>
            <div className="col-md-12 fv-row fv-plugins-icon-container mt-3">
                                <label className="required fs-6 fw-semibold text-primary">Blog Slug</label>
                             
                                <input className="form_style form-control form-control-solid fw-bolder" style={{background:"#f2f2f2"}} disabled value={blogSlug} onChange={()=>{}} placeholder="Your Blog Slug" name="first-name"/>
            <div className="fv-plugins-message-container mb-1 invalid-feedback"></div></div>
         
            
              <div className="col-md-12 fv-row fv-plugins-icon-container mt-3 d-flex">
                {
                    !createNewCategory && <div>
                    <label className="required fs-6 fw-semibold text-primary mb-3">Select Blog Category</label>
                    <div className="d-flex align-items-center" style={{width:"300px"}}>
                    <select className="form_style form-select form-control w-100 p-2" value={editBlog?.id ? editBlog?.category:createBlog?.category} onChange={(e:any)=>{
                                        if(editBlog?.id){
                                            setEditBlog({...editBlog,category:e?.target?.value})
                                        }else{
                                            setCreateBlog({...createBlog,category:e?.target?.value})
                                        }
                                 }}>
                        {
                            blogCategory?.value?.length>0 && blogCategory?.value?.map((item:any,index:number)=>{
                                 return <option key={index}>{item}</option>
                            })
                        }

                    </select> 
                    <p className=" mx-3 my-2 bg-success text-white p-1" style={{borderRadius:"10px",cursor:"pointer"}} onClick={(e:any)=>{
                            e?.preventDefault()
                             if(editBlog?.id){
                            setEditBlog({...editBlog,category:""})
                           }else{
                            setCreateBlog({...createBlog,category:""})
                           }
                           setCreateNewcategory(true)
                          
                     }}><MdOutlineAdd style={{fontSize:"23px"}}/></p>
                    </div>
                    </div>
                }
                
                {/* <div>
                    {
                        !createNewCategory && <button className=" btn btn-sm my-3 btn-primary mb-3" onClick={(e:any)=>{
                            e?.preventDefault()
                             if(editBlog?.id){
                            setEditBlog({...editBlog,category:""})
                           }else{
                            setCreateBlog({...createBlog,category:""})
                           }
                           setCreateNewcategory(true)
                          
                     }}>Create New category</button>
                    }
                      {
                        createNewCategory && <button className=" btn btn-sm my-3 btn-primary mb-3" onClick={(e:any)=>{
                            e?.preventDefault()
                            saveBlogCategory()
                          
                     }}>Save Category</button>
                    }
                    {
                       createNewCategory && <input className="form_style form-control form-control-solid fw-bolder" style={{background:"#f2f2f2"}} value={editBlog?.id ? editBlog?.category:createBlog?.category} onChange={(e:any)=>{
                        if(editBlog?.id){
                            setEditBlog({...editBlog,category:e?.target?.value})
                           }else{
                            setCreateBlog({...createBlog,category:e?.target?.value})
                           }
                       }} placeholder="Create Blog Category" name="first-name"/>

                    }
                     

                    </div> */}
<div className="fv-plugins-message-container mb-1 invalid-feedback"></div></div>
            
            
                               </div>
                            </div>
                            <div className="col-6">
                                 <div className="py-5" style={{boxShadow: "rgba(0, 0, 0, 0.24) 0px 3px 8px",}}>
                                 <h2 className="text-center">Upload Blog Image</h2>

                                 <div className="p-5 mt-5 bg-white mx-auto shadow text-center" style={{height: 150,width: 350}}>
                                 {blogImage ? <>
                            <img src={blogImage} style={{ height: 130, width: 270 }} />
                    
                                <button
                                  className='btn btn-icon btn-circle btn-active-color-primary w-25px h-25px bg-body shadow'
                                  data-kt-image-input-action='remove'
                                  data-bs-toggle='tooltip'
                                  title='Remove avatar'
                                  type='button'
                                  onClick={() => {
                                    setblogImage("")
                                  }}
                                >
                                  <i className='bi bi-x fs-2'></i>
                                </button>
                                </>
                            : (
                              <Dropzone onDrop={(acceptedFiles) => {
                                uploadImage(acceptedFiles)
                              }}>
                                {({ getRootProps, getInputProps }) => (
                                  <section className='row'>
                                    <div className='col-sm-12' {...getRootProps()}>
                                      <i className='fas fa-plus-square fa-3x mt-11 text-primary'></i>
                                      <div className='' style={{ fontSize: 13 }}>
                                        Upload Blog Image
                                      </div>
                                      <input accept=".jpg, .png, .jpeg" {...getInputProps()} />
                                    </div>
                                  </section>
                                )}
                              </Dropzone>
                            )}
                                    </div>
                                    {
                                        editBlog?.id &&  <div className="col-md-12 fv-row fv-plugins-icon-container mt-3">
                                        <label className="required fs-6 fw-semibold mb-1 mx-auto p-5">Update Active Status</label>
                                        <Switch {...label} checked={editBlog?.active===1 ? true : false} onChange={(e:any)=>{
                                            setEditBlog({...editBlog,active:editBlog?.active===1?0:1})
                                          }}/>
                                       
                                         <div className="fv-plugins-message-container mb-1 invalid-feedback"></div></div>
                                    }
                                 </div>
                            </div>

                            <div className="col-12">
                            {/* <div className="col-md-12 fv-row fv-plugins-icon-container mt-3">
                                <label className="required fs-6 fw-semibold text-primary">Blog Description</label>
                             
                                <textarea className="form_style form-control form-control-solid fw-bolder" rows={15} style={{background:"#f2f2f2"}} value={editBlog?.id ? editBlog?.description :createBlog?.description}  onChange={(e:any)=>{
                                    if(editBlog?.id){
                                        setEditBlog({...editBlog,description:e?.target?.value})
                                    }else{
                                        setCreateBlog({...createBlog,description:e?.target?.value})
                                    }
                                }} placeholder="Enter Blog Description" name="first-name"/>
            <div className="fv-plugins-message-container mb-1 invalid-feedback"></div>
                            </div> */}

                              <div className="col-12"  style={{margin:"100px auto"}}>
                                  <div className="row">
                                    <h2 className="text-primary">Blog Description: </h2>
                                    <div className="col-12">
                                    <ReactQuill theme="snow" modules={modules} value={value || ""} onChange={setValue} />
                                    </div>
                                  </div>
                              </div>
                            </div>

                            <div className="col-12">
                                <div className="text-center mx-auto my-6">
                                   {editBlog?.id ? <button className="btn btn-success text-white" onClick={(e:any)=>{
                                       e?.preventDefault()
                                       updateBlogData()
                                   }}>Update Blog</button> :<button className="btn btn-primary text-white" onClick={(e:any)=>{
                                        e?.preventDefault()
                                        createNewBlog()
                                   }}>Create Blog</button>} 
                                </div>
                            </div>
                         </div>
                   </div>
                 </div>
              </div>
            </div>
            {
                <Modal open={createNewCategory}   onClose={()=>{
                    setCreateNewcategory(false)
                }} center>
                           <div style={{padding:"50px",textAlign:"center",margin:"auto"}}>
                            <h5>Add New Category</h5>
                    
                    {
                       createNewCategory && <input autoFocus={false} autoComplete="off" className="form_style form-control form-control-solid fw-bolder w-100" style={{background:"#f2f2f2"}} value={editBlog?.id ? editBlog?.category:createBlog?.category} onChange={(e:any)=>{
                        if(editBlog?.id){
                            setEditBlog({...editBlog,category:e?.target?.value})
                           }else{
                            setCreateBlog({...createBlog,category:e?.target?.value})
                           }
                       }} placeholder="Create Blog Category" name="first-name"/>

                    }
                            {
                        createNewCategory && <button disabled={editBlog?.id ? editBlog?.category?.trim()?.length<0 : createBlog?.category?.trim()?.length<0} className=" my-3 btn btn-sm my-3 btn-primary" onClick={(e:any)=>{
                            e?.preventDefault()
                            saveBlogCategory()
                     }}>Save Category</button>
                    }
                            </div>               
                       </Modal>
            }
          </div>
         </>
  )
}

export default CreateUpdateBlog