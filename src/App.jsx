import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import ModalProvider from './components/navbar/ModalProvider';
import Home from './pages/home/Home';
import Login from './pages/login/Login';
import SignUp from './pages/signup/Signup';
import Dashboard from './pages/dashboard/Dashboard';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Inventory from './pages/dashboard/Inventory';


function App() {
    return (
        <Router>
            <ModalProvider>
                <Routes>
                    <Route path="/" element={<Home />} />
                    <Route path="/login" element={<Login />} />
                    <Route path="/signup" element={<SignUp />} />
                    <Route path="/dashboard" element={<Dashboard />} />
                    <Route path="/inventory" element={<Inventory />} />
                    
                </Routes>
                <ToastContainer />
            </ModalProvider>
        </Router>
    );
}



export default App;