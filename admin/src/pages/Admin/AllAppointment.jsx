import React from 'react'
import { useEffect } from 'react'
import { useContext } from 'react'
import { AdminContext } from '../../context/AdminContext'
import { AppContext } from '../../context/AppContext'
import { assets } from '../../assets/assets'


const AllAppointment = () => {

  const {atoken,appointments,getAllAppointments,cancelAppointments}=useContext(AdminContext)
  const {calculateAge,currency}=useContext(AppContext)

  useEffect(()=>{
    if(atoken){
      getAllAppointments()
    }
  },[atoken])
  return (
    <div className='flex-1 overflow-y-auto max-sm:pr-[20px] p-5 px-15 md:ml-[20vw] sm:ml-[30vw] md:mt-[70px] mt-16'>
      <p className='mb-3 text-lg font-medium'>All Appointments</p>
      <div className='bg-white  rounded text-sm max-h-[80vh] min-h-[60vh] overflow-y-scroll'>
        <div className='hidden sm:grid grid-cols-[0.5fr_3fr_1fr_3fr_3fr_1fr_1fr] grid-flow-col py-3 px-6 border-b border-gray-300'>
          <p>#</p>
          <p>Patient</p>
          <p>Age</p>
          <p>Date &Time</p>
          <p>Doctor</p>
          <p>Fee</p>
          <p>Action</p>
        </div>
        {appointments.map((item,index)=>(
          <div className='hidden sm:grid grid-cols-[0.5fr_3fr_1fr_3fr_3fr_1fr_1fr] items-center text-gray-500 py-3 px-6 border-b hover:bg-gray-50 max-sm:flex max-sm:flex-wrap max-sm:gap-2' key={index}>

            <p className='max-sm:hidden '>{index+1}</p>
            <div className='flex items-center gap-2'>
              <img className='w-8 rounded-full ' src={item.userData.image} alt="" /><p>{item.userData.name}</p>
            </div>
            <p className='max-sm:hidden'>{calculateAge(item.userData.dob)}</p>
            <p>{item.slotDate},{item.slotTime}</p>
             <div className='flex items-center gap-2'>
              <img className='w-8 rounded-full bg-gray-200' src={item.docData.image} alt="" /><p>{item.docData.name}</p>
            </div>
            <p>{currency}{item.amount}</p>
            {
              item.cancelled?
              <p className='text-red-400 text-s  font-bold'>Cancelled</p>:
              <img onClick={()=>cancelAppointments(item._id)} className='w-10 cursor-pointer' src={assets.cancel_icon} alt="" />
            }
            
          </div>
        ))}
      </div>
    </div>
  )
}

export default AllAppointment
