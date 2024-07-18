import React, { useContext, useEffect } from 'react';
import "./App.css";
import {BrowserRouter as Router, Routes, Route} from "react-router-dom";
import Appointment from './pages/Appointment';
import Register from './pages/Register';
import Login  from './pages/Login';
import Home from './pages/Home';
import AboutUs from './pages/AboutUs';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Navbar from './components/Navbar';
import { Context } from './main';
import Footer from './components/Footer';

const App = () => {

  const { isAuthenticated, setIsAuthenticated, setUser } = useContext(Context);

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const response = await axios.get(
          "http://localhost:5000/api/v1/user/patient/me",
          {
            withCredentials: true,
          }
        );
        setIsAuthenticated(true);
        setUser(response.data.user);
      } catch (error) {
        setIsAuthenticated(false);
        setUser({});
      }
    };
    fetchUser();
  }, [isAuthenticated]);

  return (
    <>
      <Router>
        <Navbar/>
        <Routes>
          <Route path='/' element={<Home/>}/>
          <Route path='/appointment' element={<Appointment/>}/>
          <Route path='/register' element={<Register/>}/>
          <Route path='/login' element={<Login/>}/>
          <Route path='/about' element={<AboutUs/>}/>
        </Routes>
        <Footer/>
        <ToastContainer position='top-center'/>
      </Router>
    </>
  )
}

export default App