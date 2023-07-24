import React, { useState } from 'react'
import NavBar from './Components/NavBar'
import UserAuthentication from './Components/UserAuthentication'
import AdminAuthentication from './Components/AdminAuthentication'
import Landing from './Components/Landing'

function App() {
  const[isAdmin, setIsAdmin]=useState('')
  const[hasSubmittedForm, setHasSubmittedForm]=useState('false')
  const[]=useState('')
  const[]=useState('')
  return(
    <>
      <NavBar />
      
    </>
  )
}

export default App
