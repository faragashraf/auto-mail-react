import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Route, Routes, Navigate } from 'react-router-dom';
import Login from './components/Login';
import MainLayout from './components/MainLayout';
import Home from './components/Home';
import './App.css'; // Import your custom CSS file
import AddNewUser from './components/AddNewUser';
import UserDetail from './components/UserDetail';
import UserList from './components/UserList';
import { getContacts, saveContact, udpatePhoto } from './api/ContactService';



const App = () => {
  const [isLoggedIn, setIsLoggedIn] = useState("false");

  useEffect(() => {
    const loggedIn = localStorage.getItem('isLoggedIn');
    if (loggedIn === "true") {
      setIsLoggedIn("true");
    }
  }, []);

  const [currentPage, setCurrentPage] = useState(0);
  const [data, setData] = useState({});
  const getAllContacts = async (page = 0, size = 3) => {
    try {
      setCurrentPage(page);
      const { data } = await getContacts(page, size);
      setData(data);
      console.log(data);
    } catch (error) {
      console.log(error);
    }
  };
  useEffect(() => {
    getAllContacts();
  }, []);
  const handleLogin = () => {
    setIsLoggedIn("true");
    localStorage.setItem('isLoggedIn', "true");
  };
  const updateContact = async (contact) => {
    try {
      const { data } = await saveContact(contact);
      console.log(data);
    } catch (error) {
      console.log(error);
    }
  };
  const updateImage = async (formData) => {
    try {
       await udpatePhoto(formData);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <>
      <Router>
        <Routes>
          {/* Navigate to login If not Found */}
          <Route path="/" element={<Navigate to="/login" />} />
          <Route path="/login" element={<Login onLogin={handleLogin} />} />
          <Route path="/addNewUser" element={<MainLayout><AddNewUser /></MainLayout>} />
          <Route path="/users/:id" element={<MainLayout><UserDetail updateContact={updateContact} updateImage={updateImage} /></MainLayout>} />
          <Route path="/userList" element={<MainLayout> <UserList data={data} currentPage={currentPage} getAllContacts={getAllContacts} /></MainLayout>} />
          {isLoggedIn ? (
            <Route path="/home" element={<MainLayout> <Home /> </MainLayout>} />) :
            (<Route path="/*" element={<Navigate to="/login" />} />)}
        </Routes>
      </Router>
    </>
  );
};

export default App;
