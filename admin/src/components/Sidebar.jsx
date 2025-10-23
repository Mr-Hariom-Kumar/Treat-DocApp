import React from 'react'
import { useContext } from 'react'
import { AdminContext } from '../context/AdminContext'
import { assets } from '../assets/assets'
import { NavLink } from 'react-router-dom'


const Sidebar = () => {
  const {atoken}=useContext(AdminContext)
  return (
    <div className='min-h-screen h-full bg-white border-right shadow-2xl md:w-[22vw] mt-[10.6vh] fixed z-0'>
      {
        atoken &&
        <ul className='mt-5 '>
          <NavLink to={'admin-dashboard'} className={({isActive})=>`flex items-center gap-3 py-3.5  px-3 md:px-9 md:min-w-[22vw] cursor-pointer ${isActive?'bg-[#F2F3FF] border-r-4 border-primary': ''}`}>
            <img src={assets.home_icon} alt="" />
            <p className='max-sm:hidden'>DashBoard</p>
          </NavLink>

            {/* things to be learned
            className={`flex items-center gap-3 py-3.5 px-3 md:px-9 md:min-w-72 cursor-pointer ${isActive?'bg-[#F2F3FF] border-r-4 border-primary':''}`}
            here isSctive is being passed as an argument so whenever it goes on the other components it maintain its origibnality despite the virtual dom get changed at that point


            className={({isActive})=>`flex items-center gap-3 py-3.5 px-3 md:px-9 md:min-w-72 cursor-pointer ${isActive?'bg-[#F2F3FF] border-r-4 border-primary': ''}`}
            but here we are givin isActive as a plain classText which is eventually true but only for the current routes when ever pages reloaded and changes is Active no more exist */}


           <NavLink to={'/all-appointments'} className={({isActive})=>`flex  items-center gap-3 py-3.5 px-3 md:px-9 md:min-w-[22vw] cursor-pointer ${isActive?'bg-[#F2F3FF] border-r-4 border-primary': ''}`}>
            <img src={assets.appointment_icon} alt="" />
            <p className='max-sm:hidden'>Appointment</p>
          </NavLink>

           <NavLink to={'/add-doctor'} className={({isActive})=>`flex gap-3 items-center py-3.5 px-3 md:px-9 md:min-w-[22vw] cursor-pointer ${isActive?'border-r-4 border-primary bg-[#F2F3FF]':''}`}>
            <img src={assets.add_icon} alt="" />
            <p className='max-sm:hidden'>Add Doctors</p>
          </NavLink>

          <NavLink to={'/doctor-list'} className={({isActive})=>`flex gap-3 py-3.5 px-3 md:px-9 md:min-w-[22vw] items-center cursor-pointer ${isActive?'border-r-4 border-primary bg-[#F2F3FF]':''}`}>
            <img src={assets.people_icon} alt="" />
            <p className='max-sm:hidden'>Doctors List</p>
          </NavLink>
        </ul>
      }
    </div>
  )
}

export default Sidebar
