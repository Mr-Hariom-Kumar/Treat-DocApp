import React, { useContext } from 'react'
import { assets } from '../assets/assets'
import { AdminContext } from '../context/AdminContext'
import {useNavigate} from 'react-router-dom'
import { toast } from 'react-toastify'

const Navbar = () => {
    const {atoken,setAtoken}=useContext(AdminContext)
    const navigate=useNavigate()
    const logout=()=>{
        navigate('/')
        atoken && setAtoken('') //it wont change virtual dom instatntly once the entire function finished then changes are made
        atoken && localStorage.removeItem('atoken') // so atoken still hold their original value
        toast.success("Logged out successfully")
        //learnt new thing here like 
    }
  return (
    <div className='flex justify-between items-center px-5 z-100 py-3 border-b bg-white border-b-gray-400 shadow-xl fixed  w-full '>
        <div className='flex items-center gap-0 text-s'>
            <img  className='w-30 cursor-pointer'  src={assets.admin_logo} alt="" />
            <p className='border  px-3 py-0.5 rounded-full border-zinc-600'>{atoken?'Admin':'Doctor'}</p>
        </div>
        <button onClick={logout} className='bg-primary text-white text-sm px-8 py-2 max-sm:px-4 rounded-full cursor-pointer border-0 '><div className='flex text-xs align-middle'><img className='w-5 ' src={assets.logout} alt=''/><p className='max-md:hidden'>Logout</p></div></button>
    </div>
  )
}

export default Navbar
