import React, { useContext } from 'react'
import Login from './pages/Login.jsx'
import { AdminContext } from './context/AdminContext.jsx';
import Navbar from './components/Navbar.jsx';
import Sidebar from './components/Sidebar.jsx';
import { Route, Routes } from 'react-router-dom';
import AllAppointment from './pages/Admin/AllAppointment.jsx';
import AddDoctor from './pages/Admin/AddDoctor.jsx';
import DoctorsList from './pages/Admin/DoctorsList.jsx';
import Dashboard from './pages/Admin/Dashboard.jsx';
 import { ToastContainer, toast } from 'react-toastify'

const App = () => {
  const {atoken}=useContext(AdminContext)
  
  return atoken? (
    <div className=''>
        <ToastContainer/>
        <Navbar/>
        <div className='flex items-start'>
          <Sidebar/>
          <Routes>
            <Route path='/' element={<Dashboard/>}/>
            <Route path='/admin-dashboard' element={<Dashboard/>}/>
            <Route path='/all-appointments' element={<AllAppointment/>}/>
            <Route path='/add-doctor' element={<AddDoctor/>}/>
            <Route path='/doctor-list' element={<DoctorsList/>}/>
          </Routes>
        </div>
    </div>
  ):(
    <>
      <Login/>
      <ToastContainer/>
    </>
  )
}

export default App
