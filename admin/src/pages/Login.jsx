import React, { useContext, useState } from 'react'
import { assets } from '../assets/assets'
import { AdminContext } from '../context/AdminContext'
import axios from 'axios'
import { toast } from 'react-toastify';


const Login = () => {
    const [state,setState]=useState('Admin')
    const [email,setEmail]=useState('')
    const [password ,setPassword]=useState('')
    const {setAtoken, backendURL}=useContext(AdminContext)

    const onSubmitHandler=async (event)=>{
       event.preventDefault()
        try{
        
            if(state==='Admin'){
                const {data}=await axios.post(backendURL+'/api/admin/login',{email,password}) //this this {email+password} is like we are giving it in body and value of email and password is being set by react hooks 
                //basically jo kam ham backend me backendURL+'/api/admin/login' is route par post req bhejte the aur body me email password pass karte the exactly yahi ho raha hai par ab front end  form value se bhej rahe hai 
                //wo kaise? form ki harek onchange pe email ka value set ho rha hai hook me aur fir use use ka rahe hai as a body contetnt in axios.
                if(data.success){
                    localStorage.setItem('atoken',data.token)
                    setAtoken(data.token)
                    toast.success("Login successfull")
                }else{
                    toast.error(data.message)
                }
            }

        }catch(error){

        }

    }
   
  return (
    <form onSubmit={onSubmitHandler} className='min-h-[80vh] flex items-center'>
        <div className='flex flex-col gap-3  m-auto items-start p-8 min-w-[340px] sm:min-w-96 border border-zinc-300 rounded-xl text-sm shadow-2xl'>
            <p className='text-2xl font-semibold m-auto'><span className='text-primary'>{state}</span>  Login</p>
            <div className='w-full'>
                <p>Email</p>
                <input onChange={(e)=>setEmail(e.target.value)} value={email} type="email" required className='border-zinc-700 rounded w-full p-2 mt-2 border-[1px]'  />
            </div>
            <div className='w-full'>
                <p>password</p>
                <input onChange={(e)=>setPassword(e.target.value)} value={password} type="Password" className='border-zinc-700 rounded w-full p-2 mt-2 border-[1px]'  required/>
            </div>
            <button className='bg-primary w-full text-white py-2 mt-3 rounded-md text-base cursor-pointer'>Login</button>
            {
                state==='Admin'?<p>Doctor?<span className='text-blue-700 cursor-pointer underline' onClick={()=>setState('Doctor')}>Click here</span></p>
                :<p> Admin Login?<span className='text-blue-700 cursor-pointer underline' onClick={()=>setState('Admin')}>Click here</span></p>
            }
        </div>
    </form>
  )
}

export default Login
