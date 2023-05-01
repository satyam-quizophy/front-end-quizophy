import React from 'react'
import { toast } from 'react-toastify'

const ToastComp = (props:any) => {
    console.log(props)
  return (
    <div>
        { 
        props?.type==="Error" &&
             toast.error(props?.message, {
                position: "top-right",
                autoClose: 3000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
                theme: "dark",
                })
        }

       { 
        props?.type==="Success" &&
             toast.success(props?.message, {
                position: "top-right",
                autoClose: 3000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
                theme: "dark",
                })
        }

{ 
        props?.type==="Warning" &&
             toast.warning(props?.message, {
                position: "top-right",
                autoClose: 3000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
                theme: "dark",
                })
        }
    </div>
  )
}

export default ToastComp