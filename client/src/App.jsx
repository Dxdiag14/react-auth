import { useState } from 'react'
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import Login from './components/Login'
import Signup from './components/Signup'
import Dashboard from './components/Dashboard'
import PhoneVerify from './components/PhoneVerify'

function App() {
  const [count, setCount] = useState(0)

  return (
    <BrowserRouter>
      <Routes>
        <Route path='/' element={<Login />} />
        <Route path='/register' element={<Signup />} />
        <Route path='/dashboard' element={<Dashboard />} />
        <Route path='phone/verify' element={<PhoneVerify />} />
      </Routes>
    </BrowserRouter>
  )
}

export default App
