import React from 'react'
import { createContext } from 'react'
//import { doctors } from '../assets/assets'
import axios from 'axios'
import { useState } from 'react'
import {toast} from 'react-toastify'
import { useEffect } from 'react'

export const AppContext=createContext()
const currencySymbol='₹ '

const AppContextProvider=(props)=>{
    const backendURL=import.meta.env.VITE_BACKEND_URL
    const [doctors,setDoctors]=useState([])
    const [token,setToken]=useState(localStorage.getItem('token')?localStorage.getItem('token'):'')
    const [loading, setLoading] = useState(false) 
    const [userData,setUserData] = useState(false)
    const adminLoginURL='http://localhost:5174/'

    const getDoctorsData=async (req,res)=>{
        try{
            const {data}=await axios.get(backendURL+'/api/doctor/list')
            if(data.success){
                setDoctors(data.doctors)
                
            }else{
                toast.error(data.message)
            }
        }catch(error){
            console.log(error)
            toast.error(error.message)
        }
    }

    const loadUserProfileData=async ()=>{

        try{
             const {data}=await axios.get(backendURL+'/api/user/get-profile',{ headers:{ token }})
            if(data.success){
                console.log(data)
                setUserData(data.userData)
               
            }else{
                toast.error(data.message)
            }

        }catch(error){
            console.log(error)
            toast.error(error.message)
        }

       

    }

    // const updateUserProfile=async (req,res)=>{
    //     const update=await axios.post(backendURL+'/api/user/update-profile',{headers:{token}})
    //     if(data.success){
    //         console.log(data)
    //         setUserData(_)
    //     }
    // }

    useEffect(()=>{
        getDoctorsData()
       console.log(backendURL)
    },[])

    useEffect(()=>{
        if(token){
            loadUserProfileData()
            console.log(userData)
        }else{
            setUserData(false)
        }
    },[token])

    const value={
        doctors,
        currencySymbol,getDoctorsData,token,setToken,backendURL,loading,setLoading,
        userData,setUserData,loadUserProfileData,adminLoginURL
    }
    return(
        <AppContext.Provider value={value}>
            {props.children}
        </AppContext.Provider>
    )
}

export default AppContextProvider
