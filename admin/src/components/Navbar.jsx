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
    <div className='flex justify-between items-center px-5 py-3 border-b border-b-gray-400 shadow-xl '>
        <div className='flex items-center gap-0 text-s'>
            <img  className='w-30 cursor-pointer'  src={assets.admin_logo} alt="" />
            <p className='border  px-3 py-0.5 rounded-full border-zinc-600'>{atoken?'Admin':'Doctor'}</p>
        </div>
        <button onClick={logout} className='bg-primary text-white text-sm px-10 py-2 rounded-full cursor-pointer'>Logout</button>
    </div>
  )
}

export default Navbar
