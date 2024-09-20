import React, { useState } from 'react';
import { BrowserRouter as Router, Route, Routes, Navigate } from 'react-router-dom';
import ModalProvider from './components/navbar/ModalProvider';
import Home from './pages/home/Home';
import Login from './pages/login/Login';
import SignUp from './pages/signup/Signup';
import Dashboard from './pages/dashboard/Dashboard';
import EmailList from './components/emailList/EmailList';
import EmailForm from './components/emailForm/EmailForm';

import ServiceList from './components/serviceList/ServiceList';
import ServiceForm from './components/serviceForm/ServiceForm';
import ServicePanel from './components/servicePanel/ServicePanel';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const EmailServiceManagement = () => {
  const [selectedEmailId, setSelectedEmailId] = useState(null);

  return (
    <div>
      <h1>Email Service Management</h1>
      <EmailForm />
      <EmailList onSelectEmail={setSelectedEmailId} />
      {selectedEmailId && (
        <>
          <ServiceList emailId={selectedEmailId} />
          <ServiceForm emailId={selectedEmailId} />
        </>
      )}
      <ServicePanel />
    </div>
  );
};

function App() {
  return (
    <Router>
      <ModalProvider>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<SignUp />} />
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/email-service" element={<EmailServiceManagement />} />
          
        </Routes>
        <ToastContainer />
      </ModalProvider>
    </Router>
  );
}

export default App;
















































// import React from 'react';
// import ModalProvider from './components/navbar/ModalProvider';
// import { BrowserRouter as Router, Route, Routes, Navigate } from 'react-router-dom';
// import Home from './pages/home/Home'; // Ensure Home component file is named correctly
// import Login from './pages/login/Login'; // Ensure file is named Login.jsx, not login.jsx
// import SignUp from './pages/signup/Signup';
// import Dashboard from './pages/dashboard/Dashboard';



// function App() {
//   return (
//     <Router>
//       <ModalProvider>
//         <Routes>
//           <Route path="/" element={<Home />} />
//           <Route path="/login" element={<Login />} />
//           <Route path="/signup" element={<SignUp />} />
//           <Route path="/dashboard" element={<Dashboard />} />
          
//           {/* Add other routes here */}
//         </Routes>
//       </ModalProvider>
//     </Router>
//   );
// }

// export default App;




