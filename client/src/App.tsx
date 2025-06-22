import { Routes, Route } from 'react-router-dom'
import Home from './pages/Home'
import SingleListing from './pages/SingleListing'
import Login from './pages/Login'
import Signup from './pages/Signup'
import Dashboard from './pages/Dashboard'

function App() {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/dashboard" element={<Dashboard />} />
      <Route path="/login" element={<Login />} />
      <Route path="/signup" element={<Signup />} />
      <Route path="/listing/:id" element={<SingleListing />} />
    </Routes>
  )
}

export default App
