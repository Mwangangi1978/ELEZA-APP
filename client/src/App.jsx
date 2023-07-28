import React, { useState } from 'react'
import Navbar from './Components/NavBar'
import ContactPage from "./Components/Contact";
import AboutPage from "./Components/About";

import UserAuthentication from './Components/UserAuthentication' 
import AdminAuthentication from './Components/AdminAuthentication' 
import Landing from './Components/Landing'
import { BrowserRouter as Router, Routes, Route } from "react-router-dom"; // Import Routes





function App() {
  const[isAdmin, setIsAdmin]=useState(null);
  const handleRoleSelection = (isAdminSelected) => {
    setIsAdmin(isAdminSelected);
  };
  




  return(
    
    <Router>
      {isAdmin === null ? (
        // Render the Landing component only when isAdmin is not yet selected
        <Landing handleSubmit={handleRoleSelection} />
      ) : (
        // Render the navigation bar and other routes when isAdmin has a value
        <>
          <Navbar />
          <Routes>
            {/* AdminAuthentication route */}
            {isAdmin === true && (
              <Route path="/admin-authentication" element={<AdminAuthentication />} />
            )}

            {/* UserAuthentication route */}
            {isAdmin === false && (
              <Route path="/user-authentication" element={<UserAuthentication />} />
            )}

            {/* Other routes */}
            <Route path="/contact" element={<ContactPage />} />
            <Route path="/about" element={<AboutPage />} />

            {/* Default fallback route */}
            <Route path="*" element={<h1>404 - Not Found</h1>} />
          </Routes>
        </>
      )}



    </Router>
    
  )
};

export default App;
