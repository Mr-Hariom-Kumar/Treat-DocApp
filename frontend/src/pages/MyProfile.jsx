import React,{useState,useContext} from 'react'
import { assets } from '../assets/assets'
import { AppContext } from '../context/AppContext'
import axios from 'axios'
import { toast } from 'react-toastify'
import Spiner from '../components/Spiner'

const MyProfile = () => {

  const {userData,setUserData,backendURL,token,loadUserProfileData,loading,setLoading}=useContext(AppContext)
  const [image,setImage]=useState(false)
  const [isEdit,setIsEdit]=useState(false)



  const updateUserProfile=async ()=>{

    try{
      setLoading(true)
      const formData=new FormData()
      formData.append('name',userData.name)
      formData.append('phone',userData.phone)
      formData.append('address',JSON.stringify(userData.address))
      formData.append('gender',userData.gender)
      formData.append('dob',userData.dob)

      image && formData.append('image',image)
      const {data}=await axios.post(backendURL+'/api/user/update-profile',formData,{headers:{token}})

      if(data.success){
        toast.success(data.message)
        await loadUserProfileData()
        setIsEdit(false)
        setImage(false)
      }else{
        toast.error(data.message)
      }

    }catch(error){
        console.log(error)
        toast.error(error.message)
    }finally{
      setLoading(false)
    }
  }

  return userData && (
    <>
    {loading && (<Spiner/>)}
      <div className='flex flex-col gap-2 max-w-lg'>

            {
              isEdit? 
              <label htmlFor='image'>
                <div className='inline-block relative cursor-pointer'>
                   <img className='w-36 rounded opacity-75'  src={image?URL.createObjectURL(image):userData.image} alt="" />
                   {/* <img className='absolute w-20 bottom-8 right-8' src={image?'':assets.upload_icon} alt="" /> */}
                   <input onChange={(e)=>setImage(e.target.files[0])} type="file" id='image' hidden />
                </div>
              </label>
              :
              <img className="w-36 rounded" src={userData.image}  alt="" />

            }

            <div>
              {
                isEdit?
                <input type='text' value={userData.name} onChange={e=>setUserData(prev=>({...prev,name:e.target.value}))}></input>:
                <p className='mt-4 font-bold text-4xl'>{userData.name}</p>
              }
            </div>
            <hr className='w-60' />
            
            <div>
              <h1 className='font-bold mt-3 border-b-1 w-30'>Contact Info</h1>
              <p className='!text-gray-900'>Email:  {userData.email}</p>
              {
                isEdit?<input type='text' value={userData.phone} onChange={e=>setUserData(prev=>({...prev,phone:e.target.value}))}></input>:
                <p className='!text-gray-900'>Phone:  {userData.phone}</p>
              }
              
            </div>
            <div className='flex flex-col gap-2 w-70'>
              <h1 className='font-bold mt-3 border-b-1 w-30'>Address</h1>
              {
                isEdit?
                <input type='text' value={userData.address?.line1 || 'Temp Address1'} onChange={e=>setUserData(prev=>({...prev,address:{...prev.address,line1:e.target.value}}))}></input>:
                <p className='!text-gray-900'>Street: {userData.address?.line1 || 'Temp Address1'}</p>

              }
              {
                isEdit?
                <input type='text' value={userData.address?.line2 || 'Temp Address2'} onChange={e=>setUserData(prev=>({...prev,address:{...prev.address,line2:e.target.value}}))}></input>:
                <p className='!text-gray-900'>City: {userData.address?.line2 || 'Temp Address2'}</p>
              }
             
              
              
            </div>
            
            <div className='flex flex-col  w-40'>
              <h1 className='font-bold mt-3 border-b-1 w-30'>Basic Info</h1>
              {
                isEdit?
                <select  className='mt-3' value={userData.gender} onChange={e=>setUserData(prev=>({...prev,gender:e.target.value}))}> 
                  <option value="Male">Male</option>
                  <option value="Female">Female</option>
                </select>:
                <p className='!text-gray-900'>Gender:   {userData.gender}</p>
              }  

              {
                isEdit?
                <input className='mt-3' type="date" min='1920-01-01' max='2050-01-01' value={userData.dob} onChange={e=>setUserData(prev=>({...prev,dob:e.target.value}))} />:
                <p className='!text-gray-900'>BirthDay:  {userData.dob}</p>
              }
              
              
            </div>
            
            <div className='mt-8 flex gap-10'>
              {
                isEdit?
                <button onClick={async ()=>{await updateUserProfile();setIsEdit(false)}} className='border rounded-lg px-7 py-2 cursor-pointer hover:bg-primary hover:!text-white'>Save Information</button>
                :
                 <button onClick={()=>{setIsEdit(true)}} className='border rounded-lg px-7 py-2 cursor-pointer hover:bg-primary hover:!text-white'>Edit</button>
              }
              <button className='border rounded-lg px-7 py-2 cursor-pointer hover:bg-red-700 hover:!text-white'>Delete Account</button>
            </div>
            
      </div>
    </>
  )
  
}

export default MyProfile
