import React, { useContext } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { AppContext } from "../context/AppContext";
import { useState, useEffect } from "react";
import { assets } from "../assets/assets";
import RelatedDoctors from "../components/RelatedDoctors";
import {toast} from 'react-toastify'
import axios from "axios";
const Appointment = () => {
  const { docId } = useParams();
  const { doctors,currencySymbol,token,getDoctorsData,backendURL } = useContext(AppContext);

  const daysOfWeek=['SUN','MON','TUE','WED','THU','FRI','SAT']

  const [docInfo, setDocInfo] = useState(null);
  const [docSlots,setDocSlots]=useState([])
  const [slotIndex,setSlotIndex]=useState(0)
  const [slotTime,setSlotTime]=useState('')
  const navigate=useNavigate()
  

  
  const fetchDocInfo = () => {
    const docInfo = doctors.find((doc) => doc._id === docId);
    setDocInfo(docInfo);
    console.log(docInfo);
  };


  // need to be design own Ai powered engine
const getAvailableslots=async ()=>{
  setDocSlots([])

  let today=new Date()
  for(let i=0;i<7;i++){
    let currentDate=new Date();
    currentDate.setDate(today.getDate()+i)

    let endTime=new Date()
    endTime.setDate(today.getDate()+i)
    endTime.setHours(21,0,0,0)

    // setting setHours
    if(today.getDate()===currentDate.getDate()){
      currentDate.setHours(currentDate.getHours()>10?currentDate.getHours()+1:10)
      currentDate.setMinutes(currentDate.getMinutes()>30?30:0)
    }else{
      currentDate.setHours(10)
      currentDate.setMinutes(0)
    }

    let timeSlots=[]
    while(currentDate<endTime){
      let formattedTime=currentDate.toLocaleTimeString([],{hour:'2-digit',minute: '2-digit'})

      let day=currentDate.getDate()
      let month=currentDate.getMonth()+1 
      let year=currentDate.getFullYear()

      const slotDate=day+ "_" +month+"_" +year
      const slotTime=formattedTime

      const isSlotAvailable=docInfo.slot_booked[slotDate] && docInfo.slot_booked[slotDate].includes(slotTime)?false:true

      if(isSlotAvailable){
          //add slot to array
          timeSlots.push({
            datetime:new Date(currentDate),
            time:formattedTime
          })
      }

      

      //Increment time by 30 minute
      currentDate.setMinutes(currentDate.getMinutes()+30)
    }
    setDocSlots(prev=>([...prev,timeSlots]))
  }
}

const bookAppointment=async ()=>{
  if(!token){
    toast.warn('login to book appointment')
    return navigate('/login')

  }
  try{
    const date=docSlots[slotIndex][0].datetime
    let day=date.getDate()
    let month=date.getMonth()
    let year=date.getFullYear()

    const slotDate=day+ "_" +month+"_" +year
    const {data}=await axios.post(backendURL+'/api/user/book-appointment',{docId,slotDate,slotTime},{headers:{token}})
    if(data.success){
      toast.success(data.message)
      getDoctorsData()
      navigate('/my-appointments')
    }else{
      toast.error(data.message)
    }
  }catch(error){
    console.log(error)
    toast.error(error.message)
  }
}

  useEffect(() => {
    fetchDocInfo();
  }, [doctors, docId]);

    useEffect(()=>{
      getAvailableslots()
    },[docInfo])

  useEffect(()=>{
    console.log(docSlots)
  },[docSlots])
    
  return (
    docInfo && (
      <div>
        <div className="flex flex-col sm:flex-row gap-4">
          <div>
            <img className="bg-primary w-full sm:max-w-72 rounded-lg" src={docInfo.image} alt="" />
          </div>

          <div className="flex-1 border-gray-400 rounded-lg p-8 py-7 bg-white mx-2 sm:mx-0 mt-[-80px] sm:mt-0">
            <p className="flex items-center gap-2 text-2xl font-medium text-gray-900">
              {docInfo.name} <img className="w-5" src={assets.verified_icon} alt="" />
            </p>
            <div className="flex items-center gap-2 text-sm mt-1 text-gray-600">
              <p>
                {docInfo.degree}-{docInfo.speciality}
              </p>
              <button className="border border-primary rounded-full px-2 py-0.5 sm:w-20">{docInfo.experience}</button>
            </div>

            {/* doctor about */}
            <div className="">
              <p className="flex items-center gap-1 text-sm font-medium text-gray-900 mt-3">
                About <img src={assets.info_icon} alt="" />
              </p>
              <p className="text-sm text-gray-900  mt-2 max-w-[700px]">{docInfo.about}</p>
            </div>
            <p className=" text-gray-900">Appointment fee: {currencySymbol}{docInfo.fees}</p>
          </div>
        </div>

        {/* Bookinbg slot */}
        <div className="sm:ml-72 sm:pl-4 mt-8 font-medium text-gray-700"></div>
          <p className=" text-gray-900 font-bold text">Booking slots</p>
          <div className="flex gap-3 items-center w-full overflow-x-scroll mt-4">
            {
              docSlots.length && docSlots.map((item,index)=>(
                <div onClick={()=>setSlotIndex(index)} className={`text-center py-6 min-w-16 rounded-full cursor-pointer ${slotIndex===index?'bg-primary text-white':'border border-gray-200'}`} key={index}>
                  <p>{item[0]?daysOfWeek[item[0].datetime.getDay()]:`Idle`}</p>
                  <p className={`${item[0]?'':'text-red-600 font-bold'}`}>{item[0]?item[0].datetime.getDate():`X`}</p>
                </div>
              ))
            }
          </div>
          <div className="flex items-center gap-3 w-full overflow-x-scroll mt-4">
            {
              docSlots.length && docSlots[slotIndex].map((item,index)=>(
                <p onClick={()=>setSlotTime(item.time)} className={`text-sm font-light flex-shrink-0 px-5 py-2 cursor-pointer rounded-full ${item.time===slotTime ?'bg-primary text-white':'text-gray-900 border border-gray-600'}`} key={index}>
                  {item.time.toLowerCase()}
                </p>

              ))}
          </div>
            <button onClick={bookAppointment} className="bg-primary text-white text-sm border rounded-full px-8  py-3 mt-9 text-center cursor-pointer ">Book an Appointment</button>
            <RelatedDoctors docId={docId} speciality={docInfo.speciality}/>
      </div>
    )
  );
};

export default Appointment;
