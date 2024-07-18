import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Route, Routes, Navigate } from 'react-router-dom';
import Login from './components/Login';
import MainLayout from './components/MainLayout';
import Home from './components/Home';
import './App.css'; // Import your custom CSS file


const App = () => {
  const [isLoggedIn, setIsLoggedIn] = useState("false");

  useEffect(() => {
    const loggedIn = localStorage.getItem('isLoggedIn');
    if (loggedIn === "true") {
      setIsLoggedIn("true");
    }
  }, []);

  const handleLogin = () => {
    setIsLoggedIn("true");
    localStorage.setItem('isLoggedIn', "true");
  };

  return (
    <>
      <Router>
        <Routes>
          {/* Navigate to login If not Found */}
          <Route path="/" element={<Navigate to="/login" />} />
          <Route path="/login" element={<Login onLogin={handleLogin} />} />
          {isLoggedIn ? (<Route path="/home" element={<MainLayout><Home /></MainLayout>} />) :
            (<Route path="/*" element={<Navigate to="/login" />} />)}
        </Routes>
      </Router>
    </>
  );
};

export default App;
