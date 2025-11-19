
import React,{useContext, useState} from 'react'
import { Navigate, Route, Routes } from 'react-router-dom'
import Home from './pages/Home'
import Doctor from './pages/Doctor'
import MyProfile from './pages/MyProfile'
import MyAppointments from './pages/MyAppointments'
import Appointment from './pages/Appointment'
import Navbar from './components/Navbar'
import Login from './pages/Login'
import About from './pages/About'
import Contact from './pages/Contact'
import Footer from './components/Footer'
import { ToastContainer, toast } from 'react-toastify';
import { useNavigate } from "react-router-dom";
import { AppContext } from './context/AppContext'

const App = () => {

  const {token,setToken}=useContext(AppContext)
  const navigate=useNavigate()
  return (
    <div className='mx-4 sm:mx-[10%]'>
      <ToastContainer/>
      <Navbar/>
      <Routes>
          <Route path='/' element={<Home />}/>
          <Route path='/doctors' element={<Doctor />}/>
          <Route path='/doctors/:speciality' element={<Doctor />}/>
          <Route 
          path='/login' 
          element={token ? <Navigate to='/' replace /> : <Login />} 
        />
          <Route path='/about' element={<About />}/>
          <Route path='/contact' element={<Contact />}/>
          <Route path='/my-profile' element={<MyProfile />}/>
          <Route path='/my-appointments' element={<MyAppointments />}/>
          <Route path='/appointment/:docId' element={<Appointment />}/>
      </Routes>
      <Footer/>
    </div>
  )
}

export default App
