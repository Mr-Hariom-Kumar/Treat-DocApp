import React from 'react'
import { useContext } from 'react'
import { AdminContext } from '../../context/AdminContext'
import { useEffect } from 'react'
import './DoctorList.css'

const DoctorsList = () => {

  const {doctors,setDoctors,atoken,getAllDoctors,changeAvailability }=useContext(AdminContext)

  useEffect(()=>{
    if(atoken){
      getAllDoctors()
    }
  },[atoken])
  return (
    <div className='flex-1 container m-5 overflow-x-hidden md:overflow-x-scroll max-h-[90]  md:ml-[40vh] mt-[50px] overflow-y-scroll max-sm:flex  max-sm:flex-col max-sm:flex-1'>
      <h1 className='text-lg font-medium'>All Doctors</h1>
      <div className='w-full flex  flex-wrap flex-1 gap-4 pt-5 gap-y-6   ml-[70px] '>
          {
            doctors.map((item,index)=>(
              <div className='border border-indigo-200 rounded-xl max-w-56 min-w-56 overflow-hidden cursor-pointer group bg-white shadow-2xl ' key={index}>
                <img className='group hover:bg-primary transition-all duration-500' src={item.image} alt="" />
                <div className='p-4'>
                  <p className='text-neutral-800 text-lg font-medium'>{item.name}</p>
                  <p className='text-zinc-800 text-sm'>{item.speciality}</p>
                  <div className='flex gap-2 mt-2 items-center text-sm'>
                    <input onChange={()=>changeAvailability(item._id)} type="checkbox" checked={item.available} />
                    <p>Available</p>
                  </div>
                </div>
              </div>
            ))
          }
      </div>
    </div>
  )
}

export default DoctorsList
