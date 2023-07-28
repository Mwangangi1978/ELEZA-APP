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
          
          {/* AdminAuthentication route */}
          {isAdmin === true && (
            <AdminAuthentication />
          )}

          {/* UserAuthentication route */}
          {isAdmin === false && (
            <UserAuthentication />
          )}
          <Routes>

            {/* Other routes */}
            <Route path="/contact" element={<ContactPage />} />
            <Route path="/about" element={<AboutPage />} />
          </Routes>
        </>
      )}



    </Router>
    
  )
};

export default App;
