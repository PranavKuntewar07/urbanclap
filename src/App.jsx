import React from 'react';
import ModalProvider from './components/navbar/ModalProvider';
import { BrowserRouter as Router, Route, Routes, Navigate } from 'react-router-dom';
import Home from './pages/home/Home'; // Ensure Home component file is named correctly
import Login from './pages/login/Login'; // Ensure file is named Login.jsx, not login.jsx
import SignUp from './pages/signup/Signup';
import Dashboard from './pages/dashboard/Dashboard';



function App() {
  return (
    <Router>
      <ModalProvider>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<SignUp />} />
          <Route path="/dashboard" element={<Dashboard />} />
          
          {/* Add other routes here */}
        </Routes>
      </ModalProvider>
    </Router>
  );
}

export default App;
