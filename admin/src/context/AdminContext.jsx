import { createContext, useState } from "react";
import axios from "axios";
import { toast } from "react-toastify";

export const AdminContext=createContext()

const AdminContextProvider=(props)=>{
    const [atoken,setAtoken]=useState(localStorage.getItem('atoken')?localStorage.getItem('atoken'):'')
    const [loading, setLoading] = useState(false) 
    const [doctors,setDoctors]=useState([])
    const [appointments,setAppointments]=useState([])
    const [dashData,setDashData]=useState(false)
    
    const backendURL=import.meta.env.VITE_BACKEND_URL

    const getAllDoctors=async ()=>{
        try{
            const {data}=await axios.post(backendURL+'/api/admin/all-doctors',{},{headers:{atoken}})
            if(data.success){
                setDoctors(data.doctors)
                console.log(data.doctors)
            }else{
                toast.error(data.message)
            }
        }catch(error){
            toast.error(error.message)
        }
    }

    const changeAvailability=async (docId)=>{
        try{
            const {data}= await axios.post(backendURL+'/api/admin/change-availability',{docId},{headers:{atoken}})
            if(data.success){
                toast.success(data.message)
                getAllDoctors()

            }else{
                toast.error(data.message)
            }

        }catch(error){
            toast.error(error.message)
        }
    }

    const getAllAppointments=async ()=>{
        try{
            const {data}=await axios.get(backendURL+'/api/admin/appointments',{headers:{atoken}})
            if(data.success){
                setAppointments(data.appointments)
                console.log(data.appointments)
            }else{
                toast.error(error.message)
            }
        }catch(error){
            console.log(error)
        }
    }

    const cancelAppointments=async (appointmentId)=>{
        try{
            const {data}=await axios.post(backendURL+'/api/admin/cancel-appointments',{appointmentId},{headers:{atoken}})
            if(data.success){
                toast.success(data.message)
                getAllAppointments()
            }else{
                toast.error(data.error)
                //console.log(data)
            }
        }catch(error){
            toast.error(error.message)
            console.log("error is at catch  block frontend part ",error)
        }
    }

    const getDashData=async ()=>{
        try{
            const {data}=await axios.get(backendURL+'/api/admin/dashboard',{headers:{atoken}})
            if(data.success){
                setDashData(data.dashData)
                console.log(data.dashData)
            }else{
                toast.error(data.message)
            }
        }catch(error){
             toast.error(error.message)
            console.log("error is at catch  block frontend part ",error)
        }
    }
    const value={
        atoken,setAtoken,
        backendURL,
        loading,setLoading,
        doctors,setDoctors,
        getAllDoctors,changeAvailability,getAllAppointments,appointments,cancelAppointments,
        dashData,getDashData
    }
    return (
        <AdminContext.Provider value={value}>
            {props.children}
        </AdminContext.Provider>
    )
}

export  default AdminContextProvider