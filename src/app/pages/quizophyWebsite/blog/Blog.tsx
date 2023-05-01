import React,{useEffect,useState} from 'react'
import axios, { AxiosResponse } from 'axios';
import { QUIZOPHY_WEBSITE_API_URL } from '../ApiUrl';
import { Link } from 'react-router-dom';
import { AiFillDelete, AiFillEdit } from 'react-icons/ai';
import { toast } from 'react-toastify';
import { useNavigate } from 'react-router-dom';
import ToatComp from './ToatComp';
const Blog = () => {
    const [blogs,setBlogs]=useState<any[]>([])
    const navigate=useNavigate()
    const getAllBlog=async ()=>{
         const {data}=await axios.get(`${QUIZOPHY_WEBSITE_API_URL}/admin/blog`)
         if(data?.success){
            setBlogs(data?.data)
         }
    }
     useEffect(()=>{
         getAllBlog()
     },[])
   return (
     <>
       <div className="postbox__area pt-120 pb-120">
         <div className="container" style={{paddingTop:"30px"}}>
           <div className="row gy-5">
             <div className="col-12 d-flex justify-content-end">
                <button className="btn my-2 btn-primary text-center" onClick={()=>{
                    navigate("/quizophy-website/blog/create")
                }}>
                    Create New Blog
                </button>
             </div>
             <div className="col-12 my-5">
                <div className="row gy-5">
                 {
                   blogs && blogs?.length>0 ?
                    blogs.map((item,index)=>{
                        return  <div key={index} className="col-lg-4 col-md-6 col-sm-11 text-center">
                         <div className="p-5 text-center" style={{boxShadow: "rgba(0, 0, 0, 0.24) 0px 3px 8px"}}>
                               <div className="w-100">
                                  <img src={item?.image} alt=""  width="100%" height="auto"/>
                                 </div>
                                 <h2 className="my-4 fs-6">{item?.title}</h2>
                                 <p style={{fontSize:"12px"}}><span className="text-warning me-3" style={{fontSize:"12px"}}>DD-MM-YYYY HH:MM:SS</span><span style={{fontWeight:"600"}}>{new Date(item?.date_time)?.getDate()+"-"+new Date(item?.date_time)?.getMonth()+1+"-"+new Date(item?.date_time)?.getFullYear()+"   "+new Date(item?.date_time)?.getHours()+":"+new Date(item?.date_time)?.getMinutes()+":"+new Date(item?.date_time)?.getSeconds()}</span></p>
                                 <div style={{display:"flex",justifyContent:"space-between",alignItems:"center",margin:"20px auto"}}>
                                 <Link to={`/quizophy-website/blog/${item.id}`}><a className="btn btn-warning text-white w-100 px-4 py-2 ">Read More</a></Link>
                                 <span ><AiFillEdit style={{color:"black",fontSize:"20px",marginRight:"10px",cursor:"pointer"}} onClick={()=>{
                                           navigate(`/quizophy-website/blog/edit/${item?.id}`)
                                    }}/>
      <AiFillDelete style={{color:"red",fontSize:"20px",cursor:"pointer"}} onClick={async ()=>{
          const {data}=await axios.delete(`${QUIZOPHY_WEBSITE_API_URL}/blog/${item?.id}`)
          if(data?.success){
            getAllBlog()
            ToatComp({message:data?.message,type:"Success"})

          }
      }}/></span>
                                    </div>

                               
                           </div>
                               
                        </div>
                   }) : <>  <div style={{width:"100%",height:"60vh",display:"flex",justifyContent:"center",alignItems:"center"}}><h2 style={{border:"2px solid black",fontSize:"20px",padding:"20px 20px",cursor:"pointer",borderRadius:"15px"}}>No Blog Found</h2></div>
                   </>
                 }                
                </div>
             </div>
           </div>
         </div>
       </div>
     </>
   );
 };
 
 export default Blog;