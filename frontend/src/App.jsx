import React from 'react'
import "./App.css"
import {BrowserRouter as Router, Routes, Route} from "react-router-dom"
import Appointment from './pages/Appointment'
import Register from './pages/Register'
import Login  from './pages/Login'
import Home from './pages/Home'
import AboutUs from './pages/AboutUs'

import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const App = () => {
  return (
    <>
      <Router>
        <Routes>
          <Route path='/' element={<Home/>}/>
          <Route path='/appointment' element={<Appointment/>}/>
          <Route path='/register' element={<Register/>}/>
          <Route path='/login' element={<Login/>}/>
          <Route path='/about' element={<AboutUs/>}/>
        </Routes>
        <ToastContainer position='top-center'/>
      </Router>
    </>
  )
}

export default App