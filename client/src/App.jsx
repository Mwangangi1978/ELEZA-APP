import React, { useState } from 'react'
/* import NavBar from './Components/NavBar' */
import UserAuthentication from './Components/UserAuthentication'
/* import AdminAuthentication from './Components/AdminAuthentication' */
import Landing from './Components/Landing'
/* import AdminHomePage from './Components/AdminHomePage' */

function App() {
  const[isAdmin, setIsAdmin]=useState('')
  const[hasSubmittedForm, setHasSubmittedForm]=useState('false')
  const[]=useState('')
  const[]=useState('')
  const handleFormSubmit = () => {
    setHasSubmittedForm(setHasSubmittedForm);
};


  return(
    <>
      {isAdmin==='' && (
        <Landing />
      )}
      {!hasSubmittedForm && isAdmin !=='' &&(
        <UserAuthentication
        setHasSubmittedForm={setHasSubmittedForm} 
          handleSubmit={handleFormSubmit} 
        />
      )}
      
    </>
  )
}

export default App
