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

  const handleAuth = (boolean) => {
    setIsAuthenticated(boolean);
  }

  const handleAdmin = (boolean) => {
    setIsAdmin(boolean);
  }

  return (
    <div>
      <BrowserRouter>
        <Navbar />
        <Routes>
          <Route path="/" element={<Home isAuthenticated={isAuthenticated}/>} />
          <Route path="/register" element={<Register />} />
          <Route path="/login" element={<Login handleAuth={handleAuth} handleAdmin={handleAdmin}/>} />
          <Route path="/admin" element={<Admin isAdmin={isAdmin}/>} />
        </Routes>
      </BrowserRouter>
    </div>
  )
}

export default App
