import React from 'react'
import { Route, Routes, Navigate } from 'react-router-dom'
import Login from './pages/Login'
import Home from './pages/Home'
import Register from './pages/Register'
import ProtectRoute from './ProtectRoute'
import Update from './Component/Update'

function App() {
  return (
    <>
      <Routes>

        {/* Protected Home Route */}
        <Route
          path='/'
          element={
            
              <Login/>
            
          }
        />

        {/* Optional: /home bhi chale */}
        <Route
          path='/home'
          element={
            <ProtectRoute>
              <Home />
            </ProtectRoute>
          }
        />

        {/* Public Routes */}
        <Route path='/login' element={<Login />} />
        <Route path='/register' element={<Register />} />

        {/* 404 fallback */}
        {/* <Route path='*' element={<Navigate to='/' />} /> */}
        <Route path='/updateprofile/:id' element={<Update/>} />

      </Routes>
    </>
  )
}

export default App
