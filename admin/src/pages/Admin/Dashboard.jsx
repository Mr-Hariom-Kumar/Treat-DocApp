import React from 'react'
import { useContext } from 'react'
import { AdminContext } from '../../context/AdminContext'
import { useEffect } from 'react'
import { assets } from '../../assets/assets'

const Dashboard = () => {

  const {dashData,cancelAppointments,getDashData,atoken}=useContext(AdminContext)

  useEffect(()=>{

    if(atoken){
      getDashData()
    }
  },[atoken])

  return (
    <div className='m-5 flex-1 overflow-y-auto max-sm:pr-[20px] p-5 px-15 md:ml-[20vw] sm:ml-[30vw] md:mt-[70px] mt-16'>
      <div className='flex flex-wrap gap-3'>
        <div className='flex items-center gap-2 bg-white  p-4 min-w-52 rounded border-2 border-gray-100  cursor-pointer '>
          <img className='w-14' src={assets.doctor_icon} alt="" />
          <div>
            <p>{dashData.doctors}</p>
            <p>Doctors</p>
          </div>
        </div>

        <div className='flex items-center gap-2 bg-white  p-4 min-w-52 rounded border-2 border-gray-100  cursor-pointer '>
          <img className='w-14' src={assets.appointment_icon} alt="" />
          <div>
            <p>{dashData.appointments}</p>
            <p>Appointment</p>
          </div>
        </div>

        <div className='flex items-center gap-2 bg-white  p-4 min-w-52 rounded border-2 border-gray-100  cursor-pointer '>
          <img className='w-14' src={assets.patients_icon} alt="" />
          <div>
            <p>{dashData.patients}</p>
            <p>Patients</p>
          </div>
        </div>
      </div>

      <div className='bg-white z-30'>
        <div className='flex items-center gap-2.5 px-4 py-4 mt-10 rounded-t shadow-xs '>
          <img src={assets.list_icon} alt="" /><p className='font-bold'>Latest Booking</p>
        </div>

        <div className='pt-4  z-[-20] overflow-y-scroll '>
        {
          dashData?.latestAppointments?.map((item,index)=>(
            <div className='flex items-center  px-6 py-3 gap-3 hover:bg-gray-100' key={index}>
              <img className='rounded-full w-10' src={item.docData.image} alt="" />
              <div className='flex-1 text-sm'>
                  <p className='font-medium'>{item.docData.name}</p>
                  <p className='text-gray-600'>{item.slotDate}</p>
              </div>
               {
                  item.cancelled?
                  <p className='text-red-400 text-s  font-bold'>Cancelled</p>:
                  <img onClick={()=>cancelAppointments(item._id)} className='w-10 cursor-pointer' src={assets.cancel_icon} alt="" />
              }            
            </div>
          ))

        }
        </div>
      </div>
      
    </div>
  )
}

export default Dashboard
