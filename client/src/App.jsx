import React from 'react'
import { Route,Routes } from 'react-router-dom'
import UserForm from './pages/UserForm'
import DisplayPage from './pages/DisplayPage'
const App = () => {
  return (
   <>
  <Routes>
<Route path="/" element={<UserForm />} />
<Route path="/display" element={<DisplayPage />} />
  </Routes>
   </>
  )
}

export default App