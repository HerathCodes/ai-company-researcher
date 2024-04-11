import React, { useState, useEffect } from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { jwtDecode } from 'jwt-decode'
import Home from './pages/Home';
import Register from './pages/Register';
import Login from './pages/Login';
import Admin from './pages/Admin';
import Navbar from './components/Navbar';
import "./App.css";


function App() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [isAdmin, setIsAdmin] = useState(false);

  useEffect(() => {
    const token = localStorage.getItem('token');
    if (token) {
        const user = jwtDecode(token);
        console.log(user);
        console.log(user.name);
        if (!user) {
            localStorage.removeItem('token');
            setIsAuthenticated(false);
        }
        else {
            console.log('test');
            setIsAuthenticated(true);
            console.log(isAuthenticated);
            if (user.role === 'admin') {
                setIsAdmin(true);
            }
        }
    } 
  }, [])

  return (
    <div>
      <BrowserRouter>
        <Navbar />
        <Routes>
          <Route path="/" element={<Home isAuthenticated={isAuthenticated}/>} />
          <Route path="/register" element={<Register />} />
          <Route path="/login" element={<Login />} />
          <Route path="/admin" element={<Admin isAdmin={isAdmin}/>} />
        </Routes>
      </BrowserRouter>
    </div>
  )
}

export default App
