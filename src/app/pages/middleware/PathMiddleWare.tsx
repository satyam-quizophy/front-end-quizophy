import React, { useEffect } from 'react'
import { useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'

const PathMiddleWare = ({children}:any) => {
    const {asideMenuUrl}=useSelector((state:any)=>state?.reducerData)
    const navigate=useNavigate()
    useEffect(()=>{
         const pathName=window.location.pathname
         if(asideMenuUrl && pathName?.split("/")[1]==="settings"){
            if(!asideMenuUrl.includes(pathName?.split("/")[2])){
                navigate("/dashboard")
            }
         }
         else{
            if(asideMenuUrl && !asideMenuUrl.includes(pathName)){
             navigate("/dashboard")
            }
         }
    })
  return (
    <div>{children}</div>
  )
}

export default PathMiddleWare