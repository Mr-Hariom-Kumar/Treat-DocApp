import React, { useContext, useEffect,useState } from 'react'
import { AppContext } from '../context/AppContext'
import axios from 'axios'
import { toast } from 'react-toastify'
import {useNavigate} from 'react-router-dom'

const MyAppointments = () => {
  const {backendURL,token} =useContext(AppContext)
  const [appointments,setAppointments]=useState([])
  const [isCutClicked,setIsCutClicked]=useState(false)
  const navigate=useNavigate()
  const getUserAppointments=async ()=>{

    try{
      const {data}=await axios.post(backendURL+'/api/user/appointments',{},{headers:{token}})
      setAppointments(data.appointments)
      console.log( data)
      
    }catch(error){
      console.log(error)
      toast.error(error.message)
    }
   
  }

  const cancelAppointment=async (appointmentId)=>{
      try{
          const {data}=await axios.post(backendURL+'/api/user/cancel-appointments', {appointmentId},{headers:{token}})
          if(data.success){
            toast.success(data.message)
            getUserAppointments()
          }else{
            toast.error(data.message)
          }
      }catch(error){
        console.log(error)
        toast.error(error.message)
      }
  }

  const removeAppointment=async(appointmentId)=>{
    try{
      const {data}=await axios.post(backendURL+'/api/user/remove-user-appointments',{appointmentId},{headers:{token}})
      if(data.success){
        toast.success(data.message)
        getUserAppointments()
      }
    }catch(error){
      console.log(error)
        toast.error(error.message)
    }
  }


  const initPay=(order)=>{

    console.log(order)

    const options={
      key:import.meta.env.VITE_RAZORPAY_KEY_ID,
      amount:order.amount,
      currency:order.currency,
      name:'Appointment Payment',
      description:'Appointment Payment',
      order_id:order.id,
      receipt:order.receipt,
      handler:async (response)=>{
        console.log(response)
        try{

          const {data}=await axios.post(backendURL+'/api/user/verifyRazorpay',response,{headers:{token}})
          if(data.success){
            getUserAppointments()
            navigate('/my-appointments')
          }
        }catch(error){
            console.log(error)
            toast.error(error.message)
        }
      }

    }
    const rzp=new window.Razorpay(options)
    rzp.open()
    

  }
  const appointmentRazorpay=async (appointmentId)=>{
    try{
      const {data}= await axios.post(backendURL+'/api/user/payment-razorpay',{appointmentId},{headers:{token}})
      if(data.success){
        initPay(data.order)
        toast.success({success:true,message:data.message})
      }else{
        toast.success({success:false,message:data.message})
      }
    }catch(error){
      console.log(error)
      toast.error(error.message)
    }
  }

  useEffect(()=>{
    if(token){
      getUserAppointments()
    }
  },[token])
  return (
    <div>
        <p className='pb-3 mt-12 font-medium text-zinc-700 border-b'>My Appointments</p>
        <div>
          {
            appointments.map((item,index)=>(
              <div className='grid grid-col-[1fr_2fr] gap-4 sm:flex sm:gap-6 py-2 border-b' key={index}>
                <div>
                  <img className='w-32 bg-indigo-50' src={item.docData.image} alt="" />
                </div>
                <div className='flex-1 text-sm text-zinc-600'>
                  <p className='text-neutral-800 font-semibold'>{item.docData.name}</p>
                  <p>{item.docData.speciality}</p>
                  <p className='text-zinc-700 font-medium mt-1'>Address</p>
                 <p>{JSON.stringify(item.docData.address)}</p>
                  <p className=''><span className='font-medium'>Date & Time:</span> {item.slotDate} | {item.slotTime}</p>
                </div>
                <div></div>
                <div className='flex flex-col gap-2 justify-end'>
                  {!item.cancelled && item.payment && <button className='text-sm text-white text-center sm:min-w-48 py-2 border rounded-lg bg-green-700 ' >Paid</button>}
                 {!item.cancelled && !item.payment && <button className='text-sm text-primary text-center sm:min-w-48 py-2 border rounded-lg cursor-pointer hover:bg-primary hover:text-white' onClick={()=>appointmentRazorpay(item._id)} >Pay Online</button>} 
                  {!item.cancelled && !item.payment && <button className='text-sm text-primary text-center sm:min-w-48 py-2 border rounded-lg cursor-pointer hover:bg-red-700 hover:text-white' onClick={()=>cancelAppointment(item._id)} >Cancel Appointment</button> }
                  {item.cancelled && <button className='text-sm text-center sm:min-w-48 py-2 border rounded-lg border-red-700 text-red-700'>Appointment Cancelled</button> }
                  {item.cancelled && <button className='text-sm text-red-700  sm:min-w-48 py-2 border rounded-lg border-red 700 cursor-pointer hover:bg-red-700 hover:text-white hover:border-white' onClick={()=>removeAppointment(item._id)}>Remove Appointment</button>}
                </div>

              </div>

            ))
          }
        </div>
    </div>
  )
}

export default MyAppointments
