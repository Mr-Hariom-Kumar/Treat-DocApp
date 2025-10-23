import React, { useContext, useState } from "react";
import { assets } from "../../assets/assets";
import { AdminContext } from "../../context/AdminContext";
import axios from "axios";
import { toast } from "react-toastify";
import Spiner from "../../components/Spiner";

const AddDoctor = () => {

  const [docImg,setDocImg]=useState(false)
  const [name,setName]=useState('')
  const [email,setEmail]=useState('')
  const [password,setPassword]=useState('')
  const [experience,setExperience]=useState('1 Year')
  const [fees,setFees]=useState('')
  const [about,setAbout]=useState('')
  const [speciality,setSpeciality]=useState('General Physician')
  const [degree,setDegree]=useState('')
  const [address1,setAddress1]=useState('')
  const [address2,setAddress2]=useState('')
  const {backendURL,atoken,loading,setLoading}=useContext(AdminContext)

  const onSubmitHandler=async (event)=>{
    event.preventDefault()

    try{
      if(!docImg){
        return toast.error('Image is not selected')
      }

      setLoading(true) 

      const formData=new FormData()
      formData.append('image',docImg)
      formData.append('name',name)
      formData.append('email',email)
      formData.append('password',password)
      formData.append('experience',experience)
      formData.append('fees',Number(fees))
      formData.append('speciality',speciality)
      formData.append('degree',degree)
      formData.append('address',JSON.stringify({line1:address1,line2:address2}))
      formData.append('about',about)

      formData.forEach((value,key)=>{
          console.log(`${key}: ${value}`);
      })

      const {data}=await axios.post(backendURL+'/api/admin/add-doctors',formData,{headers:{atoken}})
      if(data.success){
        toast.success(data.message)
        
        setDocImg(false)
        setName('')
        setEmail('')
        setPassword('')
        setExperience('1 Year')
        setFees('')
        setAbout('')
        setSpeciality('General Physician')
        setDegree('')
        setAddress1('')
        setAddress2('')
      }else{
        toast.error(data.message)
      }
    }catch(error){
      toast.error('Failed to add doctor')
      console.error(error)
    }finally{
      setLoading(false) 
    }
  }



  return (
    <>
      {loading && (<Spiner/>)}

      <form onSubmit={onSubmitHandler} className="m-5 w-full z-[-10] fixed max-sm:pr-[-20px] p-5 px-15 max-md:pl-[-10px]  md:ml-[20vw] sm:ml-[30vw] md:mt-[70px] mt-16  ">
        <p className="mb-3 text-lg font-medium">Add Doctor</p>
        <div className="bg-white px-8 py-8  rounded w-full max-w-4xl max-h-[80vh] overflow-y-scroll shadow-2xl relative">
          <div className="flex items-center gap-4 " >
            <label htmlFor="doc-img">
              <img  className="w-16 bg-gray-100 rounded-full cursor-pointer" src={docImg? URL.createObjectURL(docImg): assets.upload_area} alt="" />
            </label>
            <input onChange={(e)=>{setDocImg(e.target.files[0])}} id="doc-img" type="file" hidden />
            <p>
              Upload doctors <br />
              picture
            </p>
          </div>

          <div className="flex flex-col lg:flex-row items-start gap-10 text-zinc-900 mt-8"  >
            <div className="w-full lg:flex-1 flex flex-col gap-4">
              <div className="flex flex-1 flex-col gap-1">
                <p>Doctor Name</p>
                <input onChange={(e)=>{setName(e.target.value)}} value={name} className="border rounded px-3 py-2 border-zinc-500" type="text" placeholder="Name" required />
              </div>

              <div className="flex flex-1 flex-col gap-1">
                <p>Doctor Email</p>
                <input onChange={(e)=>{setEmail(e.target.value)}} value={email} className="border rounded px-3 py-2 border-zinc-500" type="email" placeholder="your email" required />
              </div>

              <div className="flex flex-1 flex-col gap-1">
                <p>Doctor Password</p>
                <input onChange={(e)=>{setPassword(e.target.value)}} value={password} className="border rounded px-3 py-2 border-zinc-500" type="text" placeholder="Password" required />
              </div>

              <div className="flex flex-1 flex-col gap-1">
                <p>Experience</p>
                <select onChange={(e)=>{setExperience(e.target.value)}} value={experience} name="" id="" className="border rounded px-3 py-2 border-zinc-500">
                  <option value=" 1 Years"> 1 Years</option>
                  <option value=" 2 Years"> 2 Years</option>
                  <option value=" 3 Years"> 3 Years</option>
                  <option value=" 4 Years"> 4 Years</option>
                  <option value=" 5 Years"> 5 Years</option>
                  <option value=" 6 Years"> 6 Years</option>
                  <option value=" 7+ Years"> 7+ Years</option>
                </select>
              </div>

              <div className="flex flex-1 flex-col gap-1">
                <p>Fee</p>
                <input onChange={(e)=>{setFees(e.target.value)}} value={fees} className="border rounded px-3 py-2 border-zinc-500" type="number" placeholder="Your Fees" required />
              </div>
            </div>

            <div className="w-full lg:flex-1 flex flex-col gap-4">
              <div className="flex flex-1 flex-col gap-1">
                <p>Speciality</p>
                <select onChange={(e)=>{setSpeciality(e.target.value)}} value={speciality} name="" id=""className="border rounded px-3 py-2 border-zinc-500" >
                    <option value="General Physician">General Physician</option>
                    <option value="Gynecologist">Gynecologist</option>
                    <option value="Dermatologist">Dermatologist</option>
                    <option value="Pediatricians">Pediatricians</option>
                    <option value="Neurologist">Neurologist</option>
                    <option value="Gastroenterologist">Gastroenterologist</option>
                </select>
              </div>

              <div className="flex flex-1 flex-col gap-1">
                <p>Education</p>
                <input onChange={(e)=>{setDegree(e.target.value)}} value={degree} className="border rounded px-3 py-2 border-zinc-500" type="text" placeholder="Degree" required />
              </div>

              <div className="flex flex-1 flex-col gap-1">
                <p>Address</p>
                <input onChange={(e)=>{setAddress1(e.target.value)}} value={address1} className="border rounded px-3 py-2 border-zinc-500" type="text" placeholder="Address 1" required />
                <input onChange={(e)=>{setAddress2(e.target.value)}} value={address2} className="border rounded px-3 py-2 border-zinc-500" type="text" placeholder="Address 2" required />
              </div>
            </div>
          </div>
            <div>
              <p className="mt-4 mb-2">About Doctors</p>
              <textarea onChange={(e)=>{setAbout(e.target.value)}} value={about} className="w-full px-4 pt-2 border rounded border-zinc-900" placeholder="write something here" rows={5} required/>
            </div>
            <button type="submit" className="mt-4 border rounded border-zinc-900 px-3 py-2 cursor-pointer hover:bg-primary hover:text-white">Add Doctor</button>
        </div>
      </form>
    </>
  );
};

export default AddDoctor;