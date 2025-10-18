import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
// import './App.css'
import { Route, Routes } from 'react-router-dom'
import AdminLayout from './layout/AdminLayout'
import Dashboard from './pages/Dashboard'
import Users from './pages/User'
import Sidebar from './components/Sidebar'
import Products from './pages/Products'

function App() {
  return (
    <>
    {/* <Sidebar /> */}
      <Routes>
      <Route path="/" element={<AdminLayout />}>

        <Route index element={<Dashboard />} />
        <Route path="/users" element={<Users />} />
        <Route path="/products" element={<Products />} />
      </Route>
    </Routes>
    </>
  )
}

export default App
